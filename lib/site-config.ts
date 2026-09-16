/**
 * ════════════════════════════════════════════════════════════════
 *  ARTEMIX — CONFIGURACIÓN CENTRAL DEL SITIO
 * ════════════════════════════════════════════════════════════════
 *  Este es el ÚNICO archivo que necesitas tocar para personalizar
 *  textos, contacto, servicios, clientes y catálogo.
 *  Todo lo marcado con  ⚠️ EDITAR  son datos de ejemplo.
 * ════════════════════════════════════════════════════════════════
 */

export const site = {
  name: "ARTEMIX",
  legalName: "ARTEMIX", // ⚠️ EDITAR — razón social completa, ej. "Artemix S.A. de C.V."
  tagline: "Ingeniería de software y redes que sostiene tu operación",
  description:
    "Desarrollamos software a medida, plataformas SaaS, diseñamos redes empresariales y equipamos tu infraestructura de cómputo. Cotiza tu proyecto en minutos.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://artemix.com",
  locale: "es_MX", // ⚠️ EDITAR según tu país: es_MX, es_PE, es_CO, es_CL...

  /** Moneda usada en el cotizador y el catálogo. */
  currency: {
    code: "USD",
    symbol: "$",
    /** Sufijo mostrado junto a los montos, deja "" si no lo quieres. */
    suffix: "USD",
  },
} as const;

export const contact = {
  /**
   * ⚠️ EDITAR — WhatsApp en formato internacional SIN "+", espacios ni guiones.
   * México:  52 + 1 + 10 dígitos  →  5215512345678
   * Perú:    51 + 9 dígitos       →  51987654321
   * Colombia:57 + 10 dígitos      →  573001234567
   * Se puede sobreescribir con la variable de entorno NEXT_PUBLIC_WHATSAPP.
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "521234567890",

  email: "contacto@artemix.com", // ⚠️ EDITAR
  salesEmail: "ventas@artemix.com", // ⚠️ EDITAR
  phone: "+52 55 1234 5678", // ⚠️ EDITAR
  address: "Ciudad de México, México", // ⚠️ EDITAR
  /** Horario mostrado junto al bloque de contacto. */
  hours: "Lun a Vie · 9:00 – 19:00",

  social: {
    linkedin: "https://linkedin.com/company/artemix", // ⚠️ EDITAR
    github: "https://github.com/artemix", // ⚠️ EDITAR
    instagram: "", // deja "" para ocultar el icono
    x: "",
  },
} as const;

/** Métricas del hero. Números que respaldan la venta. */
export const metrics = [
  { value: 120, suffix: "+", label: "Proyectos entregados" }, // ⚠️ EDITAR
  { value: 8, suffix: " años", label: "De experiencia" }, // ⚠️ EDITAR
  { value: 99.9, suffix: "%", label: "Uptime en producción", decimals: 1 },
  { value: 40, suffix: "+", label: "Clientes activos" }, // ⚠️ EDITAR
] as const;

/**
 * ⚠️ EDITAR — Clientes y marcas con las que has trabajado.
 * `logo` es la ruta a un SVG/PNG dentro de /public/logos/.
 * Si aún no tienes el logo, deja `logo: null` y se renderiza el nombre
 * en tipografía (se ve bien y es honesto mientras consigues los assets).
 */
export type Client = {
  name: string;
  logo: string | null;
  url?: string;
  /** Sector, se muestra en el grid detallado de clientes. */
  sector?: string;
};

export const clients: Client[] = [
  { name: "Grupo Rivera", logo: null, sector: "Retail" },
  { name: "LogiTrans", logo: null, sector: "Logística" },
  { name: "Clínica Norte", logo: null, sector: "Salud" },
  { name: "AgroSur", logo: null, sector: "Agroindustria" },
  { name: "Banco Vertex", logo: null, sector: "Servicios financieros" },
  { name: "EduCampus", logo: null, sector: "Educación" },
  { name: "Metalix", logo: null, sector: "Manufactura" },
  { name: "NexHotel", logo: null, sector: "Hotelería" },
];

/**
 * ⚠️ EDITAR — Alianzas y tecnologías certificadas.
 * Distinto de clientes: aquí van los fabricantes/partners (Cisco, Dell, HP,
 * Microsoft, AWS...). Refuerzan credibilidad en redes y equipos.
 */
export const partners: Client[] = [
  { name: "Cisco", logo: null },
  { name: "Ubiquiti", logo: null },
  { name: "Dell", logo: null },
  { name: "HP", logo: null },
  { name: "Lenovo", logo: null },
  { name: "Microsoft", logo: null },
  { name: "AWS", logo: null },
  { name: "Fortinet", logo: null },
];

/** Testimonios. Cada uno debe tener resultado medible, no adjetivos. */
export const testimonials = [
  {
    quote:
      "Migramos nuestro sistema de inventario a la plataforma que desarrolló ARTEMIX y redujimos los tiempos de cierre mensual de 5 días a 4 horas.",
    author: "Nombre Apellido", // ⚠️ EDITAR
    role: "Director de Operaciones, Grupo Rivera",
    initials: "NA",
  },
  {
    quote:
      "Rediseñaron la red de nuestras tres sucursales. Pasamos de caídas semanales a cero incidentes en catorce meses.",
    author: "Nombre Apellido", // ⚠️ EDITAR
    role: "Gerente de TI, LogiTrans",
    initials: "NA",
  },
  {
    quote:
      "Levantaron el MVP de nuestro SaaS en once semanas y nos acompañaron hasta los primeros 500 usuarios de pago.",
    author: "Nombre Apellido", // ⚠️ EDITAR
    role: "Fundadora, EduCampus",
    initials: "NA",
  },
] as const;

export const faqs = [
  {
    q: "¿Cuánto cuesta un proyecto con ARTEMIX?",
    a: "Depende del alcance, pero no queremos que te vayas sin una cifra. Usa el cotizador: en menos de un minuto obtienes un rango de inversión real basado en proyectos equivalentes que hemos entregado. Ese rango se afina en una llamada de diagnóstico sin costo.",
  },
  {
    q: "¿Cuánto tarda un desarrollo?",
    a: "Un sitio corporativo o landing de alta conversión: 3 a 5 semanas. Una aplicación web a medida: 8 a 16 semanas. Un MVP de SaaS: 10 a 14 semanas. Los proyectos de red se ejecutan en ventanas de 1 a 3 semanas según el número de sitios.",
  },
  {
    q: "¿Trabajan con empresas fuera de mi ciudad?",
    a: "Sí. El desarrollo de software y SaaS es 100% remoto con reuniones semanales de avance. Para proyectos de red y entrega de equipos coordinamos visita técnica presencial o instalación con partner local certificado.",
  },
  {
    q: "¿Qué pasa después de entregar el proyecto?",
    a: "Todo proyecto incluye garantía de 90 días sobre defectos. A partir de ahí ofrecemos planes de soporte y evolución mensual: monitoreo, respaldos, parches de seguridad y una bolsa de horas de mejora continua.",
  },
  {
    q: "¿El código es mío?",
    a: "Sí. Al liquidar el proyecto transferimos la propiedad intelectual completa y el repositorio queda bajo tu organización de GitHub. Sin cajas negras ni dependencias de licenciamiento hacia nosotros.",
  },
  {
    q: "¿Cómo se maneja el pago?",
    a: "Esquema por hitos: 40% para arrancar, 30% en la entrega de la versión funcional y 30% contra aceptación. En proyectos largos pasamos a facturación mensual por sprint.",
  },
] as const;

/** Navegación principal. Los href apuntan a anclas de la home. */
export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Clientes", href: "#clientes" },
  { label: "Equipos", href: "#equipos" },
  { label: "Cotizador", href: "#cotizador" },
] as const;
