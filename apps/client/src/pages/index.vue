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
  <main class="container">
    <h1 class="col-span-2">Cool App</h1>

    <section class="surface">
      <h2>Login</h2>
      <p v-if="session">Hello, {{ session.email }}</p>
      <UiButton v-if="isAuthenticated" :disabled="isLoading" @click="mutate(undefined)">
        Log out
      </UiButton>
      <LoginForm v-else />
    </section>

    <section class="surface">
      <h2>Sign up</h2>
      <SignupForm />
    </section>

    <template v-if="isAuthenticated">
      <section class="surface">
        <h2>Todo list</h2>
        <TodoList />
      </section>

      <section class="surface">
        <TodoForm />
      </section>
    </template>
    <p v-else>Login first to see the to do list</p>
  </main>
</template>

<style scoped lang="postcss">
main {
  --container-size: var(--size-xl);
}

@media (min-width: 48em) {
  main {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--size-4);

    > section {
      border: solid var(--border-size-1) var(--border-dimmed);
      padding: var(--size-5);
    }
  }
}
</style>
