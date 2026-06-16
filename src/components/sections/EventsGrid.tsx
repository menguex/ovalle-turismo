"use client";

import SiteImage from "@/components/ui/SiteImage";
import { CalendarDays, MapPin } from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

export function EventsGrid({
  events,
  variant = "carousel",
}: {
  events: readonly Ficha[];
  variant?: "carousel" | "list";
}) {
  const fichaCtx = useFichaOptional();

  if (variant === "list") {
    return (
      <div className="container-wide space-y-8">
        {events.map((event) => (
          <EventListCard
            key={event.id}
            event={event}
            onOpen={() => fichaCtx?.openFicha(event.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container-wide flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          onClick={() => fichaCtx?.openFicha(event.id)}
          className="w-[85vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-surface-elevated text-left card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40 sm:w-[360px]"
        >
          <div className="relative aspect-[16/10]">
            <SiteImage src={event.image} alt={fichaLabel(event)} fill className="object-cover" />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-copper">
              <CalendarDays size={16} />
              <span className="font-accent text-xs uppercase tracking-wider">{event.date}</span>
            </div>
            <h3 className="font-display text-2xl text-fg">{fichaLabel(event)}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-fg">{event.description}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <MapPin size={14} /> {event.location}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function EventListCard({ event, onOpen }: { event: Ficha; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "grid w-full overflow-hidden rounded-[2rem] border border-border bg-surface text-left shadow-sm transition hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40 lg:grid-cols-[360px_1fr]"
      )}
    >
      <div className="relative min-h-[240px]">
        <SiteImage src={event.image} alt={fichaLabel(event)} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-10">
        <div className="mb-3 flex items-center gap-2 text-copper">
          <CalendarDays size={16} />
          <span className="font-accent text-xs uppercase tracking-wider">{event.date}</span>
        </div>
        <h2 className="font-display text-3xl text-fg">{fichaLabel(event)}</h2>
        <p className="mt-4 leading-relaxed text-muted-fg">{event.description}</p>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <MapPin size={14} /> {event.location}
        </p>
        <span className="mt-4 font-accent text-xs uppercase tracking-wider text-copper">
          Ver ficha →
        </span>
      </div>
    </button>
  );
}
