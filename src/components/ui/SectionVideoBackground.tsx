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
    color: "white",
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
    if (inView) setMounted(true);
  }, [inView]);

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
