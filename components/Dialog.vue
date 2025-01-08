<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <DialogRoot class="dialog">
    <DialogTrigger class="dialog__trigger">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal class="dialog__portal">
      <DialogOverlay class="dialog__overlay" />
      <DialogContent class="dialog__content">
        <DialogTitle class="dialog__title">
          <Text :text="props.title" tag="span" size="lg" />
        </DialogTitle>
        <DialogDescription class="dialog__description">
          <Text :text="props.description" tag="span" size="md" />
        </DialogDescription>
        <slot name="default" />
        <DialogClose class="dialog__close" aria-label="Close">
          <SvgoSquareRoundedX class="svg svg--small" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss" scoped>
.dialog {
  &__trigger {
    display: inline-block;
    cursor: pointer;
    padding: 0.25rem 0.5rem;

    &-button {
      background: red !important;
    }
  }

  &__portal {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    position: fixed;
    top: 0;
    left: 0;
    translate: -50% 0;
    width: 100%;
    max-width: 500px;
    margin: 0;
    margin-left: 50%;
    margin-top: 25vh;
    height: 50%;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-out;
    overflow: auto;

    &.dialog__content--centered {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;

    .svg {
      transition: var(--transition--default);

      &:hover {
        fill: #888;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    scale: 0.9;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>
