<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'Arena'
});

const route = useRoute('Arena');
const { isLoading, data: arena } = useArenaDetails(computed(() => route.params.id));
</script>

<template>
  <main class="container surface" style="--container-size: var(--size-xl)">
    <div v-if="isLoading">Loading arena...</div>
    <pre v-if="arena">{{ arena }}</pre>
  </main>
</template>

<style scoped lang="postcss"></style>
