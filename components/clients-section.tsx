import Image from "next/image";
import { Quote } from "lucide-react";
import { clients, testimonials } from "@/lib/site-config";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

/**
 * La rejilla se ajusta a la cantidad real de clientes en lugar de usar un
 * número fijo de columnas. Dos razones: una celda vacía se lee como un logo
 * que falta, y dos logos repartidos en todo el ancho se ven desangelados.
 *
 * Las clases van completas y literales a propósito — Tailwind no detecta
 * nombres de clase construidos por concatenación.
 */
const REJILLA: Record<number, { cols: string; ancho: string }> = {
  1: { cols: "grid-cols-1", ancho: "max-w-sm" },
  2: { cols: "grid-cols-1 sm:grid-cols-2", ancho: "max-w-3xl" },
  3: { cols: "grid-cols-1 sm:grid-cols-3", ancho: "max-w-4xl" },
  4: { cols: "grid-cols-2 lg:grid-cols-4", ancho: "" },
  5: { cols: "grid-cols-2 lg:grid-cols-5", ancho: "" },
  6: { cols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6", ancho: "" },
};
const POR_DEFECTO = { cols: "grid-cols-2 lg:grid-cols-4", ancho: "" };

const COLS_TESTIMONIOS: Record<number, string> = {
  1: "max-w-2xl mx-auto",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

export function ClientsSection() {
  const rejilla = REJILLA[clients.length] ?? POR_DEFECTO;
  const colsTestimonios = COLS_TESTIMONIOS[testimonials.length] ?? "md:grid-cols-3";

  return (
    <section id="clientes" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Con quiénes trabajamos"
          title="Empresas que ya operan sobre nuestro trabajo"
          description="Equipos que confiaron a ARTEMIX el software, la red o el equipamiento del que depende su operación diaria."
        />

        <div
          className={cn(
            "mt-16 grid gap-px overflow-hidden rounded-panel border border-border bg-border",
            rejilla.cols,
            rejilla.ancho && `${rejilla.ancho} mx-auto`
          )}
        >
          {clients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.04}>
              <div className="group relative flex h-full min-h-[9rem] flex-col items-center justify-center gap-2 bg-bg px-6 py-9 transition-colors duration-300 hover:bg-surface">
                {/* Línea de acento que aparece en hover */}
                <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={48}
                    className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="text-balance text-center font-display text-lg font-semibold text-muted transition-colors duration-300 group-hover:text-text md:text-xl">
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

        {/* Sin testimonios reales la sección entera no se dibuja: tres citas
            firmadas "Nombre Apellido" restan más credibilidad de la que suman. */}
        {testimonials.length > 0 && (
          <div className={cn("mt-20 grid gap-6", colsTestimonios)}>
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
        )}
      </div>
    </section>
  );
}
