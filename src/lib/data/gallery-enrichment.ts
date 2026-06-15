import { FICHA_GALLERIES } from "@/lib/data/ficha-galleries";
import { LOCAL_FICHA_GALLERIES } from "@/lib/data/local-ficha-galleries";
import type { Ficha } from "@/lib/types/ficha";

/** Fichas sin página propia reutilizan la galería de su atractivo relacionado. */
const GALLERY_ALIASES: Record<string, string> = {
  "360-fray-jorge": "fray-jorge",
  "360-valle-encanto": "valle-encanto",
};

function resolveGallery(fichaId: string): readonly string[] | undefined {
  return (
    LOCAL_FICHA_GALLERIES[fichaId] ??
    FICHA_GALLERIES[fichaId] ??
    (GALLERY_ALIASES[fichaId] ? LOCAL_FICHA_GALLERIES[GALLERY_ALIASES[fichaId]] : undefined) ??
    (GALLERY_ALIASES[fichaId] ? FICHA_GALLERIES[GALLERY_ALIASES[fichaId]] : undefined)
  );
}

export function applyGalleryEnrichment<T extends Ficha>(ficha: T): T {
  const scraped = resolveGallery(ficha.id);
  if (!scraped?.length) return ficha;

  const images = scraped.includes(ficha.image)
    ? scraped
    : [scraped[0], ...scraped.filter((u) => u !== ficha.image && u !== scraped[0])];

  return {
    ...ficha,
    image: images[0],
    images,
  };
}

export function applyGalleryEnrichmentAll<T extends Ficha>(items: readonly T[]): readonly T[] {
  return items.map(applyGalleryEnrichment);
}
