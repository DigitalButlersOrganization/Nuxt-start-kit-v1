<script setup lang="ts">
import { useRoute } from '#app';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const slug = route.params.slug;
const { locale } = useI18n();

interface Article {
  id: number;
  articleName: string;
  locale: string;
  mainContent: string;
}
const { data } = (await useStrapi().find('blogs', {
  filters: {
    slug: { $eq: slug },
  },
  populate: {
    singleImage: true,
    galleryImages: true,
  },
  locale: locale.value,
})) as { data: Article[] };
console.log(data);

if (!data || data.length === 0) {
  console.error('Article not found');
}
</script>

<template>
  <section class="section">
    <div class="container">
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
    </div>
  </section>
</template>
