import type { AuthOptions } from '@nuxtjs/strapi';
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxtjs/i18n', 'nuxt-svgo', '@vee-validate/nuxt'],
  css: ['@/assets/styles/main.scss'],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    },
  },
  runtimeConfig: {
    public: {
      strapiBaseUrl: process.env.STRAPI_BASE_URL,
    },
  },
  strapi: {
    url: process.env.STRAPI_BASE_URL,
    prefix: '/api',
    admin: '/admin',

    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
    auth: {
      token:
        '59a2e2b4fabb7fcb42d740f7030816f2fe15991dc59ca1d0785925e76a099c0b681d87646a1b0d7a7497d1a13c8e6427427cad74907244cde0e904822ed6241826ccc8bea7389ae563c04c80cbcdab742b5fd8169821017c72b428aae4a910a56858fa737b4a6c0b32eec66fd57bc295f394e40ad58e9e89ed91056690e308ea' as string,
    } as AuthOptions,
  },
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.json',
        dir: 'ltr',
        name: 'English',
      },
      {
        code: 'ru',
        language: 'ru-RU',
        file: 'ru.json',
        dir: 'rtl',
        name: 'Русский',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: resolve('locales/'),
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all',
      fallbackLocale: 'en',
      alwaysRedirect: false,
    },
  },
  svgo: {
    autoImportPath: './assets/images/icons',
    defaultImport: 'component',
  },
  veeValidate: {
    autoImports: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  },
});
