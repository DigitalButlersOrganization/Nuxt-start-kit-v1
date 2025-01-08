import withNuxt from './.nuxt/eslint.config.mjs';
import { writeFile } from 'fs/promises';
import { defineFlatConfig } from 'eslint-define-config';

const config = await withNuxt();
await writeFile('./generated-eslint-config.json', JSON.stringify(config, null, 2));

const nuxtConfig = await withNuxt();

export default defineFlatConfig([
  ...nuxtConfig,
  {
    globals: {
      definePageMeta: 'readonly',
    },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
