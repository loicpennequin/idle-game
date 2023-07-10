<script setup lang="ts">
import { TodoResponse } from '@daria/shared';

const { queryKeys, todoApi } = useContainer();

const unsubscribe = todoApi.subscribe();
onBeforeUnmount(unsubscribe);

const { data: todos, suspense } = useQuery({
  ...queryKeys.todo.list,
  queryFn: todoApi.getAll
});

const { mutate: toggle, isLoading: isToggling } = useMutation({
  mutationFn: todoApi.updateCompleted
});

const handleChange = (todo: TodoResponse) => {
  toggle({ id: todo.id, completed: !todo.completed });
};
await suspense();
</script>

<template>
  <ul v-if="todos?.length">
    <li v-for="todo in todos" :key="todo.id">
      <label>
        <input
          type="checkbox"
          :checked="todo.completed"
          :disabled="isToggling"
          @change="handleChange(todo)"
        />
        {{ todo.text }}
      </label>
    </li>
  </ul>
  <p v-else>No todo yet.</p>
</template>
