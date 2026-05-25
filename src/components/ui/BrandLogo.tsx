import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMAGES, SITE } from "@/lib/data/site";

export type BrandLogoBackground = "light" | "dark";

type BrandLogoProps = {
  /** Header sobre hero: foto oscura */
  variant?: "hero" | "surface" | "footer" | "preloader" | "plain";
  /** Fondo donde se muestra el logo: claro → color; oscuro → crema */
  background?: BrandLogoBackground;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

const SIZES = {
  hero: { width: 132, height: 52 },
  surface: { width: 128, height: 50 },
  footer: { width: 148, height: 58 },
  preloader: { width: 220, height: 86 },
  plain: { width: 140, height: 56 },
} as const;

function resolveBackground(
  variant: NonNullable<BrandLogoProps["variant"]>,
  background?: BrandLogoBackground
): BrandLogoBackground {
  if (background) return background;
  if (variant === "surface" || variant === "plain") return "light";
  return "dark";
}

export function BrandLogo({
  variant = "plain",
  background,
  priority = false,
  className,
  imageClassName,
}: BrandLogoProps) {
  const { width, height } = SIZES[variant];
  const resolvedBackground = resolveBackground(variant, background);
  const onDark = resolvedBackground === "dark";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={onDark ? IMAGES.logoCream : IMAGES.logo}
        alt={SITE.name}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "h-auto w-auto object-contain",
          onDark && "drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]",
          variant === "hero" && "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]",
          variant === "preloader" && "drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
          imageClassName
        )}
      />
    </span>
  );
}
