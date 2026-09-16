"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Laptop, Cpu, HardDrive, Router, MessageCircle, ArrowRight } from "lucide-react";
import {
  equipment,
  equipmentCategories,
  type EquipmentCategory,
  type EquipmentItem,
} from "@/lib/catalog";
import { site } from "@/lib/site-config";
import { formatMoney } from "@/lib/pricing";
import { waLink, waMessages } from "@/lib/whatsapp";
import { SectionHeading } from "./ui/section-heading";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

const categoryIcon: Record<EquipmentCategory, typeof Laptop> = {
  laptops: Laptop,
  workstations: Cpu,
  servidores: HardDrive,
  red: Router,
};

export function EquipmentSection() {
  const [filter, setFilter] = useState<EquipmentCategory | "todos">("todos");

  const visible =
    filter === "todos" ? equipment : equipment.filter((e) => e.category === filter);

  return (
    <section
      id="equipos"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div
        className="aurora left-[-8%] top-1/4 h-[24rem] w-[24rem]"
        style={{ background: "var(--accent-lo)", opacity: 0.09 }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Equipos de cómputo"
          title="Hardware elegido por quien lo va a soportar"
          description="Trabajamos con distribución autorizada Dell, HP, Lenovo, Apple, Cisco y Ubiquiti. Te dimensionamos el equipo según tu carga real de trabajo, no según el margen del catálogo."
        />

        {/* Filtros */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {equipmentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              aria-pressed={filter === cat.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === cat.id
                  ? "border-accent/60 bg-accent-soft text-accent"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-text"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rejilla */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Cierre comercial de la sección */}
        <Reveal delay={0.1}>
          <div className="surface-card mt-12 flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-xl font-semibold">
                ¿Necesitas equipar un área completa?
              </h3>
              <p className="mt-2 max-w-xl text-[0.9375rem] text-muted">
                A partir de 6 equipos aplicamos precio por volumen e incluimos
                configuración, imagen corporativa y migración de datos. Dinos cuántos
                puestos y para qué perfil de trabajo.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href="#cotizador" className="group">
                Cotizar volumen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EquipmentCard({ item }: { item: EquipmentItem }) {
  const Icon = categoryIcon[item.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="surface-card glow-border group flex flex-col overflow-hidden transition-shadow duration-400 hover:shadow-lift"
    >
      {/* Imagen o placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.brand} ${item.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-600 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Icon
              className="h-16 w-16 text-faint/45 transition-all duration-500 group-hover:scale-110 group-hover:text-accent/55"
              strokeWidth={1.1}
            />
          </div>
        )}

        {item.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-accent-contrast">
            {item.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-lg border border-border bg-bg/85 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wide text-muted backdrop-blur">
          {item.brand}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{item.pitch}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {item.specs.map((spec) => (
            <li
              key={spec}
              className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.6875rem] text-faint"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div>
            <span className="block text-[0.6875rem] uppercase tracking-wider text-faint">
              Desde
            </span>
            <span className="font-display text-xl font-bold">
              {formatMoney(item.price, site.currency.symbol)}
              <span className="ml-1 text-xs font-normal text-faint">
                {site.currency.suffix}
              </span>
            </span>
          </div>
          <ButtonLink
            href={waLink(waMessages.equipment(item))}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            aria-label={`Cotizar ${item.brand} ${item.name} por WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" />
            Cotizar
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}
