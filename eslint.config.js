import vuePlugin from 'eslint-plugin-vue';
import parserVue from 'vue-eslint-parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

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
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...vuePlugin.configs['flat/recommended'].rules,
      ...typescriptPlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/html-self-closing': ['error', { html: { void: 'always' } }],
    },
  },
];
