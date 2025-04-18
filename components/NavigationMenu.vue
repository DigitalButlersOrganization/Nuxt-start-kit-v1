<script setup lang="ts">
  const { locale, locales, t } = useI18n();
  const switchLocalePath = useSwitchLocalePath();

  const currentLocale = computed(() => {
    return locales.value.find(i => i.code === locale.value);
  });
  const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value);
  });
</script>

<template>
  <NavigationMenuRoot class="navigation-menu" dir="inherit">
    <NavigationMenuList class="navigation-menu__list">
      <NavigationMenuItem class="navigation-menu__item">
        <NavigationMenuTrigger class="navigation-menu__trigger">
          <div class="navigation-menu__trigger-text">
            {{ currentLocale.name }}
          </div>
          <div class="navigation-menu__trigger-arrow">⬇️</div>
        </NavigationMenuTrigger>
        <NavigationMenuContent class="navigation-menu__content">
          <NuxtLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </NuxtLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem class="navigation-menu__item">
        <NavigationMenuTrigger class="navigation-menu__trigger">
          <SvgoUserPublicAvatar class="svg svg--small" />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="navigation-menu__content">
          <div class="navigation-menu__content-detail">
            <Text :text="t('AUTHORIZATION.INFO.PUBLIC_GREETING')" size="lg" />
          </div>
          <div class="navigation-menu__content-detail">
            <Text :text="t('AUTHORIZATION.INFO.PUBLIC_DESCRIPTION')" size="lg" />
          </div>
          <div class="navigation-menu__content-detail-box">
            <div class="navigation-menu__content-detail">
              <Dialog
                :title="t('AUTHORIZATION.LOGIN.TITLE')"
                :description="t('AUTHORIZATION.LOGIN.DESCRIPTION')"
              >
                <template #trigger>
                  <Text :text="t('AUTHORIZATION.LOGIN.TITLE')" size="lg" />
                </template>
                <template #default>
                  <AuthorizationFormLogin />
                </template>
              </Dialog>
            </div>
            <div class="navigation-menu__content-detail">
              <Dialog
                :title="t('AUTHORIZATION.REGISTER.TITLE')"
                :description="t('AUTHORIZATION.REGISTER.DESCRIPTION')"
              >
                <template #trigger>
                  <Text :text="t('AUTHORIZATION.REGISTER.TITLE')" size="lg" />
                </template>
                <template #default>
                  <AuthorizationFormRegistration />
                </template>
              </Dialog>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport class="navigation-menu__viewport" />
  </NavigationMenuRoot>
</template>

<style lang="scss">
  .navigation-menu {
    position: relative;
    &__list {
      display: flex;
      list-style: none;
    }
    &__trigger {
      padding: 0.25rem 1rem;
      min-height: 2.5rem;
      display: flex;
      gap: 0.5rem;
      &-arrow {
        transition:
          transform,
          150ms ease;
      }
      &[aria-expanded='true'] {
        .navigation-menu__trigger-arrow {
          transform: rotate(-180deg);
        }
      }
    }
    &__content {
      position: absolute;
      top: 0;
      left: 0;
      animation-duration: 250ms;
      animation-timing-function: ease;
      background: #fff;
      width: 100%;
      border: 1px solid #000;
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &-detail-box {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      &-detail {
        width: 100%;
      }
    }
    &__viewport {
      position: relative;
      width: 100%;
      height: 100%;
      transition:
        width,
        height,
        250ms ease;
    }
  }
</style>
