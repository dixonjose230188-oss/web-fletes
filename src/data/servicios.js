/**
 * Servicios. Cada uno genera su propia página en /servicios/<slug>,
 * con su propio título, meta descripción y contenido — que es lo que
 * permite competir por búsquedas distintas en Google.
 *
 * El contenido vive en servicios.json para poder editarlo desde /admin
 * sin tocar código. El `slug` NO debería cambiarse una vez publicado:
 * es la URL, y cambiarla rompe los enlaces y lo ya indexado.
 */
import datos from './servicios.json';

export const servicios = datos.servicios;

export const buscarServicio = (slug) => servicios.find((s) => s.slug === slug);

export default servicios;
