import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

/**
 * Envoltorio para las páginas de texto legal.
 * Reutiliza navbar y footer para que el usuario no sienta que salió del sitio.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 md:pt-40">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />

        <article className="container-x relative max-w-3xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>

          <h1 className="mt-8 text-[clamp(2rem,5vw,3rem)] font-bold">{title}</h1>
          <p className="mt-4 text-sm text-faint">Última actualización: {updated}</p>

          {/* Aviso para el dueño del sitio. Bórralo cuando el texto esté revisado. */}
          <div className="mt-10 flex gap-3.5 rounded-panel border border-amber-500/30 bg-amber-500/10 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-[0.875rem] leading-relaxed text-amber-700 dark:text-amber-300">
              <strong>Plantilla pendiente de revisión.</strong> Este texto es una base
              genérica, no asesoría legal. Antes de publicar el sitio, adáptalo a tu
              razón social y a la legislación de tu país, y hazlo revisar por un
              abogado. Después elimina este aviso en{" "}
              <code className="font-mono text-[0.8125rem]">components/legal-page.tsx</code>.
            </p>
          </div>

          <div className="legal-body mt-12">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
