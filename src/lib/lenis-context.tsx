"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({
  value,
  children,
}: {
  value: Lenis | null;
  children: React.ReactNode;
}) {
  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Atributos para que Lenis no capture wheel/touch y permita scroll nativo en el nodo. */
export const lenisPreventProps = {
  "data-lenis-prevent": true,
  "data-lenis-prevent-wheel": true,
  "data-lenis-prevent-touch": true,
} as const;
