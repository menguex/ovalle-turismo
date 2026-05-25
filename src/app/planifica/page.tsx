import { TripPlannerSection } from "@/components/sections/TripPlannerWizard";
import { PageHero } from "@/components/sections/PageHero";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Planifica tu viaje",
  description:
    "Arma tu experiencia en Ovalle paso a paso: duración, intereses, fechas y ruta personalizada por el Valle del Limarí.",
};

export default function PlanificaPage() {
  return (
    <>
      <PageHero
        icon="planifica"
        eyebrow="Planificador interactivo"
        title="Diseña tu experiencia en el Limarí"
        subtitle="Cinco pasos guiados para armar una ruta única: tiempo, intereses, compañía y fechas."
        image={IMAGES.limari}
      />
      <TripPlannerSection />
    </>
  );
}
