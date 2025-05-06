<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { z } from 'zod';
  import { toFormValidator } from '@vee-validate/zod';
  import { BUTTON_TYPES, INPUT_TYPES, BUTTON_SIZES } from '~/enums';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  // Схема валидации
  const loginSchema = toFormValidator(
    z
      .object({
        email: z.string().min(1, 'Required').email('Invalid email'),
        password: z.string().min(1, 'Required').min(6, 'Min 6 chars'),
        confirmPassword: z.string(),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
  );

  const { handleSubmit, errors } = useForm({
    validationSchema: loginSchema,
  });

  const onSubmit = handleSubmit(values => {
    console.log('Submitted:', values);
  });
</script>

<template>
  <SharedSection>
    <SharedContainer>
      <form @submit="onSubmit">
        <Field name="email" v-slot="{ field }">
          <SharedInput
            v-bind="field"
            name="email"
            :type="INPUT_TYPES.EMAIL"
            :labelText="`${t('FORM.EMAIL.LABEL')}`"
            :placeholder="`${decodeContent(t('FORM.EMAIL.PLACEHOLDER'))}`"
            :error="errors.email"
          />
        </Field>
        <Field name="password" v-slot="{ field }">
          <SharedInput
            v-bind="field"
            name="email"
            :type="INPUT_TYPES.PASSWORD"
            :labelText="`${t('FORM.PASSWORD.LABEL')}`"
            :placeholder="`${t('FORM.PASSWORD.PLACEHOLDER')}`"
            :error="errors.password"
          />
        </Field>

        <Field name="confirmPassword" v-slot="{ field }">
          <SharedInput
            v-bind="field"
            name="email"
            :type="INPUT_TYPES.PASSWORD"
            :labelText="`${t('FORM.CONFIRM_PASSWORD.LABEL')}`"
            :placeholder="`${t('FORM.CONFIRM_PASSWORD.PLACEHOLDER')}`"
            :error="errors.confirmPassword"
          />
        </Field>

        <SharedButton :type="BUTTON_TYPES.SUBMIT" :size="BUTTON_SIZES.MEDIUM">
          {{ t('AUTHORIZATION.LOGIN.CTA') }}
        </SharedButton>
      </form>
    </SharedContainer>
  </SharedSection>
</template>
