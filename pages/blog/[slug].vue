<script setup lang="ts">
  import { useRoute } from '#app';
  import { useI18n } from 'vue-i18n';
  import { HTTP_STATUS_CODES } from '~/enums';

  const route = useRoute();
  const slug = route.params.slug;
  const { locale, t } = useI18n();

  interface Article {
    id: number;
    articleName: string;
    locale: string;
    mainContent: string;
    shortDescription: string;
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

  if (!data || data.length === 0) {
    throw createError({
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      statusMessage: t('ERROR.PAGE_NOT_FOUND.TITLE'),
    });
  }
  useHead({
    title: data[0].articleName,
    meta: [
      { name: 'description', content: data[0].shortDescription },
      { property: 'og:title', content: data[0].articleName },
      { property: 'og:description', content: data[0].shortDescription },
    ],
  });
</script>

<template>
  <SharedSection>
    <SharedContainer>
      <div class="example" v-for="item in data" :key="item.id">
        <h1>{{ item.articleName }}</h1>
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
              <h2>Main content</h2>
            </div>
            <div class="example__item-main">
              <RichText :content="item.mainContent" />
            </div>
          </div>
        </div>
      </div>
    </SharedContainer>
  </SharedSection>
</template>

<style scoped lang="scss">
  .example {
    width: 100%;
    &__list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
