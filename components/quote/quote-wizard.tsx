"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  RotateCcw,
} from "lucide-react";
import { services, type ServiceId } from "@/lib/services";
import {
  addons as addonCatalog,
  calculateQuote,
  emptySelection,
  formatMoney,
  scopes,
  sizes,
  urgencies,
  type QuoteSelection,
} from "@/lib/pricing";
import { site } from "@/lib/site-config";
import { buildQuoteMessage, waLink, type QuoteContact } from "@/lib/whatsapp";
import { OptionCard } from "./option-card";
import { QuoteSummary } from "./quote-summary";
import { Button, ButtonLink } from "../ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Servicio" },
  { id: 1, label: "Alcance" },
  { id: 2, label: "Complementos" },
  { id: 3, label: "Plazo" },
  { id: 4, label: "Contacto" },
];

const emptyContact: QuoteContact = {
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

type Status = "idle" | "sending" | "sent" | "error";

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<QuoteSelection>(emptySelection);
  const [info, setInfo] = useState<QuoteContact>(emptyContact);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const result = useMemo(() => calculateQuote(sel), [sel]);

  // Cambiar de servicio invalida alcance, complementos y dimensión.
  function pickService(id: ServiceId) {
    setSel({ ...emptySelection, service: id });
    setStep(1);
  }

  function toggleAddon(id: string) {
    setSel((s) => ({
      ...s,
      addons: s.addons.includes(id)
        ? s.addons.filter((a) => a !== id)
        : [...s.addons, id],
    }));
  }

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return sel.service !== null;
      case 1:
        return sel.scope !== null && sel.size !== null;
      case 2:
        return true; // los complementos son opcionales
      case 3:
        return sel.urgency !== null;
      default:
        return false;
    }
  })();

  const contactValid =
    info.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(info.email);

  async function submit() {
    if (!result || !contactValid) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selection: sel, contact: info, result }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      // No bloqueamos al usuario: WhatsApp sigue disponible como vía de salida.
      setStatus("error");
      setErrorMsg(
        "No pudimos registrar la solicitud automáticamente. Envíala por WhatsApp y la recibimos igual."
      );
    }
  }

  function reset() {
    setSel(emptySelection);
    setInfo(emptyContact);
    setStep(0);
    setStatus("idle");
  }

  const waHref =
    result && info.name
      ? waLink(buildQuoteMessage(sel, result, info))
      : waLink("Hola ARTEMIX, quiero cotizar un proyecto.");

  // ── Pantalla de confirmación ──────────────────────────────
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="surface-card mx-auto max-w-2xl p-10 text-center md:p-14"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft ring-1 ring-inset ring-accent/25">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold md:text-3xl">
          Recibimos tu solicitud, {info.name.split(" ")[0]}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">
          Te escribimos en menos de 2 horas hábiles con la propuesta detallada. Si
          prefieres adelantar la conversación, envíanos el resumen por WhatsApp y lo
          revisamos de inmediato.
        </p>

        {result && (
          <p className="mt-7 inline-flex flex-col rounded-card border border-border bg-surface-2/60 px-6 py-4">
            <span className="text-[0.75rem] uppercase tracking-wider text-faint">
              Tu estimación
            </span>
            <span className="mt-1 font-display text-2xl font-bold text-accent-gradient">
              {formatMoney(result.min, site.currency.symbol)} –{" "}
              {formatMoney(result.max, site.currency.symbol)}
            </span>
          </p>
        )}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar resumen por WhatsApp
          </ButtonLink>
          <Button variant="secondary" size="lg" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Cotizar otro proyecto
          </Button>
        </div>
      </motion.div>
    );
  }

  // ── Wizard ────────────────────────────────────────────────
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
      {/* ── Pasos ── */}
      <div className="surface-card overflow-hidden">
        {/* Barra de progreso */}
        <div className="border-b border-border px-6 py-5 md:px-8">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-2 last:flex-none">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-400",
                    i < step
                      ? "bg-accent text-accent-contrast"
                      : i === step
                        ? "bg-accent text-accent-contrast shadow-glow"
                        : "bg-surface-2 text-faint"
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-[0.8125rem] font-medium transition-colors md:block",
                    i === step ? "text-text" : "text-faint"
                  )}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="h-px flex-1 bg-border">
                    <motion.span
                      className="block h-px bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: i < step ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.4 }}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* Paso 0 — Servicio */}
              {step === 0 && (
                <StepShell
                  title="¿Qué necesitas resolver?"
                  hint="Elige el frente principal. Si tu proyecto mezcla varios, selecciona el de mayor peso y lo anotas al final."
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((service) => (
                      <OptionCard
                        key={service.id}
                        label={service.name}
                        description={service.headline}
                        icon={service.icon}
                        selected={sel.service === service.id}
                        onSelect={() => pickService(service.id)}
                      />
                    ))}
                  </div>
                </StepShell>
              )}

              {/* Paso 1 — Alcance y dimensión */}
              {step === 1 && sel.service && (
                <StepShell
                  title="Define el alcance"
                  hint="Una aproximación basta. Lo afinamos en el diagnóstico."
                >
                  <div className="grid gap-3">
                    {scopes[sel.service].map((scope) => (
                      <OptionCard
                        key={scope.id}
                        label={scope.label}
                        description={scope.description}
                        selected={sel.scope === scope.id}
                        onSelect={() => setSel((s) => ({ ...s, scope: scope.id }))}
                      />
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 text-[0.875rem] font-semibold">
                      {sel.service === "equipos"
                        ? "¿Cuántos equipos necesitas?"
                        : sel.service === "redes"
                          ? "¿Cuántas ubicaciones?"
                          : "¿Qué tan complejo es?"}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {sizes[sel.service].map((size) => (
                        <OptionCard
                          key={size.id}
                          label={size.label}
                          description={size.description}
                          selected={sel.size === size.id}
                          onSelect={() => setSel((s) => ({ ...s, size: size.id }))}
                        />
                      ))}
                    </div>
                  </div>
                </StepShell>
              )}

              {/* Paso 2 — Complementos */}
              {step === 2 && sel.service && (
                <StepShell
                  title="¿Algo más que debamos incluir?"
                  hint="Opcional. Puedes dejarlo vacío y decidirlo después."
                >
                  <div className="grid gap-3">
                    {addonCatalog[sel.service].map((addon) => (
                      <OptionCard
                        key={addon.id}
                        mode="multi"
                        label={addon.label}
                        description={addon.description}
                        selected={sel.addons.includes(addon.id)}
                        onSelect={() => toggleAddon(addon.id)}
                        meta={
                          addon.price != null
                            ? `+${formatMoney(addon.price, site.currency.symbol)}`
                            : `+${Math.round((addon.percent ?? 0) * 100)}%`
                        }
                      />
                    ))}
                  </div>
                </StepShell>
              )}

              {/* Paso 3 — Plazo */}
              {step === 3 && (
                <StepShell
                  title="¿Para cuándo lo necesitas?"
                  hint="El plazo afecta el precio: la holgura abarata, la urgencia requiere equipo dedicado."
                >
                  <div className="grid gap-3">
                    {urgencies.map((u) => (
                      <OptionCard
                        key={u.id}
                        label={u.label}
                        description={u.description}
                        selected={sel.urgency === u.id}
                        onSelect={() => setSel((s) => ({ ...s, urgency: u.id }))}
                        meta={
                          u.factor === 1
                            ? undefined
                            : u.factor > 1
                              ? `+${Math.round((u.factor - 1) * 100)}%`
                              : `−${Math.round((1 - u.factor) * 100)}%`
                        }
                      />
                    ))}
                  </div>
                </StepShell>
              )}

              {/* Paso 4 — Contacto */}
              {step === 4 && (
                <StepShell
                  title="¿A dónde enviamos la propuesta?"
                  hint="Solo lo necesario. No compartimos tus datos con terceros."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Nombre"
                      required
                      value={info.name}
                      onChange={(v) => setInfo({ ...info, name: v })}
                      placeholder="Tu nombre"
                      autoComplete="name"
                    />
                    <Field
                      label="Empresa"
                      value={info.company}
                      onChange={(v) => setInfo({ ...info, company: v })}
                      placeholder="Nombre de tu empresa"
                      autoComplete="organization"
                    />
                    <Field
                      label="Correo"
                      required
                      type="email"
                      value={info.email}
                      onChange={(v) => setInfo({ ...info, email: v })}
                      placeholder="tu@empresa.com"
                      autoComplete="email"
                    />
                    <Field
                      label="Teléfono / WhatsApp"
                      type="tel"
                      value={info.phone}
                      onChange={(v) => setInfo({ ...info, phone: v })}
                      placeholder="+52 55 0000 0000"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-[0.8125rem] font-medium text-muted">
                      Cuéntanos más sobre el proyecto
                    </label>
                    <textarea
                      value={info.notes}
                      onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                      rows={4}
                      placeholder="Qué problema quieres resolver, con qué sistemas debe integrarse, fechas clave..."
                      className="w-full resize-none rounded-card border border-border bg-surface-2/50 px-4 py-3 text-[0.9375rem] text-text placeholder:text-faint/70 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="mt-4 rounded-card border border-amber-500/30 bg-amber-500/10 p-3.5 text-[0.8125rem] text-amber-600 dark:text-amber-400">
                      {errorMsg}
                    </p>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="lg"
                      onClick={submit}
                      disabled={!contactValid || status === "sending"}
                      className="flex-1"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar solicitud
                        </>
                      )}
                    </Button>
                    <ButtonLink
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      size="lg"
                      className="flex-1"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Enviar por WhatsApp
                    </ButtonLink>
                  </div>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={cn(step === 0 && "invisible")}
            >
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Button>

            <span className="text-[0.8125rem] text-faint">
              Paso {step + 1} de {STEPS.length}
            </span>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
                className="group"
              >
                Continuar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <span className="w-[6.5rem]" aria-hidden />
            )}
          </div>
        </div>
      </div>

      {/* ── Resumen en vivo ── */}
      <div>
        <QuoteSummary result={result} />
      </div>
    </div>
  );
}

// ── Auxiliares ──────────────────────────────────────────────

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
      <p className="mt-2 text-[0.875rem] text-muted">{hint}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.8125rem] font-medium text-muted">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-card border border-border bg-surface-2/50 px-4 text-[0.9375rem] text-text placeholder:text-faint/70 transition-colors focus:border-accent focus:outline-none"
      />
    </label>
  );
}
