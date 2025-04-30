<script setup lang="ts">
  import { CONTAINER_SIZES } from '~/enums';

  interface Props {
    size?: CONTAINER_SIZES;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: CONTAINER_SIZES.MEDIUM,
  });
</script>

<template>
  <div class="container" :class="`container--${props.size}`">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/functions' as *;

  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: linearClump(2, 1);
    padding-right: linearClump(2, 1);

    &--medium {
      max-width: pxToRem(1400);
    }
    &--small {
      max-width: pxToRem(1280);
    }
  }
</style>
