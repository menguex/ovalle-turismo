import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { PageIntro } from "@/components/ui/PagePanel";
import { CULTURAL_ATTRACTIONS } from "@/lib/data/fichas";
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
          Ovalle es un territorio lleno de historia, identidad y conocimiento.
          Ideal para quienes buscan aprender y conectarse con la riqueza
          cultural del valle.
        </p>
      </PageIntro>
      <section className="pb-20 lg:pb-28">
        <InteractiveCardGrid items={CULTURAL_ATTRACTIONS} />
      </section>
      <PlannerCTA />
    </>
  );
}
