<script setup lang="ts">
  import { TEXT_SIZES } from '~/enums';

  const { locale, locales } = useI18n();
  const route = useRoute();

  const currentLocale = computed(() => {
    return locales.value.find(i => i.code === locale.value);
  });
  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value);
  });

  const getLocalePath = (code: string): string | undefined => {
    const mainLanguageCode = 'en';
    const mainLanguagePath = '/';
    const currentPath = route.path;

    // For main page
    if (
      currentPath === mainLanguagePath ||
      locales.value.some(lang => currentPath === `/${lang.code}`)
    ) {
      return code === mainLanguageCode ? mainLanguagePath : `/${code}`;
    }

    // For other pages
    if (locales.value.some(lang => currentPath.startsWith(`/${lang.code}/`))) {
      const directory = code === 'en' ? '/' : `/${code}/`;
      const path = currentPath.replace(`/${locale.value}/`, `${directory}`);
      return path;
    } else {
      const directory = code === 'en' ? '/' : `/${code}/`;
      const path = currentPath.replace(`/`, `${directory}`);
      return path;
    }
  };
</script>

<template>
  <div class="languages">
    <div class="languages__item languages__item--current">
      <SharedText :text="currentLocale.code" :size="TEXT_SIZES.XX_LARGE" />
    </div>
    <div class="languages__divider" />

    <div class="languages__item">
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="getLocalePath(locale.code)"
      >
        <SharedText :text="locale.code" :size="TEXT_SIZES.XX_LARGE" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .languages {
    display: flex;
    gap: 0.5rem;

    &__item {
      text-transform: uppercase;
      position: relative;

      &--current {
        opacity: 0.5;
      }
    }

    &__divider {
      width: 1px;
      height: auto;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
</style>
