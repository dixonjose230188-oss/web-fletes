/**
 * Avisa a los buscadores que soportan IndexNow (Bing, Yandex, Naver,
 * Seznam) que las páginas del sitio cambiaron, en vez de esperar a que
 * pase el rastreador.
 *
 * Cómo funciona: se publica una clave en https://<dominio>/<clave>.txt
 * cuyo contenido es la propia clave. Eso demuestra que quien envía el
 * aviso controla el dominio.
 *
 * IMPORTANTE: este script NO se ejecuta solo en el build. Se corre a
 * mano después de desplegar cambios reales de contenido:
 *
 *     npm run indexnow
 *
 * Es a propósito. Avisar en cada build, aunque no haya cambiado nada,
 * es abusar del servicio y no aporta.
 *
 * Google NO usa IndexNow; para Google se usa Search Console.
 */
import { readFile } from 'node:fs/promises';

const CLAVE = '6a16e7360d68b7832ee0998595963dfe';
const HOST = 'fletesmatcris.cl';
const SITEMAP = 'dist/sitemap-0.xml';

let xml;
try {
  xml = await readFile(SITEMAP, 'utf8');
} catch {
  console.error(`No existe ${SITEMAP}. Corré "npm run build" primero.`);
  process.exit(1);
}

const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error('El sitemap no tiene URLs.');
  process.exit(1);
}

console.log(`Avisando ${urls.length} URLs de ${HOST}…\n`);

const respuesta = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: CLAVE,
    keyLocation: `https://${HOST}/${CLAVE}.txt`,
    urlList: urls,
  }),
});

// 200 = recibido y procesado. 202 = recibido, clave todavía sin validar.
if (respuesta.ok) {
  console.log(`HTTP ${respuesta.status} — aviso aceptado.`);
  if (respuesta.status === 202) {
    console.log('La clave aún no fue validada; se valida sola en breve.');
  }
} else {
  const cuerpo = await respuesta.text();
  console.error(`HTTP ${respuesta.status} — el aviso falló.`);
  console.error(cuerpo.slice(0, 400));
  console.error('\n403 suele significar que el archivo de la clave no es');
  console.error(`accesible en https://${HOST}/${CLAVE}.txt`);
  process.exit(1);
}
