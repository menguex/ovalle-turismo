import { Moon } from "lucide-react";
import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { OpenFichaButton } from "@/components/ui/OpenFichaButton";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PAGE_ICONS } from "@/lib/icons/page-icons";
import { LODGING } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Astroturismo",
};

const astroLodging = LODGING.filter((l) => l.type?.includes("Astroturismo"));

export default function AstroturismoPage() {
  return (
    <>
      <PageHero
        icon="astroturismo"
        eyebrow="Astroturismo"
        title="Cuando cae el sol, Ovalle despierta otro paisaje"
        subtitle="Contempla cielos únicos para el astroturismo. Desde el Valle del Encanto hasta alojamientos especializados como Viento Sur Astroturismo."
        image={IMAGES.encanto}
      />
      <section className="bg-night py-20 text-white lg:py-28">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <PagePanel variant="dark" className="p-8 lg:p-10">
            <IconBadge icon={Moon} size="sm" variant="hero" className="mb-4" />
            <h2 className="font-display text-4xl text-white">Cielos del norte</h2>
            <p className="text-on-dark-muted mt-6 leading-relaxed">
              Desde el turismo, Ovalle invita a descubrir el Valle del Limarí a
              través de experiencias auténticas: contemplar cielos únicos para el
              astroturismo y vivir panoramas familiares que rescatan lo simple,
              local y propio.
            </p>
            <ul className="text-on-dark-muted mt-8 space-y-4 text-sm">
              <li>· Clima semiárido con noches despejadas</li>
              <li>· Valle del Encanto como escenario nocturno</li>
              <li>· Mejor época: abril a septiembre</li>
              <li>· Alojamientos especializados en observación</li>
            </ul>
          </PagePanel>
          <PagePanel variant="dark" className="p-8 lg:p-10">
            <OpenFichaButton fichaId="viento-sur" tone="dark" embedded>
              <p className="eyebrow-on-dark">Recomendación</p>
              <h3 className="mt-3 font-display text-2xl text-white">
                Viento Sur Astroturismo
              </h3>
              <p className="text-on-dark-muted mt-3 text-sm">
                Astrocamping en la Reserva Starlight Fray Jorge: cabañas, camping y
                tours astronómicos bajo cielos certificados UNESCO.
              </p>
            </OpenFichaButton>
          </PagePanel>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container-wide mb-10">
          <SectionHeading
            icon={PAGE_ICONS.astroturismo}
            title="Alojamientos astro"
            description="Haz clic para abrir la ficha de cada alojamiento."
          />
        </div>
        <InteractiveCardGrid items={astroLodging} />
      </section>
      <PlannerCTA />
    </>
  );
}
