<script setup lang="ts">
const {
  mutate: signup,
  isLoading,
  isSuccess,
  error
} = useSignup({
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
    <label for="email">E-mail</label>
    <input id="email" type="email" v-model="email" required />

    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" required />

    <button :disabled="isLoading">Sign up</button>
    <p v-if="error" class="errpr">{{ error }}</p>
    <p v-if="isSuccess">Sign up successful</p>
  </form>
</template>

<style scoped lang="postcss"></style>
