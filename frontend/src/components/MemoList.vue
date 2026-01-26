<script setup lang="ts">
import type { Memo } from '../composables/useMemos'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  memos: Memo[]
  loading: boolean
  error: string | null
}>()

function formatDate (date: string | number | Date): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`
}
</script>

<template>
  <section class="memos">
    <p v-if="loading" class="memos__status">読み込み中…</p>
    <p v-else-if="error" class="memos__status memos__status--error">取得に失敗しました: {{ error }}</p>
    <ul v-else class="memos__list">
      <li v-for="memo in memos" :key="memo.id" class="memo">
        <RouterLink
          class="memo__header memo__link"
          :to="{ name: 'memo-detail', params: { id: String(memo.id) } }"
        >
          <h3 class="memo__title">{{ memo.title }}</h3>
          <small class="memo__updated">更新：{{ formatDate(memo.updated_at) }}</small>
        </RouterLink>
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

.memo__link {
  text-decoration: none;
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