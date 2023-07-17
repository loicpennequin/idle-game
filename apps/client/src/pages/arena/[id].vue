<script setup lang="ts">
const props = defineProps<{}>();
const emit = defineEmits<{}>();

definePage({
  name: 'Arena'
});
</script>

<template>
  <main class="container surface" style="--container-size: var(--size-xl)">
    Arena details
  </main>
</template>

<style scoped lang="postcss"></style>
