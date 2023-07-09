<script setup lang="ts">
import { TodoResponse } from '@daria/shared';

const { queryKeys, todoRepo } = useContainer();

const {
  data: todos,
  suspense,
  refetch
} = useQuery({
  ...queryKeys.todo.list,
  queryFn: todoRepo.getAll
});

const { mutate: addTodo, isLoading: isAdding } = useMutation({
  mutationFn: todoRepo.create,
  onSuccess: () => {
    text.value = '';
  }
});

const { mutate: toggle, isLoading: isToggling } = useMutation({
  mutationFn: todoRepo.updateCompleted,
  onSuccess: () => {
    // refetch();
  }
});

const text = ref();
const handleSubmit = () => {
  addTodo(text.value);
};

const handleCheckboxChange = (todo: TodoResponse) => {
  toggle({ id: todo.id, completed: !todo.completed });
};
await suspense();
</script>

<template>
  <main>
    <h1>TODOS</h1>

    <ul v-if="todos?.length">
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input
            type="checkbox"
            :checked="todo.completed"
            :disabled="isToggling"
            @change="handleCheckboxChange(todo)"
          />
          {{ todo.text }}
        </label>
      </li>
    </ul>
    <p v-else>No todo yet.</p>

    <form @submit.prevent="handleSubmit">
      <input v-model="text" />
      <button :disabled="isAdding">Add todo</button>
    </form>
  </main>
</template>
