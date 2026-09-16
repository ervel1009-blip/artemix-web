import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { contact, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: `Cómo ${site.name} recopila, usa y protege los datos personales de quienes usan el sitio y el cotizador.`,
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return (
    <LegalPage title="Aviso de privacidad" updated="15 de septiembre de 2026">
      <h2>1. Quién es responsable de tus datos</h2>
      <p>
        {site.legalName}, con domicilio en {contact.address}, es responsable del
        tratamiento de los datos personales que nos proporcionas a través de este sitio.
        Para cualquier asunto relacionado con privacidad, escríbenos a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <p>Únicamente los que tú nos entregas de forma voluntaria:</p>
      <ul>
        <li>
          <strong>A través del cotizador:</strong> nombre, empresa, correo electrónico,
          teléfono y la descripción del proyecto que decidas compartir.
        </li>
        <li>
          <strong>Al escribirnos por WhatsApp o correo:</strong> los datos que incluyas
          en tu mensaje y el número desde el que nos contactas.
        </li>
        <li>
          <strong>Datos técnicos de navegación:</strong> dirección IP, tipo de navegador
          y páginas visitadas, recopilados de forma agregada para medir el uso del sitio.
        </li>
      </ul>
      <p>
        No solicitamos ni almacenamos datos bancarios, contraseñas ni documentos de
        identificación a través de este sitio.
      </p>

      <h2>3. Para qué los usamos</h2>
      <ul>
        <li>Elaborar y enviarte la propuesta o cotización que solicitaste.</li>
        <li>Dar seguimiento comercial a tu solicitud y responder tus preguntas.</li>
        <li>Prestar los servicios contratados y darles soporte.</li>
        <li>Mejorar el sitio y entender qué contenido resulta útil.</li>
      </ul>
      <p>
        No vendemos, rentamos ni compartimos tus datos con terceros para fines
        publicitarios.
      </p>

      <h2>4. Con quién los compartimos</h2>
      <p>
        Solo con los proveedores tecnológicos necesarios para operar el sitio, que
        actúan como encargados del tratamiento y están obligados a proteger la
        información: el proveedor de alojamiento (Vercel), el servicio de envío de
        correo transaccional y, si decides usarlo, WhatsApp como canal de comunicación.
        También podremos revelarlos cuando una autoridad competente lo requiera
        legalmente.
      </p>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos las solicitudes de cotización mientras exista una relación comercial
        activa o potencial y, posteriormente, durante el plazo que exija la legislación
        fiscal y mercantil aplicable. Después se eliminan o anonimizan.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u
        oposición al tratamiento de tus datos, así como revocar el consentimiento que
        nos hayas otorgado. Envía tu solicitud a{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> indicando tu nombre y el
        derecho que deseas ejercer. Responderemos en un plazo máximo de 20 días hábiles.
      </p>

      <h2>7. Cookies y tecnologías similares</h2>
      <p>
        Este sitio usa almacenamiento local del navegador únicamente para recordar el
        tema visual (claro u oscuro) que elegiste. Ese dato permanece en tu dispositivo
        y no se envía a nuestros servidores. Si más adelante incorporamos herramientas
        de analítica, se informará en este aviso.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tu
        información, incluido el cifrado en tránsito mediante HTTPS. Ningún sistema es
        infalible, por lo que no podemos garantizar seguridad absoluta.
      </p>

      <h2>9. Cambios a este aviso</h2>
      <p>
        Podemos actualizar este aviso cuando cambien nuestras prácticas o la normativa
        aplicable. La versión vigente siempre estará publicada en esta página con su
        fecha de actualización.
      </p>
    </LegalPage>
  );
}
