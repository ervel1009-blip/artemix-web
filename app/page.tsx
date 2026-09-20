import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { ServicesSection } from "@/components/services-section";
import { DifferentiatorsSection } from "@/components/differentiators-section";
import { ProcessSection } from "@/components/process-section";
import { ClientsSection } from "@/components/clients-section";
import { QuoteSection } from "@/components/quote-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { WhatsappFab } from "@/components/whatsapp-fab";

/**
 * Orden de la página, pensado como un embudo:
 *   1. Hero          → capta y da la promesa
 *   2. TrustBar      → credibilidad inmediata
 *   3. Servicios     → qué hacemos, con precio de entrada
 *   4. Diferencia    → neutraliza objeciones
 *   5. Proceso       → reduce el riesgo percibido
 *   6. Clientes      → prueba social
 *   7. Cotizador     → conversión principal
 *   8. FAQ           → últimas dudas
 *   9. CTA + Footer  → salidas de contacto
 *
 * El catálogo de equipos está desactivado a propósito: la venta de hardware
 * se atiende por cotización, no por precio de vitrina. Para reactivarlo,
 * descomenta <EquipmentSection /> junto con su import, y vuelve a añadir
 * { label: "Equipos", href: "#equipos" } a navLinks en lib/site-config.ts.
 * El componente y el catálogo siguen en el repo, listos para usarse.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <TrustBar />
        <ServicesSection />
        <DifferentiatorsSection />
        <ProcessSection />
        <ClientsSection />
        {/* <EquipmentSection /> — ver nota arriba */}
        <QuoteSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
