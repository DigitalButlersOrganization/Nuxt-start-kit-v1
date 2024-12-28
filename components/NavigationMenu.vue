<script setup lang="ts">
const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const currentLocale = computed(() => {
  return locales.value.find((i) => i.code === locale.value);
});
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <NavigationMenuRoot class="NavigationMenuRoot">
    <NavigationMenuList class="NavigationMenuList navigation__list">
      <NavigationMenuItem class="NavigationMenuItem">
        <NavigationMenuTrigger class="NavigationMenuTrigger"> {{ currentLocale.name }} ⬇️ </NavigationMenuTrigger>
        <NavigationMenuContent class="NavigationMenuContent">
          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.name }}
          </NuxtLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem class="NavigationMenuItem">
        <NavigationMenuTrigger class="NavigationMenuTrigger">
          <SvgoUserPublicAvatar class="svg svg--small" />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="NavigationMenuContent">
          <div class="NavigationMenuContentItem">Вы зашли как гость</div>
          <div class="NavigationMenuContentItem">
            <AuthorizationDialog />
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport class="NavigationMenuViewport" />
  </NavigationMenuRoot>
</template>

<style lang="scss">
.NavigationMenuRoot {
  position: relative;
}
.NavigationMenuList {
  display: flex;
  list-style: none;
}
.NavigationMenuTrigger {
  padding: 0.25rem 0.5rem;
  min-height: 2.5rem;
}
.NavigationMenuViewport {
  position: relative;
  width: 100%;
  height: 100%;
  transition: width, height, 250ms ease;
}
.NavigationMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  animation-duration: 250ms;
  animation-timing-function: ease;
  background: #fff;
  width: 100%;
  border: 1px solid #000;
  padding: 0.5rem;
}
.NavigationMenuContent[data-motion='from-start'] {
  animation-name: enterFromLeft;
}
.NavigationMenuContent[data-motion='from-end'] {
  animation-name: enterFromRight;
}
.NavigationMenuContent[data-motion='to-start'] {
  animation-name: exitToLeft;
}
.NavigationMenuContent[data-motion='to-end'] {
  animation-name: exitToRight;
}

@keyframes enterFromRight {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enterFromLeft {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes exitToRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@keyframes exitToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-200px);
  }
}
</style>
