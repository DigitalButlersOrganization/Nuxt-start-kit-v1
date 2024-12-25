<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
  value?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  name: string;
  tag?: 'input' | 'textarea';
  labelText?: string;
  isLabelHidden?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'input',
  type: 'text',
  isLabelHidden: false,
});
</script>

<template>
  <div class="custom-input">
    <label v-if="!props.isLabelHidden"
      >{{ props.labelText || props.name }}
      <VeeField :name="props.name" :as="props.tag" :type="props.type" :placeholder="props.placeholder" :class="[props.tag === 'textarea' ? 'textarea' : 'input']" />
    </label>
    <VeeErrorMessage :name="props.name" class="error-message" />
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  margin-bottom: 1rem;

  .textarea,
  .input {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
    width: 100%;
    font-size: 1rem;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}
</style>
