import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-full transition-all duration-300 disabled:opacity-45 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // El primario concentra el acento: es el único elemento con glow permanente.
  primary:
    "bg-accent text-accent-contrast shadow-glow hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-surface text-text border border-border hover:border-accent/60 hover:bg-surface-2 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-text hover:bg-surface-2",
  whatsapp:
    "bg-[#25D366] text-[#04231a] hover:brightness-110 hover:-translate-y-0.5 shadow-[0_10px_34px_-12px_rgba(37,211,102,0.65)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-8 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
