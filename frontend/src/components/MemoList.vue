<script setup lang="ts">
import type { Memo } from '../composables/useMemos'

const props = defineProps<{
  memos: Memo[]
  loading: boolean
  error: string | null
  lastFetchedAt: Date | null
}>()

const emit = defineEmits<{ (e: 'reload'): void }>()

function formatDate (date: number | string | Date): string {
  const d = typeof date === 'number' || typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'short' }).format(d)
}
</script>

<template>
  <section class="memos">
    <p v-if="loading" class="memos__status">読み込み中…</p>
    <p v-else-if="error" class="memos__status memos__status--error">取得に失敗しました: {{ error }}</p>

    <ul v-else class="memos__list">
      <li v-for="memo in memos" :key="memo.title" class="memo">
        <div class="memo__header">
          <h3 class="memo__title">{{ memo.title }}</h3>
          <small class="memo__updated">更新日時：{{ formatDate(memo.updatedAt) }}</small>
        </div>
      </li>
    </ul>

    <p v-if="!loading && !error && !memos.length" class="memos__empty">メモがありません。</p>
  </section>
</template>

<style scoped>
.memos {
  display: grid;
  gap: 16px;
  margin: 1rem 0;
}

.memos__toolbar {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.memos__reload {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.memos__status,
.memos__empty {
  margin: 0;
}

.memos__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.memo {
  padding: 12px 16px;
  border-radius: 8px;
  display: grid;
  gap: 4px;
}

.memo__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.memo__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.memo__updated {
  opacity: 0.8;
}
</style>