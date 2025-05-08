<script setup lang="ts">
  import { useRuntimeConfig } from '#app';

  interface Props {
    href?: string;
    title?: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
    dateOfCreating?: string;
    blogCategories?: {
      id: number;
      categoryName: string;
      backgroundColor: string;
      textColor: string;
    }[];
  }
  const props = withDefaults(defineProps<Props>(), {
    href: '',
  });

  const getFullImageUrl = () => {
    const baseUrl = useRuntimeConfig()?.public?.strapiBaseUrl;
    return `${baseUrl}${props.imageSrc}`;
  };
</script>

<template>
  <NuxtLink :to="props.href" class="card">
    <div class="card__image-wrapper">
      <img :src="getFullImageUrl()" :alt="props.imageAlt" />
    </div>
    <div class="card__content">
      <h2>{{ props.title }}</h2>
      <p>{{ props.description }}</p>
      <p>{{ props.dateOfCreating }}</p>
    </div>
    <div class="card__tags">
      <span
        v-for="category in props.blogCategories"
        :key="category.id"
        :style="`background-color:${category.backgroundColor}; color: ${category.textColor}`"
        >{{ category.categoryName }}</span
      >
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    padding: 1rem;

    &__tags {
      display: flex;
      gap: 0.5rem;
    }
  }
</style>
