<script setup lang="ts">
  const { locale, locales } = useI18n();

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
  <CustomHeader />
  <main>
    <slot />
  </main>
</template>
