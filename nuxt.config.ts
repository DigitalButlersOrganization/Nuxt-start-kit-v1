import type { AuthOptions } from '@nuxtjs/strapi';
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/eslint', '@nuxtjs/i18n', 'nuxt-svgo'],
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
        'cf5ec607d8251c9720e39f9f31563085e4fa9f082b3723b7704fe2e5d7d5d74196abe100425b034b10e26f6826623f36aea30b17a2c4ddbc9bf007a822d8d5ca1ec2e8f81bff6ff34bcce94c316d7cdaab25973f71e529a498669dbd78b3d5a7795814c36d3897e9595e6aa2fab6b03b10366c3d946863d0e08db706cf4e961e' as string,
    } as AuthOptions,
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', dir: 'ltr', name: 'English' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', dir: 'rtl', name: 'Русский' },
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
});
