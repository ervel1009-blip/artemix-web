import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { ServicesSection } from "@/components/services-section";
import { DifferentiatorsSection } from "@/components/differentiators-section";
import { ProcessSection } from "@/components/process-section";
import { ClientsSection } from "@/components/clients-section";
import { EquipmentSection } from "@/components/equipment-section";
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
 *   7. Equipos       → catálogo con intención de compra
 *   8. Cotizador     → conversión principal
 *   9. FAQ           → últimas dudas
 *  10. CTA + Footer  → salidas de contacto
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
        <EquipmentSection />
        <QuoteSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
