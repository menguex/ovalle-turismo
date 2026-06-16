"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionVideoBackgroundProps = {
  poster: string;
  alt: string;
  src?: string;
  youtubeId?: string;
  overlayClassName?: string;
  className?: string;
  scrim?: boolean;
  /** Atenúa el video para tarjetas (no usar en fondos de sección) */
  ambient?: boolean;
  /** Clases extra en el elemento video (filtros, transición, etc.) */
  videoClassName?: string;
  /** Reproduce más lento para efecto cinematográfico (solo MP4 local) */
  playbackRate?: number;
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
    fs: "0",
    autohide: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
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
  playbackRate = 1,
  videoClassName,
}: SectionVideoBackgroundProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (priority) setMounted(true);
    else if (inView) setMounted(true);
  }, [inView, priority]);

  useEffect(() => {
    if (!youtubeId || !mounted || reduced) return;
    const timer = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(timer);
  }, [youtubeId, mounted, reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced || youtubeId) return;

    if (inView) {
      video.playbackRate = playbackRate;
      const play = video.play();
      if (play) play.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduced, youtubeId, playbackRate]);

  const showVideo = ready && !reduced && (inView || mounted);

  return (
    <div ref={containerRef} className={cn("pointer-events-none absolute inset-0", className)}>
      <Image
        src={poster}
        alt={alt}
        fill
        className={cn(
          "video-bg-cover-native transition-opacity duration-700",
          showVideo ? "opacity-0" : "opacity-100"
        )}
        sizes="100vw"
        quality={90}
        priority={priority}
      />

      {!reduced && mounted && youtubeId && (
        <div className="video-bg-frame" aria-hidden>
          <iframe
            title={alt}
            className={cn(
              "video-bg-cover transition-opacity duration-700",
              ambient && "brightness-[0.55] saturate-[0.88] contrast-[1.05]",
              showVideo ? "opacity-100" : "opacity-0"
            )}
            src={buildYoutubeEmbedUrl(youtubeId)}
            allow="autoplay; encrypted-media"
            loading={priority ? "eager" : "lazy"}
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            onLoad={() => setReady(true)}
          />
        </div>
      )}

      {!reduced && src && !youtubeId && (
        <video
          ref={videoRef}
          className={cn(
            "video-bg-cover-native transition-opacity duration-700",
            ambient && "brightness-[0.55] saturate-[0.88] contrast-[1.05]",
            videoClassName,
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
            "absolute inset-0",
            overlayClassName ??
              "bg-gradient-to-t from-night/82 via-night/48 to-night/28"
          )}
          aria-hidden
        />
      )}
    </div>
  );
}
