<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({ error: Object });
console.log(props.error);

const errorData = computed(() => {
  const data = {
    title: '',
    description: '',
  };
  data.title = props.error && props.error.statusCode === 404 ? t('error.page_not_found.title') : t('error.indefinite.title');
  data.description = props.error && props.error.statusCode === 404 ? t('error.page_not_found.description') : t('error.indefinite.description');
  return data;
});

useHead({
  title: errorData.value.title,
  meta: [{ name: 'description', content: errorData.value.description }],
});
</script>

<template>
  <NuxtLayout name="default">
    <section class="section">
      <div class="container">
        <h1>{{ errorData.title }}</h1>
        <p>{{ errorData.description }}</p>
      </div>
    </section>
  </NuxtLayout>
</template>
