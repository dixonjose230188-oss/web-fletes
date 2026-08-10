// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El `site` es obligatorio: de él salen las URLs absolutas del sitemap,
// los canonical y las etiquetas Open Graph que lee el bot de Meta.
export default defineConfig({
  site: 'https://fletesmatcris.cl',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      // El panel del CMS no debe entrar al sitemap.
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  build: {
    // Genera /servicios/mudanzas.html en vez de /servicios/mudanzas/index.html,
    // que es lo que espera Netlify con trailingSlash: 'never'.
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    // Las fotos vienen comprimidas de WhatsApp; no tiene sentido
    // generar anchos mayores al original.
    responsiveStyles: true,
  },
});
