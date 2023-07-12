<script setup lang="ts">
import type { TodoResponse } from '@daria/shared';

const { queryKeys, todoApi } = useContainer();

const { data: todos, suspense } = useQuery({
  ...queryKeys.todo.list,
  queryFn: todoApi.getAll
});

const { mutateAsync: toggle, isLoading: isToggling } = useMutation({
  mutationFn: todoApi.updateCompleted
});

const onChange = async (e: Event, todo: TodoResponse) => {
  await toggle({ id: todo.id, completed: !todo.completed });
  nextTick(() => {
    (e.target as HTMLInputElement).focus();
  });
};

const unsubscribe = todoApi.subscribe();
onBeforeUnmount(unsubscribe);

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
          @change="onChange($event, todo)"
        />
        {{ todo.text }}
      </label>
    </li>
  </ul>
  <p v-else>No todo yet.</p>
</template>
