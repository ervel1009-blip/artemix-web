"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Clock3, Info } from "lucide-react";
import { formatMoney, type QuoteResult } from "@/lib/pricing";
import { site } from "@/lib/site-config";

/**
 * Panel de estimación en vivo. Es el elemento que más convierte de la página:
 * muestra una cifra desde el segundo paso, así el visitante no abandona por
 * no saber el orden de magnitud.
 */
export function QuoteSummary({ result }: { result: QuoteResult | null }) {
  const { symbol, suffix } = site.currency;

  return (
    <div className="surface-card sticky top-24 overflow-hidden">
      {/* Cabecera */}
      <div className="relative border-b border-border bg-surface-2/60 px-6 py-5">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex items-center gap-2.5">
          <Calculator className="h-[1.1rem] w-[1.1rem] text-accent" />
          <h3 className="text-[0.9375rem] font-semibold">Estimación en vivo</h3>
        </div>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[0.75rem] uppercase tracking-wider text-faint">
                Inversión estimada
              </p>
              <p className="mt-2 font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none">
                <span className="text-accent-gradient">
                  {formatMoney(result.min, symbol)}
                </span>
                <span className="mx-2 text-faint">–</span>
                <span className="text-accent-gradient">
                  {formatMoney(result.max, symbol)}
                </span>
              </p>
              <p className="mt-1.5 text-xs text-faint">
                {[suffix, "antes de impuestos"].filter(Boolean).join(" · ")}
              </p>

              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <Clock3 className="h-4 w-4 text-accent" />
                Tiempo estimado:{" "}
                <span className="font-semibold text-text">
                  {result.weeks[0]}–{result.weeks[1]} semanas
                </span>
              </p>

              {/* Desglose */}
              <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                {result.lines.map((line, i) => (
                  <motion.li
                    key={line.label + i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-baseline justify-between gap-4 text-[0.8125rem]"
                  >
                    <span className="text-muted">{line.label}</span>
                    <span className="shrink-0 font-mono text-faint">
                      {line.amount < 0 ? "−" : ""}
                      {formatMoney(Math.abs(line.amount), symbol)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center"
            >
              <Calculator className="mx-auto h-9 w-9 text-faint/40" strokeWidth={1.2} />
              <p className="mt-4 text-[0.875rem] text-muted">
                Elige un servicio y un alcance para ver tu estimación.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 flex gap-2.5 rounded-card border border-border bg-surface-2/50 p-3.5 text-[0.75rem] leading-relaxed text-faint">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Rango orientativo basado en proyectos equivalentes ya entregados. El precio
            en firme se define tras el diagnóstico sin costo.
          </span>
        </p>
      </div>
    </div>
  );
}
