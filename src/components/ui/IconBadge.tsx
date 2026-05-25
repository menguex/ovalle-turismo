import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "hero" | "soft";
  className?: string;
  label?: string;
};

const SIZES = {
  sm: { box: "h-9 w-9", icon: 16 },
  md: { box: "h-11 w-11", icon: 20 },
  lg: { box: "h-14 w-14", icon: 24 },
} as const;

export function IconBadge({
  icon: Icon,
  size = "md",
  variant = "brand",
  className,
  label,
}: IconBadgeProps) {
  const s = SIZES[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl transition",
        s.box,
        variant === "brand" && "stat-pill-icon text-brand-orange",
        variant === "hero" &&
          "border border-white/15 bg-white/10 text-brand-yellow backdrop-blur-md",
        variant === "soft" && "border border-brand-orange/20 bg-brand-yellow/10 text-brand-orange",
        className
      )}
      aria-hidden={label ? undefined : true}
      title={label}
    >
      <Icon size={s.icon} strokeWidth={1.75} />
    </span>
  );
}
