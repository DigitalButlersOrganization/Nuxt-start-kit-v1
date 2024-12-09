<script setup lang="ts">
import { ContentParser } from '@/composables/contentParser.js';

interface Props {
  content: any;
}
const props = withDefaults(defineProps<Props>(), {
  content: [],
});
const parsedData = new ContentParser(props.content);

console.log(props.content);
</script>

<template>
  <div class="rich-text" v-html="parsedData.init()"></div>
</template>

<style lang="scss" scoped>
.rich-text {
  width: 100%;

  *,
  * > * {
    max-width: 100%;
  }
}
</style>
