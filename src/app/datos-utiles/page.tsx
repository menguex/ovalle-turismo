import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { DatosUtilesShowcase } from "@/components/sections/DatosUtilesShowcase";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Datos Útiles",
};

export default function DatosUtilesPage() {
  return (
    <>
      <PageHero
        icon="datos-utiles"
        eyebrow="Información"
        title="Datos útiles para tu visita"
        subtitle="Oficina de turismo, terminal de buses, clima y recomendaciones para planificar tu viaje."
        image={IMAGES.heroPlaza}
      />
      <DatosUtilesShowcase />
      <PlannerCTA />
    </>
  );
}
