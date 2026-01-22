<script setup lang="ts">
import { onMounted } from 'vue'
import useMemos from '../composables/useMemos'
import MemoList from '../components/MemoList.vue'

const { memos, loading, error, fetchMemos, lastFetchedAt } = useMemos()
onMounted(() => { fetchMemos() })
</script>

<template>
  <h1>メモ一覧</h1>
  <MemoList
    :memos="memos"
    :loading="loading"
    :error="error"
    :lastFetchedAt="lastFetchedAt"
    @reload="fetchMemos"
  />
</template>
