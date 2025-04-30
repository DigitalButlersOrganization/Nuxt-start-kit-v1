<script setup lang="ts">
  import { withDefaults, defineProps } from 'vue';
  import { TEXT_SIZES, TEXT_TAGS } from '~/enums';

  interface Props {
    tag?: TEXT_TAGS;
    size?: TEXT_SIZES;
    text?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    tag: TEXT_TAGS.P,
    size: TEXT_SIZES.MEDIUM,
  });
</script>

<template>
  <component :is="props.tag" class="text" :class="props.size ? `text--${props.size}` : null">{{
    props.text
  }}</component>
</template>

<style lang="scss" scoped>
  .text {
    margin: 0;
    padding: 0;
    font-weight: inherit;

    &--xxs {
      font-size: 0.5rem;
    }
    &--xs {
      font-size: 0.75rem;
    }
    &--sm {
      font-size: 0.875rem;
    }
    &--md {
      font-size: 1rem;
    }
    &--lg {
      font-size: 1.125rem;
    }
    &--xl {
      font-size: 1.25rem;
    }
    &--xxl {
      font-size: 1.5rem;
    }
  }
</style>
