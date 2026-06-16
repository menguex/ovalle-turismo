"use client";

import SiteImage from "@/components/ui/SiteImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Newspaper } from "lucide-react";
import { NEWS, type NewsItem } from "@/lib/data/site";
import { HOME_SECTION_ICONS } from "@/lib/icons/page-icons";
import { useNewsOptional } from "@/components/providers/NewsProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, formatChileDate } from "@/lib/utils";
import { NEWS_IMAGE_QUALITY, newsImageSrc } from "@/lib/news-images";

const CATEGORY_COLORS: Record<string, string> = {
  Vendimia: "bg-copper/15 text-copper border-copper/25",
  Agenda: "bg-river/15 text-river border-river/25",
  Turismo: "bg-olive/15 text-olive border-olive/25",
  Enoturismo: "bg-gold/15 text-gold border-gold/25",
  Gastronomía: "bg-copper/10 text-copper border-copper/20",
};

export function NewsShowcase({ fullPage = false }: { fullPage?: boolean }) {
  const newsCtx = useNewsOptional();
  const featured = NEWS.find((n) => "featured" in n && n.featured) ?? NEWS[0];
  const rest = NEWS.filter((n) => n.slug !== featured.slug);

  if (fullPage) {
    return (
      <section className="section-surface py-20 lg:py-28">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              icon={HOME_SECTION_ICONS.news}
              eyebrow="Archivo"
              title="Todas las noticias del Limarí"
              description="Cobertura de vendimia, agenda estival y novedades del destino."
              className="mb-10 max-w-2xl"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <FeaturedNewsCard post={featured} large onOpen={() => newsCtx?.openNews(featured.slug)} />
          </Reveal>
          <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <NewsCard post={post} onOpen={() => newsCtx?.openNews(post.slug)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-bg py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,115,51,0.06),transparent_55%)]" />

      <div className="container-wide relative">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              icon={HOME_SECTION_ICONS.news}
              eyebrow="Noticias destacadas"
              title="Lo que está pasando en el Limarí"
              description="Vendimia, temporada estival, cultura y novedades turísticas desde el corazón del norte chico."
              className="max-w-2xl"
            />
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-accent text-sm uppercase tracking-wider text-fg transition hover:border-copper/40 hover:bg-surface-elevated"
            >
              Ver todas las noticias
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        {/* Bento editorial grid */}
        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* Featured */}
          <Reveal delay={0.05} className="lg:col-span-7 lg:row-span-2">
            <FeaturedNewsCard post={featured} large onOpen={() => newsCtx?.openNews(featured.slug)} />
          </Reveal>

          {/* Secondary stack */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 2).map((post, i) => (
              <Reveal key={post.slug} delay={0.1 + i * 0.05}>
                <NewsCard post={post} compact onOpen={() => newsCtx?.openNews(post.slug)} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        {rest[2] && (
          <Reveal delay={0.2} className="mt-5">
            <NewsCard post={rest[2]} horizontal onOpen={() => newsCtx?.openNews(rest[2].slug)} />
          </Reveal>
        )}

        {/* Newsletter teaser strip */}
        <Reveal delay={0.25} className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-surface-elevated p-8 sm:flex-row sm:items-center lg:p-10">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-copper/15 p-3 text-copper">
                <Newspaper size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-fg">
                  Mantente al día con el valle
                </h3>
                <p className="mt-1 max-w-md text-sm text-muted-fg">
                  Eventos, vendimia y las mejores noches para astroturismo en tu correo.
                </p>
              </div>
            </div>
            <Link
              href="/contacto"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-copper px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-copper/90"
            >
              Suscribirme
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedNewsCard({
  post,
  large,
  onOpen,
}: {
  post: NewsItem;
  large?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-full min-h-[360px] w-full overflow-hidden rounded-[2rem] text-left lg:min-h-[520px]"
    >
      <SiteImage
        src={newsImageSrc(post.image)}
        alt={post.title}
        fill
        quality={NEWS_IMAGE_QUALITY}
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width:1024px) 100vw, 55vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
          <div className="mb-auto flex flex-wrap gap-2 pt-2">
          <CategoryBadge category={post.category} />
          {"featured" in post && post.featured && (
            <span className="rounded-full bg-gold/20 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-gold backdrop-blur-sm">
              Destacada
            </span>
          )}
        </div>

        <time className="font-accent text-xs uppercase tracking-wider text-gold">
          {formatChileDate(post.date)}
        </time>
        <h3
          className={cn(
            "mt-3 font-display font-bold text-white text-balance",
            large ? "text-2xl lg:text-3xl" : "text-xl"
          )}
        >
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-sand/90">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-accent text-xs uppercase tracking-wider text-gold transition group-hover:gap-2.5">
            Leer noticia
            <ArrowUpRight size={14} />
          </span>
          <span className="flex items-center gap-1 text-xs text-sand/75">
            <Clock size={12} />
            {post.readTime} min
          </span>
        </div>
      </div>
    </button>
  );
}

function NewsCard({
  post,
  compact,
  horizontal,
  onOpen,
}: {
  post: NewsItem;
  compact?: boolean;
  horizontal?: boolean;
  onOpen: () => void;
}) {
  if (horizontal) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group grid w-full overflow-hidden rounded-[2rem] border border-border bg-surface text-left card-hover sm:grid-cols-[280px_1fr]"
      >
        <div className="relative min-h-[180px] sm:min-h-0">
          <SiteImage
            src={newsImageSrc(post.image)}
            alt={post.title}
            fill
            quality={NEWS_IMAGE_QUALITY}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="280px"
          />
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <CategoryBadge category={post.category} />
          <time className="mt-3 font-accent text-[10px] uppercase tracking-wider text-copper">
            {formatChileDate(post.date)}
          </time>
          <h3 className="mt-2 font-display text-xl font-bold text-fg">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-fg">{post.excerpt}</p>
          <span className="mt-4 flex items-center gap-1 font-accent text-[10px] uppercase tracking-wider text-copper">
            <Clock size={11} />
            {post.readTime} min de lectura
          </span>
        </div>
      </button>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-border bg-surface text-left card-hover",
          compact && "sm:flex-row lg:flex-col"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "aspect-[16/10] sm:aspect-auto sm:w-2/5 lg:w-full lg:aspect-[16/10]" : "aspect-[16/10]"
          )}
        >
          <SiteImage
            src={newsImageSrc(post.image)}
            alt={post.title}
            fill
            quality={NEWS_IMAGE_QUALITY}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes={compact ? "(max-width:640px) 100vw, 320px" : "(max-width:768px) 100vw, 480px"}
          />
        </div>
        <div className={cn("flex flex-1 flex-col p-5", compact ? "sm:p-5 lg:p-6" : "p-6")}>
          <CategoryBadge category={post.category} />
          <time className="mt-3 font-accent text-[10px] uppercase tracking-wider text-copper">
            {formatChileDate(post.date)}
          </time>
          <h3
            className={cn(
              "mt-2 font-display font-bold text-fg",
              compact ? "line-clamp-2 text-base" : "line-clamp-2 text-xl"
            )}
          >
            {post.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-fg">{post.excerpt}</p>
          )}
          <span className="mt-3 flex items-center gap-1 text-xs text-muted">
            <Clock size={11} />
            {post.readTime} min
          </span>
        </div>
      </button>
    </motion.div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider",
        CATEGORY_COLORS[category] ?? "bg-surface-elevated text-muted border-border"
      )}
    >
      {category}
    </span>
  );
}
