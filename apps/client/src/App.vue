<script setup lang="ts">
import type { Nullable } from '@daria/shared';
import { RouterView } from 'vue-router';

useAuthGuard();

const error = ref<Nullable<string>>();

const isAuthenticated = useIsAuthenticated();
const { socket } = useContainer();
watchEffect(() => {
  if (socket.connected && !isAuthenticated.value) {
    socket.disconnect();
  }

  if (socket.disconnected && isAuthenticated.value) {
    socket.connect();
  }
});

onErrorCaptured(err => {
  error.value = err.message;
});
</script>

<template>
  <Suspense>
    <template #fallback>Loading...</template>
    <div v-if="error">
      <p>An error has occured</p>
      <button @click="error = null">Try again</button>
    </div>
    <div v-else>
      <header class="container" style="--container-size: var(--size-xl)">
        <h1>Idle Game</h1>
        <DarkModeToggle />
      </header>
      <RouterView />
    </div>
  </Suspense>
</template>

<style scoped>
header {
  display: flex;
  gap: var(--size-5);
  align-items: center;
}
</style>
