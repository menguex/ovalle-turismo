import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { Tour360Showcase } from "@/components/sections/Tour360Showcase";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Tour 360°",
};

export default function Tour360Page() {
  return (
    <>
      <PageHero
        icon="tour-360"
        eyebrow="Inmersivo"
        title="Tours digitales interactivos"
        subtitle="Descubre Fray Jorge y el Valle del Encanto a través de experiencias virtuales inmersivas."
        image={IMAGES.frayJorge}
      />
      <Tour360Showcase variant="page" />
      <PlannerCTA />
    </>
  );
}
