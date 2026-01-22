import { ref } from 'vue'

export type Memo = {
  title: string
  updatedAt: number
}

const memos = ref<Memo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const lastFetchedAt = ref<Date | null>(null)

async function fetchMemos(): Promise<void> {
	loading.value = true
  error.value = null
  try {
    const res = await fetch('http://localhost:3000/api/v1/memos')
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
    lastFetchedAt.value = new Date()
    const data = await res.json()
    memos.value = data
  } catch (e: any) {
    error.value = e?.message ?? '予期せぬエラーが発生しました'
    memos.value = []
  } finally {
    loading.value = false
  }
}

export default function useMemos() {
  return { memos, loading, error, fetchMemos, lastFetchedAt }
}