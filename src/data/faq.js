/**
 * Preguntas frecuentes. Alimentan la página /preguntas-frecuentes y el
 * JSON-LD de tipo FAQPage, que es lo que puede hacer que Google muestre
 * las preguntas desplegables directamente en el resultado de búsqueda.
 *
 * El contenido vive en faq.json para poder editarlo desde /admin.
 * Las respuestas deben ser verdaderas y verificables: Google puede
 * penalizar los datos estructurados que no coinciden con la página.
 */
import datos from './faq.json';

export const faq = datos.faq;

export default faq;
