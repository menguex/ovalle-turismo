export const SITE = {
  name: "Ovalle Turismo",
  tagline: "Bajo el mismo cielo",
  subtitle: "Valle del Limarí · Norte de Chile",
  url: "https://www.ovalleturismo.cl",
  email: "turismo@municipalidaddeovalle.cl",
  phones: ["(53) 2 665346", "(53) 2 661237"],
  address: "Ariztía Poniente N°7, segundo piso, Ovalle",
  officeHours: "Lunes a viernes · Consultar horario en temporada alta",
  instagram: "https://www.instagram.com/ovalleturismo/",
  mapUrl: "https://goo.gl/maps/dfYWcXD5Upw",
} as const;

export const USEFUL_RECOMMENDATIONS = [
  "Cuida tus artículos de valor y equipaje, como cámaras fotográficas o mochilas.",
  "Cambia dinero en casas de cambio establecidas; nunca en la calle ni con desconocidos.",
  "Lleva protector solar y agua — clima semiárido del valle.",
  "Reserva con anticipación en temporada estival (enero–marzo).",
  "Para astroturismo, planifica noches sin luna llena (abril–septiembre ideal).",
  "Consulta horarios en la oficina de turismo antes de visitar parques y sitios.",
] as const;

export const IMAGES = {
  logo: "/branding/logo-ovalle-turismo.png",
  logoCream: "/branding/logo-ovalle-turismo-cream.png",
  logoLight: "/branding/logo-ovalle-turismo-light.png",
  hero: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/DSC00721-scaled.jpg",
  heroPlaza: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/1-plaza-1024x683.jpg",
  collage: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Turismo-home-1024x872.png",
  limari: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/Galeria-Valle-Limari-02.jpg",
  astro: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/cieloazul1-k1zG-U100155473657HzH-1968x1216@RC-300x300.webp",
  desembocadura: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/desembocadura-limarii-2-copia.jpg",
  penones: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Los-Penones-21-1024x768.jpg",
  encanto: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/07/DSC_9423-1024x684.jpg",
  frayJorge: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Fray-Jorge-21-1024x682.jpg",
  barraza: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/barraza-6-684x1024.jpg",
  iglesia: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/5586241646_10ce11d650_b.jpg",
  feria: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/DSC08512-1024x683.jpg",
  museo: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/museo-limari-4-1024x684.jpg",
  vinedos: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/DSC09843-scaled.jpg",
  rutaWellness: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/DSC00676-scaled.jpg",
  alameda: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/alamedaaaaaaaaaaaaokk.jpg",
  /** Hero /noticias: destino genérico (Alameda), no foto puntual de evento */
  noticiasHero: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/alamedaaaaaaaaaaaaokk.jpg",
  vendimia: "/noticias/fiesta-vendimia-2026-50-mil.jpg",
  plazaEvent: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/plaza-1-scaled.jpg",
  gastronomia: "/fotos/fuente-toscana/01.jpg",
  /** Tarjeta vertical del inicio (pillar 4:5) */
  gastronomiaHome: "/fotos/fuente-toscana/01.jpg",
  experiencias: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/desembocadura-limari-3.jpg",
} as const;

/** Videos de fondo — Ovalle / Valle del Limarí (sin costa; ver scripts/audit-videos.mjs) */
export const REGIONAL_VIDEOS = {
  /** Fondo de toda la sección Eventos en el inicio */
  eventosSection: {
    youtubeId: "nsAbY2OKCh0",
    title: "Ovalle, Limarí — Región de Coquimbo",
    poster: IMAGES.plazaEvent,
  },
  planificaValle: {
    youtubeId: "MoWWNMP3bPw",
    title: "Ovalle, la Perla del Limarí",
    poster: IMAGES.hero,
  },
  astroCielo: {
    youtubeId: "xDIo5t8oS68",
    title: "Lanzamiento AstroLimarí — Ovalle",
    poster: IMAGES.vinedos,
  },
} as const;

export const NAV = [
  {
    label: "Descubre",
    href: "/descubre",
    children: [
      { label: "Naturaleza", href: "/descubre/naturaleza" },
      { label: "Astroturismo", href: "/descubre/astroturismo" },
      { label: "Gastronomía", href: "/descubre/gastronomia" },
      { label: "Enoturismo", href: "/descubre/enoturismo" },
      { label: "Cultura", href: "/descubre/cultura" },
      { label: "Wellness", href: "/descubre/wellness" },
    ],
  },
  { label: "Valles del Limarí", href: "/valles-del-limari" },
  { label: "Eventos", href: "/eventos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Noticias", href: "/noticias" },
  { label: "Info", href: "/datos-utiles" },
] as const;

export const PILLARS = [
  {
    id: "astroturismo",
    title: "Astroturismo",
    subtitle: "Cielos limpios del norte",
    description:
      "Contempla cielos únicos para el astroturismo en uno de los valles más despejados de Chile.",
    href: "/descubre/astroturismo",
    image: IMAGES.astro,
  },
  {
    id: "naturaleza",
    title: "Naturaleza",
    subtitle: "Patrimonio y paisaje",
    description:
      "Desde el Valle del Encanto hasta Fray Jorge, paisajes únicos y biodiversidad sorprendente.",
    href: "/descubre/naturaleza",
    image: IMAGES.frayJorge,
  },
  {
    id: "gastronomia",
    title: "Gastronomía",
    subtitle: "Sabores del Limarí",
    description:
      "Tradición local y propuestas modernas que combinan lo típico del valle con cocina de calidad.",
    href: "/descubre/gastronomia",
    image: IMAGES.gastronomiaHome,
  },
  {
    id: "enoturismo",
    title: "Enoturismo",
    subtitle: "Vino y pisco de origen",
    description:
      "Viñas, pisquerías y degustaciones en el corazón vitivinícola del norte chico.",
    href: "/descubre/enoturismo",
    image: IMAGES.vinedos,
  },
  {
    id: "cultura",
    title: "Cultura",
    subtitle: "Historia viva",
    description:
      "Museos, patrimonio, ferias y tradiciones que dan identidad al territorio limarino.",
    href: "/descubre/cultura",
    image: IMAGES.museo,
  },
  {
    id: "wellness",
    title: "Wellness",
    subtitle: "Calma del valle",
    description:
      "Ruta enoturística y de bienestar: vino, naturaleza y experiencias para renovar energías.",
    href: "/descubre/wellness",
    image: IMAGES.rutaWellness,
  },
] as const;

export const QUICK_LINKS = [
  {
    label: "Alojamiento",
    description: "Hoteles, hostales y cabañas",
    href: "/servicios#alojamiento",
    icon: "bed" as const,
  },
  {
    label: "Gastronomía",
    description: "Sabores del Valle del Limarí",
    href: "/descubre/gastronomia",
    icon: "utensils" as const,
  },
  {
    label: "Panoramas",
    description: "Eventos y temporada estival",
    href: "/eventos",
    icon: "calendar" as const,
  },
  {
    label: "Datos útiles",
    description: "Clima, terminal e info turística",
    href: "/datos-utiles",
    icon: "info" as const,
  },
  {
    label: "Tour operador",
    description: "Guías y operadores locales",
    href: "/servicios#tours",
    icon: "compass" as const,
  },
] as const;

export const MAP_CATEGORIES = {
  Naturaleza: { color: "#7A8450", label: "Naturaleza" },
  Enoturismo: { color: "#F7941D", label: "Enoturismo" },
  Cultura: { color: "#FFCB05", label: "Cultura" },
  Eventos: { color: "#3D8FD9", label: "Eventos" },
  Astroturismo: { color: "#2B6CB8", label: "Astroturismo" },
} as const;

export type MapCategory = keyof typeof MAP_CATEGORIES;

export const MAP_POINTS = [
  {
    id: "encanto",
    name: "Valle del Encanto",
    category: "Naturaleza" as MapCategory,
    description: "Petroglifos y arte rupestre diaguita bajo cielos despejados del valle.",
    href: "/descubre/naturaleza",
    lat: -30.658,
    lng: -71.519,
  },
  {
    id: "fray-jorge",
    name: "Parque Nacional Fray Jorge",
    category: "Naturaleza" as MapCategory,
    description: "Bosque valdiviano en medio del desierto costero, patrimonio UNESCO.",
    href: "/descubre/naturaleza",
    lat: -30.75,
    lng: -71.683,
  },
  {
    id: "desembocadura",
    name: "Desembocadura del Limarí",
    category: "Naturaleza" as MapCategory,
    description: "Humedal costero donde el río se encuentra con el Pacífico.",
    href: "/descubre/naturaleza",
    lat: -30.728,
    lng: -71.467,
  },
  {
    id: "cooperativa",
    name: "Cooperativa Control Pisquero",
    category: "Enoturismo" as MapCategory,
    description: "La cooperativa pisquera más antigua del mundo, desde 1931.",
    href: "/descubre/enoturismo",
    lat: -30.598,
    lng: -71.205,
  },
  {
    id: "vina-tabali",
    name: "Viña Tabali",
    category: "Enoturismo" as MapCategory,
    description: "Viña de referencia del Valle del Limarí con vinos de terroir y visitas enológicas.",
    href: "/descubre/enoturismo",
    lat: -30.52,
    lng: -71.28,
  },
  {
    id: "vina-ochotierras",
    name: "Viña Ochotierras",
    category: "Enoturismo" as MapCategory,
    description: "Viña boutique con catas y visitas en viñedos semiáridos del norte chico.",
    href: "/descubre/enoturismo",
    lat: -30.535,
    lng: -71.265,
  },
  {
    id: "museo",
    name: "Museo del Limarí",
    category: "Cultura" as MapCategory,
    description: "Historia, identidad y patrimonio del valle en el corazón de Ovalle.",
    href: "/descubre/cultura",
    lat: -30.602,
    lng: -71.198,
  },
  {
    id: "plaza",
    name: "Plaza de Armas",
    category: "Eventos" as MapCategory,
    description: "Centro cívico y escenario de fiestas costumbristas y vendimia.",
    href: "/eventos",
    lat: -30.601,
    lng: -71.199,
  },
  {
    id: "astro-limari",
    name: "Cielos del Limarí",
    category: "Astroturismo" as MapCategory,
    description: "Zonas del valle con cielos limpios ideales para observación astronómica.",
    href: "/descubre/astroturismo",
    lat: -30.545,
    lng: -71.32,
  },
  {
    id: "penones",
    name: "Parque Los Peñones",
    category: "Naturaleza" as MapCategory,
    description: "Parque recreacional y natural ideal para disfrutar en familia, con senderos y áreas verdes.",
    href: "/descubre/naturaleza",
    lat: -30.615,
    lng: -71.21,
  },
  {
    id: "barraza",
    name: "Pueblo de Barraza",
    category: "Cultura" as MapCategory,
    description: "Tradición, colores y cultura viva en uno de los pueblos más emblemáticos del valle.",
    href: "/descubre/cultura",
    lat: -30.548,
    lng: -71.312,
  },
] as const;

export const NEWS = [
  {
    slug: "fiesta-vendimia-2026-50-mil",
    title: "Más de 50 mil personas participaron en la Fiesta de la Vendimia de Ovalle 2026",
    excerpt:
      "Con una convocatoria histórica que superó las 50 mil personas durante sus dos jornadas, la Fiesta de la Vendimia se consolidó como uno de los eventos más masivos del norte de Chile.",
    date: "2026-03-02",
    image: "/noticias/fiesta-vendimia-2026-50-mil.jpg",
    body: "Con una convocatoria histórica que superó las 50 mil personas durante sus dos jornadas, la Fiesta de la Vendimia de Ovalle 2026 se consolidó como uno de los eventos más masivos y relevantes del norte de Chile. Por primera vez, esta tradicional celebración se desarrolló en las dependencias de la Cooperativa Control Pisquero y en Avenida La Chimba, marcando un hito en la organización del evento y permitiendo recibir a miles de visitantes en un espacio más amplio y adecuado para la magnitud de la actividad.",
    category: "Vendimia",
    readTime: 4,
    featured: true,
  },
  {
    slug: "vendimia-cooperativa-pisquera",
    title: "Fiesta de la Vendimia Ovalle 2026 en la Cooperativa Control Pisquero",
    excerpt:
      "Por primera vez, la tradicional celebración se desarrollará en la cooperativa pisquera más antigua del mundo, fundada en 1931.",
    date: "2026-02-26",
    image: "/noticias/vendimia-cooperativa-pisquera.jpg",
    body: "La Fiesta de la Vendimia Ovalle 2026 marcará un hito histórico, puesto que, por primera vez, la tradicional celebración se desarrollará en las dependencias de la Cooperativa Agrícola Control Pisquero y en Avenida La Chimba, consolidando una alianza estratégica con el municipio de Ovalle que pone en valor la identidad vitivinícola y pisquera de la comuna.",
    category: "Vendimia",
    readTime: 3,
  },
  {
    slug: "programacion-verano-2026",
    title:
      "La Ilustre Municipalidad de Ovalle desplegará una serie de eventos que incluyen fiestas costumbristas y exposiciones regionales",
    excerpt:
      "Agenda de enero a marzo para dinamizar la economía local y ofrecer esparcimiento a residentes y visitantes durante la temporada estival.",
    date: "2026-01-23",
    image: "/noticias/programacion-verano-2026.jpg",
    body: "Con el objetivo de consolidar a la capital del Limarí como un polo de atracción turística durante el verano, el municipio ovallino ha diseñado un calendario de actividades que recorre tanto el centro urbano como las zonas rurales de la comuna.",
    category: "Agenda",
    readTime: 5,
  },
  {
    slug: "temporada-estival-limari-2026",
    title: "Provincia de Limarí lanza Temporada Estival 2026",
    excerpt:
      "Iniciativa de Sercotec y SERNATUR busca consolidar a la provincia como destino turístico sustentable con identidad territorial.",
    date: "2026-01-13",
    image: "/noticias/temporada-estival-limari-2026.jpg",
    body: "Se realizó el lanzamiento oficial de la Temporada Estival de Verano Limarí 2026, una iniciativa que busca consolidar a la provincia como un destino turístico competitivo, sustentable y con identidad territorial.",
    category: "Turismo",
    readTime: 3,
  },
  {
    slug: "calendario-vendimias-2026",
    title:
      "Chile lanza Calendario de Vendimias y presenta innovador Mapa Interactivo que moderniza experiencia enoturística",
    excerpt:
      "Chile impulsa el enoturismo con el Calendario de Vendimias 2026 y un mapa interactivo que moderniza la experiencia en los valles vitivinícolas.",
    date: "2025-12-18",
    image: "/noticias/calendario-vendimias-2026.jpg",
    body: "Chile dio un nuevo impulso al enoturismo con el lanzamiento del Calendario de Vendimias 2026, una de las agendas culturales y turísticas más esperadas del año. La actividad, realizada en la Casa del Turismo, reunió a autoridades, representantes de los valles vitivinícolas y actores del sector para presentar un mapa interactivo que moderniza la forma de descubrir fiestas, rutas y experiencias enoturísticas en el país.",
    category: "Enoturismo",
    readTime: 4,
  },
  {
    slug: "diplomado-gestion-turistica-amtc",
    title: "AMTC y UTEM lanzan diplomado para fortalecer la gestión turística municipal en Chile",
    excerpt:
      "La Asociación de Municipalidades Turísticas de Chile y la UTEM abren postulaciones a un diplomado para fortalecer equipos municipales de turismo.",
    date: "2025-12-17",
    image: "/noticias/diplomado-gestion-turistica-amtc.jpg",
    body: "Con el objetivo de fortalecer las capacidades técnicas, estratégicas y colaborativas de los equipos municipales de turismo a lo largo del país, la Asociación de Municipalidades Turísticas de Chile (AMTC), en conjunto con la Universidad Tecnológica Metropolitana (UTEM), lanzó oficialmente el Diplomado en Gestión Turística Municipal.",
    category: "Turismo",
    readTime: 3,
  },
  {
    slug: "marca-turistica-coquimbo",
    title: "Región de Coquimbo actualiza marca turística con proceso participativo",
    excerpt:
      "Tras meses de trabajo técnico y participación ciudadana, Sernatur Coquimbo presentó la actualización de la marca turística regional.",
    date: "2025-12-01",
    image: "/noticias/marca-turistica-coquimbo.jpg",
    body: "Tras meses de trabajo técnico y participación ciudadana, se presentó la actualización de la marca turística de la Región de Coquimbo, un proyecto impulsado por la dirección regional de Sernatur Coquimbo, financiado por el Gobierno Regional y aprobado por el CORE, a través del Fondo Nacional de Desarrollo Regional.",
    category: "Turismo",
    readTime: 3,
  },
  {
    slug: "yasna-molina-world-cheese-awards",
    title:
      "Productora caprina de Ovalle Yasna Molina obtiene medalla de bronce en el World Cheese Awards",
    excerpt:
      "Por primera vez un queso chileno obtiene reconocimiento mundial: Yasna Molina, de Caprinos Villaseca en Ovalle, logra medalla de bronce entre 5 mil participantes.",
    date: "2025-11-20",
    image: "/noticias/yasna-molina-world-cheese-awards.jpg",
    body: "La productora de queso de cabra de Ovalle, Yasna Molina, logró que por primera vez un queso chileno obtenga un reconocimiento a nivel mundial en el World Cheese Awards. “Mi gran sueño siempre fue lograr algún premio en un torneo mundial y hoy me siento muy feliz y orgullosa de haberlo logrado”, señaló la artesana detrás de Caprinos Villaseca.",
    category: "Gastronomía",
    readTime: 3,
  },
  {
    slug: "premios-enoturismo-2025",
    title: "Premios Enoturismo Chile 2025 anuncian a sus ganadores regionales",
    excerpt:
      "El certamen que celebra las mejores experiencias en torno al vino y el turismo amplía su alcance territorial y marca récord de participación.",
    date: "2025-11-20",
    image: "/noticias/premios-enoturismo-2025.jpg",
    body: "Los Premios Enoturismo Chile 2025 ya tienen a sus ganadores regionales. En su cuarta edición, el certamen que celebra las mejores experiencias en torno al vino y el turismo amplía su alcance territorial con la incorporación de la Región de Atacama y marca un récord histórico de participación, con 96 postulaciones.",
    category: "Enoturismo",
    readTime: 3,
  },
  {
    slug: "ovallino-mejor-carta-vinos",
    title: "Restaurante Ovallino es elegido nuevamente como la mejor carta de vinos de Chile",
    excerpt:
      "Por segundo año consecutivo, Fuente Toscana en Ovalle lidera el ranking de La CAV con una curatoría basada en el concepto del Norte Verde.",
    date: "2025-11-05",
    image: "/fotos/fuente-toscana/02.jpg",
    body: "Por segundo año consecutivo, el negocio Ovallino lidera el ranking de La CAV. Con una curatoría única basada en el concepto del Norte Verde, Fuente Toscana —ubicado en el centro de Ovalle— reafirma que la excelencia también se escribe desde regiones.",
    category: "Gastronomía",
    readTime: 3,
  },
  {
    slug: "turismo-internacional-chile-2040",
    title: "Chile duplicará su turismo internacional para 2040, según estudio de Google",
    excerpt:
      "Un informe global proyecta que Chile alcanzará 10 millones de visitantes extranjeros en 2040, posicionándose en el puesto 48 del ranking mundial.",
    date: "2025-08-19",
    image: "/noticias/turismo-internacional-chile-2040.webp",
    body: "Un informe global proyecta que el país alcanzará los 10 millones de visitantes extranjeros en 2040, posicionándose en el puesto 48 del ranking mundial de destinos turísticos. La industria turística de Chile experimentará un crecimiento significativo en las próximas dos décadas, según el estudio impulsado por Google.",
    category: "Turismo",
    readTime: 4,
  },
  {
    slug: "mas-valor-turistico-2025",
    title: "Sernatur premiará los productos más innovadores del país con su concurso Más Valor Turístico 2025",
    excerpt:
      "El Servicio Nacional de Turismo abrió postulaciones para una nueva edición del concurso que destaca experiencias turísticas innovadoras y sustentables.",
    date: "2025-07-22",
    image:
      "/noticias/mas-valor-turistico-2025.png",
    body: "El Servicio Nacional de Turismo anunció la apertura de postulaciones para una nueva edición del concurso Más Valor Turístico, una iniciativa que por más de una década ha destacado experiencias turísticas innovadoras que aportan al desarrollo sostenible del sector en Chile.",
    category: "Turismo",
    readTime: 3,
  },
  {
    slug: "sellos-vendimia-2025",
    title: "Ocho Fiestas de la Vendimia reciben Sello de Buenas Prácticas de Enoturismo Chile",
    excerpt:
      "En el Palacio Pereira, Enoturismo Chile de Corfo entregó los Sellos Fiestas de la Vendimia 2025 a organizaciones que destacan por su gestión.",
    date: "2025-07-22",
    image: "/noticias/sellos-vendimia-2025.png",
    body: "Con una emotiva ceremonia realizada en el Palacio Pereira y la presencia de destacadas autoridades nacionales y regionales, se desarrolló la entrega de los Sellos Fiestas de la Vendimia 2025, evento organizado por Enoturismo Chile de Corfo. Esta iniciativa reconoce a las organizaciones que han demostrado buenas prácticas en la gestión de fiestas de la vendimia.",
    category: "Enoturismo",
    readTime: 3,
  },
] as const;

export type NewsItem = (typeof NEWS)[number];

/** Reseña histórica — enoturismo (ovalleturismo.cl/servicios-turisticos/enoturismo) */
export const ENOTURISMO_HISTORY = [
  "Descubre el enoturismo en Ovalle y sus viñas, donde la tradición vitivinícola se combina con paisajes de valle y una cocina local de sabor único.",
  "La región de Coquimbo, donde se ubica la provincia de Limarí, desarrolló viñedos durante la colonización española, influenciada por recomendaciones agrícolas europeas. Entre el siglo XIX y principios del XX, la viticultura se expandió gracias a la llegada de inmigrantes y la demanda local e industrial de vinos.",
  "Desde finales del siglo XX, Limarí se posicionó como potencia productora de Chardonnay, aprovechando su clima fresco y suelos calcáreos bajo la influencia marina y la camanchaca. El Valle del Limarí produce vinos con acidez marcada y mineralidad. Otras variedades como Syrah, Malbec y Pinot Noir ganaron aceptación en viñedos costeros e internos.",
  "Entre las décadas de 1930 y 1960, la expansión de infraestructuras —acueductos, caminos y bodegas— facilitó el crecimiento del sector. Históricamente destacó la Moscatel de Alejandría para vinos dulces y pisco; luego las variedades internacionales diversificaron la oferta, fortaleciéndose mediante prácticas agroindustriales y cooperativas.",
  "En las últimas décadas, los Chardonnay del Limarí obtuvieron premios en concursos internacionales, consolidando la reputación de la provincia. Ovalle te invita a vivir una experiencia enoturística única: visita viñas, degustaciones y tradición vitivinícola en el corazón del norte chico.",
] as const;

/** Reseña histórica — pisquerías (ovalleturismo.cl/servicios-turisticos/pisqueras) */
export const PISQUERAS_HISTORY = [
  "La Provincia del Limarí es una importante zona pisquera en Chile, conocida por sus vinos y piscos de alta calidad, elaborados artesanalmente con uvas de cepas como la Moscatel de Alejandría.",
  "La producción de pisco en Chile data del siglo XVI; fue durante los siglos XVIII y XIX cuando las haciendas y factorías de la zona sur de la actual provincia consolidaron una tradición que hoy se expresa en pisquerías, cooperativas y destilerías de referencia nacional.",
  "Ovalle y el valle son cuna de la Fiesta de la Vendimia y de la Cooperativa Agrícola Control Pisquero —la cooperativa pisquera más antigua del mundo—, símbolos de la identidad pisquera limarina.",
] as const;

export const HOME_COPY = {
  intro: [
    "Ovalle es un territorio donde la cultura se vive en lo cotidiano. Sus tradiciones rurales, su historia, sus valles y su gente dan forma a una identidad que se expresa en la gastronomía local, las fiestas costumbristas, el trabajo campesino y la conexión profunda con la naturaleza.",
    "Desde el turismo, Ovalle invita a descubrir el Valle del Limarí a través de experiencias auténticas: recorrer rutas patrimoniales, disfrutar de vinos y sabores locales, contemplar cielos únicos para el astroturismo y vivir panoramas familiares que rescatan lo simple, local y propio.",
    "Esta plataforma reúne información turística, rutas y panoramas para descubrir Ovalle y el Valle del Limarí. Aquí podrás descubrir su patrimonio, sus atractivos naturales y culturales, y diseñar tu propia aventura en el Limarí según tus intereses y tiempos.",
  ],
  about: [
    "En Ovalle Turismo creemos en el turismo que nace desde el territorio y sus personas. Somos un equipo que trabaja con cariño y compromiso para poner en valor lo mejor de Ovalle, creando experiencias auténticas que conectan a quienes nos visitan con la historia, la cultura y la naturaleza de nuestra comuna.",
    "Nuestro trabajo se inspira en un plan estratégico de turismo, pero sobre todo en el amor por lo que somos.",
    "Impulsamos el enoturismo y la gastronomía local, donde el vino, los sabores y las tradiciones cuentan nuestra historia; el astroturismo, aprovechando nuestros cielos limpios y la magia de las noches del valle; invitando a vivir el territorio con respeto, calma y conexión con la naturaleza.",
    "Queremos que cada experiencia sea una oportunidad para descubrir Ovalle de manera cercana y real, aportando al desarrollo local y fortaleciendo el orgullo de quienes vivimos aquí.",
  ],
} as const;

export const PARTNERS = [
  { name: "CONAF", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Conaf.png" },
  { name: "Municipalidad de Ovalle", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Logo-IMO-PNG-300x300.png" },
  { name: "Sernatur", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Sernatur-300x272.png" },
] as const;
