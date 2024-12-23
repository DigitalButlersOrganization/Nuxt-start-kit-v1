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
  slug: string;
  articleName: string;
  locale: string;
  mainContent: string;
  shortDescription: string;
  singleImage: {
    url: string;
    alternativeText: string;
  };
  blogCategories: {
    id: number;
    categoryName: string;
    backgroundColor: string;
    textColor: string;
  }[];
  dateOfCreating: string;
}

const { data } = (await useStrapi().find('blogs', {
  fields: ['id', 'articleName', 'locale', 'shortDescription', 'slug', 'dateOfCreating'],
  populate: {
    singleImage: true,
    blogCategories: true,
  },
  sort: ['dateOfCreating:desc'], // Сортируем по убыванию даты
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
      <div class="grid">
        <TestBlogCard
          v-for="item in data"
          :key="item.id"
          :href="`/blog/${item.slug}`"
          :title="item.articleName"
          :description="item.shortDescription"
          :imageSrc="item.singleImage.url"
          :imageAlt="item.singleImage.alternativeText"
          :dateOfCreating="item.dateOfCreating"
          :blogCategories="item.blogCategories"
          class="grid__item"
        />
      </div>
    </Container>
  </Section>
</template>

<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  &__item {
    width: 100%;
  }
}
</style>
