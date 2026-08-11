/**
 * IDs de medición. Todos vacíos por defecto: si están vacíos, el script
 * correspondiente NO se inyecta y el sitio no carga nada de terceros.
 *
 * Recomendado: cargar SOLO el contenedor de GTM acá y administrar desde
 * dentro de GTM el GA4, Google Ads, Meta Pixel y Bing UET. Así agregás o
 * sacás herramientas sin volver a tocar el código ni redesplegar.
 */
export const analitica = {
  // Contenedor "fletesmatcris.cl" de la cuenta "Fletes Matcris" en GTM.
  // (El nombre de la cuenta en GTM quedó con la grafía anterior; no
  // afecta a la medición, pero conviene renombrarla cuando se pueda.)
  gtmId: 'GTM-M6HSMWP7',

  // Alternativa si preferís GA4 directo, sin GTM. Ej: 'G-XXXXXXXXXX'
  ga4Id: '',

  // Verificación de propiedad del sitio (meta tags).
  // Search Console permite verificar por DNS o por archivo; si usás
  // el método de etiqueta HTML, el valor va acá.
  googleSiteVerification: '',
  bingSiteVerification: '',
};

export const hayAnalitica = () =>
  Boolean(analitica.gtmId || analitica.ga4Id);

export default analitica;
