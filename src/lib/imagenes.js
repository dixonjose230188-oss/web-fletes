/**
 * Resuelve nombres de archivo (guardados en los .js de datos) a los
 * objetos de imagen que necesita el componente <Image /> de Astro,
 * que es el que genera WebP/AVIF y los tamaños responsivos.
 */
const fotos = import.meta.glob('../assets/fotos/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});

export function foto(nombreArchivo) {
  const clave = `../assets/fotos/${nombreArchivo}`;
  const imagen = fotos[clave];

  if (!imagen) {
    throw new Error(
      `No existe la foto "${nombreArchivo}" en src/assets/fotos. ` +
        `Disponibles: ${Object.keys(fotos)
          .map((k) => k.split('/').pop())
          .join(', ')}`
    );
  }

  return imagen;
}
