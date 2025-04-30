<script setup lang="ts">
  interface Props {
    theme?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    theme: 'light',
  });
</script>

<template>
  <section class="section" :class="`section--${props.theme}`">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/functions' as *;

  .section {
    width: 100%;
    padding-top: linearClump(2, 1);
    padding-bottom: linearClump(2, 1);

    &--light {
      background-color: var(--color-light);
    }
    &--dark {
      background-color: var(--color-dark);
    }
  }
</style>
