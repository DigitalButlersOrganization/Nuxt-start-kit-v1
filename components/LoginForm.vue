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

const validateForm = async () => {
  const schema = createSchema(t);
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
  <form @submit.prevent="validateForm">
    <div>
      <label for="email">Email:</label>
      <input v-model="form.email" id="email" type="email" />
      <span v-if="errors.email">{{ errors.email }}</span>
    </div>

    <div>
      <label for="password">Password:</label>
      <input v-model="form.password" id="password" type="password" />
      <span v-if="errors.password">{{ errors.password }}</span>
    </div>

    <div>
      <label for="confirmPassword">Password confirmation:</label>
      <input v-model="form.confirmPassword" id="confirmPassword" type="password" />
      <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
