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
      <LoginForm />
    </Container>
  </Section>
</template>

<style scoped lang="scss"></style>
