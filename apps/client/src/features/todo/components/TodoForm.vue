<script setup lang="ts">
const { mutate: addTodo, isLoading: isAdding } = useAddTodo();

const text = ref();
</script>

<template>
  <form @submit.prevent="addTodo(text)">
    <input
      v-model="text"
      placeholder="What needs to be done ?"
      aria-label="What needs to be done ?"
    />
    <button :disabled="isAdding">Add todo</button>
  </form>
</template>
