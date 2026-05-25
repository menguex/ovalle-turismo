import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-brand-gradient text-night shadow-md shadow-brand-orange/20 hover:brightness-105 hover:shadow-lg hover:shadow-brand-orange/30 active:scale-[0.98]",
  secondary:
    "border border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-brand-yellow/50 hover:bg-white/15 active:scale-[0.98]",
  ghost:
    "border border-brand-orange/20 bg-white text-earth hover:border-brand-orange/40 hover:bg-brand-yellow/10 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full font-sans font-semibold tracking-wide transition-all duration-300 ease-premium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ButtonSubmit({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-brand-gradient px-8 py-4 font-sans text-sm font-semibold tracking-wide text-night transition-all duration-300 hover:brightness-105 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
