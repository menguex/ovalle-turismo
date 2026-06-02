import { applyGalleryEnrichment } from "@/lib/data/gallery-enrichment";
import { OFFICIAL_CONTENT } from "@/lib/data/official-content-enrichment";
import { enrichFicha } from "@/lib/data/service-enrichment";
import type { Ficha } from "@/lib/types/ficha";

const MUNICIPAL_PHONE = /\(53\)\s*2\s*665346|532\s*665346/i;

function isMunicipalPhone(phone?: string) {
  return phone ? MUNICIPAL_PHONE.test(phone) : false;
}

export function applyOfficialContent<T extends Ficha>(ficha: T): T {
  const patch = OFFICIAL_CONTENT[ficha.id];
  if (!patch) return ficha;

  const description =
    patch.description && patch.description.length > (ficha.description?.length ?? 0)
      ? patch.description
      : ficha.description;

  const phone =
    patch.phone && !isMunicipalPhone(patch.phone)
      ? isMunicipalPhone(ficha.phone)
        ? patch.phone
        : (ficha.phone ?? patch.phone)
      : ficha.phone;

  return {
    ...ficha,
    ...patch,
    description,
    phone,
    email: ficha.email ?? patch.email,
    instagram: ficha.instagram ?? patch.instagram,
    website: ficha.website ?? patch.website,
    schedule: ficha.schedule ?? patch.schedule,
    lat: ficha.lat ?? patch.lat,
    lng: ficha.lng ?? patch.lng,
    highlights: ficha.highlights,
    details: patch.details
      ? Array.from(new Set([...(ficha.details ?? []), ...patch.details]))
      : ficha.details,
    relatedIds: patch.relatedIds ?? ficha.relatedIds,
  };
}

/** Aplica enriquecimiento de servicios, contenido oficial y galerías. */
export function finalizeFicha<T extends Ficha>(ficha: T): T {
  return applyGalleryEnrichment(applyOfficialContent(enrichFicha(ficha)));
}

export function finalizeFichas<T extends Ficha>(items: readonly T[]): readonly T[] {
  return items.map(finalizeFicha);
}
