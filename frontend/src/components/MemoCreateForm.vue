<script setup lang="ts">
import { ref } from 'vue'
import useCreateMemo from '../composables/useCreateMemo'

const emit = defineEmits<{ (e: 'created'): void }>()

const newTitle = ref('')
const newBody = ref('')

const { creating, createError, createMemo } = useCreateMemo()

async function onSubmit () {
  if (!newTitle.value.trim()) return
  const ok = await createMemo({ title: newTitle.value, body: newBody.value })
  if (ok) {
    newTitle.value = ''
    newBody.value = ''
    emit('created')
  }
}
</script>

<template>
  <form class="memo-form" @submit.prevent="onSubmit">
    <fieldset :disabled="creating" class="memo-form__fieldset">
      <div class="memo-form__row">
        <label for="memo-title">タイトル</label>
        <input id="memo-title" v-model="newTitle" type="text" placeholder="タイトルを入力" required />
      </div>
      <div class="memo-form__row">
        <label for="memo-body">内容</label>
        <textarea id="memo-body" v-model="newBody" rows="4" placeholder="内容を入力"></textarea>
      </div>
      <div class="memo-form__actions">
        <button type="submit">作成</button>
      </div>
    </fieldset>
    <p v-if="createError" class="memo-form__error" role="alert">作成に失敗しました: {{ createError }}</p>
  </form>
</template>

<style scoped>
.memo-form {
  display: grid;
  gap: 16px;
  max-width: 720px;
  margin: 1rem 0;
}

.memo-form__fieldset {
  border: 0;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.memo-form__row {
  display: grid;
  gap: 6px;
}

.memo-form input,
.memo-form textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  box-sizing: border-box;
  border-radius: 6px;
}

.memo-form textarea {
  min-height: 6%;
  resize: vertical;
}

.memo-form__actions {
  display: flex;
  justify-content: flex-end;
}

.memo-form__error {
  margin: 0;
}
</style>