<script setup lang="ts">
import { userContract } from '@daria/shared';
import { toTypedSchema } from '@vee-validate/zod';
import { string } from 'zod';

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

const form = useForm({
  validationSchema: toTypedSchema(
    userContract.signup.body
      .extend({
        passwordConfirm: string()
      })
      .refine(data => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ['passwordConfirm']
      })
  )
});
const onSubmit = form.handleSubmit(values => signup(values));
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UiFormControl v-slot="{ error, inputProps }" name="email">
      <UiFormLabel for="email">Email</UiFormLabel>
      <UiTextInput id="email" v-bind="inputProps" left-icon="mdi-email-outline" />
      <UiFormError :error="error" />
    </UiFormControl>

    <UiFormControl v-slot="{ error, inputProps }" name="password">
      <UiFormLabel for="password">password</UiFormLabel>
      <UiPasswordInput id="password" v-bind="inputProps" left-icon="mdi:lock-outline" />
      <UiFormError :error="error" />
    </UiFormControl>

    <UiFormControl v-slot="{ error, inputProps }" name="passwordConfirm">
      <UiFormLabel for="password-confirm">Confirm password</UiFormLabel>
      <UiPasswordInput
        id="password-confirm"
        v-bind="inputProps"
        left-icon="mdi:lock-outline"
      />
      <UiFormError :error="error" />
    </UiFormControl>

    <UiButton :disabled="isLoading">Sign up</UiButton>
    <UiFormError :error="error?.message" />
    <p v-if="isSuccess">Sign up successful</p>
  </form>
</template>

<style scoped lang="postcss"></style>
