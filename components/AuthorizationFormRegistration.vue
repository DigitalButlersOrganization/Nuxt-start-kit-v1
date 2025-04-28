<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useSchema } from '@/schemas/formSchema';
  import { ValidationError } from 'yup';
  import { handleValidationErrors, decodeContent } from '@/utils';
  import { ROUTES } from '~/constants';

  const { t } = useI18n();

  interface Form {
    email?: string;
    password: string;
    confirmPassword: string;
  }

  interface Errors {
    [key: string]: string;
  }

  const form = reactive<Form>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const errors = ref<Errors>({});
  const isLoading = ref<boolean>(false);
  const schema = useSchema(t);

  const registerUser = async () => {
    console.log('Try to register user');
    isLoading.value = true;
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.email,
          email: form.email,
          password: form.password,
        }),
      });

      isLoading.value = false;
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка при регистрации:', errorData);
        return;
      }

      const data = await response.json();
      console.log('Success', data);
    } catch (error) {
      isLoading.value = false;
      console.error('Error:', error);
    }
  };

  const validateForm = async () => {
    console.log(JSON.stringify(form));

    errors.value = {};

    try {
      await schema.validate(form, { abortEarly: false });
      console.log('Form is Valid:', form);
      await registerUser();
    } catch (validationErrors: unknown) {
      console.log('Error:', validationErrors);

      if (validationErrors instanceof ValidationError) {
        console.log('Error:', validationErrors.errors);
        errors.value = handleValidationErrors(validationErrors, t);
      } else {
        console.error('Unexpected error:', validationErrors);
      }
    }
  };
</script>

<template>
  <VeeForm :validation-schema="schema" @submit="validateForm">
    <CustomInput
      v-model="form.email"
      name="email"
      type="email"
      :labelText="`${t('FORM.EMAIL.LABEL')}`"
      :placeholder="`${decodeContent(t('FORM.EMAIL.PLACEHOLDER'))}`"
    />
    <CustomInput
      v-model="form.password"
      name="password"
      type="password"
      :labelText="t('FORM.PASSWORD.LABEL')"
      :placeholder="t('FORM.PASSWORD.PLACEHOLDER')"
    />
    <CustomInput
      v-model="form.confirmPassword"
      name="confirmPassword"
      type="password"
      :labelText="t('FORM.CONFIRM_PASSWORD.LABEL')"
      :placeholder="t('FORM.CONFIRM_PASSWORD.PLACEHOLDER')"
    />

    <CustomButton type="submit" :isLoading="isLoading">
      {{ t('CTA.REGISTER') }}
    </CustomButton>

    <CustomButton tag="a" :to="ROUTES.LOGIN.PATH">
      {{ t('CTA.LOGIN') }}
    </CustomButton>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
