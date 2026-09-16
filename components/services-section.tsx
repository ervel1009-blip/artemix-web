"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site-config";
import { formatMoney } from "@/lib/pricing";
import { waLink, waMessages } from "@/lib/whatsapp";
import { SectionHeading } from "./ui/section-heading";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Servicios en formato pestañas + panel de detalle.
 * Elegido sobre cuatro tarjetas estáticas porque obliga a un solo foco a la vez:
 * el visitante lee un servicio completo en lugar de escanear cuatro a medias.
 */
export function ServicesSection() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;

  return (
    // overflow-hidden es obligatorio: la aurora se sale del ancho de la sección
    // y sin recorte genera scroll horizontal en toda la página.
    <section
      id="servicios"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div
        className="aurora right-[-10%] top-1/3 h-[26rem] w-[26rem]"
        style={{ background: "var(--accent)", opacity: 0.07 }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Qué hacemos"
          title="Cuatro frentes, un solo responsable"
          description="No subcontratamos el núcleo. El mismo equipo que diseña tu red entiende el software que corre encima, y eso se nota cuando algo falla."
        />

        {/* Selector */}
        <div className="mt-14 flex flex-wrap justify-center gap-2.5">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === active;
            return (
              <button
                key={service.id}
                onClick={() => setActive(service.id)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-full border px-5 py-3 text-[0.9375rem] font-medium transition-all duration-300",
                  isActive
                    ? "border-accent/60 bg-accent-soft text-text shadow-glow"
                    : "border-border bg-surface text-muted hover:border-border-strong hover:text-text"
                )}
              >
                <Icon
                  className={cn(
                    "h-[1.15rem] w-[1.15rem] transition-colors",
                    isActive ? "text-accent" : "text-faint group-hover:text-accent"
                  )}
                />
                {service.name}
              </button>
            );
          })}
        </div>

        {/* Panel de detalle */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="surface-card glow-border overflow-hidden"
              data-active="true"
            >
              <div className="grid gap-px bg-border md:grid-cols-[1.25fr_1fr]">
                {/* Lado izquierdo: argumento */}
                <div className="bg-surface p-8 md:p-12">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
                    <current.icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold">
                    {current.headline}
                  </h3>

                  <p className="mt-4 leading-relaxed text-muted">{current.description}</p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {current.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href="#cotizador" className="group">
                      Cotizar este servicio
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ButtonLink>
                    <ButtonLink
                      href={waLink(waMessages.service(current.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Preguntar por WhatsApp
                    </ButtonLink>
                  </div>
                </div>

                {/* Lado derecho: entregables y datos duros */}
                <div className="bg-surface-2/60 p-8 md:p-10">
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-wider text-faint">
                    Qué incluye
                  </p>
                  <ul className="mt-5 space-y-3.5">
                    {current.deliverables.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i + 0.1, duration: 0.35 }}
                        className="flex gap-3 text-[0.9375rem] leading-snug"
                      >
                        <Check className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-accent" />
                        <span className="text-muted">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <p className="text-[0.75rem] uppercase tracking-wider text-faint">
                        Desde
                      </p>
                      <p className="mt-1 font-display text-xl font-bold text-accent">
                        {formatMoney(current.startingAt, site.currency.symbol)}
                        {site.currency.suffix && (
                          <span className="ml-1 text-xs font-normal text-faint">
                            {site.currency.suffix}
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.75rem] uppercase tracking-wider text-faint">
                        Tiempo
                      </p>
                      <p className="mt-1 font-display text-xl font-bold">
                        {current.timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-sm text-faint">
            ¿Tu necesidad combina varios servicios? Es el caso más común. Indícalo en el
            cotizador y armamos una propuesta integrada.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
