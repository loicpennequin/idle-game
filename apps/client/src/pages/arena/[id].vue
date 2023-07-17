<script setup lang="ts">
import { useArenaDetails } from '@/features/arena/composables/queries';

const props = defineProps<{}>();
const emit = defineEmits<{}>();

definePage({
  name: 'Arena'
});

const route = useRoute('Arena');

const { data: arena } = useArenaDetails(computed(() => route.params.id));
</script>

<template>
  <main class="container surface" style="--container-size: var(--size-xl)">
    <pre>{{ arena }}</pre>
  </main>
</template>

<style scoped lang="postcss"></style>
