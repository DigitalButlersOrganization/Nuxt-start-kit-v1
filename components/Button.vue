<script setup lang="ts">
interface Props {
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
  <button>AAA</button>
</template>

<style lang="scss" scoped>
.button {
}
</style>
