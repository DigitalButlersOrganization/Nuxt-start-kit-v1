<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const { data } = (await useStrapi().find('blogs', {
  populate: '*',
  locale: locale.value,
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
  <Section>
    <Container>
      <h1>Home page</h1>
      <div class="example" v-for="item in data" :key="item.id">
        <div class="example__list">
          <div class="example__item">
            <div class="example__item-header">
              <h2>Article Name</h2>
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
              <RichText :content="item.mainContent" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>
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
