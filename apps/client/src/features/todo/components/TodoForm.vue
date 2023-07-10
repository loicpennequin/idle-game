<script setup lang="ts">
const { todoApi } = useContainer();

const { mutate: addTodo, isLoading: isAdding } = useMutation({
  mutationFn: todoApi.create,
  onSuccess: () => {
    text.value = '';
  }
});

const text = ref();
const handleSubmit = () => {
  addTodo(text.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="text" />
    <button :disabled="isAdding">Add todo</button>
  </form>
</template>
