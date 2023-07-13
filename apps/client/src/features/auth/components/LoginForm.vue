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
    <fieldset>
      <UiFormLabel for="login-email">E-mail</UiFormLabel>
      <UiTextInput id="login-email" type="email" v-model="email" required />
    </fieldset>

    <UiFormLabel for="login-password">Password</UiFormLabel>
    <UiTextInput id="login-password" type="password" v-model="password" required />

    <UiButton :disabled="isLoading">Sign up</UiButton>
    <UiFormError :error="error?.message" />
    <p v-if="isSuccess">Login successful</p>
  </form>
</template>

<style scoped lang="postcss"></style>
