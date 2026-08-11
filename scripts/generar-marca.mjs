/**
 * Genera los archivos de marca que van en /public:
 *  - favicon.svg            ícono vectorial de la pestaña
 *  - apple-touch-icon.png   ícono al agregar a la pantalla de inicio
 *  - logo-fletes-matcris.png  logo cuadrado para el JSON-LD y GBP
 *  - og-fletes-matcris.jpg  1200x630 para Facebook, Instagram y WhatsApp
 *
 * Uso: node scripts/generar-marca.mjs
 */
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const AZUL = '#1550c4';
const AZUL_OSCURO = '#0c2a5c';

await mkdir('public', { recursive: true });

// --- Ícono del camión, mismo trazo que el componente Marca.astro ---------
const camionSvg = (color) => `
  <g stroke="${color}" stroke-width="2.4" fill="none"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 9h7M0 16h6M3 23h6" opacity="0.55"/>
    <rect x="13" y="5" width="17" height="16" rx="2.2"/>
    <path d="M30 11h5.4a2 2 0 0 1 1.7 1l3.1 5a2 2 0 0 1 .3 1.05V19a2 2 0 0 1-2 2H30V11Z"/>
    <circle cx="19" cy="25" r="3.4"/>
    <circle cx="34" cy="25" r="3.4"/>
  </g>`;

// --- favicon.svg ---------------------------------------------------------
// Fondo azul sólido + camión blanco: se distingue bien a 16px en la pestaña.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="10" fill="${AZUL}"/>
  <g transform="translate(3.5, 8.5) scale(0.93)">${camionSvg('#ffffff')}</g>
</svg>`;

await writeFile('public/favicon.svg', favicon, 'utf8');
console.log('favicon.svg');

// --- apple-touch-icon.png y logo cuadrado --------------------------------
const iconoGrande = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="10" fill="${AZUL}"/>
  <g transform="translate(3.5, 8.5) scale(0.93)">${camionSvg('#ffffff')}</g>
</svg>`;

await sharp(Buffer.from(iconoGrande)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('apple-touch-icon.png');

await sharp(Buffer.from(iconoGrande)).resize(512, 512).png().toFile('public/logo-fletes-matcris.png');
console.log('logo-fletes-matcris.png');

// --- Imagen para redes (Open Graph), 1200x630 ----------------------------
// Base: la foto de mudanza real, oscurecida a la izquierda para que el
// texto se lea. Es la imagen que aparece al compartir el link en un
// anuncio de Meta o en un mensaje de WhatsApp.
const ANCHO = 1200;
const ALTO = 630;

const capaTexto = `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <defs>
    <linearGradient id="velo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${AZUL_OSCURO}" stop-opacity="0.96"/>
      <stop offset="52%"  stop-color="${AZUL_OSCURO}" stop-opacity="0.80"/>
      <stop offset="100%" stop-color="${AZUL_OSCURO}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#velo)"/>

  <g transform="translate(72, 104) scale(1.5)">${camionSvg('#ffffff')}</g>

  <text x="72" y="258" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="54" font-weight="700" fill="#e4edfd" letter-spacing="-1">
    Fletes Transporte
  </text>
  <text x="72" y="330" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="74" font-weight="800" fill="#ffffff" letter-spacing="-2">
    MatCris
  </text>
  <text x="72" y="392" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="600" fill="#bcd0f5">
    Mudanzas y carga en Santiago
  </text>
  <text x="72" y="436" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="400" fill="#9dbaf0">
    Camión propio · Región Metropolitana
  </text>

  <rect x="72" y="466" width="330" height="66" rx="33" fill="#25d366"/>
  <text x="237" y="509" text-anchor="middle"
        font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="28" font-weight="700" fill="#04301a">
    Cotiza por WhatsApp
  </text>
</svg>`;

await sharp('src/assets/fotos/mudanza-casa-santiago.jpg')
  .resize(ANCHO, ALTO, { fit: 'cover', position: 'right' })
  .composite([{ input: Buffer.from(capaTexto), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-fletes-matcris.jpg');
console.log('og-fletes-matcris.jpg (1200x630)');

console.log('\nListo.');
