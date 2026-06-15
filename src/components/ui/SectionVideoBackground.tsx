"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionVideoBackgroundProps = {
  poster: string;
  alt: string;
  /** MP4/WebM local — opcional si hay youtubeId */
  src?: string;
  /** Video de YouTube sobre Ovalle / Limarí (autoplay silenciado) */
  youtubeId?: string;
  overlayClassName?: string;
  className?: string;
  scrim?: boolean;
  ambient?: boolean;
  priority?: boolean;
};

function buildYoutubeEmbedUrl(youtubeId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: youtubeId,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

export function SectionVideoBackground({
  src,
  youtubeId,
  poster,
  alt,
  overlayClassName,
  className,
  scrim = true,
  ambient = false,
  priority = false,
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
    if (!video || reduced || youtubeId) return;

    if (inView) {
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduced, youtubeId]);

  useEffect(() => {
    if (!inView) setReady(false);
  }, [inView]);

  const showVideo = ready && !reduced && inView;

  return (
    <div ref={containerRef} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <Image
        src={poster}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-700",
          ambient && "scale-105",
          showVideo ? "opacity-0" : "opacity-100"
        )}
        sizes={priority ? "(max-width:1024px) 100vw, 60vw" : "100vw"}
        priority={priority}
      />

      {!reduced && inView && youtubeId && (
        <iframe
          title={alt}
          className={cn(
            "absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700",
            ambient
              ? "h-[130%] w-[130%] brightness-[0.55] saturate-[0.88] contrast-[1.05]"
              : "h-[120%] w-[120%]",
            showVideo ? "opacity-100" : "opacity-0"
          )}
          src={buildYoutubeEmbedUrl(youtubeId)}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading={priority ? "eager" : "lazy"}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setReady(true)}
        />
      )}

      {!reduced && src && !youtubeId && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            ambient && "scale-110 brightness-[0.55] saturate-[0.88] contrast-[1.05]",
            showVideo ? "opacity-100" : "opacity-0"
          )}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-hidden
          onCanPlay={() => setReady(true)}
        />
      )}

      {scrim && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-night/90 via-night/55 to-night/35",
            overlayClassName
          )}
          aria-hidden
        />
      )}
    </div>
  );
}
