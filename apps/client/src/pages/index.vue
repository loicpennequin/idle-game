<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'Home'
});
</script>

<template>
  <main class="container">
    <section class="hero">
      <div class="surface">
        <p>Thousands of players are already battling each other</p>

        <UiButton :to="{ name: 'Register' }" style="--button-size: var(--font-size-4)">
          Join them
        </UiButton>
      </div>
    </section>
    <section class="full-width">
      <h2>Arenas</h2>
      <ArenaList />
    </section>
  </main>
</template>

<style scoped lang="postcss">
main {
  --container-size: var(--size-xl);
}

.hero {
  @screen md {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  > .surface {
    display: grid;
    gap: var(--size-5);
    justify-items: flex-start;
    padding: var(--size-12) var(--size-8);
    > p {
      font-size: var(--font-size-4);
    }
  }
}
</style>
