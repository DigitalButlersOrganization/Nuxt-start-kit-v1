<script setup lang="ts">
  import { BUTTON_SIZES, BUTTON_TAGS, ROUTES, TEXT_SIZES } from '~/enums';

  const { t } = useI18n();
</script>

<template>
  <div class="dropdown">
    <div class="dropdown__layout">
      <div class="dropdown__header">
        <SharedText :text="t('AUTHORIZATION.INFO.PUBLIC_GREETING')" :size="TEXT_SIZES.LARGE" />
      </div>
      <div class="dropdown__main">
        <SharedText :text="t('AUTHORIZATION.INFO.PUBLIC_DESCRIPTION')" :size="TEXT_SIZES.SMALL" />
      </div>
      <div class="dropdown__footer">
        <SharedButton
          :tag="BUTTON_TAGS.A"
          :to="ROUTES.LOGIN"
          :size="BUTTON_SIZES.MEDIUM"
          class="button"
        >
          {{ t('PAGE.LOGIN.TITLE') }}
        </SharedButton>
        <SharedButton
          :tag="BUTTON_TAGS.A"
          :to="ROUTES.SIGNUP"
          :size="BUTTON_SIZES.MEDIUM"
          class="button"
        >
          {{ t('PAGE.SIGN_UP.TITLE') }}
        </SharedButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dropdown {
    width: 300px;
    padding: 0.5rem;

    &__layout {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;

      .button {
        flex-grow: 1;
      }
    }
  }
</style>
