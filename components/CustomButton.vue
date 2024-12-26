<script setup lang="ts">
const MAIN_CLASS = 'button';

interface Props {
  tag?: 'button' | 'a' | 'div';
  size?: 'medium' | 'small' | 'large';
  style?: 'solid' | 'outline' | 'string';
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  style: 'solid',
  size: 'medium',
  isDisabled: false,
  isFullWidth: false,
  isLoading: false,
});
</script>

<template>
  <component
    :is="props.tag === 'a' ? 'NuxtLink' : props.tag"
    :class="[
      MAIN_CLASS,
      props.isDisabled ? `${MAIN_CLASS}--disabled` : null,
      props.isFullWidth ? `${MAIN_CLASS}--full-width` : null,
      `button--${props.style}`,
      `button--${props.size}`,
      props.isLoading ? `${MAIN_CLASS}--loading` : null,
    ]"
    :to="props.tag === 'a' ? props.to : null"
    :disabled="props.isDisabled && props.tag === 'button'"
    :type="props.tag !== 'button' ? null : props.type || props.tag"
    :tabindex="props.tag === 'button' ? null : props.isDisabled ? -1 : 0"
  >
    <div v-if="$slots['prepend']" :class="`${MAIN_CLASS}__prepend`">
      <slot name="prepend" />
    </div>
    <div v-if="$slots.default" :class="`${MAIN_CLASS}__content`">
      <slot />
    </div>
    <div v-if="$slots['append']" :class="`${MAIN_CLASS}__append`">
      <slot name="append" />
    </div>
    <div :class="[`${MAIN_CLASS}__loader`, props.isLoading ? `${MAIN_CLASS}__loader--visible` : null]">
      <ProgressCircular :is-loader="props.isLoading" :class="`${MAIN_CLASS}__loader-progress`" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;

  &__prepend,
  &__append,
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__loader {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    pointer-events: none;
    transition: var(--transition--default);
    background: inherit;
    opacity: 0;

    &--visible {
      opacity: 1;
    }
  }

  &__loader-progress {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  &--full-width {
    width: 100%;
  }
  &[disabled],
  &--loading,
  &--disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  &--solid {
    background-color: #000;
    color: #fff;
  }
  &--outline {
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  }
  &--string {
    background-color: transparent;
    color: #000;
    padding: 0;
  }
  &--medium {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }
  &--small {
    padding: 0.25rem 0.5rem;
    gap: 0.5rem;
  }
  &--large {
    padding: 1rem 2rem;
    gap: 1.5rem;
  }
}
</style>
