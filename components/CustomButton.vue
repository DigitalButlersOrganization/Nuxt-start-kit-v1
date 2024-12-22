<script setup lang="ts">
interface Props {
  tag?: 'button' | 'a' | 'div';
  size?: 'small' | 'medium' | 'large';
  to?: string;
  type?: 'solid' | 'outline' | 'text';
  isIcon?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'solid',
  size: 'medium',
  to: '',
  isIcon: false,
});
</script>

<template>
  <template v-if="props.tag === 'button'">
    <button class="button">
      <slot />
    </button>
  </template>
  <template v-else-if="props.tag === 'a'">
    <NuxtLink :to="props.to" class="button">
      <slot />
    </NuxtLink>
  </template>
</template>

<style lang="scss" scoped>
.button {
}
</style>
