<script setup lang="ts">
const { locale, locales, t } = useI18n();
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="">
      <CustomButton tag="a" :to="$localePath('authorization')">
        {{ t('CTA.LOGIN') }}
      </CustomButton>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="" />
      <DialogContent class="">
        <DialogTitle class=""> {{ t('PAGE.AUTHORIZATION.TITLE') }} </DialogTitle>
        <DialogDescription class=""> Make changes to your profile here. Click save when you're done. </DialogDescription>
        <LoginForm />
        <DialogClose class="" aria-label="Close">
          <SvgoUserPublicAvatar class="svg svg--small" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss"></style>
