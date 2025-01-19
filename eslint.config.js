import vuePlugin from 'eslint-plugin-vue';
import parserVue from 'vue-eslint-parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    ignores: ['node_modules', 'dist', '.nuxt/**'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...vuePlugin.configs['flat/recommended'].rules,
      'vue/multi-word-component-names': 'off',
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
];
