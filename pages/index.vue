<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

useHead({
  title: t('PAGE.HOME.TITLE'),
  meta: [
    { name: 'description', content: t('PAGE.HOME.DESCRIPTION') },
    { property: 'og:title', content: t('PAGE.HOME.TITLE') },
    { property: 'og:description', content: t('PAGE.HOME.DESCRIPTION') },
  ],
});
</script>

<template>
  <Section>
    <Container>
      <h1>{{ t('PAGE.HOME.TITLE') }}</h1>
    </Container>
  </Section>
</template>

<style scoped lang="scss"></style>
