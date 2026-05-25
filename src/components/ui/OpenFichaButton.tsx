"use client";

import { ArrowUpRight } from "lucide-react";
import { useFicha } from "@/components/providers/FichaProvider";
import { cn } from "@/lib/utils";

export function OpenFichaButton({
  fichaId,
  children,
  className,
  tone = "dark",
  embedded = false,
}: {
  fichaId: string;
  children: React.ReactNode;
  className?: string;
  /** Colores para fondo oscuro o claro */
  tone?: "dark" | "light";
  /** Sin borde propio cuando va dentro de un panel */
  embedded?: boolean;
}) {
  const { openFicha } = useFicha();

  return (
    <button
      type="button"
      onClick={() => openFicha(fichaId)}
      className={cn(
        "group w-full text-left transition focus:outline-none focus-visible:ring-2",
        embedded
          ? "rounded-2xl border-0 bg-transparent p-0 focus-visible:ring-brand-yellow/40"
          : tone === "dark"
            ? "rounded-3xl border border-white/15 bg-white/8 p-8 backdrop-blur hover:border-brand-yellow/35 hover:bg-white/12 focus-visible:ring-brand-yellow/40"
            : "rounded-3xl border border-border bg-surface p-8 hover:border-brand-orange/30 hover:bg-surface-elevated focus-visible:ring-brand-orange/30",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "mt-4 inline-flex items-center gap-1 font-accent text-xs uppercase tracking-wider",
          tone === "dark" ? "text-brand-yellow" : "text-brand-orange"
        )}
      >
        Ver ficha completa
        <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
