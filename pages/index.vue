<script setup lang="ts">
const { data } = (await useStrapi().find('blogs', {
  populate: '*',
})) as { data: Article[] };
console.log(data);

interface Article {
  id: number;
  articleName: string;
  locale: string;
  mainContent: string;
}
</script>
<template>
  <section class="section">
    <div class="container">
      <h1>Добро пожаловать на домашнюю страницу</h1>
      <AppAlert> Это автоматически импортированный компонент. </AppAlert>

      <div class="example" v-for="item in data" :key="item.id">
        <div class="example__list">
          <div class="example__item">
            <div class="example__item-header">
              <h2>Имя статьи</h2>
            </div>
            <div class="example__item-main">
              {{ item.articleName }}
            </div>
          </div>

          <div class="example__item">
            <div class="example__item-header">
              <h2>Locale</h2>
            </div>
            <div class="example__item-main">
              {{ item.locale }}
            </div>
          </div>
          <div class="example__item">
            <div class="example__item-header">
              <h2>Main content</h2>
            </div>
            <div class="example__item-main">
              {{ item.mainContent }}
            </div>
          </div>
          <div class="example__item">
            <div class="example__item-header">
              <h2>Main content 2</h2>
            </div>
            <div class="example__item-main">
              <!-- <RichTextComponent :content="item.mainContent" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.example {
  width: 100%;
  &__example-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
