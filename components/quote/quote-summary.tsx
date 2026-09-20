"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Clock3, Info, FileSearch, Check } from "lucide-react";
import { formatMoney, type QuoteResult } from "@/lib/pricing";
import { site } from "@/lib/site-config";

/**
 * Panel lateral del cotizador. Tiene tres estados:
 *
 *   vacío     → aún no se elige alcance
 *   estimate  → alcance con precio de lista: muestra rango y desglose
 *   custom    → alcance que se cotiza tras diagnóstico: muestra plazo y
 *               resumen, sin cifras
 *
 * El estado `custom` es deliberado: en un proyecto grande, una cifra puesta
 * antes de entender el alcance no informa, compromete.
 */
export function QuoteSummary({ result }: { result: QuoteResult | null }) {
  const { symbol, suffix } = site.currency;

  return (
    <div className="surface-card sticky top-24 overflow-hidden">
      {/* Cabecera */}
      <div className="relative border-b border-border bg-surface-2/60 px-6 py-5">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex items-center gap-2.5">
          {result?.kind === "custom" ? (
            <FileSearch className="h-[1.1rem] w-[1.1rem] text-accent" />
          ) : (
            <Calculator className="h-[1.1rem] w-[1.1rem] text-accent" />
          )}
          <h3 className="text-[0.9375rem] font-semibold">
            {result?.kind === "custom" ? "Tu proyecto" : "Estimación en vivo"}
          </h3>
        </div>
      </div>

      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {/* ── Con precio de lista ── */}
          {result?.kind === "estimate" && (
            <motion.div
              key="estimate"
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
                      {formatMoney(line.amount, symbol)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* ── Sin precio de lista: cotización tras diagnóstico ── */}
          {result?.kind === "custom" && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[0.75rem] uppercase tracking-wider text-faint">
                Inversión
              </p>
              <p className="mt-2 font-display text-[clamp(1.4rem,3.2vw,1.75rem)] font-bold leading-tight">
                <span className="text-accent-gradient">Cotización a la medida</span>
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                Este tipo de proyecto no tiene precio de lista: depende del alcance
                real. Te preparamos una propuesta con precio en firme después del
                diagnóstico, que es gratuito.
              </p>

              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <Clock3 className="h-4 w-4 text-accent" />
                Tiempo estimado:{" "}
                <span className="font-semibold text-text">
                  {result.weeks[0]}–{result.weeks[1]} semanas
                </span>
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                {result.summary.map((item, i) => (
                  <motion.li
                    key={item + i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-2.5 text-[0.8125rem] leading-snug"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="text-muted">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* ── Aún sin elegir ── */}
          {!result && (
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
            {result?.kind === "custom"
              ? "El diagnóstico dura 45 minutos y no tiene costo. Salimos de ahí con un alcance escrito y un precio en firme."
              : "Rango orientativo basado en proyectos equivalentes ya entregados. El precio en firme se define tras el diagnóstico sin costo."}
          </span>
        </p>
      </div>
    </div>
  );
}
