<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useSchema } from '@/schemas/formSchema';
  import { ValidationError } from 'yup';
  import { handleValidationErrors, decodeContent } from '@/utils';

  const { t } = useI18n();

  useHead({
    title: t('PAGE.LOGIN.TITLE'),
    meta: [
      { name: 'description', content: t('PAGE.LOGIN.DESCRIPTION') },
      { property: 'og:title', content: t('PAGE.LOGIN.TITLE') },
      { property: 'og:description', content: t('PAGE.LOGIN.DESCRIPTION') },
    ],
  });

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
  <SharedSection>
    <SharedContainer>
      <VeeForm :validation-schema="schema" @submit="validateForm" class="form">
        <SharedInput
          name="email"
          type="email"
          :labelText="`${t('FORM.EMAIL.LABEL')}`"
          :placeholder="`${decodeContent(t('FORM.EMAIL.PLACEHOLDER'))}`"
        />
        <SharedInput
          name="password"
          type="password"
          :labelText="t('FORM.PASSWORD.LABEL')"
          :placeholder="t('FORM.PASSWORD.PLACEHOLDER')"
        />
        <SharedButton type="submit" :isLoading="false"> {{ t('CTA.LOGIN') }} </SharedButton>

        <Dialog
          :title="t('AUTHORIZATION.REGISTER.TITLE')"
          :description="t('AUTHORIZATION.REGISTER.DESCRIPTION')"
        >
          <template #trigger>
            {{ t('AUTHORIZATION.REGISTER.TITLE') }}
          </template>
          <template #default>
            <AuthorizationFormRegistration />
          </template>
        </Dialog>
        <Dialog
          :title="t('AUTHORIZATION.FORGOT_PASSWORD.TITLE')"
          :description="t('AUTHORIZATION.FORGOT_PASSWORD.DESCRIPTION')"
        >
          <template #trigger>
            {{ t('AUTHORIZATION.FORGOT_PASSWORD.TITLE') }}
          </template>
          <template #default>
            <AuthorizationFormForgotPassword />
          </template>
        </Dialog>
      </VeeForm>
    </SharedContainer>
  </SharedSection>
</template>

<style lang="scss" scoped></style>
