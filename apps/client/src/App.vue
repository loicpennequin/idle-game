<script setup lang="ts">
import type { Nullable } from '@daria/shared';
import { RouterView } from 'vue-router';

const error = ref<Nullable<string>>();

const { socket } = useContainer();
socket.connect();
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

<style>
* {
  box-sizing: border-box;
}

*:focus-visible {
  transition: outline-offset 0.15s ease;
  outline-offset: 5px;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f7f7fb;
  color: #222;
}

main {
  max-width: 48rem;
  margin-inline: auto;
  margin-block-start: 8rem;
  background-color: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
}

h1 {
  margin-block-start: 0;
}

ul {
  list-style: none;
  padding-inline-start: 0;
}

label,
input:not(:is([type='checkbox'], [type='radio'])) {
  display: block;
}

input {
  padding: 0.5rem;
  margin-block-end: 0.5rem;
  border: solid 1px #ddd;
  accent-color: black;
}

input::placeholder {
  font-style: italic;
}

button {
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
  background-color: #222;
  color: white;
  transition: transform 0.25s;
  min-width: 6rem;
  font-weight: 600;
}
@media (hover: hover) and (pointer: fine) {
  button:hover:not(:disabled) {
    transform: scale(1.05);
  }
}
button:disabled {
  opacity: 0.7;
}

.error {
  color: hsl(0, 50%, 50%);
}
</style>
