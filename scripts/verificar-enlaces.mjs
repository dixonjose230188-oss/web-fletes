/**
 * Revisa que todos los enlaces internos del sitio compilado apunten a
 * una página o archivo que exista. Un enlace roto pierde al visitante
 * que ya pagaste con un anuncio.
 *
 * Uso: node scripts/verificar-enlaces.mjs
 */
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';

async function recorrer(dir) {
  const salida = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const completo = path.join(dir, e.name);
    if (e.isDirectory()) salida.push(...(await recorrer(completo)));
    else if (e.name.endsWith('.html')) salida.push(completo);
  }
  return salida;
}

const existe = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const archivos = await recorrer(DIST);
const rotos = [];
let total = 0;

for (const archivo of archivos) {
  const html = await readFile(archivo, 'utf8');
  const origen = archivo.replace(/\\/g, '/').replace(DIST, '') || '/';

  const hrefs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)].map((m) => m[1]);

  for (const href of new Set(hrefs)) {
    total++;
    // Con build.format: 'file', /servicios/mudanzas vive en servicios/mudanzas.html
    const candidatos =
      href === '/'
        ? ['index.html']
        : [
            href.slice(1), // archivo tal cual (imágenes, .xml, .txt)
            `${href.slice(1)}.html`, // página
            `${href.slice(1)}/index.html`, // por si acaso
          ];

    const encontrado = await Promise.all(
      candidatos.map((c) => existe(path.join(DIST, c)))
    );

    if (!encontrado.some(Boolean)) rotos.push({ origen, href });
  }
}

console.log(`Revisados ${total} enlaces internos en ${archivos.length} páginas\n`);

if (rotos.length === 0) {
  console.log('Ningún enlace interno roto.');
} else {
  for (const r of rotos) console.log(`✗ ${r.origen.padEnd(40)} -> ${r.href}`);
  console.log(`\n${rotos.length} enlace(s) roto(s).`);
}

process.exit(rotos.length === 0 ? 0 : 1);
