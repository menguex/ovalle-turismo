import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { ServiciosExplorer } from "@/components/sections/ServiciosExplorer";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Servicios Turísticos",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        icon="servicios"
        eyebrow="Servicios"
        title="Arma tu viaje"
        subtitle="Todo lo que necesitas para disfrutar de Ovalle: dónde comer, dónde dormir, borde costero y tour operadores locales."
        image={IMAGES.alameda}
      />
      <ServiciosExplorer />
      <PlannerCTA />
    </>
  );
}
