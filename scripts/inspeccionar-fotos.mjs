/**
 * Lista dimensiones y peso de las fotos de origen antes de procesarlas.
 * Uso: node scripts/inspeccionar-fotos.mjs "<carpeta>"
 */
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Falta la carpeta. Uso: node scripts/inspeccionar-fotos.mjs "<carpeta>"');
  process.exit(1);
}

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const f of files.sort()) {
  const m = await sharp(path.join(dir, f)).metadata();
  const ratio = (m.width / m.height).toFixed(2);
  console.log(
    `${f.padEnd(48)} ${String(m.width).padStart(5)}x${String(m.height).padEnd(5)} ` +
      `ratio:${ratio.padEnd(5)} ${(m.size / 1024).toFixed(0).padStart(5)}KB`
  );
}
