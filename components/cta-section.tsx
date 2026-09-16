import { ArrowRight, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { contact } from "@/lib/site-config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";

export function CtaSection() {
  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        className="aurora left-1/2 top-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--accent)", opacity: 0.12 }}
        aria-hidden
      />

      <div className="container-x relative">
        <Reveal>
          <div className="surface-card relative overflow-hidden px-8 py-14 text-center md:px-16 md:py-20">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />

            {/* Línea de barrido: el último guiño futurista de la página */}
            <span
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow mb-5">Siguiente paso</p>
              <h2 className="text-[clamp(2rem,4.8vw,3.25rem)] font-bold">
                Cuéntanos qué necesitas.{" "}
                <span className="text-accent-gradient">Te respondemos hoy.</span>
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
                Una llamada de 45 minutos sin costo y sin compromiso. Salimos de ahí con
                un alcance escrito y un rango de inversión, lo contrates con nosotros o no.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href={waLink(waMessages.diagnostic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Agendar por WhatsApp
                </ButtonLink>
                <ButtonLink href="#cotizador" variant="secondary" size="lg" className="group">
                  Usar el cotizador
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </div>

              {/* Datos de contacto directos */}
              <div className="mt-12 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
                <ContactItem
                  icon={<Mail className="h-4 w-4" />}
                  label="Correo"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                <ContactItem
                  icon={<Phone className="h-4 w-4" />}
                  label="Teléfono"
                  value={contact.phone}
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                />
                <ContactItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Ubicación"
                  value={contact.address}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[0.6875rem] uppercase tracking-wider text-faint">
          {label}
        </span>
        <span className="block text-[0.875rem] font-medium">{value}</span>
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex items-center justify-center gap-3 transition-opacity hover:opacity-75"
    >
      {body}
    </a>
  ) : (
    <div className="flex items-center justify-center gap-3">{body}</div>
  );
}
