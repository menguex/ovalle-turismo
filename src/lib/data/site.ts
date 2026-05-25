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
  vendimia: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/Fiesta-de-la-Vendimia.jpg-1024x768.jpeg",
  plazaEvent: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/plaza-1-scaled.jpg",
  gastronomia: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/11/IMG_6108-1-768x1024.jpeg",
  experiencias: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/desembocadura-limari-3.jpg",
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
    image: IMAGES.gastronomia,
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
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/03/Anais-Velasquez-300x200-1.jpg",
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
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/03/Fiesta-de-la-Vendimia-de-Ovalle-300x225-1.jpeg",
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
    image: IMAGES.plazaEvent,
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
    image: IMAGES.limari,
    body: "Se realizó el lanzamiento oficial de la Temporada Estival de Verano Limarí 2026, una iniciativa que busca consolidar a la provincia como un destino turístico competitivo, sustentable y con identidad territorial.",
    category: "Turismo",
    readTime: 3,
  },
] as const;

export type NewsItem = (typeof NEWS)[number];

export const HOME_COPY = {
  intro: [
    "Ovalle es un territorio donde la cultura se vive en lo cotidiano. Sus tradiciones rurales, su historia, sus valles y su gente dan forma a una identidad que se expresa en la gastronomía local, las fiestas costumbristas, el trabajo campesino y la conexión profunda con la naturaleza.",
    "Desde el turismo, Ovalle invita a descubrir el Valle del Limarí a través de experiencias auténticas: recorrer rutas patrimoniales, disfrutar de vinos y sabores locales, contemplar cielos únicos para el astroturismo y vivir panoramas familiares que rescatan lo simple, local y propio.",
    "Esta plataforma reúne información turística, rutas y panoramas para descubrir Ovalle y el Valle del Limarí. Aquí podrás descubrir su patrimonio, sus atractivos naturales y culturales, y diseñar tu propia aventura en el Limarí según tus intereses y tiempos.",
  ],
  about: [
    "En Ovalle Turismo creemos en el turismo que nace desde el territorio y sus personas. Somos un equipo que trabaja con cariño y compromiso para poner en valor lo mejor de Ovalle, creando experiencias auténticas que conectan a quienes nos visitan con la historia, la cultura y la naturaleza de nuestra comuna.",
    "Impulsamos el enoturismo y la gastronomía local, el astroturismo aprovechando nuestros cielos limpios, y experiencias de bienestar invitando a vivir el territorio con respeto, calma y conexión con la naturaleza.",
  ],
} as const;

export const PARTNERS = [
  { name: "CONAF", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Conaf.png" },
  { name: "Municipalidad de Ovalle", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Logo-IMO-PNG-300x300.png" },
  { name: "Sernatur", image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Sernatur-300x272.png" },
] as const;
