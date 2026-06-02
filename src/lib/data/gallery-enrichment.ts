import { FICHA_GALLERIES } from "@/lib/data/ficha-galleries";
import type { Ficha } from "@/lib/types/ficha";

/** Fichas sin página propia reutilizan la galería de su atractivo relacionado. */
const GALLERY_ALIASES: Record<string, string> = {
  "360-fray-jorge": "fray-jorge",
  "360-valle-encanto": "valle-encanto",
};

export function applyGalleryEnrichment<T extends Ficha>(ficha: T): T {
  const scraped =
    FICHA_GALLERIES[ficha.id] ??
    (GALLERY_ALIASES[ficha.id] ? FICHA_GALLERIES[GALLERY_ALIASES[ficha.id]] : undefined);
  if (!scraped?.length) return ficha;

  const images = scraped.includes(ficha.image)
    ? scraped
    : [ficha.image, ...scraped.filter((u) => u !== ficha.image)];

  return {
    ...ficha,
    image: images[0],
    images,
  };
}

export function applyGalleryEnrichmentAll<T extends Ficha>(items: readonly T[]): readonly T[] {
  return items.map(applyGalleryEnrichment);
}
