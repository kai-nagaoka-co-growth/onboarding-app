<script setup lang="ts">
import type { Memo } from '../composables/useMemos'

const props = defineProps<{
  memos: Memo[]
  loading: boolean
  error: string | null
  lastFetchedAt: Date | null
}>()

const emit = defineEmits<{ (e: 'reload'): void }>()

function formatDate (date: number): string {
  return new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'short' }).format()
}
</script>

<template>
  <section class="memos">
    <p v-if="loading">読み込み中…</p>
    <p v-else-if="error" class="error">取得に失敗しました: {{ error }}</p>

    <ul v-else class="memos__list">
      <li v-for="memo in memos" :key="memo.title" class="memo">
        <h3>{{ memo.title }}</h3>
        <small>更新日時：{{ formatDate(memo.updatedAt) }}</small>
      </li>
    </ul>

    <p v-if="!loading && !error && !memos.length" class="empty">メモがありません。</p>
  </section>
</template>