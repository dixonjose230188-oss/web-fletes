/**
 * Verifica que el snippet de medición que se sirve sea JavaScript
 * REAL y ejecutable, no texto inerte.
 *
 * Existe por un error concreto: el snippet de GTM estaba escrito como
 * {`...`} dentro del <script>. En un archivo .astro el contenido de un
 * <script> es texto crudo, así que las llaves y las comillas invertidas
 * salían literales y el bloque no se ejecutaba nunca. El HTML se veía
 * correcto (el ID aparecía) pero GTM jamás cargaba.
 *
 * Uso: node scripts/verificar-analitica.mjs
 */
import { readFile } from 'node:fs/promises';
import { analitica } from '../src/data/analitica.js';

const ARCHIVO = 'dist/index.html';
const html = await readFile(ARCHIVO, 'utf8');

const fallos = [];
const ok = (cond, texto) => {
  console.log(`${cond ? '✓' : '✗'} ${texto}`);
  if (!cond) fallos.push(texto);
};

if (!analitica.gtmId && !analitica.ga4Id) {
  console.log('Sin IDs configurados: el sitio no debe cargar nada de terceros.\n');
  ok(!html.includes('googletagmanager'), 'no hay scripts de terceros');
} else if (analitica.gtmId) {
  console.log(`Verificando contenedor ${analitica.gtmId}\n`);

  const bloque = html.match(/<script>([\s\S]*?gtm\.start[\s\S]*?)<\/script>/);
  ok(Boolean(bloque), 'el snippet de GTM está en el HTML');

  if (bloque) {
    const js = bloque[1];

    ok(!js.includes('{`'), 'sin llaves de plantilla literales');
    ok(!js.includes('`'), 'sin comillas invertidas sueltas');
    ok(js.includes(analitica.gtmId), 'el ID del contenedor está inyectado');
    ok(js.includes("'&l='"), 'el parámetro &l= no quedó escapado como &amp;');

    // La prueba de fondo: ¿es JavaScript ejecutable?
    try {
      new Function(js);
      ok(true, 'el JavaScript compila sin errores de sintaxis');
    } catch (e) {
      ok(false, `el JavaScript compila (${e.message})`);
    }

    // Un bloque inerte es sintácticamente válido pero no hace nada.
    // Si de verdad se ejecuta, tiene que intentar crear un <script>.
    ok(
      js.includes('createElement') && js.includes('insertBefore'),
      'el snippet realmente inserta el script de GTM'
    );
  }

  ok(
    html.includes(`googletagmanager.com/ns.html?id=${analitica.gtmId}`),
    'el iframe de respaldo (noscript) está presente'
  );
}

ok(html.includes('registrarEvento'), 'la capa de eventos propia está presente');

console.log(
  fallos.length === 0
    ? '\nMedición correctamente instalada.'
    : `\n${fallos.length} problema(s) encontrado(s).`
);

process.exit(fallos.length === 0 ? 0 : 1);
