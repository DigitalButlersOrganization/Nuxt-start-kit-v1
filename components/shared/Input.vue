<script setup lang="ts">
  import { withDefaults, defineProps } from 'vue';
  import { INPUT_TAGS, INPUT_TYPES, TEXT_SIZES } from '~/enums';

  interface Props {
    modelValue?: string;
    value?: string;
    placeholder?: string;
    type?: INPUT_TYPES;
    id?: string;
    name: string;
    tag?: INPUT_TAGS;
    labelText?: string;
    isLabelHidden?: boolean;
    error?: string;
  }

  const emit = defineEmits(['update:modelValue']);

  const props = withDefaults(defineProps<Props>(), {
    tag: INPUT_TAGS.INPUT,
    type: INPUT_TYPES.TEXT,
    isLabelHidden: false,
  });
</script>

<template>
  <div class="custom-input">
    <label class="label">
      <SharedText
        :text="props.labelText || props.name"
        class="pseudo-label"
        :class="{ 'pseudo-label--visually-hidden': props.isLabelHidden }"
        :size="TEXT_SIZES.MEDIUM"
      />
      <component
        :value="props.modelValue || props.value || null"
        @input="emit('update:modelValue', $event.target.value)"
        :name="props.name"
        :is="props.tag"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        :class="props.tag || 'input'"
      />
    </label>

    <SharedText :text="error" class="error-message" />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/mixins' as *;

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
