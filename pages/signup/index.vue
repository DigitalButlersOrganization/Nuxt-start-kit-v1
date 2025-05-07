<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { BUTTON_TYPES, INPUT_TYPES, BUTTON_SIZES, TEXT_SIZES } from '~/enums';
  import { useI18n } from 'vue-i18n';
  import { decodeAtSign } from '@/utils';
  import { signupSchema } from '~/schemas';

  const { t } = useI18n();

  useHead({
    title: t('PAGE.SIGN_UP.TITLE'),
    meta: [
      { name: 'description', content: t('PAGE.SIGN_UP.DESCRIPTION') },
      { property: 'og:title', content: t('PAGE.SIGN_UP.TITLE') },
      { property: 'og:description', content: t('PAGE.SIGN_UP.DESCRIPTION') },
    ],
  });

  const { handleSubmit, errors } = useForm({
    validationSchema: signupSchema,
  });

  const onSubmit = handleSubmit(values => {
    console.log('Submitted:', values);
  });
</script>

<template>
  <SharedSection>
    <SharedContainer>
      <div class="layout">
        <SharedText :text="t('PAGE.SIGN_UP.TITLE')" :size="TEXT_SIZES.LARGE" />
        <form @submit="onSubmit" class="form">
          <Field name="firstName" v-slot="{ field }">
            <SharedInput
              v-bind="field"
              name="firstName"
              :type="INPUT_TYPES.TEXT"
              :labelText="`${t('FORM.FIRST_NAME.LABEL')}`"
              :placeholder="`${decodeAtSign(t('FORM.FIRST_NAME.PLACEHOLDER'))}`"
              :error="errors.firstName"
            />
          </Field>
          <Field name="lastName" v-slot="{ field }">
            <SharedInput
              v-bind="field"
              name="lastName"
              :type="INPUT_TYPES.TEXT"
              :labelText="`${t('FORM.LAST_NAME.LABEL')}`"
              :placeholder="`${decodeAtSign(t('FORM.LAST_NAME.PLACEHOLDER'))}`"
              :error="errors.lastName"
            />
          </Field>
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
            {{ t('AUTHORIZATION.SIGN_UP.CTA') }}
          </SharedButton>
        </form>
      </div>
    </SharedContainer>
  </SharedSection>
</template>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
