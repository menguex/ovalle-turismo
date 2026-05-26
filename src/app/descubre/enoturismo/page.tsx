import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { EnoturismoShowcase } from "@/components/sections/descubre/EnoturismoShowcase";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { PageIntro, PagePanel } from "@/components/ui/PagePanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WINERIES } from "@/lib/data/fichas";
import { ENOTURISMO_HISTORY, IMAGES, PISQUERAS_HISTORY } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";

export const metadata = {
  title: "Enoturismo",
};

/** Productos gourmet y embotellados — complemento a la ruta visitable */
const ENOTURISMO_PRODUCTS = WINERIES.filter(
  (w) => !["Viña", "Pisquería", "Quesería", "Espumante"].includes(w.type ?? "")
);

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
        {ENOTURISMO_HISTORY.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </PageIntro>
      <EnoturismoShowcase />
      {ENOTURISMO_PRODUCTS.length > 0 && (
        <section className="border-t border-border py-16 lg:py-24">
          <div className="container-wide mb-10">
            <SectionHeading
              icon={PAGE_ICONS.enoturismo}
              eyebrow="Productos del valle"
              title="Sabores para llevar"
              description="Piscos premium, espumantes, aceites y coctelería con identidad limarí — complemento ideal de tu ruta enoturística."
            />
          </div>
          <InteractiveCardGrid items={ENOTURISMO_PRODUCTS} pageSize={6} />
        </section>
      )}
      <section className="pb-20 lg:pb-28">
        <div className="container-wide mb-8">
          <h2 className="font-display text-3xl text-fg">Pisquerías del Limarí</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-fg">
            Tradición pisquera artesanal en el valle — desde la cooperativa histórica hasta
            destilerías y propuestas locales.
          </p>
        </div>
        <PagePanel className="container-wide !mt-0 p-8 lg:p-10">
          {PISQUERAS_HISTORY.map((p) => (
            <p key={p.slice(0, 32)} className="text-sm leading-relaxed text-muted-fg [&+&]:mt-4">
              {p}
            </p>
          ))}
        </PagePanel>
      </section>
      <PlannerCTA />
    </>
  );
}
