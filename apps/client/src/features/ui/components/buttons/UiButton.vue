<script setup lang="ts">
import type { ButtonProps } from './UiButtonBase.vue';

const props = defineProps<ButtonProps>();
</script>

<template>
  <UiButtonBase v-bind="props" class="ui-button">
    <slot />
  </UiButtonBase>
</template>

<style scoped lang="postcss">
.ui-button {
  --button-color: var(--gray-0);
  --button-bg: var(--gray-9);

  html.dark & {
    --button-color: var(--gray-0);
    --button-bg: var(--blue-9);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      --button-bg: var(--gray-12);
      html.dark & {
        --button-bg: var(--blue-8);
      }
    }
  }
}
</style>
