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
  error?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'input',
  type: 'text',
  size: 'medium',
  isIcon: false,
  isLabelHidden: false,
  name: '',
  error: '',
});
</script>

<template>
  <label>
    <VeeField :name="props.name" :as="props.tag" :type="props.type" :placeholder="props.placeholder" :id="props.id" :class="[props.tag === 'textarea' ? 'textarea' : 'input']" />
  </label>
  <VeeErrorMessage :name="props.error" />
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
