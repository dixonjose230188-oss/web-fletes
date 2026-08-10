/**
 * Prepara las fotos de origen (WhatsApp) para el sitio.
 *
 * Criterio: las fotos ya vienen comprimidas por WhatsApp, así que se
 * re-encodean lo mínimo posible. Las que no necesitan recorte se copian
 * tal cual; solo se re-encodea la que hay que recortar.
 *
 * El redimensionado y la conversión a WebP/AVIF los hace Astro en el build.
 *
 * Uso: node scripts/preparar-fotos.mjs
 */
import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ORIGEN = 'C:/Users/MATIAS/Desktop/fotos-nueva-campaña/Fotos reales camion';
const DESTINO = 'src/assets/fotos';

/**
 * `recorte` usa coordenadas absolutas sobre el original y mantiene 16:9.
 * Solo se aplica donde hace falta.
 */
const FOTOS = [
  {
    origen: 'WhatsApp Image 2026-08-10 at 18.09.24 (1).jpeg',
    destino: 'mudanza-casa-santiago.jpg',
    nota: 'Mudanza real: colchones, mueble y refrigerador. Luz de tarde. 1280x720.',
  },
  {
    origen: 'WhatsApp Image 2026-08-10 at 18.09.24.jpeg',
    destino: 'transporte-equipos-climatizacion.jpg',
    nota: 'Carga de equipos de aire acondicionado en bodega. Cielo despejado.',
  },
  {
    origen: 'WhatsApp Image 2026-08-10 at 18.09.25 (1).jpeg',
    destino: 'transporte-materiales-construccion.jpg',
    nota: 'Rollos de aislación térmica. Carga alta y bien amarrada.',
  },
  {
    origen: 'WhatsApp Image 2026-08-10 at 18.09.26 (3).jpeg',
    destino: 'mudanza-colchones-cajas.jpg',
    nota: 'Colchones protegidos y cajas. Fondo neutro.',
  },
  {
    origen: 'WhatsApp Image 2026-08-10 at 18.09.27 (1).jpeg',
    destino: 'camion-rotulado-cliente-empresa.jpg',
    // Un dedo sobre el lente dejó una mancha rosada abajo a la izquierda,
    // que llega hasta x≈425 / y≈645. Recortar por el lado se comería el
    // rótulo "FLETES Y MUDANZAS", así que se recorta por abajo: queda una
    // franja 2.5:1 que conserva el rótulo, la puerta y el camión del cliente.
    recorte: { left: 0, top: 0, width: 1599, height: 600 },
    nota: 'Camión rotulado junto a cliente empresarial. Formato franja ancha.',
  },
];

await mkdir(DESTINO, { recursive: true });

for (const foto of FOTOS) {
  const entrada = path.join(ORIGEN, foto.origen);
  const salida = path.join(DESTINO, foto.destino);

  if (foto.recorte) {
    await sharp(entrada)
      .extract(foto.recorte)
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(salida);
    const { width, height } = await sharp(salida).metadata();
    console.log(`recortada  ${foto.destino.padEnd(42)} ${width}x${height}`);
  } else {
    await copyFile(entrada, salida);
    const { width, height } = await sharp(salida).metadata();
    console.log(`copiada    ${foto.destino.padEnd(42)} ${width}x${height}`);
  }
}

console.log(`\n${FOTOS.length} fotos listas en ${DESTINO}`);
