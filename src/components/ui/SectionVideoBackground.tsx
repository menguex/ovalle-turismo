"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionVideoBackgroundProps = {
  src: string;
  poster: string;
  alt: string;
  /** Tailwind classes for the scrim over the video */
  overlayClassName?: string;
  className?: string;
};

export function SectionVideoBackground({
  src,
  poster,
  alt,
  overlayClassName,
  className,
}: SectionVideoBackgroundProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    if (inView) {
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduced]);

  return (
    <div ref={containerRef} className={cn("pointer-events-none absolute inset-0", className)}>
      <Image
        src={poster}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-700",
          ready && !reduced ? "opacity-0" : "opacity-100"
        )}
        sizes="100vw"
        priority={false}
      />

      {!reduced && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0"
          )}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onCanPlay={() => setReady(true)}
        />
      )}

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-night/90 via-night/55 to-night/35",
          overlayClassName
        )}
        aria-hidden
      />
    </div>
  );
}
