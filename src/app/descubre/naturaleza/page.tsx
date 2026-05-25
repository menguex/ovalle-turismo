import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { PageIntro } from "@/components/ui/PagePanel";
import { NATURAL_ATTRACTIONS } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Naturaleza",
};

export default function NaturalezaPage() {
  return (
    <>
      <PageHero
        icon="naturaleza"
        eyebrow="Naturaleza"
        title="Paisajes que llevan millones de años esperándote"
        subtitle="Descubre la riqueza natural de Ovalle, un destino donde el desierto florece y los valles verdes te invitan a explorar."
        image={IMAGES.frayJorge}
      />
      <PageIntro>
        <p>
          Desde el majestuoso Valle del Encanto hasta las imponentes formaciones
          del Parque Nacional Bosque Fray Jorge, cada rincón ofrece paisajes
          únicos, biodiversidad sorprendente y una conexión profunda con la
          naturaleza. Vive la magia natural de la Región de Coquimbo.
        </p>
      </PageIntro>
      <section className="pb-20 lg:pb-28">
        <InteractiveCardGrid items={NATURAL_ATTRACTIONS} />
      </section>
      <PlannerCTA />
    </>
  );
}
