"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FichaModal } from "@/components/ui/FichaModal";
import { getFicha } from "@/lib/data/fichas";

type FichaContextValue = {
  openFicha: (id: string) => void;
  closeFicha: () => void;
  activeId: string | null;
};

const FichaContext = createContext<FichaContextValue | null>(null);

export function FichaProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fichaParam = searchParams.get("ficha");

  useEffect(() => {
    const noticiaParam = searchParams.get("noticia");
    if (noticiaParam) {
      setActiveId(null);
      return;
    }
    if (fichaParam && getFicha(fichaParam)) {
      setActiveId(fichaParam);
    } else {
      setActiveId(null);
    }
  }, [fichaParam, searchParams]);

  const openFicha = useCallback(
    (id: string) => {
      if (!getFicha(id)) return;
      setActiveId(id);
      const params = new URLSearchParams(searchParams.toString());
      params.set("ficha", id);
      params.delete("noticia");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const closeFicha = useCallback(() => {
    setActiveId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ficha");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const value = useMemo(
    () => ({ openFicha, closeFicha, activeId }),
    [openFicha, closeFicha, activeId]
  );

  const ficha = activeId ? getFicha(activeId) ?? null : null;

  return (
    <FichaContext.Provider value={value}>
      {children}
      <FichaModal ficha={ficha} onClose={closeFicha} />
    </FichaContext.Provider>
  );
}

export function useFicha() {
  const ctx = useContext(FichaContext);
  if (!ctx) throw new Error("useFicha must be used within FichaProvider");
  return ctx;
}

export function useFichaOptional() {
  return useContext(FichaContext);
}
