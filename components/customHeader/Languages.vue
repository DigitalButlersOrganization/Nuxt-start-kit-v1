<script setup lang="ts">
  import { TEXT_SIZES } from '~/enums';

  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const currentLocale = computed(() => {
    return locales.value.find(i => i.code === locale.value);
  });
  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value);
  });
</script>

<template>
  <ul class="languages">
    <li class="languages__item languages__item--current">
      <SharedText :text="currentLocale.code" :size="TEXT_SIZES.XX_LARGE" />
    </li>
    <li class="languages__item">
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <SharedText :text="locale.code" :size="TEXT_SIZES.XX_LARGE" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .languages {
    display: flex;
    list-style: none;
    gap: 1rem;

    &__item {
      text-transform: uppercase;

      &--current {
        opacity: 0.5;
      }
    }
  }
</style>
