<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSchema } from '@/schemas/formSchema';
import { ValidationError } from 'yup';
import { handleValidationErrors, decodeContent } from '@/utils';

const { t } = useI18n();
const strapi = useStrapi();

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
  console.log('Попытка регистрации началась');
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

    console.log('Ответ сервера:', response);
    isLoading.value = false;
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка при регистрации:', errorData);
      return;
    }

    const data = await response.json();
    console.log('Успешная регистрация:', data);
  } catch (error) {
    isLoading.value = false;
    console.error('Ошибка при выполнении запроса:', error);
  }
};

const validateForm = async () => {
  console.log('Текущие данные формы перед валидацией:', JSON.stringify(form, null, 2));

  console.log('validateForm');

  errors.value = {};

  try {
    await schema.validate(form, { abortEarly: false });
    console.log('Форма прошла валидацию:', form);
    await registerUser();
  } catch (validationErrors: unknown) {
    console.log('Ошибка валидации:', validationErrors);

    if (validationErrors instanceof ValidationError) {
      console.log('Обработанная ошибка валидации:', validationErrors.errors);
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

    <Dialog
      :title="t('AUTHORIZATION.LOGIN.TITLE')"
      :description="t('AUTHORIZATION.LOGIN.DESCRIPTION')"
    >
      <template #trigger>
        {{ t('AUTHORIZATION.LOGIN.TITLE') }}
      </template>
      <template #default>
        <AuthorizationFormLogin />
      </template>
    </Dialog>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
