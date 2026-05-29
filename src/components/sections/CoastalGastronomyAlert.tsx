"use client";

import Link from "next/link";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { PagePanel } from "@/components/ui/PagePanel";

type CoastalGastronomyAlertProps = {
  onViewCoast?: () => void;
};

export function CoastalGastronomyAlert({ onViewCoast }: CoastalGastronomyAlertProps) {
  return (
    <PagePanel className="border-brand-orange/20 bg-brand-orange/5 p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
          <AlertCircle size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-fg">
            ¿Vas al borde costero?
          </p>
          <p className="mt-1.5 text-body-sm leading-relaxed text-muted-fg">
            En Tongoy, Puerto Velero y sectores costeros los servicios gastronómicos no siempre
            están abiertos. Te recomendamos llevar comida y agua, y contactarnos para confirmar
            disponibilidad antes de viajar.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {onViewCoast ? (
              <button
                type="button"
                onClick={onViewCoast}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-copper transition hover:underline"
              >
                Ver apartado Borde costero
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <Link
                href="/servicios#costa"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-copper transition hover:underline"
              >
                Ver apartado Borde costero
                <ArrowUpRight size={14} />
              </Link>
            )}
            <Link
              href="/contacto"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-muted-fg transition hover:text-fg"
            >
              Consultar disponibilidad
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </PagePanel>
  );
}
