import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { PageIntro } from "@/components/ui/PagePanel";
import { RESTAURANTS } from "@/lib/data/fichas";
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
      <PageIntro>
        <p>
          Descubre los mejores restaurantes de Ovalle y disfruta de una variada
          oferta gastronómica para todos los gustos: desde lo típico del valle
          hasta propuestas contemporáneas.
        </p>
      </PageIntro>
      <section className="pb-20 lg:pb-28">
        <InteractiveCardGrid items={RESTAURANTS} />
      </section>
      <PlannerCTA />
    </>
  );
}
