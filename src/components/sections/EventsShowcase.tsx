"use client";

import { useMemo, useState } from "react";
import SiteImage from "@/components/ui/SiteImage";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import { EVENTS } from "@/lib/data/fichas";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { HOME_SECTION_ICONS, PAGE_ICONS } from "@/lib/icons/page-icons";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionVideoBackground } from "@/components/ui/SectionVideoBackground";
import { cn } from "@/lib/utils";
import { REGIONAL_VIDEOS } from "@/lib/data/site";

const FILTERS = ["Todos", "Fiesta costumbrista", "Festival", "Cultural", "Festival urbano"] as const;

export function EventsShowcase({ fullPage = false }: { fullPage?: boolean }) {
  const fichaCtx = useFichaOptional();
  const [filter, setFilter] = useState<string>("Todos");

  const defaultFeatured = EVENTS.find((e) => e.featured) ?? EVENTS[EVENTS.length - 1];

  const filtered = useMemo(() => {
    if (filter === "Todos") return EVENTS;
    return EVENTS.filter((e) => e.type === filter);
  }, [filter]);

  const featured = useMemo(() => {
    if (!fullPage) return defaultFeatured;
    if (filter === "Todos") return defaultFeatured;
    return filtered.find((e) => e.featured) ?? filtered[0] ?? defaultFeatured;
  }, [fullPage, filter, filtered, defaultFeatured]);

  const timelineEvents = useMemo(() => {
    if (fullPage) {
      return filtered.filter((e) => e.id !== featured.id);
    }
    return EVENTS.filter((e) => e.id !== defaultFeatured.id);
  }, [fullPage, filtered, featured, defaultFeatured]);

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 lg:py-28",
        fullPage ? "bg-bg" : "text-white"
      )}
    >
      {!fullPage && (
        <>
          <SectionVideoBackground
            src={REGIONAL_VIDEOS.eventosVerano.src}
            poster={REGIONAL_VIDEOS.eventosVerano.poster}
            alt={REGIONAL_VIDEOS.eventosVerano.title}
            playbackRate={REGIONAL_VIDEOS.eventosVerano.playbackRate}
            ambient
            overlayClassName="bg-gradient-to-b from-night/94 via-night/82 to-night/92"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_55%_at_50%_40%,rgba(11,13,23,0.35),rgba(11,13,23,0.72))]"
            aria-hidden
          />
        </>
      )}

      <div className="container-wide relative z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              dark={!fullPage}
              icon={fullPage ? PAGE_ICONS.eventos : HOME_SECTION_ICONS.events}
              eyebrow="Agenda estival 2026"
              title="Panoramas que llenan el valle de vida"
              description="Fiestas costumbristas, vendimia, boulevards y cultura local. El verano en Ovalle es tradición, sabor y encuentro bajo el mismo cielo."
              className="max-w-2xl"
            />
            <Link
              href="/eventos"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-accent text-sm uppercase tracking-wider transition",
                fullPage
                  ? "border-border text-fg hover:border-copper/40 hover:bg-surface-elevated"
                  : "border-white/25 bg-night/55 text-mist backdrop-blur-sm hover:border-gold/40 hover:bg-night/70"
              )}
            >
              Ver agenda completa
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={0.05}>
          <div
            className={cn(
              "mb-10 grid grid-cols-2 gap-4 rounded-2xl border p-4 sm:grid-cols-4 lg:p-5",
                fullPage
                  ? "border-border bg-surface-elevated"
                  : "border-white/15 bg-night/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
            )}
          >
            {[
              { icon: CalendarDays, value: "5+", label: "Panoramas feb." },
              { icon: Users, value: "50 mil", label: "Vendimia 2026" },
              { icon: Music, value: "Verano", label: "Temporada activa" },
              { icon: Sparkles, value: "Gratis", label: "Varios eventos" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-2">
                <stat.icon
                  size={18}
                  className={fullPage ? "text-copper" : "text-gold"}
                />
                <div>
                  <p
                    className={cn(
                      "font-display text-lg font-bold leading-none",
                      fullPage ? "text-fg" : "text-mist"
                    )}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 font-accent text-[10px] uppercase tracking-wider",
                      fullPage ? "text-muted" : "text-sand/75"
                    )}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Filters (full page) */}
        {fullPage && (
          <Reveal delay={0.08}>
            <div className="mb-8 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-2 font-accent text-[10px] uppercase tracking-wider transition",
                    filter === f
                      ? "bg-copper text-white"
                      : "border border-border bg-surface text-muted-fg hover:border-copper/30"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* Featured + Timeline */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal delay={0.1}>
            <FeaturedEventCard
              event={featured}
              onOpen={() => fichaCtx?.openFicha(featured.id)}
            />
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className={cn(
                "rounded-[2rem] border p-6 lg:p-8",
                fullPage
                  ? "border-border bg-surface"
                  : "border-white/15 bg-night/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
              )}
            >
              <p
                className={cn(
                  "mb-6 font-accent text-label-sm uppercase tracking-wider",
                  fullPage ? "text-copper" : "text-gold"
                )}
              >
                Calendario del mes
              </p>
              <div className="space-y-1">
                {timelineEvents.map((event, i) => (
                  <TimelineRow
                    key={event.id}
                    event={event}
                    isLast={i === timelineEvents.length - 1}
                    onOpen={() => fichaCtx?.openFicha(event.id)}
                    dark={!fullPage}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carousel row (home only) */}
        {!fullPage && (
          <Reveal delay={0.2} className="mt-10">
            <p className="mb-4 font-accent text-label-sm uppercase tracking-wider text-sand/75">
              Más panoramas
            </p>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {EVENTS.map((event) => (
                <EventMiniCard
                  key={event.id}
                  event={event}
                  onOpen={() => fichaCtx?.openFicha(event.id)}
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function FeaturedEventCard({
  event,
  onOpen,
}: {
  event: Ficha;
  onOpen: () => void;
  dark?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group gradient-border flex w-full flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-night text-left shadow-[0_24px_80px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-[5/3]">
        <SiteImage
          src={event.image}
          alt={fichaLabel(event)}
          fill
          className="object-cover object-[center_18%] contrast-[1.08] saturate-[1.14] transition duration-[1.15s] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 100vw, 55vw"
          quality={95}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-night/55 to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {event.badge && (
            <span className="rounded-full bg-copper px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-white shadow-lg">
              {event.badge}
            </span>
          )}
          <span className="rounded-full border border-white/30 bg-night/55 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-sand backdrop-blur-md">
            {event.type}
          </span>
        </div>

        <p className="absolute bottom-4 left-5 flex items-center gap-2 font-accent text-xs uppercase tracking-wider text-gold drop-shadow-md">
          <CalendarDays size={14} />
          {event.date}
        </p>
      </div>

      <div className="relative border-t border-gold/25 bg-[linear-gradient(165deg,rgba(18,20,31,0.98)_0%,rgba(11,13,23,1)_55%,rgba(61,143,217,0.12)_100%)] p-6 sm:p-7 lg:p-8">
        <h3 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-[2rem] lg:leading-tight">
          {fichaLabel(event)}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-sand/90 lg:text-[0.95rem]">
          {event.description}
        </p>
        {event.highlights && (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] text-sand/95"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-sand/80">
            <MapPin size={14} className="shrink-0 text-gold" />
            {event.location}
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night shadow-[0_6px_20px_rgba(255,203,5,0.22)] transition group-hover:brightness-105">
            Abrir ficha del evento
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function TimelineRow({
  event,
  isLast,
  onOpen,
  dark,
}: {
  event: Ficha;
  isLast: boolean;
  onOpen: () => void;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex w-full gap-4 rounded-xl p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40",
        dark ? "hover:bg-night/55" : "hover:bg-surface-elevated"
      )}
    >
      <div className="flex flex-col items-center pt-1">
        <span
          className={cn(
            "flex h-3 w-3 shrink-0 rounded-full border-2 transition",
            dark
              ? "border-gold bg-gold/30 group-hover:bg-gold"
              : "border-copper bg-copper/20 group-hover:bg-copper"
          )}
        />
        {!isLast && (
          <span
            className={cn(
              "mt-1 w-px flex-1 min-h-[2rem]",
              dark ? "bg-white/15" : "bg-border"
            )}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-4">
        <p
          className={cn(
            "font-accent text-[10px] uppercase tracking-wider",
            dark ? "text-gold" : "text-copper"
          )}
        >
          {event.date}
        </p>
        <p
          className={cn(
            "mt-0.5 font-display text-base font-semibold",
            dark ? "text-mist" : "text-fg"
          )}
        >
          {fichaLabel(event)}
        </p>
        <p
          className={cn(
            "mt-1 line-clamp-1 text-xs",
            dark ? "text-sand/75" : "text-muted"
          )}
        >
          {event.location}
        </p>
      </div>
      <ArrowUpRight
        size={16}
        className={cn(
          "mt-2 shrink-0 opacity-0 transition group-hover:opacity-100",
          dark ? "text-gold" : "text-copper"
        )}
      />
    </button>
  );
}

function EventMiniCard({ event, onOpen }: { event: Ficha; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-night/70 text-left shadow-lg backdrop-blur-md transition hover:border-gold/30 hover:bg-night/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
    >
      <div className="relative aspect-[16/10]">
        <SiteImage src={event.image} alt={fichaLabel(event)} fill className="object-cover" />
        {event.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-copper px-2 py-0.5 font-accent text-[9px] uppercase tracking-wider text-white">
            {event.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-accent text-[10px] uppercase tracking-wider text-gold">
          {event.date}
        </p>
        <h4 className="mt-1 line-clamp-2 font-display text-sm font-semibold text-mist">
          {fichaLabel(event)}
        </h4>
      </div>
    </button>
  );
}
