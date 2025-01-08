<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
  tag?: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
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
