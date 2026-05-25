import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { PageIntro } from "@/components/ui/PagePanel";
import { WINERIES } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";

export const metadata = {
  title: "Enoturismo",
};

export default function EnoturismoPage() {
  return (
    <>
      <PageHero
        icon="enoturismo"
        eyebrow="Enoturismo"
        title="El valle también se bebe"
        subtitle="Viñas, pisquerías y tradición vitivinícola en el corazón del norte chico."
        image={IMAGES.vinedos}
      />
      <PageIntro>
        <p>
          Descubre el enoturismo en Ovalle y sus viñas, donde la tradición
          vitivinícola se combina con paisajes de valle y una cocina local de
          sabor único.
        </p>
        <p>
          En las últimas décadas, Limarí emergió como potencia para Chardonnay,
          aprovechando su clima fresco y suelos calcareos. El Valle del Limarí,
          con influencia marina y camanchaca, ofrece vinos con acidez marcada y
          mineralidad.
        </p>
        <p>
          Ovalle te invita a vivir una experiencia enoturística única: visita
          viñas, degustaciones y tradición vitivinícola en el corazón del norte
          chico.
        </p>
      </PageIntro>
      <section className="pb-20 lg:pb-28">
        <InteractiveCardGrid items={WINERIES} />
      </section>
      <PlannerCTA />
    </>
  );
}
