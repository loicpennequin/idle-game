<script setup lang="ts">
const { mutate: addTodo, isLoading: isAdding } = useAddTodo();

const text = ref();
</script>

<template>
  <form @submit.prevent="addTodo(text)" class="space-y-3">
    <UiTextInput
      id="todo-text"
      v-model="text"
      placeholder="What needs to be done ?"
      aria-label="What needs to be done ?"
    />
    <UiButton :disabled="isAdding">Add todo</UiButton>
  </form>
</template>
