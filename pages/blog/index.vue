<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { locale, t } = useI18n();

  useHead({
    title: t('PAGE.BLOG.TITLE'),
    meta: [
      { name: 'description', content: t('PAGE.BLOG.DESCRIPTION') },
      { property: 'og:title', content: t('PAGE.BLOG.TITLE') },
      { property: 'og:description', content: t('PAGE.BLOG.DESCRIPTION') },
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
    sort: ['dateOfCreating:desc'],
    locale: locale.value,
  })) as { data: Article[] };
</script>

<template>
  <SharedSection class="section">
    <SharedContainer>
      <h1>{{ t('PAGE.BLOG.TITLE') }}</h1>
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
    </SharedContainer>
  </SharedSection>
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
