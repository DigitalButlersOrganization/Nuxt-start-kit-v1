<script setup lang="ts">
interface Props {
  name: string;
  size?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'full',
  name: '',
});
</script>

<template>
  <div class="svg-wrapper" :class="`svg-wrapper--${props.size}`">
    <component :is="'Svgo' + props.name" filled="false" class="svg" />
  </div>
</template>

<style lang="scss" scoped>
.svg-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  &--full {
    width: 100%;
    height: 100%;
  }
  &--medium {
    width: 3rem;
    height: 3rem;
  }

  .svg {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
</style>
