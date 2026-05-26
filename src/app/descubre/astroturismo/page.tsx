import { Moon } from "lucide-react";
import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { AstroturismoShowcase } from "@/components/sections/descubre/AstroturismoShowcase";
import { OpenFichaButton } from "@/components/ui/OpenFichaButton";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageIntro, PagePanel } from "@/components/ui/PagePanel";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Astroturismo",
};

export default function AstroturismoPage() {
  return (
    <>
      <PageHero
        icon="astroturismo"
        eyebrow="Astroturismo"
        title="Cuando cae el sol, Ovalle despierta otro paisaje"
        subtitle="Contempla cielos únicos en el Valle del Limarí: reservas Starlight, patrimonio nocturno y alojamientos especializados en observación astronómica."
        image={IMAGES.encanto}
      />
      <section className="bg-night py-16 text-white lg:py-24">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <PagePanel variant="dark" className="p-8 lg:p-10">
            <IconBadge icon={Moon} size="sm" variant="hero" className="mb-4" />
            <h2 className="font-display text-display-sm text-white text-balance">
              Cielos del norte
            </h2>
            <p className="text-on-dark-muted mt-5 text-body-md leading-relaxed">
              El clima semiárido del Limarí ofrece noches despejadas, horizontes abiertos y baja
              contaminación lumínica — condiciones ideales para astroturismo entre abril y
              septiembre.
            </p>
            <ul className="text-on-dark-muted mt-8 space-y-3 text-body-sm">
              <li className="flex gap-2">
                <span className="text-brand-yellow">·</span>
                Reserva Starlight en Fray Jorge (UNESCO)
              </li>
              <li className="flex gap-2">
                <span className="text-brand-yellow">·</span>
                Valle del Encanto como escenario nocturno
              </li>
              <li className="flex gap-2">
                <span className="text-brand-yellow">·</span>
                Tours con guías y telescopio en el valle
              </li>
              <li className="flex gap-2">
                <span className="text-brand-yellow">·</span>
                Alojamientos astro con experiencias incluidas
              </li>
            </ul>
          </PagePanel>
          <PagePanel variant="dark" className="p-8 lg:p-10">
            <OpenFichaButton fichaId="viento-sur" tone="dark" embedded>
              <p className="eyebrow-on-dark">Referencia del valle</p>
              <h3 className="mt-3 font-display text-2xl text-white text-balance">
                Viento Sur Astroturismo
              </h3>
              <p className="text-on-dark-muted mt-3 text-body-sm leading-relaxed">
                Astrocamping en la Reserva Starlight Fray Jorge: cabañas, camping y tours
                astronómicos bajo cielos certificados UNESCO.
              </p>
            </OpenFichaButton>
          </PagePanel>
        </div>
      </section>
      <PageIntro className="!py-12 lg:!py-16">
        <p className="lead">
          Ovalle invita a descubrir el valle también de noche: observación con operadores locales,
          patrimonio bajo las estrellas y alojamientos pensados para quienes viajan siguiendo el
          cielo.
        </p>
      </PageIntro>
      <AstroturismoShowcase />
      <PlannerCTA />
    </>
  );
}
