"use client";

import { Calendar, Grape, MapPin, Wine } from "lucide-react";
import { DescubreExperienceHub } from "@/components/sections/DescubreExperienceHub";
import { WINERIES } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";
import { hdImageSrc } from "@/lib/images";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

const stats = [
  { icon: Grape, label: "Viñas y bodegas", value: "6+" },
  { icon: Wine, label: "Tradición pisquera", value: "Desde 1931" },
  { icon: Calendar, label: "Fiesta Vendimia", value: "Feb – Mar" },
  { icon: MapPin, label: "Valle del Limarí", value: "Ruta eno" },
] as const;

const tips = [
  {
    icon: Calendar,
    title: "Reserva con anticipación",
    text: "Las visitas enológicas y catas suelen requerir reserva, especialmente en temporada estival y fines de semana.",
  },
  {
    icon: Wine,
    title: "Combina vino y pisco",
    text: "El Limarí es una de las zonas pisqueras más reconocidas de Chile. Arma una ruta que incluya viñas y la Cooperativa Control Pisquero.",
  },
  {
    icon: MapPin,
    title: "Planifica el transporte",
    text: "Muchas bodegas están fuera del centro. Considera tour operador local o designa conductor si vas a degustar.",
  },
] as const;

const routes = [
  {
    icon: Wine,
    title: "Ruta clásica del pisco",
    duration: "Medio día",
    stops: "Cooperativa → Centro Ovalle → Maridaje",
    description:
      "Visita la cooperativa pisquera más antigua del mundo, recorre el centro histórico y cierra con almuerzo o cóctel de autor en restaurantes locales.",
  },
  {
    icon: Grape,
    title: "Viñas del Limarí",
    duration: "Día completo",
    stops: "Tabali → Ochotierras → Dalbosco",
    description:
      "Recorrido por las principales viñas del valle con catas, visitas a viñedos y paisajes semiáridos únicos del norte chico.",
  },
  {
    icon: MapPin,
    title: "Valle + tradición",
    duration: "2 días",
    stops: "Viñas → Barraza → Feria Modelo",
    description:
      "Combina enoturismo con cultura viva: viñedos, pueblo tradicional de Barraza y productos de estación en la Feria Modelo.",
  },
] as const;

const gallery = [
  { src: IMAGES.vinedos, alt: "Viñedos del Valle del Limarí" },
  {
    src: hdImageSrc(
      "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/barrilesa1-1-768x576-1.jpg"
    ),
    alt: "Barricas en cooperativa pisquera",
  },
  {
    src: hdImageSrc(
      "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Vinedos-Valle-del-Limari-Ochotierras-300x300.jpg"
    ),
    alt: "Viñedos Ochotierras",
  },
  {
    src: IMAGES.vendimia,
    alt: "Fiesta de la Vendimia Ovalle",
  },
  {
    src: hdImageSrc(
      "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/5-1024x683.jpg"
    ),
    alt: "Quesos artesanales del valle",
  },
  {
    src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/d24dde_f6af857f986e4f15904913fabf7d83bbmv2_d_5163_3442_s_4_2.avif",
    alt: "Viña Dalbosco en Punitaqui",
  },
] as const;

/** Viñas, pisquerías y productores visitables — excluye productos embotellados sueltos */
const ENOTURISMO_VISITABLE = WINERIES.filter((w) =>
  ["Viña", "Pisquería", "Quesería", "Espumante"].includes(w.type ?? "")
);

export function EnoturismoShowcase() {
  return (
    <DescubreExperienceHub
      items={ENOTURISMO_VISITABLE}
      stats={stats}
      tips={tips}
      routes={routes}
      gallery={gallery}
      mapCategory="Enoturismo"
      mapDefaultPointId="cooperativa"
      sectionIcon={PAGE_ICONS.enoturismo}
      gridMode="masonry"
      gridEyebrow="Viñas y pisquerías"
      gridTitle="Ruta enoturística del Limarí"
      gridDescription="Haz clic en cada ficha para ver horarios, ubicación, contacto y mapa. Reserva con anticipación en temporada alta."
      mapTitle="Mapa enoturístico del valle"
      mapDescription="Ubica viñas, pisquerías y puntos clave de la ruta del vino y pisco en el territorio limarino."
    />
  );
}
