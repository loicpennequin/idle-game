<script setup lang="ts">
import type { Nullable } from '@daria/shared';

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
    <DynamicLayout v-else />
  </Suspense>
</template>
