<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <header class="header">
    <Container>
      <div class="header__markup">
        <div class="header__markup-column">
          <NuxtLink to="/">{{ $t('page.home') }}</NuxtLink>
          <NuxtLink to="/blog">{{ $t('page.blog') }}</NuxtLink>
          <NuxtLink to="/ui-guide">{{ $t('page.ui-guide') }}</NuxtLink>
        </div>
        <div class="header__markup-column">
          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.name }}
          </NuxtLink>
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
      gap: 1rem;
    }
  }
}
</style>
