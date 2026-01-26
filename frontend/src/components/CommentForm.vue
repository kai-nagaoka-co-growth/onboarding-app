<script setup lang="ts">
import { computed } from 'vue'
import useCreateComment from '@/composables/useCreateComment'

const props = defineProps<{
  memoId: string | number
}>()

const emit = defineEmits<{
  (e: 'created', created?: unknown): void
}>()

const { newCommentBody, submitting, submitError, submitComment } = useCreateComment()
const canSubmit = computed(() => newCommentBody.value.trim().length > 0)

async function onSubmit () {
  const created = await submitComment(String(props.memoId))
  if (!submitError.value) {
    emit('created', created)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="comment-form">
    <textarea
    v-model="newCommentBody"
    rows="3"
    placeholder="コメントする"
    />

    <div class="actions">
      <button type="submit" :disabled="submitting || !canSubmit">
        {{ submitting ? '送信中...' : '送信' }}
      </button>
      <span v-if="submitError" class="error">{{ submitError }}</span>
    </div>
  </form>
</template>

<style scoped>
.comment-form { display: grid; gap: 8px; }
textarea { width: 100%; }
.actions { display: flex; align-items: center; gap: 8px; }
.error { color: #d00; }
</style>