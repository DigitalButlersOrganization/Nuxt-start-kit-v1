<script setup lang="ts">
  const { locale, locales, t } = useI18n();

  const currentDir = computed(() => {
    return (
      locales?.value?.find(
        (l: { code: string; dir: string }) => l.code === locale.value
      )?.dir || 'ltr'
    );
  });

  useHead({
    htmlAttrs: {
      dir: currentDir,
    },
  });
</script>

<template>
  <header class="header">
    <Container>
      <div class="header__markup">
        <div class="header__markup-column">
          <NuxtLink :to="useLocalePath('index')">{{
            t('PAGE.HOME.TITLE')
          }}</NuxtLink>
          <NuxtLink :to="useLocalePath('blog')">{{
            t('PAGE.BLOG.TITLE')
          }}</NuxtLink>
        </div>
        <div class="header__markup-column">
          <NavigationMenu />
        </div>
      </div>
    </Container>
  </header>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/functions' as *;

  .header {
    width: 100%;
    padding-top: linearClump(2, 1);
    padding-bottom: linearClump(2, 1);
    &__markup {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 2rem;
      &-column {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }
</style>
