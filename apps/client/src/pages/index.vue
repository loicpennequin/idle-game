<script setup lang="ts">
const { queryKeys, todoRepo } = useContainer();

const text = ref();
const handleSubmit = () => {
  mutate(text.value);
};

const { data: todos, suspense } = useQuery({
  ...queryKeys.todo.list,
  queryFn: todoRepo.getAll
});

const { mutate, isLoading } = useMutation({
  mutationFn: todoRepo.create,
  onSuccess: () => {
    text.value = '';
  }
});

await suspense();
</script>

<template>
  <main>
    <h1>TODOS</h1>

    <ul v-if="todos?.length">
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <p v-else>No todo yet.</p>

    <form @submit.prevent="handleSubmit">
      <input v-model="text" />
      <button :disabled="isLoading">Add todo</button>
    </form>
  </main>
</template>
