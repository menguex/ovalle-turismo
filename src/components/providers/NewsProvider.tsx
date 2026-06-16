"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewsModal } from "@/components/ui/NewsModal";
import { NEWS, type NewsItem } from "@/lib/data/site";

type NewsContextValue = {
  openNews: (slug: string) => void;
  closeNews: () => void;
  activeSlug: string | null;
};

const NewsContext = createContext<NewsContextValue | null>(null);

function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const noticiaParam = searchParams.get("noticia");

  useEffect(() => {
    if (noticiaParam && getNewsBySlug(noticiaParam)) {
      setActiveSlug(noticiaParam);
    } else {
      setActiveSlug(null);
    }
  }, [noticiaParam]);

  const openNews = useCallback(
    (slug: string) => {
      if (!getNewsBySlug(slug)) return;
      setActiveSlug(slug);
      const params = new URLSearchParams(searchParams.toString());
      params.set("noticia", slug);
      params.delete("ficha");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const closeNews = useCallback(() => {
    setActiveSlug(null);
    requestAnimationFrame(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("noticia");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  const value = useMemo(
    () => ({ openNews, closeNews, activeSlug }),
    [openNews, closeNews, activeSlug]
  );

  const post = activeSlug ? getNewsBySlug(activeSlug) ?? null : null;

  return (
    <NewsContext.Provider value={value}>
      {children}
      <NewsModal post={post} onClose={closeNews} onOpenPost={openNews} />
    </NewsContext.Provider>
  );
}

export function useNewsOptional() {
  return useContext(NewsContext);
}
