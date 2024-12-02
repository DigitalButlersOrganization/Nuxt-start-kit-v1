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
        'cf5ec607d8251c9720e39f9f31563085e4fa9f082b3723b7704fe2e5d7d5d74196abe100425b034b10e26f6826623f36aea30b17a2c4ddbc9bf007a822d8d5ca1ec2e8f81bff6ff34bcce94c316d7cdaab25973f71e529a498669dbd78b3d5a7795814c36d3897e9595e6aa2fab6b03b10366c3d946863d0e08db706cf4e961e' as string,
    } as AuthOptions,
  },
});
