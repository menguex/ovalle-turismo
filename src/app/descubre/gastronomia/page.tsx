import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { GastronomiaShowcase } from "@/components/sections/descubre/GastronomiaShowcase";
import { PageIntro } from "@/components/ui/PagePanel";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Gastronomía",
};

export default function GastronomiaPage() {
  return (
    <>
      <PageHero
        icon="gastronomia"
        eyebrow="Gastronomía"
        title="Sabores del territorio"
        subtitle="Tradición local y propuestas modernas que combinan lo típico del Valle del Limarí con cocina de calidad."
        image={IMAGES.gastronomia}
      />
      <PageIntro className="!py-12 lg:!py-16">
        <p className="lead">
          Descubre restaurantes, cafés y propuestas gastronómicas de Ovalle. Cada ficha incluye
          contacto, ubicación y mapa para que planifiques tu ruta con facilidad.
        </p>
      </PageIntro>
      <GastronomiaShowcase />
      <PlannerCTA />
    </>
  );
}
