<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

useHead({
  title: t('page.blog'),
  meta: [
    { name: 'description', content: 'Description of the blog page' },
    { property: 'og:title', content: t('page.blog') },
    { property: 'og:description', content: 'Description of the blog page' },
  ],
});
interface Article {
  id: number;
  articleName: string;
  locale: string;
  mainContent: string;
  shortDescription: string;
  singleImage: any;
}
const { data } = (await useStrapi().find('blogs', {
  // fields: ['id'],
  fields: ['id', 'articleName', 'locale', 'shortDescription', 'slug'],
  populate: {
    singleImage: true,
  },
  locale: locale.value,
})) as { data: Article[] };
console.log(data);

if (!data || data.length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found',
  });
}
</script>

<template>
  <Section class="section">
    <Container>
      <h1>{{ t('page.blog') }}</h1>
      <div class="example" v-for="item in data" :key="item.id">
        <div class="example__list">
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
              <h2>articleName</h2>
            </div>
            <div class="example__item-main">
              {{ item.articleName }}
            </div>
          </div>
          <div class="example__item">
            <div class="example__item-header">
              <h2>shortDescription</h2>
            </div>
            <div class="example__item-main">
              {{ item.shortDescription }}
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>
</template>
