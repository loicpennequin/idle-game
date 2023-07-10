<script setup lang="ts">
const { queryKeys, todoApi } = useContainer();

const { data: todos, suspense } = useQuery({
  ...queryKeys.todo.list,
  queryFn: todoApi.getAll
});

const { mutate: toggle, isLoading: isToggling } = useMutation({
  mutationFn: todoApi.updateCompleted
});

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
          @change="toggle({ id: todo.id, completed: !todo.completed })"
        />
        {{ todo.text }}
      </label>
    </li>
  </ul>
  <p v-else>No todo yet.</p>
</template>
