import { useEffect } from "react";

/**
 * Bloquea el scroll de la página detrás de modales (wheel/trackpad en macOS
 * no respeta solo overflow:hidden en body).
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
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
      body.position = prevBody.position;
      body.top = prevBody.top;
      body.left = prevBody.left;
      body.right = prevBody.right;
      body.width = prevBody.width;
      body.overflow = prevBody.overflow;
      html.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}
