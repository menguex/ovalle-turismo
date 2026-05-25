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
};

export function fichaLabel(item: Pick<Ficha, "name" | "title">) {
  return item.title ?? item.name;
}
