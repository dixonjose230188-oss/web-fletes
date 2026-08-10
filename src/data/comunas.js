/**
 * Comunas con página propia en /fletes-en/<slug>.
 *
 * Nota sobre SEO: Google penaliza las "doorway pages" — decenas de páginas
 * idénticas donde solo cambia el nombre de la comuna. Por eso son 12 comunas
 * con contenido real y distinto (sectores, tipo de vivienda, accesos) en vez
 * de 40 páginas calcadas. Conviene sumar comunas de a poco, con contenido
 * propio, a medida que se confirme que hay demanda.
 */
export const comunas = [
  {
    slug: 'santiago-centro',
    nombre: 'Santiago Centro',
    zona: 'Centro',
    descripcion:
      'El centro concentra edificios antiguos con ascensores angostos y calles con restricción de estacionamiento. Coordinamos el horario de carga para evitar las horas de mayor congestión y trabajamos con carga a mano cuando el ascensor no da el ancho de un sommier.',
    sectores: ['Barrio Brasil', 'Barrio Yungay', 'Santa Isabel', 'Parque Almagro', 'Barrio Lastarria'],
    acceso:
      'Predominan departamentos en edificio. Conviene avisar si el ascensor es de dimensiones reducidas o si hay que coordinar con conserjería.',
    vecinas: ['recoleta', 'independencia', 'estacion-central', 'providencia'],
  },
  {
    slug: 'providencia',
    nombre: 'Providencia',
    zona: 'Nororiente',
    descripcion:
      'Providencia es casi toda departamento en altura, con edificios que exigen reservar el ascensor de carga y avisar a la administración con anticipación. Trabajamos con esa coordinación como parte del servicio.',
    sectores: ['Bellavista', 'Manuel Montt', 'Los Leones', 'Pedro de Valdivia', 'Tobalaba'],
    acceso:
      'Casi siempre edificio con ascensor y estacionamiento de visita limitado. Se recomienda reservar el ascensor de carga con la administración.',
    vecinas: ['santiago-centro', 'nunoa', 'las-condes', 'recoleta'],
  },
  {
    slug: 'nunoa',
    nombre: 'Ñuñoa',
    zona: 'Oriente',
    descripcion:
      'Ñuñoa mezcla casas antiguas de un piso en el sector de Plaza Ñuñoa con torres nuevas hacia Irarrázaval y Grecia. Esa diferencia cambia bastante el tiempo de carga, así que conviene aclararlo al cotizar.',
    sectores: ['Plaza Ñuñoa', 'Irarrázaval', 'Villa Frei', 'Estadio Nacional', 'Chile España'],
    acceso:
      'Mitad casas con antejardín y acceso directo, mitad edificios. En casas antiguas hay que considerar pasillos angostos.',
    vecinas: ['providencia', 'macul', 'penalolen', 'santiago-centro'],
  },
  {
    slug: 'las-condes',
    nombre: 'Las Condes',
    zona: 'Nororiente',
    descripcion:
      'En Las Condes la mayoría de los edificios pide credencial, seguro vigente y horario acordado para ingresar con camión. Coordinamos con conserjería antes de llegar para no perder el turno de carga.',
    sectores: ['El Golf', 'Escuela Militar', 'Manquehue', 'Apoquindo', 'Los Dominicos'],
    acceso:
      'Edificios con control de acceso y horarios de mudanza definidos por reglamento interno. Suele requerirse aviso previo.',
    vecinas: ['providencia', 'vitacura', 'la-reina'],
  },
  {
    slug: 'la-florida',
    nombre: 'La Florida',
    zona: 'Suroriente',
    descripcion:
      'La Florida es extensa y mayormente de casas en villas y condominios, con acceso directo desde la calle. Eso simplifica la carga, aunque las distancias internas dentro de los condominios pueden sumar tiempo.',
    sectores: ['Vicuña Mackenna', 'Walker Martínez', 'Rojas Magallanes', 'Bellavista de La Florida', 'Trinidad'],
    acceso:
      'Predominan casas y condominios con acceso vehicular directo. En condominios cerrados hay que registrar el ingreso en portería.',
    vecinas: ['puente-alto', 'macul', 'penalolen'],
  },
  {
    slug: 'puente-alto',
    nombre: 'Puente Alto',
    zona: 'Sur',
    descripcion:
      'Puente Alto es la comuna más poblada del país y buena parte de los traslados son entre villas dentro de la misma comuna. Al ser el extremo sur de la Región Metropolitana, conviene coordinar el horario para evitar la congestión de Vicuña Mackenna.',
    sectores: ['Bajos de Mena', 'Las Vizcachas', 'Sótero del Río', 'Nocedal', 'El Peral'],
    acceso:
      'Casas en villas y condominios, con acceso directo. Algunos pasajes son angostos para maniobrar.',
    vecinas: ['la-florida', 'san-bernardo'],
  },
  {
    slug: 'maipu',
    nombre: 'Maipú',
    zona: 'Poniente',
    descripcion:
      'Maipú tiene mucho movimiento de mudanzas dentro de la misma comuna, entre villas y condominios. Por la distancia al centro, conviene agrupar el traslado en un solo viaje bien cargado en vez de hacer varias vueltas.',
    sectores: ['Plaza de Maipú', 'Ciudad Satélite', 'Rinconada', 'Los Héroes', 'El Abrazo'],
    acceso:
      'Mayoritariamente casas con acceso directo y condominios con portería.',
    vecinas: ['estacion-central', 'pudahuel'],
  },
  {
    slug: 'macul',
    nombre: 'Macul',
    zona: 'Suroriente',
    descripcion:
      'Macul concentra población universitaria alrededor de la Universidad de Santiago y la UC de San Joaquín, con mucho traslado de piezas y mudanzas chicas en marzo y en julio. Para esos casos el flete sin ayudante suele ser suficiente.',
    sectores: ['Campus San Joaquín', 'Los Plátanos', 'Santa Julia', 'Villa Macul'],
    acceso:
      'Casas de uno y dos pisos, más departamentos en altura hacia Vicuña Mackenna.',
    vecinas: ['nunoa', 'la-florida', 'penalolen', 'san-miguel'],
  },
  {
    slug: 'san-miguel',
    nombre: 'San Miguel',
    zona: 'Sur',
    descripcion:
      'San Miguel cambió mucho con las torres nuevas del eje Gran Avenida, donde casi todas las mudanzas son en departamento con ascensor. Hacia el interior todavía hay barrios de casas con acceso directo.',
    sectores: ['Gran Avenida', 'Ciudad del Niño', 'El Llano', 'Departamental'],
    acceso:
      'Torres nuevas con ascensor de carga sobre Gran Avenida y casas en el sector interior.',
    vecinas: ['santiago-centro', 'macul', 'la-cisterna'],
  },
  {
    slug: 'recoleta',
    nombre: 'Recoleta',
    zona: 'Norte',
    descripcion:
      'Recoleta combina el sector comercial de Patronato, donde el retiro de mercadería es constante, con barrios residenciales hacia el norte. En Patronato conviene coordinar la carga temprano, antes de que se llenen las calles.',
    sectores: ['Patronato', 'Barrio Bellavista', 'Einstein', 'Cerro Blanco'],
    acceso:
      'En Patronato, locales comerciales con carga en la vía pública. En el resto, casas y edificios medianos.',
    vecinas: ['santiago-centro', 'independencia', 'providencia'],
  },
  {
    slug: 'estacion-central',
    nombre: 'Estación Central',
    zona: 'Poniente',
    descripcion:
      'Estación Central tiene una alta concentración de torres residenciales alrededor de Alameda, muchas con ascensores compartidos y horarios de mudanza acotados. Coordinar el bloque horario con la administración es clave para no perder el viaje.',
    sectores: ['Alameda', 'Meiggs', 'Villa Portales', 'Las Rejas'],
    acceso:
      'Torres residenciales de alta densidad con ascensor compartido, más el sector comercial de Meiggs.',
    vecinas: ['santiago-centro', 'maipu', 'pudahuel'],
  },
  {
    slug: 'penalolen',
    nombre: 'Peñalolén',
    zona: 'Oriente',
    descripcion:
      'Peñalolén sube hacia la precordillera, con calles en pendiente y condominios en altura geográfica. Para cargas pesadas conviene avisar si el acceso tiene subida pronunciada o pasaje angosto.',
    sectores: ['Grecia', 'Tobalaba', 'San Luis', 'Lo Hermida', 'Quebrada de Macul'],
    acceso:
      'Casas y condominios, varios con acceso en pendiente. Algunos pasajes requieren maniobra.',
    vecinas: ['nunoa', 'macul', 'la-florida', 'la-reina'],
  },
];

export const buscarComuna = (slug) => comunas.find((c) => c.slug === slug);

export default comunas;
