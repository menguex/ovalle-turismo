"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { BrandLogo, type BrandLogoBackground } from "@/components/ui/BrandLogo";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

function useDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDarkTheme = useDarkTheme();

  /** Solo el hero del home usa overlay transparente con logo crema */
  const isHeroOverlay = isHome && !scrolled;
  /** Barra sólida premium: al bajar o en páginas internas */
  const isElevated = scrolled || !isHome;
  const useLightBar = !isDarkTheme && !isHeroOverlay;
  const useDarkBar = isDarkTheme && !isHeroOverlay;

  const logoBackground: BrandLogoBackground = isHeroOverlay || isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = cn(
    "nav-pill-hover font-sans text-sm font-medium",
    isHeroOverlay
      ? "text-white/90"
      : isDarkTheme
        ? "text-sand/85"
        : "text-fg/85"
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-500 ease-premium md:top-[var(--topbar-h)] top-0",
        isHeroOverlay && "border-transparent bg-transparent py-4 shadow-none",
        isElevated && "py-3",
        useLightBar && "header-premium-light",
        useDarkBar && "header-premium-dark"
      )}
    >
      <div className="container-wide flex items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            "logo-glow relative z-10 flex items-center gap-3",
            logoBackground === "dark" && "logo-glow-on-dark"
          )}
        >
          <BrandLogo
            variant={isHeroOverlay ? "hero" : "surface"}
            background={logoBackground}
            priority
            imageClassName="h-9 md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative pb-2">
                <Link href={item.href} className={navLinkClass}>
                  <span>{item.label}</span>
                </Link>
                <div
                  className={cn(
                    "invisible absolute left-0 top-full z-[60] min-w-[220px] translate-y-2 rounded-2xl p-1.5 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                    isHeroOverlay
                      ? "nav-dropdown-hero"
                      : useLightBar
                        ? "nav-dropdown-light"
                        : "nav-dropdown-dark"
                  )}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium transition",
                        isHeroOverlay
                          ? "text-white/90 hover:bg-white/10 hover:text-white"
                          : useLightBar
                            ? "text-fg/90 hover:bg-brand-blue/10 hover:text-brand-blue"
                            : "text-sand/85 hover:bg-white/8 hover:text-white"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <AnimatedThemeToggler
            duration={500}
            className={isHeroOverlay ? "theme-toggle-btn-hero" : "theme-toggle-btn"}
            aria-label="Cambiar tema claro u oscuro"
          />
          <Button
            href="/planifica"
            variant={isHeroOverlay ? "secondary" : "primary"}
            size="sm"
            className={isHeroOverlay ? undefined : "gradient-border"}
          >
            Planifica tu viaje
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <AnimatedThemeToggler
            duration={500}
            className={isHeroOverlay ? "theme-toggle-btn-hero" : "theme-toggle-btn"}
            aria-label="Cambiar tema claro u oscuro"
          />
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "relative z-10 rounded-full p-2 transition-colors",
              isHeroOverlay ? "text-white" : "text-fg"
            )}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={cn(
            "fixed inset-0 z-40 px-4 pb-8 pt-28 xl:hidden",
            useLightBar ? "header-premium-light" : "header-premium-dark"
          )}
        >
          <nav className="container-wide flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 font-display text-xl font-semibold text-fg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <div className="mb-2 ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg px-3 py-2 font-sans text-sm text-muted-fg"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button href="/planifica" className="mt-6 w-full gradient-border">
              Planifica tu viaje
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
