<script setup lang="ts">
useTodoCacheSubscribers();

const { data: todos, suspense } = useTodos();
const { mutateAsync: toggle, isLoading: isToggling } = useToggleTodo();

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
          @change="toggle(todo)"
        />
        {{ todo.text }}
      </label>
    </li>
  </ul>
  <p v-else>No todo yet.</p>
</template>
