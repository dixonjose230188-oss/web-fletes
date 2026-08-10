/**
 * Datos únicos del negocio (NAP: Name, Address, Phone).
 *
 * Los valores viven en negocio.json para que se puedan editar desde el
 * panel del CMS (/admin) sin tocar código. Este archivo solo agrega los
 * helpers derivados.
 *
 * IMPORTANTE: estos valores deben coincidir EXACTAMENTE con los del
 * Google Business Profile, Instagram y la rotulación del camión.
 * Google cruza estas fuentes y penaliza las inconsistencias en el mapa.
 */
import datos from './negocio.json';

export const negocio = datos;

export const whatsappUrl = (mensaje = '') =>
  `https://wa.me/${negocio.whatsapp}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;

export default negocio;
