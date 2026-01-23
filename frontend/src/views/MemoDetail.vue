<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMemoDetail from '../composables/useMemoDetail'

const route = useRoute()
const id = computed(() => String(route.params.id ?? ''))
const { memo, loading, error, fetchMemoDetail } = useMemoDetail()

onMounted(() => { if (id.value) fetchMemoDetail(id.value) })
watch(() => route.params.id, (next) => { if (next) fetchMemoDetail(String(next)) })
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
  <section class="memo-detail">
    <p v-if="!id" class="memo-detail__status memo-detail__status--error">ID が指定されていません。</p>
    <p v-else-if="loading" class="memo-detail__status">読み込み中…</p>
    <p v-else-if="error" class="memo-detail__status memo-detail__status--error">取得に失敗しました: {{ error }}</p>

    <div v-else-if="memo" class="memo-detail__content">
      <h2 class="memo-detail__title">{{ memo.title }}</h2>
      <div class="memo-detail__body">
        {{ memo.body }}
      </div>
      <br/>
      <p class="memo-detail__updated">作成日：{{ formatDate(memo.created_at) }}</p>
      <p class="memo-detail__updated">更新日：{{ formatDate(memo.updated_at) }}</p>
      
      <div class="memo-detail__comments">
        <h3 class="memo-detail__comments-title">コメント ({{ memo.comments?.length || 0 }})</h3>
        <div v-if="memo.comments && memo.comments.length > 0" class="comments-list">
          <div v-for="comment in memo.comments" :key="comment.id" class="comment-item">
            <p class="comment-item__body">{{ comment.body }}</p>
            <p class="comment-item__date">作成日：{{ formatDate(comment.created_at) }}</p>
          </div>
        </div>
        <p v-else class="comments-list__empty">まだコメントがありません</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.memo-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.memo-detail__status {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.memo-detail__status--error {
  color: #d32f2f;
}

.memo-detail__content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.memo-detail__title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.memo-detail__body {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap;
  margin-bottom: 1rem;
}

.memo-detail__updated {
  font-size: 0.875rem;
  color: #999;
  margin: 0.25rem 0;
}

.memo-detail__comments {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.memo-detail__comments-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-item {
  background: #f9f9f9;
  border-left: 3px solid #4CAF50;
  padding: 1rem;
  border-radius: 4px;
}

.comment-item__body {
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

.comment-item__date {
  font-size: 0.75rem;
  color: #999;
  margin: 0;
}

.comments-list__empty {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}
</style>
