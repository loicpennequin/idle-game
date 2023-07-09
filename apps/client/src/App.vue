<script setup lang="ts">
import type { Nullable } from '@daria/shared';
import { RouterView } from 'vue-router';

const error = ref<Nullable<string>>();

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
    <RouterView v-else />
  </Suspense>
</template>
