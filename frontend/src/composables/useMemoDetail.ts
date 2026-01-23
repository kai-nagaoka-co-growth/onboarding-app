import { ref } from 'vue'

export type Comment = {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
}

export type MemoDetail = {
  id: number
  title: string
  body?: string
  createdAt: Date
  updatedAt: Date
  comments?: Comment[]
}

const memo = ref<MemoDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchMemoDetail (id: string) {
  if (!id) {
    error.value = 'IDが指定されていません'
    memo.value = null
    return
  }
  loading.value = true
  error.value = null
  try {
    const url = `http://localhost:3000/api/v1/memos/${encodeURIComponent(id)}`
    const res = await fetch(url)
    if (!res.ok) {
      let msg = ''
      try { msg = (await res.json())?.message ?? '' } catch {}
      if (!msg) try { msg = await res.text() } catch {}
      throw new Error(`${msg || '取得に失敗しました'} (HTTP ${res.status})`)
    }

    const data = await res.json()

    memo.value = {
      id: Number(data.id),
      title: String(data.title),
      body: String(data.body ?? ''),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      comments: (data.comments || []).map((comment: any) => ({
        id: Number(comment.id),
        body: String(comment.body),
        createdAt: new Date(comment.created_at),
        updatedAt: new Date(comment.updated_at),
      })),
    }
  } catch (e: any) {
    error.value = e?.message ?? '詳細の取得に失敗しました'
    memo.value = null
  } finally {
    loading.value = false
  }
}

export default function useMemoDetail () {
  return { memo, loading, error, fetchMemoDetail }
}