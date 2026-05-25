"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

export function InteractiveCardGrid({
  items,
  className,
}: {
  items: readonly Ficha[];
  className?: string;
}) {
  const fichaCtx = useFichaOptional();

  return (
    <div className={cn("container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => {
        const label = fichaLabel(item);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => fichaCtx?.openFicha(item.id)}
            className="group tech-card-frame overflow-hidden text-left card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={label}
                fill
                className="object-cover transition duration-700 ease-premium group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 font-accent text-[10px] uppercase tracking-wider text-night opacity-0 transition group-hover:opacity-100">
                Ver ficha
                <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="p-6">
              {item.type && <p className="eyebrow !text-[10px]">{item.type}</p>}
              <h3 className="heading-md mt-1">{label}</h3>
              {item.description && (
                <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted-fg">
                  {item.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
