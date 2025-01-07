<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSchema } from '@/schemas/formSchema';
import { ValidationError } from 'yup';
import { handleValidationErrors } from '@/utils/validation';

const { t } = useI18n();

interface Props {
  variant?: 'login' | 'register' | 'forgotPassword';
}

const props = defineProps<Props>();

function decodeContent(content: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  return doc.documentElement.textContent || '';
}
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

const schema = useSchema(t);

const validateForm = async () => {
  errors.value = {};

  try {
    await schema.validate(form, { abortEarly: false });
    console.log('Форма прошла валидацию:', form);
  } catch (validationErrors: unknown) {
    if (validationErrors instanceof ValidationError) {
      errors.value = handleValidationErrors(validationErrors, t);
    } else {
      console.error('Unexpected error:', validationErrors);
    }
  }
};
</script>

<template>
  <VeeForm :validation-schema="schema" @submit="validateForm">
    <CustomInput name="email" type="email" :labelText="`${t('FORM.EMAIL.LABEL')}`" :placeholder="`${decodeContent(t('FORM.EMAIL.PLACEHOLDER'))}`" />
    <CustomInput name="password" type="password" :labelText="t('FORM.PASSWORD.LABEL')" :placeholder="t('FORM.PASSWORD.PLACEHOLDER')" />
    <CustomInput name="confirmPassword" type="password" :labelText="t('FORM.CONFIRM_PASSWORD.LABEL')" :placeholder="t('FORM.CONFIRM_PASSWORD.PLACEHOLDER')" />

    <CustomButton type="submit" :isLoading="false">
      {{ t('CTA.REGISTER') }}
    </CustomButton>

    <Dialog v-if="props.variant === 'register'" :title="t('AUTHORIZATION.REGISTER.TITLE')" :description="t('AUTHORIZATION.REGISTER.DESCRIPTION')">
      <template #trigger>
        {{ t('AUTHORIZATION.REGISTER.CTA') }}
      </template>
      <template #default>
        <LoginForm />
      </template>
    </Dialog>
  </VeeForm>
</template>
