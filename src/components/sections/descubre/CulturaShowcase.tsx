"use client";

import { BookOpen, Calendar, Landmark, MapPin, Palette, Users, UtensilsCrossed } from "lucide-react";
import { DescubreExperienceHub } from "@/components/sections/DescubreExperienceHub";
import { CULTURAL_ATTRACTIONS } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

const stats = [
  { icon: Landmark, label: "Patrimonio y museos", value: "4+" },
  { icon: Palette, label: "Pueblo de Barraza", value: "Tradición" },
  { icon: BookOpen, label: "Museo del Limarí", value: "Centro" },
  { icon: Users, label: "Fiestas costumbristas", value: "Feb – Mar" },
] as const;

const tips = [
  {
    icon: MapPin,
    title: "Empieza en el centro",
    text: "Recorre la Plaza de Armas, la Iglesia San Vicente Ferrer y el Museo del Limarí en una misma caminata.",
  },
  {
    icon: Calendar,
    title: "Consulta la agenda estival",
    text: "Barraza, boulevards y ferias tienen fechas específicas en verano. Revisa la sección Eventos antes de viajar.",
  },
  {
    icon: Palette,
    title: "Combina cultura y gastronomía",
    text: "Visita la Feria Modelo y los restaurantes del centro para completar la experiencia con sabores del territorio.",
  },
] as const;

const gallery = [
  { src: IMAGES.barraza, alt: "Pueblo de Barraza" },
  { src: IMAGES.museo, alt: "Museo del Limarí" },
  { src: IMAGES.iglesia, alt: "Iglesia San Vicente Ferrer" },
  { src: IMAGES.feria, alt: "Feria Modelo Ovalle" },
  { src: IMAGES.heroPlaza, alt: "Plaza de Armas de Ovalle" },
  {
    src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/museo-limari-4-1024x684.jpg",
    alt: "Interior Museo del Limarí",
  },
] as const;

const routes = [
  {
    icon: Landmark,
    title: "Centro patrimonial",
    duration: "Medio día",
    stops: "Plaza → Iglesia → Museo del Limarí",
    description:
      "Recorrido a pie por el corazón histórico de Ovalle: arquitectura colonial, patrimonio religioso y la historia del valle en el museo.",
  },
  {
    icon: Palette,
    title: "Tradición viva",
    duration: "Día completo",
    stops: "Barraza → Feria Modelo → Gastronomía",
    description:
      "Visita el pueblo tradicional de Barraza, conoce productores en la Feria Modelo y cierra con almuerzo típico del valle.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cultura y sabores",
    duration: "1 día",
    stops: "Museo → Feria → Restaurantes",
    description:
      "Combina patrimonio cultural con la identidad gastronómica limarí: museo, mercado campesino y propuestas de cocina local.",
  },
] as const;

export function CulturaShowcase() {
  return (
    <DescubreExperienceHub
      items={CULTURAL_ATTRACTIONS}
      stats={stats}
      tips={tips}
      routes={routes}
      gallery={gallery}
      mapCategory="Cultura"
      mapDefaultPointId="museo"
      sectionIcon={PAGE_ICONS.cultura}
      gridTitle="Patrimonio y cultura viva"
      gridDescription="Cada ficha incluye ubicación, horarios, mapa y datos de contacto cuando están disponibles."
      mapTitle="Mapa cultural del valle"
      mapDescription="Encuentra museos, pueblos tradicionales y puntos patrimoniales en el territorio limarino."
    />
  );
}
