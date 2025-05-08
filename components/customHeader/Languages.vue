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
  <div class="languages">
    <div class="languages__item languages__item--current">
      <SharedText :text="currentLocale.code" :size="TEXT_SIZES.XX_LARGE" />
    </div>
    <div class="languages__divider" />

    <div class="languages__item">
      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
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
