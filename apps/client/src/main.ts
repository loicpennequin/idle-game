import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { container } from './container';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(VueQueryPlugin, { queryClient: container.resolve('queryClient') });
app.use(
  createRouter({
    history: createWebHistory()
  })
);
app.provide(CONTAINER_INJECTION_KEY, container.cradle);

container.cradle.authApi.init().then(() => {
  app.mount('#app');
});
