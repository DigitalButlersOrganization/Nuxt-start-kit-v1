<script setup lang="ts">
import { ContentParser } from '@/composables/contentParser.js';

interface Props {
  content: any;
}
const props = withDefaults(defineProps<Props>(), {
  content: [],
});
const parsedData = new ContentParser({
  content: props.content,
  options: {
    showEmptyParagraphs: true,
    imagesSize: 'full',
  },
});
</script>

<template>
  <div class="rich-text" v-html="parsedData.init()"></div>
</template>

<style lang="scss" scoped>
.rich-text {
  width: 100%;
}
</style>
