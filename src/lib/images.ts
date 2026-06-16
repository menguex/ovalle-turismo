const WP_HOSTS = ["www.ovalleturismo.cl", "turismoregiondecoquimbo.cl"] as const;

/** Calidad por defecto para next/image (evita el 75 por defecto que pixela en pantallas retina). */
export const IMAGE_QUALITY = 92;

/** URLs donde quitar el sufijo -WxH no basta o el nombre es atípico. */
const EXPLICIT_UPGRADES: Record<string, string> = {
  "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/cieloazul1-k1zG-U100155473657HzH-1968x1216@RC-300x300.webp":
    "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/cieloazul1-k1zG-U100155473657HzH-1968x1216@RC.webp",
  "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/silla-480x650-1.jpg":
    "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/458215834_18290492467205738_4945125858183155382_n.webp",
  "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Vinedos-Valle-del-Limari-Ochotierras-300x300.jpg":
    "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Vinedos-Valle-del-Limari-Ochotierras.jpg",
};

function isWpUrl(url: string): boolean {
  return url.startsWith("http") && WP_HOSTS.some((host) => url.includes(host));
}

/**
 * Sube miniaturas WordPress (-300x300, -1024x683, etc.) a la versión completa del upload.
 * Las rutas locales (/noticias, /fotos, /branding) se devuelven sin cambios.
 */
export function wpHdSrc(url: string): string {
  if (!url || !isWpUrl(url)) return url;
  if (url.includes("-scaled.")) return url;

  const explicit = EXPLICIT_UPGRADES[url];
  if (explicit) return explicit;

  const withoutSize = url.replace(
    /-(\d+)x(\d+)(\.(?:jpe?g|png|webp|gif))(\?.*)?$/i,
    "$3$4"
  );
  if (withoutSize !== url) return withoutSize;

  return url;
}

export function hdImageSrc(url: string): string {
  return wpHdSrc(url);
}

export function hdImageList(urls: readonly string[] | undefined): readonly string[] | undefined {
  if (!urls?.length) return urls;
  return urls.map(hdImageSrc);
}
