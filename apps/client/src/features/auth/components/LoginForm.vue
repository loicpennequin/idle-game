<script setup lang="ts">
const {
  mutate: signup,
  isLoading,
  isSuccess,
  error
} = useLogin({
  onSuccess() {
    email.value = '';
    password.value = '';
  }
});

const email = ref('');
const password = ref('');
</script>

<template>
  <form @submit.prevent="signup({ email, password })">
    <label for="login-email">E-mail</label>
    <input id="login-email" type="email" v-model="email" required />

    <label for="login-password">Password</label>
    <input id="login-password" type="password" v-model="password" required />

    <button :disabled="isLoading">Sign up</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="isSuccess">Login successful</p>
  </form>
</template>

<style scoped lang="postcss"></style>
