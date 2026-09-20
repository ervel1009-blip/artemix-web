import type { ServiceId } from "./services";

/**
 * ════════════════════════════════════════════════════════════════
 *  MOTOR DE COTIZACIÓN
 * ════════════════════════════════════════════════════════════════
 *  Todos los montos están en QUETZALES (GTQ).
 *  ⚠️ EDITAR — Ajusta `base`, `price` y los multiplicadores a tus
 *  costos reales. La lógica no necesita cambios.
 *
 *  Modelo:
 *    subtotal = base(alcance) × factorTamaño
 *             + Σ addons (monto fijo o % del base)
 *    total    = subtotal × factorUrgencia
 *    rango    = [total × 0.92, total × 1.15]
 *
 *  Se muestra un RANGO estrecho, no un precio cerrado: da una señal de
 *  costo clara sin comprometerte antes del diagnóstico.
 *
 *  Los alcances SIN `base` no muestran cifras: devuelven un resultado de
 *  tipo "custom" con el plazo estimado y el resumen de lo elegido.
 * ════════════════════════════════════════════════════════════════
 */

export type ScopeOption = {
  id: string;
  label: string;
  description: string;
  /**
   * Precio base en quetzales. **Omitirlo marca el alcance como "cotización a
   * medida"**: el wizard sigue capturando requerimientos y plazo, pero no
   * muestra ninguna cifra.
   *
   * Se deja sin precio todo aquello cuyo costo depende del diagnóstico —un
   * SaaS o una red multi-sucursal no tienen precio de lista— y se conserva
   * donde el alcance es predecible: sitios web y equipos.
   */
  base?: number;
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
      // Único alcance de software con precio: el sitio web es el producto
      // cuyo esfuerzo sí se puede acotar sin diagnóstico previo.
      id: "landing",
      label: "Sitio web",
      description: "Sitio institucional o landing orientada a conversión, con gestor de contenido.",
      base: 6000,
      weeks: [3, 5],
    },
    {
      id: "webapp",
      label: "Aplicación web a medida",
      description: "Sistema con usuarios, roles, base de datos y lógica de negocio.",
      weeks: [8, 14],
    },
    {
      id: "mobile",
      label: "Aplicación móvil",
      description: "App iOS + Android con backend propio y publicación en tiendas.",
      weeks: [10, 16],
    },
    {
      id: "integration",
      label: "Integración o automatización",
      description: "Conectar sistemas existentes, APIs, migraciones y procesos automáticos.",
      weeks: [4, 8],
    },
  ],
  saas: [
    {
      id: "mvp",
      label: "MVP para validar",
      description: "Producto mínimo con onboarding, núcleo funcional y cobro de suscripción.",
      weeks: [10, 14],
    },
    {
      id: "platform",
      label: "Plataforma multi-tenant",
      description: "SaaS completo: organizaciones, roles, planes, facturación y métricas.",
      weeks: [16, 24],
    },
    {
      id: "migration",
      label: "Migrar producto existente a SaaS",
      description: "Llevar un sistema ya operando a un modelo cloud con suscripciones.",
      weeks: [12, 20],
    },
  ],
  redes: [
    {
      id: "small",
      label: "Oficina pequeña",
      description: "Hasta 25 puntos de red, un solo sitio.",
      weeks: [1, 2],
    },
    {
      id: "medium",
      label: "Empresa mediana",
      description: "25 a 100 puntos, VLANs, WiFi empresarial y seguridad perimetral.",
      weeks: [2, 4],
    },
    {
      id: "multisite",
      label: "Multi-sucursal",
      description: "Varias sedes enlazadas con VPN, políticas centralizadas y monitoreo.",
      weeks: [4, 8],
    },
    {
      id: "datacenter",
      label: "Site / datacenter",
      description: "Rack, redundancia, energía, climatización y alta disponibilidad.",
      weeks: [6, 12],
    },
  ],
  /**
   * Sin precio: el catálogo público está desactivado y el costo del hardware
   * se mueve con el tipo de cambio y la disponibilidad del proveedor. Mostrar
   * una cifra calculada aquí envejecería mal y comprometería la venta.
   */
  equipos: [
    {
      id: "workstation",
      label: "Equipos de oficina",
      description: "Laptops y desktops para trabajo administrativo.",
      weeks: [1, 2],
    },
    {
      id: "pro",
      label: "Estaciones de alto rendimiento",
      description: "Diseño, CAD, edición de video, desarrollo o modelado.",
      weeks: [1, 3],
    },
    {
      id: "server",
      label: "Servidores y almacenamiento",
      description: "Servidores, NAS y respaldo para infraestructura interna.",
      weeks: [2, 4],
    },
    {
      id: "netgear",
      label: "Equipamiento de red",
      description: "Switches, access points, firewalls y UPS.",
      weeks: [1, 3],
    },
  ],
};

/** Paso 3 — Complementos, dependen del servicio. */
export const addons: Record<ServiceId, AddonOption[]> = {
  // Calibrados a la escala del sitio web, que es el único alcance de software
  // con precio. En los alcances sin precio se siguen mostrando como casillas
  // para capturar el requerimiento, pero sin importe.
  software: [
    { id: "design", label: "Diseño a la medida", description: "Sin plantillas: identidad propia, maquetas y revisiones.", percent: 0.25, weeks: 2 },
    { id: "ecommerce", label: "Tienda en línea y pagos", description: "Catálogo, carrito y cobro con tarjeta o transferencia.", price: 2500, weeks: 2 },
    { id: "cms", label: "Gestor de contenido o blog", description: "Para que edites textos e imágenes sin depender de nosotros.", price: 1200, weeks: 1 },
    { id: "multilang", label: "Segundo idioma", description: "Versión completa del sitio en inglés u otro idioma.", price: 1500, weeks: 1 },
    { id: "seo", label: "SEO técnico y analítica", description: "Optimización para Google, GA4 y eventos de conversión.", price: 1200, weeks: 1 },
    { id: "integration", label: "Integración con otros sistemas", description: "CRM, facturación electrónica, inventario o API externa.", price: 2800, weeks: 2 },
    { id: "support", label: "Hospedaje y mantenimiento 12 meses", description: "Dominio, alojamiento, respaldos y actualizaciones.", percent: 0.2 },
  ],
  saas: [
    { id: "design", label: "Diseño de producto y branding", description: "Identidad, sistema de diseño y flujos.", percent: 0.22, weeks: 3 },
    { id: "billing", label: "Facturación y planes avanzados", description: "Prorrateo, cupones, trials y facturación FEL.", price: 24800, weeks: 3 },
    { id: "api", label: "API pública y webhooks", description: "Para que tus clientes integren tu producto.", price: 21700, weeks: 3 },
    { id: "ai", label: "Módulo de IA", description: "Asistentes, búsqueda semántica o automatización con LLM.", price: 42600, weeks: 4 },
    { id: "compliance", label: "Seguridad y cumplimiento", description: "Auditoría, cifrado, logs y preparación SOC2.", price: 32500, weeks: 4 },
    { id: "devops", label: "Infraestructura escalable y CI/CD", description: "Autoescalado, observabilidad y despliegue continuo.", price: 27900, weeks: 2 },
  ],
  redes: [
    { id: "cabling", label: "Cableado estructurado certificado", description: "Suministro, tendido y certificación de puntos.", percent: 0.4, weeks: 2 },
    { id: "wifi", label: "WiFi de alta densidad", description: "Site survey y cobertura para muchos usuarios simultáneos.", price: 21700, weeks: 2 },
    { id: "firewall", label: "Seguridad perimetral", description: "Firewall gestionado, filtrado y VPN.", price: 26400, weeks: 2 },
    { id: "cctv", label: "Videovigilancia IP", description: "Cámaras, grabación y acceso remoto.", price: 20200, weeks: 2 },
    { id: "monitor", label: "Monitoreo 24/7", description: "Alertas, tablero de estado y reporte mensual.", percent: 0.2 },
    { id: "ups", label: "Respaldo de energía", description: "UPS y protección eléctrica dimensionada.", price: 11600, weeks: 1 },
  ],
  equipos: [
    { id: "setup", label: "Configuración e imagen corporativa", description: "Sistema, políticas y software listo por equipo.", price: 350 },
    { id: "migration", label: "Migración de datos y usuarios", description: "Traspaso desde los equipos actuales.", price: 470 },
    { id: "warranty", label: "Garantía extendida 3 años", description: "Cobertura del fabricante ampliada.", percent: 0.12 },
    { id: "onsite", label: "Soporte en sitio", description: "Atención presencial con SLA definido.", percent: 0.15 },
    { id: "software", label: "Licenciamiento de software", description: "Microsoft 365, antivirus y ofimática.", price: 1400 },
  ],
};

/**
 * Paso 4 — Tamaño. En `equipos` representa la cantidad de unidades y
 * multiplica el precio unitario; en el resto representa la complejidad.
 */
export const sizes: Record<ServiceId, SizeOption[]> = {
  /**
   * Los factores están calibrados sobre el sitio web (base Q6,000) para dar
   * ≈Q3,000 sencillo · ≈Q6,000 estándar · ≈Q8,700 avanzado. En los alcances
   * sin precio solo sirven para describir el tamaño del proyecto.
   */
  software: [
    { id: "s", label: "Sencillo", description: "Una página o pocas secciones con contenido informativo.", factor: 0.5 },
    { id: "m", label: "Estándar", description: "Varias secciones, blog o catálogo y formularios.", factor: 1 },
    { id: "l", label: "Avanzado", description: "Muchas secciones, panel de administración e integraciones.", factor: 1.45 },
    { id: "xl", label: "A la medida", description: "Área privada de clientes, multi-idioma o requisitos especiales.", factor: 2.2 },
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

export type QuoteLine = { label: string; amount: number };

/**
 * Unión discriminada a propósito: obliga a que la interfaz resuelva de forma
 * explícita el caso sin precio, en vez de mostrar un "Q0" por descuido.
 */
export type QuoteResult =
  | {
      kind: "estimate";
      min: number;
      max: number;
      weeks: [number, number];
      /** Desglose legible para el resumen y el mensaje de WhatsApp. */
      lines: QuoteLine[];
    }
  | {
      kind: "custom";
      weeks: [number, number];
      /** Resumen de lo elegido, sin importes. */
      summary: string[];
    };

export const emptySelection: QuoteSelection = {
  service: null,
  scope: null,
  addons: [],
  size: null,
  urgency: null,
};

/** Indica si un alcance tiene precio de lista o se cotiza tras diagnóstico. */
export function hasPricing(service: ServiceId | null, scopeId: string | null): boolean {
  if (!service || !scopeId) return false;
  return scopes[service].find((s) => s.id === scopeId)?.base != null;
}

/** Calcula la estimación. Devuelve null si aún falta elegir servicio o alcance. */
export function calculateQuote(sel: QuoteSelection): QuoteResult | null {
  if (!sel.service || !sel.scope) return null;

  const scope = scopes[sel.service].find((s) => s.id === sel.scope);
  if (!scope) return null;

  const size = sizes[sel.service].find((s) => s.id === sel.size);
  const urgency = urgencies.find((u) => u.id === sel.urgency);
  const chosenAddons = sel.addons
    .map((id) => addons[sel.service!].find((a) => a.id === id))
    .filter((a) => a != null);

  const urgencyFactor = urgency?.factor ?? 1;
  const extraWeeks = chosenAddons.reduce((total, a) => total + (a.weeks ?? 0), 0);

  /**
   * El tamaño también mueve el cronograma: un sitio sencillo no puede tardar
   * lo mismo que uno a la medida. Se usa la raíz del factor para amortiguar
   * (duplicar el alcance no duplica el tiempo) y se acota, porque en equipos
   * el "tamaño" es cantidad de unidades y su factor llega a 60.
   */
  const sizeTimeFactor = Math.min(1.6, Math.max(0.6, Math.sqrt(size?.factor ?? 1)));

  // Los plazos acelerados comprimen el cronograma, no lo extienden.
  const timeCompression = urgencyFactor >= 1.2 ? 0.75 : 1;
  const scale = sizeTimeFactor * timeCompression;
  const weekLow = Math.max(1, Math.round(scope.weeks[0] * scale + extraWeeks * 0.5));
  const weekHigh = Math.max(weekLow + 1, Math.round(scope.weeks[1] * scale + extraWeeks));
  const weeks: [number, number] = [weekLow, weekHigh];

  // ── Alcance sin precio de lista ──
  if (scope.base == null) {
    return {
      kind: "custom",
      weeks,
      summary: [
        `${scope.label}${size ? ` · ${size.label}` : ""}`,
        ...chosenAddons.map((a) => a.label),
        ...(urgency ? [`Plazo: ${urgency.label}`] : []),
      ],
    };
  }

  // ── Alcance con precio ──
  const sizeFactor = size?.factor ?? 1;
  const baseAmount = scope.base * sizeFactor;
  const lines: QuoteLine[] = [
    { label: `${scope.label}${size ? ` · ${size.label}` : ""}`, amount: baseAmount },
  ];

  let addonTotal = 0;
  for (const addon of chosenAddons) {
    // Los porcentajes se calculan sobre el base ya ajustado por tamaño.
    // En equipos el precio es por unidad, así que escala con la cantidad.
    const amount =
      addon.price != null
        ? addon.price * (sel.service === "equipos" ? sizeFactor : 1)
        : baseAmount * (addon.percent ?? 0);
    addonTotal += amount;
    lines.push({ label: addon.label, amount });
  }

  const subtotal = baseAmount + addonTotal;
  const total = subtotal * urgencyFactor;

  if (urgencyFactor !== 1) {
    lines.push({
      label: urgencyFactor > 1 ? `Prioridad: ${urgency?.label}` : "Descuento por plazo flexible",
      amount: subtotal * (urgencyFactor - 1),
    });
  }

  return {
    kind: "estimate",
    min: roundTo(total * 0.92),
    max: roundTo(total * 1.15),
    weeks,
    lines,
  };
}

/**
 * Redondea a una cifra que se lea como precio comercial.
 * El paso escala con el monto: en quetzales, un rango de "Q18,275 – Q25,842"
 * parece calculado con calculadora; "Q18,500 – Q26,000" parece una propuesta.
 */
function roundTo(value: number): number {
  const step = value >= 50000 ? 1000 : value >= 10000 ? 500 : 100;
  return Math.round(value / step) * step;
}

/**
 * El símbolo por defecto debe coincidir con `site.currency.symbol`.
 * Se repite aquí a propósito: mantener este módulo sin dependencias permite
 * ejecutarlo con `node` directamente desde scripts/check-pricing.mts.
 */
export function formatMoney(value: number, symbol = "Q"): string {
  // El signo va delante del símbolo: "−Q157", no "Q-157".
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "−" : "";
  return `${sign}${symbol}${Math.abs(rounded).toLocaleString("es-GT")}`;
}
