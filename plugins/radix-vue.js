import { defineNuxtPlugin } from '#app';
import * as RadixVue from 'radix-vue';

export default defineNuxtPlugin(nuxtApp => {
  for (const [key, component] of Object.entries(RadixVue)) {
    nuxtApp.vueApp.component(key, component);
  }
});
