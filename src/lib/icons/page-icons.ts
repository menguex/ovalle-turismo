import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  CalendarDays,
  Compass,
  Globe2,
  Heart,
  Info,
  Landmark,
  Leaf,
  Mail,
  Map,
  Moon,
  Mountain,
  Newspaper,
  Route,
  Sparkles,
  TreePine,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

/** Iconografía oficial del sitio — Lucide outline, trazo 1.75, coherente con turismo + UI tech */
export type PageIconKey =
  | "experiencias"
  | "astroturismo"
  | "naturaleza"
  | "gastronomia"
  | "enoturismo"
  | "cultura"
  | "wellness"
  | "valles"
  | "eventos"
  | "servicios"
  | "noticias"
  | "datos-utiles"
  | "tour-360"
  | "planifica"
  | "contacto"
  | "nosotros";

export const PAGE_ICONS: Record<PageIconKey, LucideIcon> = {
  experiencias: Compass,
  astroturismo: Moon,
  naturaleza: TreePine,
  gastronomia: UtensilsCrossed,
  enoturismo: Wine,
  cultura: Landmark,
  wellness: Leaf,
  valles: Mountain,
  eventos: CalendarDays,
  servicios: Briefcase,
  noticias: Newspaper,
  "datos-utiles": Info,
  "tour-360": Globe2,
  planifica: Route,
  contacto: Mail,
  nosotros: Users,
};

export const PILLAR_ICONS: Record<string, LucideIcon> = {
  astroturismo: Moon,
  naturaleza: TreePine,
  gastronomia: UtensilsCrossed,
  enoturismo: Wine,
  cultura: Landmark,
  wellness: Leaf,
};

export const HOME_SECTION_ICONS = {
  story: Heart,
  pillars: Compass,
  astro: Moon,
  experiences: Sparkles,
  map: Map,
  tour360: Globe2,
  events: CalendarDays,
  news: Newspaper,
  operators: Users,
} as const satisfies Record<string, LucideIcon>;

export function getPageIcon(key: PageIconKey): LucideIcon {
  return PAGE_ICONS[key];
}

export function getPillarIcon(id: string): LucideIcon {
  return PILLAR_ICONS[id] ?? Compass;
}
