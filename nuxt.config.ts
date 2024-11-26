import type { AuthOptions } from '@nuxtjs/strapi';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxt/eslint'],
  css: ['@/assets/styles/main.scss'],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    },
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337', // Default options
    prefix: '/api', // Default options
    admin: '/admin', // Default options
    version: 'v5', // Default options
    cookie: {}, // Default options
    cookieName: 'strapi_jwt', // Default options
    auth: {
      token:
        'e4673193ee2365f48eb1ffc172621196e0125aec132670d7f039762f0b85d630 427ad468c50db93ca57f3d21547f985b1c8abb91393e24999d40fc7ff78bc9c2 2d55c3a1e3adca5c77b9b788ed87321238399a51d8b8725d66f784e5305b10f7 4d1ca48290a8b4c17f1a913771aacf56a44058bf80a9b89a5865146ceb464e4d' as string,
    } as AuthOptions,
  },
});
