import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { SectionVideoBackground } from "@/components/ui/SectionVideoBackground";
import { BrandShapes } from "@/components/brand/BrandShapes";
import { getPageIcon, type PageIconKey } from "@/lib/icons/page-icons";
import { REGIONAL_VIDEOS } from "@/lib/data/site";

export function PageHero({
  title,
  subtitle,
  image,
  eyebrow,
  icon,
}: {
  title: string;
  subtitle?: string;
  image: string;
  eyebrow?: string;
  icon?: PageIconKey;
}) {
  const Icon = icon ? getPageIcon(icon) : null;

  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-28 md:pt-36">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover animate-ken-burns"
        sizes="100vw"
      />
      <BrandShapes variant="page" parallax />
      <div className="absolute inset-0 gradient-overlay" />
      <div className="container-wide relative z-10 pb-14 pt-10">
        {eyebrow && (
          <p className="pill-badge-warm glass-tech-hero mb-3 inline-flex items-center gap-2 !border-white/15 !bg-white/5 !text-brand-yellow">
            {Icon && <Icon size={13} strokeWidth={1.75} />}
            {eyebrow}
          </p>
        )}
        <div className="glass-tech-hero gradient-border gradient-border-animated animate-fade-up max-w-4xl rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4 sm:gap-5">
            {Icon && <IconBadge icon={Icon} size="lg" variant="hero" className="hidden sm:inline-flex" />}
            <div className="min-w-0 flex-1">
              <h1 className="heading-lg max-w-4xl text-white">{title}</h1>
              {subtitle && (
                <p className="mt-4 max-w-2xl text-pretty font-sans text-body-lg text-sand/85">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlannerCTA() {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-white lg:py-28">
      <SectionVideoBackground
        src={REGIONAL_VIDEOS.planificaValle.src}
        poster={REGIONAL_VIDEOS.planificaValle.poster}
        alt={REGIONAL_VIDEOS.planificaValle.title}
        playbackRate={REGIONAL_VIDEOS.planificaValle.playbackRate}
        videoClassName="video-bg-dim-cinematic transition-opacity duration-[1.6s] ease-out"
        overlayClassName="bg-gradient-to-t from-black/92 via-black/78 to-black/70"
        priority
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(11,13,23,0.15),rgba(11,13,23,0.75))]"
        aria-hidden
      />
      <div className="container-wide relative z-10">
        <div className="glass-tech-hero gradient-border mx-auto max-w-3xl rounded-[2rem] p-10 text-center lg:p-12">
          <IconBadge icon={getPageIcon("planifica")} size="md" variant="hero" className="mx-auto mb-5" />
          <p className="eyebrow-light">Planifica</p>
          <h2 className="heading-lg mt-4 text-white">¿Cuántos días tienes en el valle?</h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty font-sans text-body-lg text-sand/90">
            Cuéntanos tus fechas e intereses y te sugerimos una ruta personalizada
            por Ovalle y el Limarí.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/planifica" variant="primary" className="gradient-border rounded-full !bg-gold !text-night hover:!bg-white">
              Planificar mi viaje
            </Button>
            <Button href="/contacto" variant="secondary">
              Contactar asesor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
