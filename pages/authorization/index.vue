<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

useHead({
  title: t('PAGE.AUTHORIZATION.TITLE'),
  meta: [
    { name: 'description', content: t('PAGE.AUTHORIZATION.DESCRIPTION') },
    { property: 'og:title', content: t('PAGE.AUTHORIZATION.TITLE') },
    { property: 'og:description', content: t('PAGE.AUTHORIZATION.DESCRIPTION') },
  ],
});
</script>

<template>
  <Section>
    <Container>
      <h1>{{ t('PAGE.AUTHORIZATION.TITLE') }}</h1>
    </Container>
  </Section>
</template>

<style scoped lang="scss"></style>
