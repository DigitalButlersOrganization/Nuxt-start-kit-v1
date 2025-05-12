<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import {
    BUTTON_TYPES,
    INPUT_TYPES,
    BUTTON_SIZES,
    BUTTON_TAGS,
    ROUTES,
    TEXT_SIZES,
  } from '~/enums';
  import { useI18n } from 'vue-i18n';
  import { decodeAtSign } from '@/utils';
  import { loginSchema } from '~/schemas';
  const localePath = useLocalePath();

  const { t } = useI18n();

  useHead({
    title: t('PAGE.LOGIN.TITLE'),
    meta: [
      { name: 'description', content: t('PAGE.LOGIN.DESCRIPTION') },
      { property: 'og:title', content: t('PAGE.LOGIN.TITLE') },
      { property: 'og:description', content: t('PAGE.LOGIN.DESCRIPTION') },
    ],
  });

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
      <div class="layout">
        <SharedText :text="t('PAGE.LOGIN.TITLE')" :size="TEXT_SIZES.LARGE" />

        <form @submit="onSubmit" class="form">
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
          <SharedButton :type="BUTTON_TYPES.SUBMIT" :size="BUTTON_SIZES.MEDIUM">
            {{ t('AUTHORIZATION.LOGIN.CTA') }}
          </SharedButton>
          <SharedButton
            :tag="BUTTON_TAGS.A"
            :to="localePath(ROUTES.FORGOT_PASSWORD)"
            :size="BUTTON_SIZES.MEDIUM"
          >
            {{ t('PAGE.FORGOT_PASSWORD.TITLE') }}
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
