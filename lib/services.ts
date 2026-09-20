import type { LucideIcon } from "lucide-react";
import { Code2, Cloud, Network, MonitorSmartphone } from "lucide-react";

export type ServiceId = "software" | "saas" | "redes" | "equipos";

export type Service = {
  id: ServiceId;
  icon: LucideIcon;
  name: string;
  /** Titular de venta — habla del resultado, no de la tecnología. */
  headline: string;
  description: string;
  /** Entregables concretos. Lo que el cliente recibe. */
  deliverables: string[];
  /** Stack o marcas, para dar credibilidad técnica. */
  stack: string[];
  /**
   * Punto de entrada de precio, se muestra como "Desde".
   * Omitirlo muestra "A cotizar": es lo correcto en servicios cuyo costo
   * depende del diagnóstico (SaaS, redes), donde una cifra de entrada
   * engañaría más de lo que orienta.
   */
  startingAt?: number;
  /** Rango típico de duración. */
  timeline: string;
};

export const services: Service[] = [
  {
    id: "software",
    icon: Code2,
    name: "Desarrollo de software",
    headline: "Sistemas a medida que eliminan el trabajo manual",
    description:
      "Construimos la aplicación que tu operación necesita y que ningún producto de estante resuelve: portales internos, ERP ligeros, integraciones entre sistemas y automatizaciones que devuelven horas al equipo.",
    deliverables: [
      "Aplicación web o móvil en producción",
      "Panel de administración y reportería",
      "Integraciones con tus sistemas actuales",
      "Documentación técnica y repositorio a tu nombre",
      "Garantía de 90 días",
    ],
    stack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Python"],
    timeline: "3 – 16 semanas",
  },
  {
    id: "saas",
    icon: Cloud,
    name: "Aplicaciones SaaS",
    headline: "De la idea al primer cliente que paga",
    description:
      "Diseñamos y lanzamos plataformas multi-tenant listas para cobrar: suscripciones, roles, facturación, métricas de uso y la arquitectura para escalar sin rehacer todo en el año dos.",
    deliverables: [
      "MVP funcional con onboarding y suscripciones",
      "Arquitectura multi-tenant y control de accesos",
      "Pasarela de pagos y facturación recurrente",
      "Panel de métricas: MRR, churn, activación",
      "Infraestructura cloud y CI/CD",
    ],
    stack: ["Next.js", "Stripe", "Supabase", "AWS", "Vercel"],
    timeline: "10 – 14 semanas",
  },
  {
    id: "redes",
    icon: Network,
    name: "Diseño de redes",
    headline: "Infraestructura que no se cae cuando más la necesitas",
    description:
      "Diseñamos, desplegamos y documentamos redes empresariales: cableado estructurado, WiFi de alta densidad, segmentación por VLAN, seguridad perimetral y enlaces entre sucursales.",
    deliverables: [
      "Levantamiento y site survey",
      "Diagrama lógico y físico documentado",
      "Instalación, configuración y certificación",
      "Políticas de seguridad y segmentación",
      "Monitoreo y plan de contingencia",
    ],
    stack: ["Cisco", "Ubiquiti", "Fortinet", "MikroTik", "Zabbix"],
    timeline: "1 – 3 semanas",
  },
  {
    id: "equipos",
    icon: MonitorSmartphone,
    name: "Equipos de cómputo",
    headline: "Hardware elegido por quien después lo va a soportar",
    description:
      "Suministro de laptops, workstations, servidores y equipamiento de red con asesoría técnica real: te vendemos lo que tu carga de trabajo necesita, configurado y listo para usar desde el día uno.",
    deliverables: [
      "Asesoría y dimensionamiento previo",
      "Equipos con garantía de fabricante",
      "Configuración, imagen corporativa y despliegue",
      "Migración de datos y usuarios",
      "Soporte post-venta",
    ],
    stack: ["Dell", "HP", "Lenovo", "Apple", "Synology"],
    timeline: "3 – 10 días hábiles",
  },
];

/** Proceso de trabajo — reduce la ansiedad del comprador. */
export const processSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    duration: "Día 1 – 3",
    description:
      "Una llamada de 45 minutos sin costo. Entendemos tu operación, el problema real y qué significa éxito en números. Salimos con un alcance escrito.",
  },
  {
    step: "02",
    title: "Propuesta y arquitectura",
    duration: "Día 4 – 7",
    description:
      "Recibes un documento con alcance cerrado, arquitectura propuesta, cronograma por hitos y precio en firme. Sin sorpresas después.",
  },
  {
    step: "03",
    title: "Construcción por sprints",
    duration: "Semana 2 – N",
    description:
      "Entregas quincenales que puedes tocar. Acceso al tablero del proyecto y a un ambiente de pruebas desde el primer sprint.",
  },
  {
    step: "04",
    title: "Despliegue y transferencia",
    duration: "Última semana",
    description:
      "Puesta en producción, capacitación a tu equipo, documentación y traspaso del repositorio. El proyecto queda operando bajo tu control.",
  },
  {
    step: "05",
    title: "Soporte y evolución",
    duration: "Continuo",
    description:
      "90 días de garantía incluidos. Después, un plan mensual de monitoreo, seguridad y mejora continua si lo necesitas.",
  },
] as const;
