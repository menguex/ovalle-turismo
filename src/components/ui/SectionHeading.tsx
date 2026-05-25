import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  className,
  align = "left",
  icon,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
  align?: "left" | "center";
  icon?: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {(icon || eyebrow) && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          {icon && (
            <IconBadge
              icon={icon}
              size="sm"
              variant={dark ? "hero" : "brand"}
            />
          )}
          {eyebrow && (
            <p className={cn("mb-0", dark ? "eyebrow-light" : "eyebrow")}>{eyebrow}</p>
          )}
        </div>
      )}
      <h2 className={cn("heading-lg", dark && "text-mist")}>{title}</h2>
      <div
        className={cn(
          "section-heading-accent",
          align === "center" ? "section-heading-accent-center" : "section-heading-accent-left"
        )}
        aria-hidden
      />
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty font-sans text-body-lg",
            dark ? "text-sand" : "text-muted-fg"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
