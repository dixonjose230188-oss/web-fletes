/**
 * Verifica que el HTML compilado contenga de verdad el contenido y las
 * etiquetas SEO — sin ejecutar JavaScript, igual que lo ve un crawler.
 *
 * Esto es exactamente lo que fallaba en el sitio anterior: era una SPA
 * de React y el HTML servido venía vacío.
 *
 * Uso: node scripts/verificar-html.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';

async function paginasHtml(dir) {
  const salida = [];
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const completo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === 'admin' || entrada.name === '_astro') continue;
      salida.push(...(await paginasHtml(completo)));
    } else if (entrada.name.endsWith('.html')) {
      salida.push(completo);
    }
  }
  return salida;
}

const comprobaciones = [
  { nombre: 'title', re: /<title>[^<]{10,}<\/title>/ },
  { nombre: 'description', re: /<meta name="description" content="[^"]{50,}"/ },
  { nombre: 'canonical', re: /<link rel="canonical"/ },
  { nombre: 'og:title', re: /property="og:title"/ },
  { nombre: 'og:image', re: /property="og:image"/ },
  { nombre: 'h1', re: /<h1[\s>]/ },
  { nombre: 'json-ld', re: /application\/ld\+json/ },
];

const archivos = (await paginasHtml(DIST)).sort();
let fallos = 0;

console.log(`Revisando ${archivos.length} páginas\n`);

for (const archivo of archivos) {
  const html = await readFile(archivo, 'utf8');
  const ruta = archivo.replace(/\\/g, '/').replace(`${DIST}`, '');

  // Texto visible aproximado, sin scripts ni estilos ni etiquetas.
  const texto = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // El 404 es noindex a propósito: no necesita datos estructurados ni
  // volumen de contenido.
  const es404 = ruta === '/404.html';
  const aplicables = es404
    ? comprobaciones.filter((c) => c.nombre !== 'json-ld')
    : comprobaciones;

  const faltantes = aplicables.filter((c) => !c.re.test(html)).map((c) => c.nombre);
  const palabras = texto.split(' ').length;

  const ok = faltantes.length === 0 && (es404 || palabras > 120);
  if (!ok) fallos++;

  console.log(
    `${ok ? '✓' : '✗'} ${ruta.padEnd(42)} ${String(palabras).padStart(5)} palabras` +
      (faltantes.length ? `  FALTA: ${faltantes.join(', ')}` : '')
  );
}

console.log(
  fallos === 0
    ? '\nTodas las páginas tienen contenido y SEO en el HTML estático.'
    : `\n${fallos} página(s) con problemas.`
);

process.exit(fallos === 0 ? 0 : 1);
