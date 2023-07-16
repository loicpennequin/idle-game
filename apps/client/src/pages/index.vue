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
    <section class="full-width">
      <h2>Arenas</h2>
      <ArenaList />
    </section>
    <section v-if="isAuthenticated">
      <section>
        <p v-if="session">Hello, {{ session.email }}</p>
        <UiButton v-if="isAuthenticated" :disabled="isLoading" @click="mutate(undefined)">
          Log out
        </UiButton>
      </section>
    </section>

    <template v-else>
      <section class="surface">
        <h2>Login</h2>
        <LoginForm />
      </section>

      <section class="surface">
        <h2>Sign up</h2>
        <SignupForm />
      </section>
    </template>
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

    > .surface {
      padding: var(--size-5);
      border: solid var(--border-size-1) var(--border-dimmed);
    }
  }
}

section.full-width {
  grid-column: 1 / -1;
}
</style>
