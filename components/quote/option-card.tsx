"use client";

import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tarjeta seleccionable usada en todos los pasos del cotizador.
 * `mode="single"` se comporta como radio; `mode="multi"` como checkbox.
 */
export function OptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onSelect,
  mode = "single",
  meta,
}: {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  mode?: "single" | "multi";
  /** Texto pequeño alineado a la derecha, p. ej. el precio del complemento. */
  meta?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      role={mode === "single" ? "radio" : "checkbox"}
      aria-checked={selected}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-card border p-4 text-left transition-all duration-300",
        selected
          ? "border-accent/70 bg-accent-soft shadow-glow"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
            selected ? "bg-accent text-accent-contrast" : "bg-surface-2 text-faint group-hover:text-accent"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      ) : (
        <span
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-all duration-300",
            mode === "multi" ? "rounded-md" : "rounded-full",
            selected
              ? "border-accent bg-accent text-accent-contrast"
              : "border-border-strong bg-transparent"
          )}
        >
          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[0.9375rem] font-semibold leading-snug">{label}</span>
          {meta && (
            <span className="shrink-0 font-mono text-xs text-accent">{meta}</span>
          )}
        </span>
        {description && (
          <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
