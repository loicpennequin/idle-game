<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'Home'
});

const isAuthenticated = useIsAuthenticated();

const { mutate, isLoading } = useLogout();
</script>

<template>
  <main>
    <h1>Cool App</h1>

    <h2>Todo list</h2>
    <template v-if="isAuthenticated">
      <TodoList />
      <TodoForm />
    </template>
    <p v-else>Login first to see the to do list</p>

    <h2>Sign up</h2>
    <SignupForm />

    <h2>Login</h2>
    <LoginForm v-if="!isAuthenticated" />
    <button v-else :disabled="isLoading" @click="mutate(undefined)">Log out</button>
  </main>
</template>
