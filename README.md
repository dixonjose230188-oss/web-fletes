# Fletes Matcris — sitio web

Sitio de [fletesmatcris.cl](https://fletesmatcris.cl), construido con
[Astro](https://astro.build). Genera **HTML estático**: cada página se sirve ya
escrita, sin necesidad de ejecutar JavaScript.

Eso importa por dos motivos concretos:

1. **Google y Bing leen el contenido completo.** El sitio anterior era una SPA
   de React y el HTML que recibían los buscadores venía prácticamente vacío.
2. **El bot de Facebook, Instagram y WhatsApp lee las etiquetas Open Graph.**
   Ese bot no ejecuta JavaScript, así que antes al compartir el link en un
   anuncio no aparecía ni imagen ni descripción.

---

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor local en http://localhost:4321
npm run build      # compilar a dist/
npm run verificar  # compilar + revisar SEO y enlaces rotos
```

Utilidades:

```bash
npm run fotos   # reprocesa las fotos de origen hacia src/assets/fotos
npm run marca   # regenera favicon, íconos y la imagen para redes sociales
```

---

## Estructura

```
src/
├── assets/fotos/     fotos del negocio (Astro genera WebP y los tamaños)
├── components/       piezas reutilizables (.astro)
├── data/             contenido editable
│   ├── negocio.json  ← contacto, horario, ubicación (editable desde /admin)
│   ├── servicios.json← servicios y sus textos  (editable desde /admin)
│   ├── faq.json      ← preguntas frecuentes    (editable desde /admin)
│   ├── comunas.js       comunas con página propia (estructural)
│   └── analitica.js  ← IDs de medición (GTM, GA4, verificaciones)
├── layouts/Base.astro   <head>, SEO, Open Graph, JSON-LD
├── lib/jsonld.js        datos estructurados schema.org
├── pages/               cada archivo es una URL
└── styles/global.css    sistema de diseño (colores, tipografía, breakpoints)
```

### Páginas que genera

| URL | Qué es |
|---|---|
| `/` | Home |
| `/servicios` y `/servicios/<slug>` | 1 índice + 4 páginas de servicio |
| `/cobertura` y `/fletes-en/<comuna>` | 1 índice + 12 landings por comuna |
| `/cotizar`, `/contacto` | Conversión |
| `/preguntas-frecuentes`, `/privacidad`, `/404` | Apoyo |

Total: 24 páginas.

---

## Panel de administración

En `/admin`, con [Decap CMS](https://decapcms.org) sobre Netlify Identity.
Permite editar datos de contacto, servicios y preguntas frecuentes sin tocar
código. Los cambios se guardan como commits en el repositorio.

⚠️ **No cambies el campo `slug` de un servicio ya publicado.** Es la URL: si la
cambiás, se rompen los enlaces y Google pierde lo que ya tenía indexado.

---

## ⚠️ Pendientes antes de invertir en Google Ads

### 1. Definir un solo nombre comercial

Hoy conviven cuatro identidades distintas:

| Dónde | Dice |
|---|---|
| Sitio web y dominio | Fletes Matcris |
| Puerta del camión | M&M |
| Baranda del camión | FLETES Y MUDANZAS |
| Instagram | @fletesmatcris |

Google cruza nombre, dirección y teléfono entre el sitio, el Business Profile y
las redes. Cuando no coinciden, posiciona peor en el mapa. **Hay que unificarlo
antes de crear el Google Business Profile.**

### 2. Completar datos faltantes

En `src/data/negocio.json`, campo `pendientes`:

- `direccion` — requerida para verificar el Google Business Profile.
- `rut` — si se va a emitir factura.

### 3. Confirmar supuestos del contenido

Estos textos se escribieron a partir de la web anterior y de las fotos. **Hay
que confirmarlos o corregirlos** — si prometen algo que no se cumple, además de
perder clientes, Google puede penalizar los datos estructurados:

| Dónde | Supuesto |
|---|---|
| `faq.json` | Que se emite boleta y factura |
| `faq.json` / `negocio.json` | Horario de lunes a domingo, 8:00 a 21:00 |
| Home y servicios | Capacidad del camión: 1,5 toneladas |
| `faq.json` | Cobertura habitual = toda la Región Metropolitana |

### 4. Conectar la medición

En `src/data/analitica.js`. **Mientras estén vacíos, el sitio no carga nada de
terceros** (ni cookies, ni scripts).

Recomendado: poner solo el `gtmId` y administrar GA4, Google Ads, Meta Pixel y
Bing UET desde dentro de Google Tag Manager. Así se agregan o quitan
herramientas sin volver a tocar código.

**Eventos que el sitio ya empuja al `dataLayer`** (solo hay que crear el
disparador en GTM):

| Evento | Cuándo |
|---|---|
| `clic_whatsapp` | Clic en cualquier botón de WhatsApp |
| `clic_telefono` | Clic en cualquier enlace `tel:` |
| `cotizacion_enviada` | Envío del formulario de cotización |

Todos incluyen el campo `origen` (`hero`, `cabecera`, `barra-movil`,
`cta-final`, `comuna-<slug>`, etc.), así se puede ver qué parte del sitio
convierte mejor.

### 5. Dar de alta el sitio

- **Google Search Console** → agregar la propiedad y enviar
  `https://fletesmatcris.cl/sitemap-index.xml`
- **Bing Webmaster Tools** → se puede importar directo desde Search Console
- **Google Business Profile** → requiere el nombre unificado (punto 1) y la
  dirección (punto 2)

Si se verifica por etiqueta HTML, los valores van en `analitica.js`
(`googleSiteVerification` y `bingSiteVerification`).

---

## Decisiones de diseño que conviene conocer

- **Sin React.** El formulario y el mapa son JavaScript nativo. En un sitio
  donde se paga por clic, menos peso significa menor costo por clic.
- **Leaflet se carga solo si el visitante abre el mapa** (~45 KB que el 90% no
  descarga nunca).
- **Inter está auto-hospedada**, no se pide a Google Fonts: una petición
  externa menos y mejor privacidad.
- **La marca del header es SVG + texto real**, no el PNG. El logo original es
  un cuadrado de 1024px con el nombre quemado adentro: a 40px de alto resultaba
  ilegible. El PNG se sigue usando para favicon y redes.
- **El hero no ocupa el ancho completo.** La mejor foto disponible es de
  1280×720; a ancho completo en escritorio se vería pixelada. En una columna de
  540px se ve nítida.
- **Solo 12 comunas, con contenido propio.** Google penaliza las *doorway
  pages*: decenas de páginas iguales donde solo cambia el nombre de la comuna.
  Conviene sumar comunas de a poco, con texto real, según dónde haya demanda.

## Fotos

Las fotos de origen viven fuera del repositorio. `scripts/preparar-fotos.mjs`
tiene la lista de cuáles se usan, con qué nombre y qué recorte se les aplica.

Las actuales vienen comprimidas de WhatsApp (130–210 KB). **Si aparecen los
originales sin comprimir, reemplazarlas es un salto de calidad importante**,
sobre todo en el hero.
