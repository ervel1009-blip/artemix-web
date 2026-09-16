import { contact, site } from "./site-config";
import { formatMoney, type QuoteResult, type QuoteSelection } from "./pricing";
import { scopes, sizes, urgencies, addons as addonCatalog } from "./pricing";
import { services } from "./services";

/**
 * Construye un enlace wa.me con el mensaje ya escrito.
 * wa.me funciona igual en móvil (abre la app) y en escritorio (WhatsApp Web),
 * por eso lo preferimos sobre api.whatsapp.com.
 */
export function waLink(message: string, phone = contact.whatsapp): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/** Mensajes predefinidos por contexto. Cada CTA abre la conversación en el punto correcto. */
export const waMessages = {
  general: `Hola ${site.name}, vi su sitio web y me gustaría recibir más información sobre sus servicios.`,

  service: (serviceName: string) =>
    `Hola ${site.name}, me interesa el servicio de ${serviceName}. ¿Podemos agendar una llamada?`,

  equipment: (item: { brand: string; name: string }) =>
    `Hola ${site.name}, quiero cotizar el equipo ${item.brand} ${item.name}. ¿Tienen disponibilidad?`,

  diagnostic: `Hola ${site.name}, quiero agendar la llamada de diagnóstico sin costo para mi proyecto.`,
};

export type QuoteContact = {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

/** Arma el resumen completo de la cotización para enviarlo por WhatsApp o correo. */
export function buildQuoteMessage(
  sel: QuoteSelection,
  result: QuoteResult,
  info: QuoteContact
): string {
  const service = services.find((s) => s.id === sel.service);
  const scope = sel.service ? scopes[sel.service].find((s) => s.id === sel.scope) : undefined;
  const size = sel.service ? sizes[sel.service].find((s) => s.id === sel.size) : undefined;
  const urgency = urgencies.find((u) => u.id === sel.urgency);
  const selectedAddons = sel.service
    ? sel.addons
        .map((id) => addonCatalog[sel.service!].find((a) => a.id === id)?.label)
        .filter(Boolean)
    : [];

  const { symbol, suffix } = site.currency;

  const lines = [
    `*Nueva cotización — ${site.name}*`,
    ``,
    `*Servicio:* ${service?.name ?? "—"}`,
    `*Alcance:* ${scope?.label ?? "—"}`,
    size ? `*Dimensión:* ${size.label}` : null,
    selectedAddons.length ? `*Complementos:* ${selectedAddons.join(", ")}` : `*Complementos:* ninguno`,
    urgency ? `*Plazo:* ${urgency.label}` : null,
    ``,
    `*Inversión estimada:* ${formatMoney(result.min, symbol)} – ${formatMoney(result.max, symbol)} ${suffix}`,
    `*Tiempo estimado:* ${result.weeks[0]} – ${result.weeks[1]} semanas`,
    ``,
    `*Datos de contacto*`,
    `Nombre: ${info.name}`,
    info.company ? `Empresa: ${info.company}` : null,
    `Email: ${info.email}`,
    info.phone ? `Teléfono: ${info.phone}` : null,
    info.notes ? `` : null,
    info.notes ? `*Comentarios:* ${info.notes}` : null,
  ];

  return lines.filter((l) => l !== null).join("\n");
}
