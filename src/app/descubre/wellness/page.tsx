import SiteImage from "@/components/ui/SiteImage";
import { Leaf, Sparkles, Wine } from "lucide-react";
import { PageHero, PlannerCTA } from "@/components/sections/PageHero";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageIntro, PagePanel } from "@/components/ui/PagePanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { LIMARI_EXPERIENCES } from "@/lib/data/fichas";
import { IMAGES } from "@/lib/data/site";

const wellnessBlocks = [
  { title: "Conecta con la tierra", text: "Viñas del Valle del Limarí y enoturismo de autor.", icon: Wine },
  { title: "Relájate y renueva energías", text: "Experiencias de bienestar, naturaleza y calma.", icon: Leaf },
  { title: "Sabores del territorio", text: "Gastronomía local y productos con identidad.", icon: Sparkles },
] as const;

const wellnessImages = [
  { src: IMAGES.rutaWellness, alt: "Paisaje de la ruta enoturística y wellness en Ovalle" },
  { src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/DSC_1767-1024x684.jpg", alt: "Viñedos del Valle del Limarí" },
  { src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/DSC_1800-1024x684.jpg", alt: "Experiencia de bienestar entre viñas" },
  { src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/Hacienda-Santa-Cristina-3-1024x576.webp", alt: "Hacienda Santa Cristina en Ovalle" },
  { src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/mesa_terraza_haciend_uobta.jpg", alt: "Terraza y gastronomía en hacienda del valle" },
  { src: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2026/01/image17-1024x683.jpeg", alt: "Momento de calma en la ruta wellness" },
] as const;

export const metadata = {
  title: "Ruta Enoturística y de Bienestar",
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        icon="wellness"
        eyebrow="Wellness"
        title="Desacelera. El Limarí sabe esperar."
        subtitle="Una experiencia que conecta el vino, la naturaleza y el bienestar."
        image={IMAGES.rutaWellness}
      />
      <section className="py-16 lg:py-20">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {wellnessBlocks.map((block) => (
            <PagePanel key={block.title} className="p-8">
              <IconBadge icon={block.icon} size="sm" variant="brand" className="mb-4" />
              <h2 className="font-display text-2xl text-fg">{block.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-fg">{block.text}</p>
            </PagePanel>
          ))}
        </div>
        <PageIntro className="mt-12 !p-8">
          <p>
            A veces, lo que necesitas es detenerte, respirar y disfrutar. La Ruta
            Enoturística y de Bienestar Ovalle combina viñedos, paisaje y momentos
            de calma en el valle.
          </p>
        </PageIntro>
        <div className="container-wide mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wellnessImages.map((item) => (
            <div key={item.src} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <SiteImage src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface-elevated py-20 lg:py-28">
        <div className="container-wide mb-10">
          <SectionHeading
            icon={HOME_SECTION_ICONS.experiences}
            eyebrow="Ruta wellness"
            title="Experiencias de la ruta"
            description="Descubre los sabores, paisajes y tradiciones que dan vida al Valle del Limarí. Haz clic en cada experiencia para ver su ficha."
          />
        </div>
        <InteractiveCardGrid items={LIMARI_EXPERIENCES} />
      </section>
      <PlannerCTA />
    </>
  );
}
