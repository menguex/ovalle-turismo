import { cn } from "@/lib/utils";

type PagePanelProps = {
  children: React.ReactNode;
  className?: string;
  /** Borde gradiente animado de marca */
  animated?: boolean;
  /** `dark` para secciones bg-night — evita texto claro sobre panel claro */
  variant?: "light" | "dark";
};

export function PagePanel({
  children,
  className,
  animated = false,
  variant = "light",
}: PagePanelProps) {
  return (
    <div
      className={cn(
        "gradient-border overflow-hidden rounded-[2rem]",
        variant === "dark" ? "panel-dark" : "glass-tech",
        animated && "gradient-border-animated",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-wide">
        <PagePanel className={cn("p-8 lg:p-10", className)}>
          <div className="prose-valle !mt-0 space-y-5">{children}</div>
        </PagePanel>
      </div>
    </section>
  );
}
