import { SectionHeading } from "./ui/section-heading";
import { QuoteWizard } from "./quote/quote-wizard";

export function QuoteSection() {
  return (
    <section
      id="cotizador"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/30 py-24 md:py-32"
    >
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="aurora left-1/2 top-0 h-[30rem] w-[45rem] -translate-x-1/2"
        style={{ background: "var(--accent)", opacity: 0.08 }}
        aria-hidden
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Cotizador"
          title="Conoce tu inversión en un minuto"
          description="Responde cinco preguntas y obtén un rango real, calculado sobre proyectos que ya entregamos. Sin llamadas de descubrimiento para saber cuánto cuesta."
        />

        <div className="mt-14">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
