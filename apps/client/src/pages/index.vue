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
    <h1 class="col-span-2">Cool App</h1>

    <section>
      <h2>Login</h2>
      <p v-if="session">Hello, {{ session }}</p>
      <UiButton v-if="isAuthenticated" :disabled="isLoading" @click="mutate(undefined)">
        Log out
      </UiButton>
      <LoginForm v-else />
    </section>
    <section>
      <h2>Sign up</h2>
      <SignupForm />
    </section>

    <section class="col-span-2">
      <h2>Todo list</h2>
      <template v-if="isAuthenticated">
        <TodoList />
        <TodoForm />
      </template>
      <p v-else>Login first to see the to do list</p>
    </section>
  </main>
</template>

<style scoped lang="postcss">
@media (min-width: 48em) {
  main {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
