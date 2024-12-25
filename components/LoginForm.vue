<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSchema } from '@/schemas/formSchema';
import { ValidationError } from 'yup';
import { handleValidationErrors } from '@/utils/validation';

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

const schema = useSchema(t);

const validateForm = async () => {
  errors.value = {};

  try {
    await schema.validate(form, { abortEarly: false });
    console.log('Форма прошла валидацию:', form);
  } catch (validationErrors: unknown) {
    if (validationErrors instanceof ValidationError) {
      errors.value = handleValidationErrors(validationErrors); // тут нужно добить логику. Не хочу выводить дефолтные ошибку
    } else {
      console.error('Unexpected error:', validationErrors);
    }
  }
};
</script>

<template>
  <VeeForm :validation-schema="schema" @submit="validateForm">
    <CustomInput name="email" type="email" labelText="Email" placeholder="Введите email" />
    <CustomInput name="password" type="password" labelText="Пароль" placeholder="Введите пароль" />
    <CustomInput name="confirmPassword" type="password" labelText="Повторите пароль" placeholder="Подтвердите пароль" />

    <button type="submit">Зарегистрироваться</button>
  </VeeForm>
</template>
