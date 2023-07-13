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
    <fieldset>
      <UiFormLabel for="email">E-mail</UiFormLabel>
      <UiTextInput id="email" type="email" v-model="email" required />
    </fieldset>

    <fieldset>
      <UiFormLabel for="password">Password</UiFormLabel>
      <UiTextInput id="password" type="password" v-model="password" required />
    </fieldset>

    <UiButton :disabled="isLoading">Sign up</UiButton>
    <UiFormError :error="error?.message" />
    <p v-if="isSuccess">Sign up successful</p>
  </form>
</template>

<style scoped lang="postcss"></style>
