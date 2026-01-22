import { ref } from 'vue'

export type CreateMemoPayload = {
  title: string
  body?: string
}

  const creating = ref(false)
  const createError = ref<string | null>(null)

  async function createMemo (payload: CreateMemoPayload): Promise<boolean> {
    createError.value = null
    creating.value = true
    try {
      const res = await fetch('http://localhost:3000/api/v1/memos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        let msg = ''
        try { msg = (await res.json())?.message ?? '' } catch {}
        if (!msg) try { msg = await res.text() } catch {}
        throw new Error(msg || `HTTP ${res.status}`)
      }
      return true
    } catch (e: any) {
      createError.value = e?.message ?? '作成に失敗しました。'
      return false
    } finally {
      creating.value = false
    }
  }

export default function useCreateMemo () {
  return { creating, createError, createMemo }
}