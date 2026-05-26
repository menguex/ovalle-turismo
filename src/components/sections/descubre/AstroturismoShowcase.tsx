"use client";

import { Moon, Sparkles, Star, Telescope } from "lucide-react";
import { DescubreExperienceHub } from "@/components/sections/DescubreExperienceHub";
import { LodgingStripSection } from "@/components/sections/descubre/LodgingStripSection";
import { ASTRO_EXPERIENCES, ASTRO_LODGING } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

const stats = [
  { icon: Star, label: "Mejor época", value: "Abr – Sep" },
  { icon: Moon, label: "Reserva Starlight", value: "Fray Jorge" },
  { icon: Telescope, label: "Operadores astro", value: "3+" },
  { icon: Sparkles, label: "Valle del Encanto", value: "~18 km" },
] as const;

const tips = [
  {
    icon: Moon,
    title: "Elige noches sin luna llena",
    text: "La observación mejora en lunas nuevas o cuarto menguante, entre abril y septiembre.",
  },
  {
    icon: Star,
    title: "Reserva alojamiento astro",
    text: "Viento Sur y cabañas cerca de Fray Jorge suelen llenarse en temporada alta. Reserva con anticipación.",
  },
  {
    icon: Telescope,
    title: "Contrata un tour guiado",
    text: "Los operadores Starlight ofrecen telescopio, interpretación y seguridad en zonas rurales.",
  },
] as const;

const gallery = [
  { src: IMAGES.encanto, alt: "Cielo nocturno en el Valle del Encanto" },
  { src: IMAGES.frayJorge, alt: "Parque Nacional Fray Jorge" },
  {
    src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/silla-480x650-1.jpg",
    alt: "Viento Sur Astroturismo",
  },
  { src: IMAGES.astro, alt: "Astroturismo en el Limarí" },
] as const;

const routes = [
  {
    icon: Moon,
    title: "Noche Starlight",
    duration: "1 noche",
    stops: "Fray Jorge → Viento Sur",
    description:
      "Día en el parque nacional y noche de observación en la Reserva Starlight con alojamiento astro especializado.",
  },
  {
    icon: Star,
    title: "Encanto bajo estrellas",
    duration: "Medio día + noche",
    stops: "Valle del Encanto → Los Pumas",
    description:
      "Recorrido patrimonial al atardecer y observación nocturna junto al monumento arqueológico.",
  },
  {
    icon: Sparkles,
    title: "Fin de semana astro",
    duration: "2–3 días",
    stops: "Ovalle → Trapiche → Fray Jorge",
    description:
      "Combina alojamiento en el valle, cielos del secano costero y la experiencia Starlight más reconocida del norte.",
  },
] as const;

export function AstroturismoShowcase() {
  return (
    <>
      <DescubreExperienceHub
        items={ASTRO_EXPERIENCES}
        stats={stats}
        tips={tips}
        routes={routes}
        gallery={gallery}
        showTour360
        mapCategory="Astroturismo"
        mapDefaultPointId="astro-limari"
        sectionIcon={PAGE_ICONS.astroturismo}
        gridEyebrow="Experiencias"
        gridTitle="Dónde mirar el cielo en el Limarí"
        gridDescription="Zonas de observación, reservas certificadas y patrimonio bajo las estrellas. Cada tarjeta abre una ficha con mapa y recomendaciones."
        mapTitle="Mapa de astroturismo"
        mapDescription="Ubica zonas de cielos limpios, alojamientos astro y puntos de observación en el valle."
      />
      <LodgingStripSection
        items={ASTRO_LODGING}
        title="Alojamientos para astroturismo"
        description="Desde astrocamping certificado hasta cabañas junto al Valle del Encanto. Cada ficha incluye contacto, mapa y cómo llegar."
      />
    </>
  );
}
