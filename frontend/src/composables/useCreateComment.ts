import { ref, type Ref } from 'vue'
import type { MemoDetail } from './useMemoDetail'

type CreateCommentPayload = { body: string }

export default function useCreateComment () {
  const newCommentBody = ref('')
  const submitting = ref(false)
  const submitError = ref<string | null>(null)

  async function submitComment (memoId: string) {
    submitError.value = null
    const body = newCommentBody.value.trim()
    if (!memoId || !body) return null

    submitting.value = true
    try {
      const res = await fetch(`http://localhost:3000/api/v1/memos/${memoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body } satisfies CreateCommentPayload)
      })
      if (!res.ok) {
        const msg = await res.text().catch(() => '')
        throw new Error(msg || `HTTP ${res.status}`)
      }
      const created = await res.json().catch(() => null)

      newCommentBody.value = ''
      return created
    } catch (e) {
      submitError.value = e instanceof Error ? e.message : '不明なエラー'
      return null
    } finally {
      submitting.value = false
    }
  }

  return { newCommentBody, submitting, submitError, submitComment }
}
