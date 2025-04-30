<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useSchema } from '@/schemas/formSchema';
  import { ValidationError } from 'yup';
  import { handleValidationErrors, decodeContent } from '@/utils';

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

  const schema = useSchema(t);

  const validateForm = async () => {
    errors.value = {};

    try {
      await schema.validate(form, { abortEarly: false });
      console.log('Form is valid:', form);
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
  <VeeForm :validation-schema="schema" @submit="validateForm" class="form">
    <SharedInput
      name="email"
      type="email"
      :labelText="`${t('FORM.EMAIL.LABEL')}`"
      :placeholder="`${decodeContent(t('FORM.EMAIL.PLACEHOLDER'))}`"
    />
    <SharedButton type="submit" :isLoading="false"> {{ t('CTA.RESET_PASSWORD') }}</SharedButton>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
