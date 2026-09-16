"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Clock } from "lucide-react";
import { ButtonLink } from "./ui/button";
import { Counter } from "./ui/counter";
import { HeroVisual } from "./hero-visual";
import { metrics } from "@/lib/site-config";
import { waLink, waMessages } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Capas de fondo */}
      <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
      <div
        className="aurora -top-40 left-[8%] h-[34rem] w-[34rem]"
        style={{ background: "var(--accent)", opacity: 0.1 }}
        aria-hidden
      />
      <div
        className="aurora -top-20 right-[4%] h-[28rem] w-[28rem]"
        style={{ background: "var(--accent-lo)", opacity: 0.12 }}
        aria-hidden
      />

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ── Columna de mensaje ── */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-2 pr-4 text-[0.8125rem] backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-muted">
                  Agenda abierta para proyectos de este trimestre
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 text-[clamp(2.5rem,6.2vw,4.25rem)] font-bold"
            >
              Construimos la tecnología que{" "}
              <span className="text-accent-gradient">hace crecer</span> tu empresa
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted md:text-lg"
            >
              Software a medida, plataformas SaaS, redes empresariales y equipamiento
              de cómputo. Un solo socio técnico responsable de que todo funcione,
              <span className="text-text"> desde el código hasta el cable.</span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href="#cotizador" size="lg" className="group">
                Cotizar mi proyecto
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={waLink(waMessages.diagnostic)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                <MessageCircle className="h-[1.1rem] w-[1.1rem]" />
                Hablar por WhatsApp
              </ButtonLink>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 flex items-center gap-2 text-sm text-faint"
            >
              <Clock className="h-4 w-4" />
              Respondemos en menos de 2 horas hábiles · Diagnóstico inicial sin costo
            </motion.p>
          </motion.div>

          {/* ── Columna visual ──
              Va siempre después del mensaje: en móvil, abrir con la ilustración
              empujaría el titular fuera de la primera pantalla. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="order-last"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* ── Métricas ── */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-border bg-border md:mt-24 md:grid-cols-4"
        >
          {metrics.map((m) => (
            <div key={m.label} className="bg-bg px-6 py-7 text-center md:py-8">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-display text-[2rem] font-bold tracking-tight md:text-[2.5rem]">
                  <Counter to={m.value} decimals={"decimals" in m ? m.decimals : 0} />
                  <span className="text-accent">{m.suffix}</span>
                </span>
                <span className="mt-1 block text-[0.8125rem] text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
