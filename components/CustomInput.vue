<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large';
  value?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  tag?: 'input' | 'textarea';
  labelText: string;
  isLabelHidden?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'input',
  type: 'text',
  size: 'medium',
  isIcon: false,
  isLabelHidden: false,
});
</script>

<template>
  <label class="label">
    <span class="label-text">Label</span>
    <component :is="props.tag" :type="props.type" :placeholder="props.placeholder" :id="props.id" :name="props.name" :value="props.value" :class="props.tag" />
  </label>
</template>

<style lang="scss" scoped>
.textarea,
.input {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
}
</style>
