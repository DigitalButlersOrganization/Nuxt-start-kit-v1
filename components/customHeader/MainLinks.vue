<script setup lang="ts">
  import { ROUTES } from '~/enums';
  import { TEXT_SIZES } from '~/enums';

  const { locale, locales, t } = useI18n();

  const currentDir = computed(() => {
    return (
      locales?.value?.find((l: { code: string; dir: string }) => l.code === locale.value)?.dir ||
      'ltr'
    );
  });

  useHead({
    htmlAttrs: {
      dir: currentDir,
    },
  });
</script>
<template>
  <NuxtLink :to="ROUTES.HOME">
    <SharedText :text="t('PAGE.HOME.TITLE')" :size="TEXT_SIZES.XX_LARGE" />
  </NuxtLink>
  <NuxtLink :to="ROUTES.BLOG">
    <SharedText :text="t('PAGE.BLOG.TITLE')" :size="TEXT_SIZES.XX_LARGE" />
  </NuxtLink>
</template>
