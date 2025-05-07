export default defineEventHandler(() => {
  return `
  Allow: /
  Disallow: /admin/
  Disallow: /api/
  Disallow: /_nuxt/
  Sitemap: ${process.env.STRAPI_BASE_URL}/sitemap.xml
  `;
});
