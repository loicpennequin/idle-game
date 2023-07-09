<script setup lang="ts">
const { data: todos, suspense } = useGetAllTodos();

await suspense();
</script>

<template>
  <main>
    <h1>TODOS</h1>

    <template v-if="todos?.status === 200">
      <ul v-if="todos.body.length">
        <li v-for="todo in todos.body" :key="todo.id">
          {{ todo.text }}
        </li>
      </ul>
      <p v-else>No todo.</p>
    </template>
  </main>
</template>
