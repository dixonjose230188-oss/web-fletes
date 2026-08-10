/**
 * Generadores de datos estructurados (schema.org).
 *
 * Esto es lo que le dice a Google qué tipo de negocio sos, dónde
 * atendés, en qué horario y con qué teléfono. Es la base para aparecer
 * en el paquete local del mapa y para que el Google Business Profile
 * tenga una fuente coherente en el sitio.
 */
import { negocio } from '../data/negocio.js';

const SITIO = negocio.sitio;

export function negocioLocal({ comunas = [] } = {}) {
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${SITIO}/#negocio`,
    name: negocio.nombre,
    url: SITIO,
    telephone: negocio.telefonoE164,
    image: `${SITIO}/og-fletes-matcris.jpg`,
    logo: `${SITIO}/logo-fletes-matcris.png`,
    priceRange: '$$',
    currenciesAccepted: 'CLP',
    address: {
      '@type': 'PostalAddress',
      addressLocality: negocio.ciudad,
      addressRegion: negocio.region,
      addressCountry: negocio.paisCodigo,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: negocio.geo.lat,
      longitude: negocio.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: negocio.horario.abre,
        closes: negocio.horario.cierra,
      },
    ],
    sameAs: [negocio.instagram],
    areaServed:
      comunas.length > 0
        ? comunas.map((c) => ({
            '@type': 'City',
            name: c.nombre,
            containedInPlace: { '@type': 'State', name: negocio.region },
          }))
        : [{ '@type': 'State', name: negocio.region }],
  };

  // La dirección exacta solo se declara si existe. Declarar una falsa
  // es peor que no declararla: Google puede suspender la ficha.
  if (negocio.pendientes.direccion) {
    datos.address.streetAddress = negocio.pendientes.direccion;
  }

  return datos;
}

export function servicioSchema(servicio) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: servicio.titulo,
    description: servicio.resumen,
    serviceType: servicio.tituloCorto,
    provider: { '@id': `${SITIO}/#negocio` },
    areaServed: { '@type': 'State', name: negocio.region },
    url: `${SITIO}/servicios/${servicio.slug}`,
  };
}

export function faqSchema(preguntas) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

export function migasSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.texto,
      item: `${SITIO}${item.href}`,
    })),
  };
}

export function sitioWebSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITIO}/#sitio`,
    url: SITIO,
    name: negocio.nombre,
    inLanguage: 'es-CL',
    publisher: { '@id': `${SITIO}/#negocio` },
  };
}
