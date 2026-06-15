const WP = "https://www.ovalleturismo.cl/sitio/wp-content/uploads";

/**
 * Sustituye miniaturas WordPress (300px) por la mejor resolución disponible.
 * Sin esto, Next.js escala 300×200 a pantalla completa y se ve pixelado.
 */
const NEWS_IMAGE_UPGRADES: Record<string, string> = {
  [`${WP}/2026/03/Anais-Velasquez-300x200-1.jpg`]: `${WP}/2026/01/Fiesta-de-la-Vendimia.jpg-1024x768.jpeg`,
  [`${WP}/2026/03/Fiesta-de-la-Vendimia-de-Ovalle-300x225-1.jpeg`]: `${WP}/2026/01/Fiesta-de-la-Vendimia.jpg-1024x768.jpeg`,
  [`${WP}/2026/01/Lanzamiento-de-actividades-de-veranos-Limari-2026-300x169-1.jpg`]: `${WP}/2026/01/plaza-1-scaled.jpg`,
  [`${WP}/2025/11/nota-web.jpg`]: `${WP}/2025/11/nota-web-1536x819.jpg`,
  [`${WP}/2025/11/toscana.jpeg`]: "/fotos/fuente-toscana/02.jpg",
  [`${WP}/2025/08/Torres-del-Paine-turismo-Chile.webp`]: `${WP}/2025/08/Torres-del-Paine-turismo-Chile-1024x576.webp`,
};

export const NEWS_IMAGE_QUALITY = 90;

export function newsImageSrc(url: string): string {
  return NEWS_IMAGE_UPGRADES[url] ?? url;
}
