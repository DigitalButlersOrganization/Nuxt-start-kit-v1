<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({ error: Object });

  const errorData = computed(() => {
    const data = {
      title: '',
      description: '',
    };
    data.title =
      props.error && props.error.statusCode === 404
        ? t('ERROR.PAGE_NOT_FOUND.TITLE')
        : t('ERROR.INDEFINITE.TITLE');
    data.description =
      props.error && props.error.statusCode === 404
        ? t('ERROR.PAGE_NOT_FOUND.DESCRIPTION')
        : t('ERROR.INDEFINITE.DESCRIPTION');
    return data;
  });

  useHead({
    title: errorData.value.title,
    meta: [{ name: 'description', content: errorData.value.description }],
  });
</script>

<template>
  <NuxtLayout name="error">
    <SharedSection>
      <SharedContainer>
        <h1>{{ errorData.title }}</h1>
        <p>{{ errorData.description }}</p>
      </SharedContainer>
    </SharedSection>
  </NuxtLayout>
</template>
