<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { createSchema } from '@/schemas/formSchema';
import { ValidationError } from 'yup';

const { t } = useI18n();

interface Form {
  email: string;
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

const schema = createSchema(t);
const validateForm = async () => {
  errors.value = {};

  try {
    await schema.validate(form, { abortEarly: false });
    console.log('Форма прошла валидацию:', form);
  } catch (validationErrors: unknown) {
    if (validationErrors instanceof ValidationError) {
      validationErrors.inner.forEach((err: { path?: string; message?: string }) => {
        if (err.path) {
          errors.value[err.path] = err.message || 'error';
        }
      });
    } else {
      console.error('Unexpected error:', validationErrors);
    }
  }
};
</script>

<template>
  <VeeForm :validation-schema="schema" @submit="validateForm">
    <div>
      <label for="email">Email</label>
      <VeeField name="email" as="input" type="email" placeholder="Введите email" />
      <VeeErrorMessage name="email" />
    </div>

    <div>
      <label for="password">Пароль</label>
      <VeeField name="password" as="input" type="password" placeholder="Введите пароль" />
      <VeeErrorMessage name="password" />
    </div>

    <button type="submit">Войти</button>
  </VeeForm>
</template>
