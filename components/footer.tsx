import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { contact, navLinks, site } from "@/lib/site-config";
import { services } from "@/lib/services";
import { waLink, waMessages } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: contact.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: contact.social.github, icon: Github, label: "GitHub" },
    { href: contact.social.instagram, icon: Instagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />

      <div className="container-x relative">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              {site.tagline}. Software, SaaS, redes y equipamiento para empresas que
              necesitan que la tecnología deje de ser un problema.
            </p>

            <div className="mt-6 flex gap-2.5">
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
              >
                <MessageCircle className="h-[1.05rem] w-[1.05rem]" />
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <s.icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <FooterColumn title="Servicios">
            {services.map((s) => (
              <FooterLink key={s.id} href="#servicios">
                {s.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Navegación */}
          <FooterColumn title="Navegación">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="#faq">Preguntas frecuentes</FooterLink>
          </FooterColumn>

          {/* Contacto */}
          <FooterColumn title="Contacto">
            <FooterLink href={`mailto:${contact.email}`}>{contact.email}</FooterLink>
            <FooterLink href={`tel:${contact.phone.replace(/\s/g, "")}`}>
              {contact.phone}
            </FooterLink>
            <li className="text-[0.875rem] text-muted">{contact.address}</li>
            <li className="text-[0.875rem] text-faint">{contact.hours}</li>
          </FooterColumn>
        </div>

        <div className="divider-glow" />

        <div className="flex flex-col items-center justify-between gap-4 py-7 text-[0.8125rem] text-faint md:flex-row">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="/privacidad" className="transition-colors hover:text-text">
              Aviso de privacidad
            </a>
            <a href="/terminos" className="transition-colors hover:text-text">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-text">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-[0.875rem] text-muted transition-colors hover:text-accent"
      >
        {children}
      </a>
    </li>
  );
}
