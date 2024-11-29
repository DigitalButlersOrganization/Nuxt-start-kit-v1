<script setup lang="ts">
const { data } = await useStrapi().find('blogs', {
  populate: '*',
});
console.log(data);
</script>
<template>
  <div>
    <h1>Добро пожаловать на домашнюю страницу</h1>
    <AppAlert> Это автоматически импортированный компонент. </AppAlert>
  </div>
</template>
