"use client";

import SiteImage from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

type SectionCinematicBackgroundProps = {
  poster: string;
  alt: string;
  overlayClassName?: string;
  className?: string;
  priority?: boolean;
};

/** Fondo fiable con foto HD + zoom suave (sin depender de YouTube) */
export function SectionCinematicBackground({
  poster,
  alt,
  overlayClassName = "bg-gradient-to-b from-night/72 via-night/48 to-night/78",
  className,
  priority = false,
}: SectionCinematicBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <SiteImage
        src={poster}
        alt={alt}
        fill
        priority={priority}
        quality={92}
        sizes="100vw"
        className="animate-ken-burns-loop object-cover"
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_0%,rgba(11,13,23,0.25)_100%)]" />
    </div>
  );
}
