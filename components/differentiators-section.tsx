import { ShieldCheck, Gauge, Users, FileCode2 } from "lucide-react";
import { Reveal } from "./ui/reveal";

/**
 * Bloque de objeciones. Cada tarjeta neutraliza el miedo más común al
 * contratar a un proveedor de tecnología: que desaparezca, que se tarde,
 * que te deje amarrado o que te hable en un idioma que no entiendes.
 */
const points = [
  {
    icon: FileCode2,
    title: "El código es tuyo",
    body: "Al liquidar el proyecto transferimos la propiedad intelectual y el repositorio queda bajo tu organización. Sin dependencias ocultas ni licencias atadas a nosotros.",
  },
  {
    icon: Users,
    title: "Hablas con quien construye",
    body: "Sin capas de intermediarios. El ingeniero que levanta tu red o escribe tu sistema está en la misma conversación que tú.",
  },
  {
    icon: Gauge,
    title: "Entregas cada quince días",
    body: "No desaparecemos tres meses. Cada sprint cierra con algo que puedes abrir, usar y opinar. Si el rumbo está mal, lo corregimos en dos semanas, no en seis meses.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía y soporte reales",
    body: "90 días de garantía sobre defectos incluidos en todo proyecto, con canal directo de soporte. Después decides si quieres plan de evolución continua.",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4 flex items-center gap-2.5">
                <span className="inline-block h-px w-6 bg-accent" aria-hidden />
                Por qué ARTEMIX
              </p>
              <h2 className="text-[clamp(1.9rem,4.4vw,3rem)] font-semibold">
                Lo que normalmente sale mal,{" "}
                <span className="text-accent-gradient">aquí está resuelto</span>
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                Casi todos los que nos contratan vienen de una mala experiencia previa.
                Estructuramos la forma de trabajar justo alrededor de esos puntos de
                dolor.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="surface-card glow-border h-full p-7 transition-shadow duration-400 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent ring-1 ring-inset ring-accent/20">
                    <point.icon className="h-[1.35rem] w-[1.35rem]" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {point.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
