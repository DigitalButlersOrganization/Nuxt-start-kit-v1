<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { BUTTON_TYPES, INPUT_TYPES, BUTTON_SIZES } from '~/enums';
  import { useI18n } from 'vue-i18n';
  import { decodeAtSign } from '@/utils';
  import { loginSchema } from '~/schemas';

  const { t } = useI18n();

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
            :placeholder="`${decodeAtSign(t('FORM.EMAIL.PLACEHOLDER'))}`"
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
