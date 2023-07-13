<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'Home'
});

const isAuthenticated = useIsAuthenticated();

const { mutate, isLoading } = useLogout();

const { data: session } = useSession();
</script>

<template>
  <main class="container surface">
    <h1>Cool App</h1>

    <section class="flex flex-wrap gap-5">
      <div>
        <h2>Login</h2>
        <p v-if="session">Hello, {{ session }}</p>
        <UiButton v-if="isAuthenticated" :disabled="isLoading" @click="mutate(undefined)">
          Log out
        </UiButton>
        <LoginForm v-else />
      </div>
      <div>
        <h2>Sign up</h2>
        <SignupForm />
      </div>
    </section>

    <h2>Todo list</h2>
    <template v-if="isAuthenticated">
      <TodoList />
      <TodoForm />
    </template>
    <p v-else>Login first to see the to do list</p>
  </main>
</template>

<style scoped>
section > div {
  min-width: var(--size-xs);
}
</style>
