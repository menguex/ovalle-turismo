export type Ficha = {
  id: string;
  name: string;
  title?: string;
  type?: string;
  category?: string;
  image: string;
  description: string;
  highlights?: readonly string[];
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  embedUrl?: string;
  mapUrl?: string;
  schedule?: string;
  date?: string;
  location?: string;
  priceRange?: string;
  amenities?: readonly string[];
  href?: string;
  featured?: boolean;
  badge?: string;
  audience?: string;
  details?: readonly string[];
  /** Distancia aproximada desde Ovalle centro */
  distanceFromOvalle?: string;
  /** Tiempo sugerido de visita */
  visitDuration?: string;
  /** Mejor época para visitar */
  bestSeason?: string;
  lat?: number;
  lng?: number;
};

export function fichaLabel(item: Pick<Ficha, "name" | "title">) {
  return item.title ?? item.name;
}
