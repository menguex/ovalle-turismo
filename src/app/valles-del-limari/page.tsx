import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { VallesLimariShowcase } from "@/components/sections/VallesLimariShowcase";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Valles del Limarí",
  description:
    "Explora Ovalle, Monte Patria, Punitaqui, Río Hurtado y Combarbalá: vino, pisco, gastronomía y naturaleza en el corazón del norte chico.",
};

export default function VallesPage() {
  return (
    <>
      <PageHero
        icon="valles"
        eyebrow="Territorio"
        title="Conecta con la esencia del valle"
        subtitle="Ovalle · Monte Patria · Punitaqui · Río Hurtado · Combarbalá"
        videoKey="vallesHero"
        image={IMAGES.vinedos}
      />
      <VallesLimariShowcase />
      <PlannerCTA />
    </>
  );
}
