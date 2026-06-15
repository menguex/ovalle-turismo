const WP = "https://www.ovalleturismo.cl/sitio/wp-content/uploads";

/**
 * Resolución de imágenes de noticias.
 * Las rutas `/noticias/*` y `/fotos/*` ya son locales en alta resolución.
 * Este mapa solo corrige URLs WordPress heredadas (miniaturas 300px).
 */
const NEWS_IMAGE_UPGRADES: Record<string, string> = {
  [`${WP}/2026/03/Anais-Velasquez-300x200-1.jpg`]: "/noticias/fiesta-vendimia-2026-50-mil.jpg",
  [`${WP}/2026/03/Fiesta-de-la-Vendimia-de-Ovalle-300x225-1.jpeg`]: "/noticias/vendimia-cooperativa-pisquera.jpg",
  [`${WP}/2026/01/Lanzamiento-de-actividades-de-veranos-Limari-2026-300x169-1.jpg`]: "/noticias/temporada-estival-limari-2026.jpg",
  [`${WP}/2025/11/nota-web.jpg`]: "/noticias/premios-enoturismo-2025.jpg",
  [`${WP}/2025/11/toscana.jpeg`]: "/fotos/fuente-toscana/02.jpg",
  [`${WP}/2025/08/Torres-del-Paine-turismo-Chile.webp`]: "/noticias/turismo-internacional-chile-2040.webp",
  [`${WP}/2025/12/noticia.png`]: "/noticias/calendario-vendimias-2026.jpg",
  [`${WP}/2025/12/noticia2.png`]: "/noticias/diplomado-gestion-turistica-amtc.jpg",
  [`${WP}/2025/12/noticia-3.png`]: "/noticias/marca-turistica-coquimbo.jpg",
};

export const NEWS_IMAGE_QUALITY = 90;

export function newsImageSrc(url: string): string {
  return NEWS_IMAGE_UPGRADES[url] ?? url;
}
