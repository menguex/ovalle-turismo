import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { NaturalezaShowcase } from "@/components/sections/descubre/NaturalezaShowcase";
import { PageIntro } from "@/components/ui/PagePanel";
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
          Desde el majestuoso Valle del Encanto hasta las imponentes formaciones del Parque
          Nacional Bosque Fray Jorge, cada rincón ofrece paisajes únicos, biodiversidad
          sorprendente y una conexión profunda con la naturaleza. Humedales costeros, parques
          familiares y bosques valdivianos en pleno desierto te esperan en la Región de Coquimbo.
        </p>
      </PageIntro>
      <NaturalezaShowcase />
      <PlannerCTA />
    </>
  );
}
