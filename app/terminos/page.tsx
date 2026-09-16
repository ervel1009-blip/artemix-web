import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contact, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description: `Condiciones de uso del sitio de ${site.name} y bases generales de contratación de sus servicios.`,
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos de servicio" updated="15 de septiembre de 2026">
      <h2>1. Aceptación</h2>
      <p>
        Al navegar por este sitio aceptas estas condiciones. Si no estás de acuerdo con
        alguna de ellas, te pedimos no utilizarlo. El titular del sitio es{" "}
        {site.legalName}, con domicilio en {contact.address}.
      </p>

      <h2>2. Naturaleza de las cotizaciones</h2>
      <p>
        El cotizador en línea entrega un <strong>rango estimado y orientativo</strong>,
        calculado a partir de proyectos de alcance comparable. No constituye una oferta
        en firme, no genera obligación contractual para ninguna de las partes y puede
        variar una vez conocido el alcance real.
      </p>
      <p>
        El precio definitivo se establece siempre en una propuesta formal por escrito,
        después del diagnóstico. Esa propuesta indica alcance cerrado, entregables,
        cronograma, forma de pago y vigencia de la oferta.
      </p>

      <h2>3. Contratación de servicios</h2>
      <p>
        La relación de servicios se rige por el contrato o propuesta aceptada por ambas
        partes, que prevalece sobre este documento. Salvo que dicha propuesta indique
        otra cosa:
      </p>
      <ul>
        <li>Los pagos se realizan por hitos según el calendario acordado.</li>
        <li>
          Los cambios de alcance solicitados después de la aceptación se cotizan aparte.
        </li>
        <li>
          Los plazos comprometidos suponen que el cliente entregue a tiempo la
          información, accesos y aprobaciones necesarios.
        </li>
      </ul>

      <h2>4. Propiedad intelectual</h2>
      <p>
        Los derechos patrimoniales del software desarrollado a medida se transfieren al
        cliente una vez liquidado el proyecto en su totalidad. Quedan excluidos de esa
        transferencia los componentes de terceros, las bibliotecas de código abierto y
        las herramientas internas preexistentes, que se licencian para su uso dentro del
        proyecto entregado.
      </p>
      <p>
        El contenido de este sitio —textos, diseño, marca y código— es propiedad de{" "}
        {site.legalName} y no puede reproducirse sin autorización escrita.
      </p>

      <h2>5. Garantía</h2>
      <p>
        Todo desarrollo incluye 90 días naturales de garantía sobre defectos atribuibles
        a nuestro trabajo, contados desde la puesta en producción. La garantía no cubre
        nuevas funcionalidades, cambios en servicios de terceros, modificaciones hechas
        por el cliente o fallos derivados de un uso distinto al previsto.
      </p>
      <p>
        Los equipos de cómputo se rigen por la garantía del fabricante, en los términos
        y plazos que este determine.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        Nuestra responsabilidad total frente al cliente se limita al monto efectivamente
        pagado por el servicio que dio origen a la reclamación. No respondemos por daños
        indirectos, lucro cesante ni pérdida de datos cuando existan mecanismos de
        respaldo disponibles y no hayan sido contratados o utilizados.
      </p>

      <h2>7. Disponibilidad del sitio</h2>
      <p>
        Procuramos que el sitio esté disponible de forma continua, pero puede sufrir
        interrupciones por mantenimiento o causas ajenas a nosotros. No garantizamos
        disponibilidad ininterrumpida de este sitio informativo.
      </p>

      <h2>8. Ley aplicable</h2>
      <p>
        Estos términos se rigen por la legislación aplicable en el domicilio del titular.
        Cualquier controversia se someterá a los tribunales competentes de dicha
        jurisdicción, renunciando las partes a cualquier otro fuero.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para dudas sobre estos términos escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> o al {contact.phone}.
      </p>
    </LegalPage>
  );
}
