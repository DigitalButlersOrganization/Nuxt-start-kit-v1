<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="trigger">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="overlay" />
      <DialogContent class="content">
        <DialogTitle class="title">
          <Text :text="props.title" tag="span" size="lg" />
        </DialogTitle>
        <DialogDescription class="description">
          <Text :text="props.description" tag="span" size="md" />
        </DialogDescription>
        <slot name="default" />
        <DialogClose class="close-button" aria-label="Close">
          <SvgoSquareRoundedX class="svg svg--small" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss" scoped>
.trigger {
  display: inline-block;
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &-button {
    background: red !important;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
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
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.close-button {
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
