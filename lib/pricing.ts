import type { ServiceId } from "./services";

/**
 * ════════════════════════════════════════════════════════════════
 *  MOTOR DE COTIZACIÓN
 * ════════════════════════════════════════════════════════════════
 *  Todos los montos están en la moneda definida en site.currency.
 *  ⚠️ EDITAR — Ajusta `base`, `price` y los multiplicadores a tus
 *  costos reales. La lógica no necesita cambios.
 *
 *  Modelo:
 *    subtotal = base(alcance) × factorTamaño
 *             + Σ addons (monto fijo o % del base)
 *    total    = subtotal × factorUrgencia
 *    rango    = [total × 0.85, total × 1.20]
 *
 *  Se muestra un RANGO, no un precio cerrado: da una señal de costo
 *  honesta sin comprometerte antes del diagnóstico.
 * ════════════════════════════════════════════════════════════════
 */

export type ScopeOption = {
  id: string;
  label: string;
  description: string;
  base: number;
  /** Semanas estimadas, se usa para el resumen. */
  weeks: [number, number];
};

export type AddonOption = {
  id: string;
  label: string;
  description: string;
  /** Monto fijo a sumar. Usa `percent` en su lugar para % del base. */
  price?: number;
  /** Porcentaje del base (0.25 = +25%). */
  percent?: number;
  /** Semanas extra que añade al cronograma. */
  weeks?: number;
};

export type SizeOption = {
  id: string;
  label: string;
  description: string;
  factor: number;
};

export type UrgencyOption = {
  id: string;
  label: string;
  description: string;
  factor: number;
};

/** Paso 2 — Alcance, depende del servicio elegido. */
export const scopes: Record<ServiceId, ScopeOption[]> = {
  software: [
    {
      id: "landing",
      label: "Sitio web corporativo",
      description: "Sitio institucional o landing orientada a conversión, con CMS.",
      base: 2800,
      weeks: [3, 5],
    },
    {
      id: "webapp",
      label: "Aplicación web a medida",
      description: "Sistema con usuarios, roles, base de datos y lógica de negocio.",
      base: 9500,
      weeks: [8, 14],
    },
    {
      id: "mobile",
      label: "Aplicación móvil",
      description: "App iOS + Android con backend propio y publicación en tiendas.",
      base: 14000,
      weeks: [10, 16],
    },
    {
      id: "integration",
      label: "Integración o automatización",
      description: "Conectar sistemas existentes, APIs, migraciones y procesos automáticos.",
      base: 4200,
      weeks: [4, 8],
    },
  ],
  saas: [
    {
      id: "mvp",
      label: "MVP para validar",
      description: "Producto mínimo con onboarding, núcleo funcional y cobro de suscripción.",
      base: 12000,
      weeks: [10, 14],
    },
    {
      id: "platform",
      label: "Plataforma multi-tenant",
      description: "SaaS completo: organizaciones, roles, planes, facturación y métricas.",
      base: 26000,
      weeks: [16, 24],
    },
    {
      id: "migration",
      label: "Migrar producto existente a SaaS",
      description: "Llevar un sistema ya operando a un modelo cloud con suscripciones.",
      base: 18000,
      weeks: [12, 20],
    },
  ],
  redes: [
    {
      id: "small",
      label: "Oficina pequeña",
      description: "Hasta 25 puntos de red, un solo sitio.",
      base: 2600,
      weeks: [1, 2],
    },
    {
      id: "medium",
      label: "Empresa mediana",
      description: "25 a 100 puntos, VLANs, WiFi empresarial y seguridad perimetral.",
      base: 8500,
      weeks: [2, 4],
    },
    {
      id: "multisite",
      label: "Multi-sucursal",
      description: "Varias sedes enlazadas con VPN, políticas centralizadas y monitoreo.",
      base: 19000,
      weeks: [4, 8],
    },
    {
      id: "datacenter",
      label: "Site / datacenter",
      description: "Rack, redundancia, energía, climatización y alta disponibilidad.",
      base: 32000,
      weeks: [6, 12],
    },
  ],
  equipos: [
    {
      id: "workstation",
      label: "Equipos de oficina",
      description: "Laptops y desktops para trabajo administrativo.",
      base: 750,
      weeks: [1, 2],
    },
    {
      id: "pro",
      label: "Estaciones de alto rendimiento",
      description: "Diseño, CAD, edición de video, desarrollo o modelado.",
      base: 2100,
      weeks: [1, 3],
    },
    {
      id: "server",
      label: "Servidores y almacenamiento",
      description: "Servidores, NAS y respaldo para infraestructura interna.",
      base: 4800,
      weeks: [2, 4],
    },
    {
      id: "netgear",
      label: "Equipamiento de red",
      description: "Switches, access points, firewalls y UPS.",
      base: 1400,
      weeks: [1, 3],
    },
  ],
};

/** Paso 3 — Complementos, dependen del servicio. */
export const addons: Record<ServiceId, AddonOption[]> = {
  software: [
    { id: "design", label: "Diseño UI/UX desde cero", description: "Investigación, wireframes y sistema de diseño propio.", percent: 0.25, weeks: 2 },
    { id: "payments", label: "Pasarela de pagos", description: "Cobros con tarjeta, SPEI o transferencia.", price: 1600, weeks: 2 },
    { id: "mobileapp", label: "App móvil complementaria", description: "Versión iOS/Android del sistema.", percent: 0.6, weeks: 6 },
    { id: "erp", label: "Integración con ERP/CRM", description: "SAP, Odoo, HubSpot, Salesforce u otro.", price: 2400, weeks: 3 },
    { id: "bi", label: "Dashboard y reportería avanzada", description: "Tableros con KPIs y exportación.", price: 1900, weeks: 2 },
    { id: "seo", label: "SEO técnico y analítica", description: "Optimización, schema, GA4 y eventos de conversión.", price: 900, weeks: 1 },
    { id: "support", label: "Soporte y mantenimiento 12 meses", description: "Monitoreo, respaldos y bolsa de horas.", percent: 0.18 },
  ],
  saas: [
    { id: "design", label: "Diseño de producto y branding", description: "Identidad, sistema de diseño y flujos.", percent: 0.22, weeks: 3 },
    { id: "billing", label: "Facturación y planes avanzados", description: "Prorrateo, cupones, trials y facturación fiscal.", price: 3200, weeks: 3 },
    { id: "api", label: "API pública y webhooks", description: "Para que tus clientes integren tu producto.", price: 2800, weeks: 3 },
    { id: "ai", label: "Módulo de IA", description: "Asistentes, búsqueda semántica o automatización con LLM.", price: 5500, weeks: 4 },
    { id: "compliance", label: "Seguridad y cumplimiento", description: "Auditoría, cifrado, logs y preparación SOC2.", price: 4200, weeks: 4 },
    { id: "devops", label: "Infraestructura escalable y CI/CD", description: "Autoescalado, observabilidad y despliegue continuo.", price: 3600, weeks: 2 },
  ],
  redes: [
    { id: "cabling", label: "Cableado estructurado certificado", description: "Suministro, tendido y certificación de puntos.", percent: 0.4, weeks: 2 },
    { id: "wifi", label: "WiFi de alta densidad", description: "Site survey y cobertura para muchos usuarios simultáneos.", price: 2800, weeks: 2 },
    { id: "firewall", label: "Seguridad perimetral", description: "Firewall gestionado, filtrado y VPN.", price: 3400, weeks: 2 },
    { id: "cctv", label: "Videovigilancia IP", description: "Cámaras, grabación y acceso remoto.", price: 2600, weeks: 2 },
    { id: "monitor", label: "Monitoreo 24/7", description: "Alertas, tablero de estado y reporte mensual.", percent: 0.2 },
    { id: "ups", label: "Respaldo de energía", description: "UPS y protección eléctrica dimensionada.", price: 1500, weeks: 1 },
  ],
  equipos: [
    { id: "setup", label: "Configuración e imagen corporativa", description: "Sistema, políticas y software listo por equipo.", price: 45 },
    { id: "migration", label: "Migración de datos y usuarios", description: "Traspaso desde los equipos actuales.", price: 60 },
    { id: "warranty", label: "Garantía extendida 3 años", description: "Cobertura del fabricante ampliada.", percent: 0.12 },
    { id: "onsite", label: "Soporte en sitio", description: "Atención presencial con SLA definido.", percent: 0.15 },
    { id: "software", label: "Licenciamiento de software", description: "Microsoft 365, antivirus y ofimática.", price: 180 },
  ],
};

/**
 * Paso 4 — Tamaño. En `equipos` representa la cantidad de unidades y
 * multiplica el precio unitario; en el resto representa la complejidad.
 */
export const sizes: Record<ServiceId, SizeOption[]> = {
  software: [
    { id: "s", label: "Simple", description: "Pocas pantallas, flujo directo, un tipo de usuario.", factor: 0.8 },
    { id: "m", label: "Estándar", description: "Varios módulos y perfiles de usuario.", factor: 1 },
    { id: "l", label: "Complejo", description: "Reglas de negocio densas y múltiples integraciones.", factor: 1.45 },
    { id: "xl", label: "Crítico", description: "Alta concurrencia, auditoría y disponibilidad garantizada.", factor: 2 },
  ],
  saas: [
    { id: "s", label: "Un solo módulo", description: "Producto enfocado en una función principal.", factor: 0.85 },
    { id: "m", label: "Producto estándar", description: "Varios módulos y planes de suscripción.", factor: 1 },
    { id: "l", label: "Suite", description: "Múltiples productos bajo la misma plataforma.", factor: 1.5 },
  ],
  redes: [
    { id: "s", label: "1 sitio", description: "Una sola ubicación.", factor: 1 },
    { id: "m", label: "2 a 4 sitios", description: "Sedes enlazadas.", factor: 1.8 },
    { id: "l", label: "5 o más sitios", description: "Red distribuida con administración central.", factor: 3.2 },
  ],
  equipos: [
    { id: "q1", label: "1 a 5 equipos", description: "Compra puntual.", factor: 3 },
    { id: "q2", label: "6 a 20 equipos", description: "Renovación de área. Incluye descuento por volumen.", factor: 11 },
    { id: "q3", label: "21 a 50 equipos", description: "Renovación corporativa. Mejor precio por unidad.", factor: 30 },
    { id: "q4", label: "Más de 50 equipos", description: "Proyecto de despliegue. Precio negociado.", factor: 60 },
  ],
};

/** Paso 5 — Urgencia. */
export const urgencies: UrgencyOption[] = [
  {
    id: "flexible",
    label: "Flexible",
    description: "Sin fecha crítica. Mejor precio y planeación holgada.",
    factor: 0.95,
  },
  {
    id: "normal",
    label: "En los próximos 2 meses",
    description: "Ritmo estándar de trabajo.",
    factor: 1,
  },
  {
    id: "fast",
    label: "Lo antes posible",
    description: "Priorizamos tu proyecto en la cola.",
    factor: 1.2,
  },
  {
    id: "urgent",
    label: "Es urgente",
    description: "Equipo dedicado y jornadas extendidas.",
    factor: 1.45,
  },
];

// ─────────────────────────────────────────────────────────────

export type QuoteSelection = {
  service: ServiceId | null;
  scope: string | null;
  addons: string[];
  size: string | null;
  urgency: string | null;
};

export type QuoteResult = {
  min: number;
  max: number;
  weeks: [number, number];
  /** Desglose legible para el resumen y el mensaje de WhatsApp. */
  lines: { label: string; amount: number }[];
};

export const emptySelection: QuoteSelection = {
  service: null,
  scope: null,
  addons: [],
  size: null,
  urgency: null,
};

/** Calcula el rango estimado. Devuelve null si falta información. */
export function calculateQuote(sel: QuoteSelection): QuoteResult | null {
  if (!sel.service || !sel.scope) return null;

  const scope = scopes[sel.service].find((s) => s.id === sel.scope);
  if (!scope) return null;

  const size = sizes[sel.service].find((s) => s.id === sel.size);
  const urgency = urgencies.find((u) => u.id === sel.urgency);

  const sizeFactor = size?.factor ?? 1;
  const urgencyFactor = urgency?.factor ?? 1;

  const baseAmount = scope.base * sizeFactor;
  const lines: { label: string; amount: number }[] = [
    { label: `${scope.label}${size ? ` · ${size.label}` : ""}`, amount: baseAmount },
  ];

  let addonTotal = 0;
  let extraWeeks = 0;

  for (const id of sel.addons) {
    const addon = addons[sel.service].find((a) => a.id === id);
    if (!addon) continue;
    // Los porcentajes se calculan sobre el base ya ajustado por tamaño.
    const amount = addon.price != null ? addon.price * (sel.service === "equipos" ? sizeFactor : 1) : baseAmount * (addon.percent ?? 0);
    addonTotal += amount;
    extraWeeks += addon.weeks ?? 0;
    lines.push({ label: addon.label, amount });
  }

  const subtotal = baseAmount + addonTotal;
  const total = subtotal * urgencyFactor;

  if (urgencyFactor !== 1) {
    lines.push({
      label: urgencyFactor > 1 ? `Prioridad: ${urgency?.label}` : `Descuento por plazo flexible`,
      amount: subtotal * (urgencyFactor - 1),
    });
  }

  // Los plazos acelerados comprimen el cronograma, no lo extienden.
  const timeCompression = urgencyFactor >= 1.2 ? 0.75 : 1;
  const weekLow = Math.max(1, Math.round((scope.weeks[0] + extraWeeks * 0.5) * timeCompression));
  const weekHigh = Math.max(weekLow + 1, Math.round((scope.weeks[1] + extraWeeks) * timeCompression));

  return {
    min: roundTo(total * 0.85, 50),
    max: roundTo(total * 1.2, 50),
    weeks: [weekLow, weekHigh],
    lines,
  };
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function formatMoney(value: number, symbol = "$"): string {
  // El signo va delante del símbolo: "−$157", no "$-157".
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "−" : "";
  return `${sign}${symbol}${Math.abs(rounded).toLocaleString("es-MX")}`;
}
