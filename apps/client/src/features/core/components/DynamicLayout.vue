<script setup lang="ts">
import { isString } from '@daria/shared';
import type { Component as VueComponent } from 'vue';

const layoutMap = new Map<string, VueComponent>();
layoutMap.set(
  'default',
  defineAsyncComponent(() => import('@/layouts/default.vue'))
);

const route = useRoute();
const layoutComponent = computed(() => {
  const key = isString(route.meta.layout) ? route.meta.layout : 'default';
  const layout = layoutMap.get(key);

  return layout || layoutMap.get('default');
});
const router = useRouter();

await router.isReady();
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
