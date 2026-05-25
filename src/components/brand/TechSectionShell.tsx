import { cn } from "@/lib/utils";
import { BrandShapes, type BrandShapeVariant } from "@/components/brand/BrandShapes";

type TechSectionShellProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: BrandShapeVariant;
  as?: "section" | "div";
  id?: string;
  glow?: boolean;
};

export function TechSectionShell({
  children,
  className,
  innerClassName,
  variant = "subtle",
  as: Tag = "section",
  id,
  glow = false,
}: TechSectionShellProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative overflow-hidden",
        glow && "section-tech-glow",
        className
      )}
    >
      <BrandShapes variant={variant} />
      <div className={cn("relative z-[1]", innerClassName)}>{children}</div>
    </Tag>
  );
}
