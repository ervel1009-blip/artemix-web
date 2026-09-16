import { processSteps } from "@/lib/services";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

/**
 * Proceso en línea de tiempo vertical.
 * Su función comercial es bajar la ansiedad: el comprador de software teme
 * pagar y no saber qué pasa. Mostrar los hitos y el momento del pago vende.
 */
export function ProcessSection() {
  return (
    <section
      id="proceso"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/30 py-24 md:py-32"
    >
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso que puedes seguir día a día"
          description="Sin cajas negras. Sabes en qué semana estamos, qué se entrega y cuándo se paga, desde la primera llamada."
        />

        <ol className="relative mx-auto mt-16 max-w-3xl">
          {/* Riel vertical */}
          <span
            className="absolute left-[1.4rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-border to-transparent md:left-[1.65rem]"
            aria-hidden
          />

          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <li className="group relative flex gap-6 pb-12 last:pb-0 md:gap-8">
                {/* Nodo */}
                <span className="relative z-10 grid h-[2.8rem] w-[2.8rem] shrink-0 place-items-center rounded-full border border-border bg-bg font-display text-sm font-bold text-faint transition-all duration-400 group-hover:border-accent group-hover:text-accent md:h-[3.3rem] md:w-[3.3rem] md:text-base">
                  {step.step}
                  <span className="absolute inset-0 rounded-full opacity-0 ring-4 ring-accent/15 transition-opacity duration-400 group-hover:opacity-100" />
                </span>

                <div className="pt-1.5 md:pt-2.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl font-semibold md:text-2xl">{step.title}</h3>
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6875rem] text-accent">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
