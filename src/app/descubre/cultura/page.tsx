import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { CulturaShowcase } from "@/components/sections/descubre/CulturaShowcase";
import { PageIntro } from "@/components/ui/PagePanel";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Cultura y Patrimonio",
};

export default function CulturaPage() {
  return (
    <>
      <PageHero
        icon="cultura"
        eyebrow="Cultura"
        title="La piedra recuerda. La gente celebra."
        subtitle="Museos, monumentos patrimoniales y espacios educativos que invitan a recorrer las tradiciones del Limarí."
        image={IMAGES.museo}
      />
      <PageIntro>
        <p>
          Ovalle es un territorio lleno de historia, identidad y conocimiento. Museos,
          iglesias patrimoniales, pueblos tradicionales y ferias campesinas te invitan a
          conectar con la riqueza cultural del valle — ideal para quienes buscan aprender,
          recorrer y vivir las tradiciones limarinas.
        </p>
      </PageIntro>
      <CulturaShowcase />
      <PlannerCTA />
    </>
  );
}
