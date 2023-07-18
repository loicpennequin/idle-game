<script setup lang="ts">
const { isSuccess, data: arenas } = useArenas();
</script>

<template>
  <ul v-if="isSuccess" class="flex gap-5">
    <li v-for="arena in arenas" :key="arena.id">
      <RouterLink :to="{ name: 'Arena', params: { id: arena.id } }" class="surface">
        <h3>{{ arena.name }}</h3>
        Lv.{{ arena.minLevel }}-{{ arena.maxLevel }}
        <br />
        {{ arena.availableSlots }} / {{ arena.maxSlots }} slots available
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
@import 'open-props/media';

h3 {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-5);
  margin: 0;
}

li {
  a {
    border: solid var(--border-size-1) var(--border-dimmed);
    display: block;
    transition: box-shadow 0.3s, scale 0.3s;

    &:hover,
    &:focus-visible {
      text-decoration: none;
      box-shadow: var(--shadow-3);

      @media (--motionOK) {
        scale: 1.02;
      }
    }
  }
}
</style>
