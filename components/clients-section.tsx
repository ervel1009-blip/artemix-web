import Image from "next/image";
import { Quote } from "lucide-react";
import { clients, testimonials } from "@/lib/site-config";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

export function ClientsSection() {
  return (
    <section id="clientes" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Con quiénes trabajamos"
          title="Empresas que ya operan sobre nuestro trabajo"
          description="Desde PyMEs que digitalizaron su primer proceso hasta operaciones multi-sucursal. Estos son algunos de los equipos que confiaron el núcleo de su tecnología a ARTEMIX."
        />

        {/* Rejilla de clientes */}
        {/* 2 y 4 columnas, nunca 3: con una lista par, tres columnas dejan una
            celda vacía que se lee como un logo que falta. */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-border bg-border lg:grid-cols-4">
          {clients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.04}>
              <div className="group relative flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-2 bg-bg px-5 py-8 transition-colors duration-300 hover:bg-surface">
                {/* Línea de acento que aparece en hover */}
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={44}
                    className="h-9 w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-center font-display text-lg font-semibold text-muted transition-colors duration-300 group-hover:text-text">
                    {client.name}
                  </span>
                )}

                {client.sector && (
                  <span className="text-[0.75rem] text-faint">{client.sector}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Testimonios */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 0.1}>
              <figure className="surface-card glow-border flex h-full flex-col p-7">
                <Quote className="h-7 w-7 shrink-0 text-accent/35" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent ring-1 ring-inset ring-accent/20">
                    {t.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{t.author}</span>
                    <span className="block text-[0.8125rem] text-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
