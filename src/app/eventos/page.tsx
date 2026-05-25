import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { EventsShowcase } from "@/components/sections/EventsShowcase";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Eventos y Panoramas",
};

export default function EventosPage() {
  return (
    <>
      <PageHero
        icon="eventos"
        eyebrow="Agenda"
        title="Panoramas imperdibles en Ovalle"
        subtitle="Temporada estival con fiestas costumbristas, ferias, festivales y eventos para disfrutar en familia, con amigos o en pareja."
        image={IMAGES.plazaEvent}
      />
      <EventsShowcase fullPage />
      <PlannerCTA />
    </>
  );
}
