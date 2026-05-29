"use client";

import {
  Binoculars,
  Droplets,
  Mountain,
  Shield,
  Sun,
  TreePine,
  Umbrella,
  Waves,
} from "lucide-react";
import { DescubreExperienceHub } from "@/components/sections/DescubreExperienceHub";
import { NATURAL_ATTRACTIONS } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

const stats = [
  { icon: TreePine, label: "Atractivos naturales", value: "4+" },
  { icon: Shield, label: "Patrimonio UNESCO", value: "Fray Jorge" },
  { icon: Mountain, label: "Valle del Encanto", value: "~18 km" },
  { icon: Sun, label: "Mejor astro", value: "Abr – Sep" },
] as const;

const tips = [
  {
    icon: Droplets,
    title: "Hidratación y protección solar",
    text: "El clima semiárido del valle exige agua, gorro y bloqueador, especialmente en senderos y costa.",
  },
  {
    icon: Binoculars,
    title: "Reserva tiempo para cada parque",
    text: "Fray Jorge y Valle del Encanto merecen medio día como mínimo. Consulta horarios CONAF antes de salir.",
  },
  {
    icon: Umbrella,
    title: "Combina con astroturismo",
    text: "Valle del Encanto y Fray Jorge tienen cielos limpios ideales para observación nocturna en temporada seca.",
  },
] as const;

const gallery = [
  { src: IMAGES.frayJorge, alt: "Parque Nacional Bosque Fray Jorge" },
  { src: IMAGES.encanto, alt: "Valle del Encanto" },
  { src: IMAGES.desembocadura, alt: "Desembocadura del Río Limarí" },
  { src: IMAGES.penones, alt: "Parque Los Peñones" },
  {
    src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Fray-Jorge-21-1024x682.jpg",
    alt: "Senderos en Fray Jorge",
  },
  {
    src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/07/DSC_9423-1024x684.jpg",
    alt: "Petroglifos del Valle del Encanto",
  },
] as const;

const routes = [
  {
    icon: Mountain,
    title: "Patrimonio y bosque",
    duration: "2 días",
    stops: "Valle del Encanto → Fray Jorge",
    description:
      "Combina el monumento arqueológico con el bosque valdiviano en pleno desierto. Ideal para quienes buscan naturaleza y patrimonio UNESCO.",
  },
  {
    icon: Waves,
    title: "Costa y humedales",
    duration: "Día completo",
    stops: "Desembocadura → Caleta El Toro → Humedales",
    description:
      "Recorre el humedal costero y Santuario de la Naturaleza de la desembocadura del Limarí, observa aves migratorias y visita las caletas artesanales de la comuna de Ovalle.",
  },
  {
    icon: TreePine,
    title: "Día en familia",
    duration: "Medio día",
    stops: "Los Peñones → Centro Ovalle",
    description:
      "Parque recreacional a minutos del centro, ideal para picnic, senderos cortos y actividades al aire libre con niños.",
  },
] as const;

export function NaturalezaShowcase() {
  return (
    <DescubreExperienceHub
      items={NATURAL_ATTRACTIONS}
      stats={stats}
      tips={tips}
      routes={routes}
      gallery={gallery}
      showTour360
      mapCategory="Naturaleza"
      mapDefaultPointId="fray-jorge"
      sectionIcon={PAGE_ICONS.naturaleza}
      gridTitle="Atractivos naturales del Limarí"
      gridDescription="Haz clic en cada ficha para ver horarios, mapa, distancias y recomendaciones de visita."
      mapTitle="Mapa de naturaleza en el valle"
      mapDescription="Ubica humedales, parques y reservas nacionales. Selecciona un punto y abre la ruta en Google Maps."
    />
  );
}
