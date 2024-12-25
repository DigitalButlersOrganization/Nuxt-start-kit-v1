import '@nuxt/schema';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    veeValidate?: {
      autoImports?: boolean;
      componentNames?: {
        Form?: string;
        Field?: string;
        FieldArray?: string;
        ErrorMessage?: string;
      };
    };
  }
}
