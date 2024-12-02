<script setup lang="ts">
interface Props {
  content: [];
}
const props = withDefaults(defineProps<Props>(), {
  // content: any,
});

const defaultTemplate = '<div></div>';
console.log(props.content);
props.content.forEach((element: any) => {
  console.log(element);
});
</script>

<template>
  <div v-html="defaultTemplate"></div>
</template>
