<template>
  <header class="header">
    <div class="container">
      <div class="header__markup">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contacts">Contacts</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/ui-guide">UI-Guide</NuxtLink>
      </div>
    </div>
  </header>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/functions' as *;

.header {
  width: 100%;
  padding-top: linearClump(2, 1);
  padding-bottom: linearClump(2, 1);
  .header__markup {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
