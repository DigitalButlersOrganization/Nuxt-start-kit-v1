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
        '2547bed232cc74f64c020fe2ca1b309df8645a3e94d12a315184a12c441affec16c52cfb96dd0ecb61ef9d66246c3586b96e49866b5d0214f9493f4685274dc75692f26302a384ed29723abc0b52fdfcb9be9131609eddd294b8d4c8c4ecd77c8969a68c0b8f83b3dbe94f12a0bb20815542bf2c77cd975c572e45564a3a0502' as string,
    } as AuthOptions,
  },
});
