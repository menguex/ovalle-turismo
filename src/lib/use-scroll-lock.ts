import { useLayoutEffect, useRef } from "react";
import { useLenis } from "@/lib/lenis-context";

/**
 * Bloquea el scroll de la página detrás de modales.
 * Pausa Lenis (smooth scroll) para que wheel/touch vayan al contenedor del modal.
 */
export function useScrollLock(active: boolean) {
  const lenis = useLenis();
  const scrollYRef = useRef(0);

  useLayoutEffect(() => {
    if (!active) return;

    scrollYRef.current = lenis?.scroll ?? window.scrollY;
    lenis?.stop();

    const scrollY = scrollYRef.current;
    const body = document.body.style;
    const html = document.documentElement.style;

    const prevBody = {
      position: body.position,
      top: body.top,
      left: body.left,
      right: body.right,
      width: body.width,
      overflow: body.overflow,
    };
    const prevHtmlOverflow = html.overflow;

    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.left = "0";
    body.right = "0";
    body.width = "100%";
    body.overflow = "hidden";
    html.overflow = "hidden";

    return () => {
      const savedY = scrollYRef.current;

      body.position = prevBody.position;
      body.top = prevBody.top;
      body.left = prevBody.left;
      body.right = prevBody.right;
      body.width = prevBody.width;
      body.overflow = prevBody.overflow;
      html.overflow = prevHtmlOverflow;

      if (lenis) {
        lenis.scrollTo(savedY, { immediate: true, force: true });
        lenis.start();
      } else {
        window.scrollTo(0, savedY);
      }
    };
  }, [active, lenis]);
}
