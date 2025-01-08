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
    <label class="label">
      <Text :text="props.labelText || props.name" class="pseudo-label" :class="{ 'pseudo-label--visually-hidden': props.isLabelHidden }" size="lg" />
      <VeeField :name="props.name" :as="props.tag" :type="props.type || 'text'" :placeholder="props.placeholder" :class="props.tag || 'input'" :value="props.value" />
    </label>

    <VeeErrorMessage :name="props.name" class="error-message" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.custom-input {
  margin-bottom: 1rem;
}
.label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pseudo-label {
  &--visually-hidden {
    @include visually-hidden();
  }
}
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
</style>
