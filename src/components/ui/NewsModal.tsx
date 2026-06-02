"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Share2, X } from "lucide-react";
import type { NewsItem } from "@/lib/data/site";
import { NEWS } from "@/lib/data/site";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { formatChileDate } from "@/lib/utils";

type NewsModalProps = {
  post: NewsItem | null;
  onClose: () => void;
  onOpenPost: (slug: string) => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  Vendimia: "bg-copper/15 text-copper border-copper/25",
  Agenda: "bg-river/15 text-river border-river/25",
  Turismo: "bg-olive/15 text-olive border-olive/25",
};

export function NewsModal({ post, onClose, onOpenPost }: NewsModalProps) {
  useScrollLock(Boolean(post));

  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, onClose]);

  const related = post ? NEWS.filter((n) => n.slug !== post.slug).slice(0, 2) : [];

  const share = () => {
    if (!post) return;
    const url = `${window.location.origin}/noticias?noticia=${post.slug}`;
    if (navigator.share) {
      void navigator.share({ title: post.title, url });
    } else {
      void navigator.clipboard.writeText(url);
    }
  };

  return (
    <AnimatePresence>
      {post && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden overscroll-none sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Cerrar noticia"
            className="absolute inset-0 bg-night/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            className="relative z-10 flex max-h-[min(92vh,100dvh)] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border border-border bg-surface shadow-2xl sm:max-h-[92vh] sm:rounded-[2rem]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/9] shrink-0 sm:aspect-[21/9]">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span
                  className={`inline-block rounded-full border px-3 py-1 font-accent text-[10px] uppercase tracking-wider ${
                    CATEGORY_COLORS[post.category] ?? "border-border bg-surface/80 text-fg"
                  }`}
                >
                  {post.category}
                </span>
                <h2
                  id="news-modal-title"
                  className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl"
                >
                  {post.title}
                </h2>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-fg">
                <time className="font-accent text-xs uppercase tracking-wider text-copper">
                  {formatChileDate(post.date)}
                </time>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime} min de lectura
                </span>
                <button
                  type="button"
                  onClick={share}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs transition hover:bg-surface-elevated"
                >
                  <Share2 size={13} />
                  Compartir
                </button>
              </div>

              <p className="mt-6 text-lg font-medium leading-relaxed text-fg">{post.excerpt}</p>
              <div className="prose-valle mt-6 space-y-4 text-base leading-relaxed text-muted-fg">
                <p>{post.body}</p>
              </div>

              {related.length > 0 && (
                <div className="mt-10 border-t border-border pt-8">
                  <p className="font-accent text-xs uppercase tracking-wider text-copper">
                    También te puede interesar
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {related.map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => onOpenPost(item.slug)}
                        className="group flex gap-3 rounded-2xl border border-border bg-surface-elevated p-3 text-left transition hover:border-copper/30"
                      >
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition group-hover:scale-105"
                          />
                        </div>
                        <p className="line-clamp-3 text-sm font-medium text-fg">{item.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
