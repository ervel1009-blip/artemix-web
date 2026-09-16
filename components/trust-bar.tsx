import { partners } from "@/lib/site-config";
import { LogoMarquee } from "./logo-marquee";

/**
 * Franja de confianza inmediatamente bajo el hero.
 * Muestra fabricantes y tecnologías con las que se trabaja: resuelve la
 * primera objeción del visitante ("¿estos quiénes son?") en 3 segundos.
 */
export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <div className="container-x">
        <LogoMarquee
          items={partners}
          label="Tecnologías y fabricantes con los que trabajamos"
        />
      </div>
    </section>
  );
}
