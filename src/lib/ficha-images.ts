import type { Ficha } from "@/lib/types/ficha";

/** Imágenes de la ficha: galería oficial o imagen principal. */
export function fichaImages(ficha: Pick<Ficha, "image" | "images">): readonly string[] {
  if (ficha.images && ficha.images.length > 0) return ficha.images;
  return [ficha.image];
}

export function fichaHeroImage(ficha: Pick<Ficha, "image" | "images">): string {
  return fichaImages(ficha)[0];
}
