"use client";

import SiteImage from "@/components/ui/SiteImage";
import { Clock, Share2, X } from "lucide-react";
import { ModalShell } from "@/components/ui/ModalShell";
import type { NewsItem } from "@/lib/data/site";
import { NEWS } from "@/lib/data/site";
import { formatChileDate } from "@/lib/utils";
import { NEWS_IMAGE_QUALITY, newsImageSrc } from "@/lib/news-images";

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
    <ModalShell
      open={Boolean(post)}
      onClose={onClose}
      ariaLabelledBy="news-modal-title"
      closeLabel="Cerrar noticia"
      header={
        post ? (
          <div className="relative aspect-[16/9] max-h-[38vh] overflow-hidden sm:max-h-none sm:aspect-[21/9]">
            <SiteImage
              src={newsImageSrc(post.image)}
              alt={post.title}
              fill
              quality={NEWS_IMAGE_QUALITY}
              className="object-cover"
              sizes="(max-width:640px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-4 left-5 right-5 z-10">
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
        ) : (
          <span className="sr-only">Cerrado</span>
        )
      }
    >
      {post ? (
        <div className="p-6 pb-8 sm:p-8 sm:pb-10">
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
                      <SiteImage
                        src={newsImageSrc(item.image)}
                        alt={item.title}
                        fill
                        quality={NEWS_IMAGE_QUALITY}
                        className="object-cover transition group-hover:scale-105"
                        sizes="80px"
                      />
                    </div>
                    <p className="line-clamp-3 text-sm font-medium text-fg">{item.title}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </ModalShell>
  );
}
