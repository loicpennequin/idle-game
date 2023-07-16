<script setup lang="ts">
const { isSuccess, data: arenas } = useArenas();

const isAuthenticated = useIsAuthenticated();
</script>

<template>
  <ul v-if="isSuccess" class="flex gap-3">
    <li v-for="arena in arenas" :key="arena.id" class="surface">
      <h3>{{ arena.name }}</h3>
      Lv.{{ arena.minLevel }}-{{ arena.maxLevel }}
      <br />
      {{ arena.availableSlots }} / {{ arena.maxSlots }} slots available

      <UiButton v-if="isAuthenticated" size="sm">Join</UiButton>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
h3 {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-5);
}

li {
  border: solid var(--border-size-1) var(--border-dimmed);
  padding: var(--size-3);
}
</style>
