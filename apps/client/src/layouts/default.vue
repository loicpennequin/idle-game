<script setup lang="ts">
const { data: session } = useSession();

const { mutate: logout, isLoading } = useLogout();
</script>

<template>
  <div class="default-layout">
    <header class="container" style="--container-size: var(--size-xl)">
      <h1>
        <RouterLink :to="{ name: 'Home' }">Idle Game</RouterLink>
      </h1>
      <DarkModeToggle />

      <template v-if="session">
        {{ session.name }}
        <UiLinkButton @click="logout(undefined)" :is-loading="isLoading">
          Logout
        </UiLinkButton>
      </template>
      <UiLinkButton v-else :to="{ name: 'Login' }">Login</UiLinkButton>
    </header>
    <router-view />
  </div>
</template>

<style scoped lang="postcss">
header {
  display: flex;
  gap: var(--size-5);
  align-items: center;
}

h1 :is(a, a:hover, a:visited) {
  text-decoration: none;
  color: inherit;
}
</style>
