# Nuxt start kit v1

<br/>

## Internationalization

<br/>

- The project has the i18n module installed for Nuxt 3.

- Even if you only have one language at the initial stage, do not remove the module. Instead, develop the project with it in mind. This way, adding support for additional languages in the future will take only a few minutes.

- In nuxt.config.ts, configure the parameters for i18n based on the specific requirements of your project.

- In the "locales" folder, translation files are stored. Avoid nesting deeper than three levels. Strive to maintain a balance between creating a clear hierarchy of entities and preventing excessively deep nesting.

<br/>
<hr/>

## Stylization

<br/>

- Use only logical properties. Forget about margin-left and similar properties.
<br/>
<hr/>

## Strapi URL

<br/>

- Change ".env copy" file to ".env". Than set real address for your strapi project
<br/>
<hr/>

## Components

<br/>

- You can use both custom components and components from built-in libraries such as "radix-vue" and "nuxt-svgo". The project has automatic imports configured, so you don't need to import a component before using it.

- "radix-vue" lets to use unstyled, accessible components

- "nuxt-svgo" lets to use svg from assets as markup
<br/>
<hr/>

## Forms

<br/>

- Two libraries are used for form validation: "@vee-validate/nuxt" and "zod".
<br/>
<hr/>

## Code formatter

<br/>

- Add settings to .vscode/settings.json:

{
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true,
"source.fixAll.stylelint": true
},
"eslint.validate": ["javascript", "typescript", "vue"],
"stylelint.validate": ["vue", "css", "scss"],
"prettier.enable": true
}

<br/>
<hr/>
