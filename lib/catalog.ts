/**
 * ⚠️ EDITAR — Catálogo de equipos de cómputo.
 * `price` es el precio de referencia "desde", en QUETZALES (GTQ). Se muestra
 * como orientativo: la venta se cierra por cotización (botón → WhatsApp).
 * Ajústalos a tu costo de importación y margen reales.
 *
 * Para las imágenes: coloca los archivos en /public/equipos/ y pon la ruta
 * en `image`. Si dejas `image: null` se dibuja un placeholder con el icono
 * de la categoría, que se ve limpio mientras consigues las fotos.
 */

export type EquipmentCategory = "laptops" | "workstations" | "servidores" | "red";

export const equipmentCategories: { id: EquipmentCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "laptops", label: "Laptops" },
  { id: "workstations", label: "Workstations" },
  { id: "servidores", label: "Servidores y storage" },
  { id: "red", label: "Equipo de red" },
];

export type EquipmentItem = {
  id: string;
  category: EquipmentCategory;
  brand: string;
  name: string;
  /** Una línea que explica para quién es. Vende mejor que la ficha técnica. */
  pitch: string;
  specs: string[];
  price: number;
  image: string | null;
  /** Etiqueta destacada opcional: "Más vendido", "Nuevo", "Mejor precio". */
  badge?: string;
};

export const equipment: EquipmentItem[] = [
  {
    id: "lat-5550",
    category: "laptops",
    brand: "Dell",
    name: "Latitude 5550",
    pitch: "El caballo de batalla para equipos administrativos y ventas.",
    specs: ["Intel Core Ultra 5", "16 GB RAM", "512 GB SSD", '15.6" FHD', "Windows 11 Pro"],
    price: 8900,
    image: null,
    badge: "Más vendido",
  },
  {
    id: "tp-t14",
    category: "laptops",
    brand: "Lenovo",
    name: "ThinkPad T14 Gen 5",
    pitch: "Para quien vive en la laptop: teclado, batería y durabilidad militar.",
    specs: ["AMD Ryzen 7 PRO", "32 GB RAM", "1 TB SSD", '14" WUXGA', "Windows 11 Pro"],
    price: 13000,
    image: null,
  },
  {
    id: "hp-840",
    category: "laptops",
    brand: "HP",
    name: "EliteBook 840 G11",
    pitch: "Ligera y con seguridad a nivel firmware para perfiles directivos.",
    specs: ["Intel Core Ultra 7", "16 GB RAM", "512 GB SSD", "HP Wolf Security", "1.3 kg"],
    price: 12300,
    image: null,
  },
  {
    id: "ws-p3",
    category: "workstations",
    brand: "Lenovo",
    name: "ThinkStation P3 Tower",
    pitch: "CAD, BIM y renderizado sin que el equipo se arrodille.",
    specs: ["Intel Core i9", "64 GB RAM ECC", "2 TB NVMe", "NVIDIA RTX A4000", "Certificación ISV"],
    price: 26400,
    image: null,
  },
  {
    id: "ws-prec",
    category: "workstations",
    brand: "Dell",
    name: "Precision 3680",
    pitch: "Edición de video 4K y modelado 3D en flujo continuo.",
    specs: ["Intel Core i7", "32 GB RAM", "1 TB NVMe", "NVIDIA RTX 4000 Ada", "Fuente 750W"],
    price: 22900,
    image: null,
  },
  {
    id: "ws-mac",
    category: "workstations",
    brand: "Apple",
    name: "Mac Studio M4 Max",
    pitch: "Producción audiovisual y desarrollo iOS en un equipo silencioso.",
    specs: ["Apple M4 Max", "64 GB memoria unificada", "1 TB SSD", "Thunderbolt 5"],
    price: 29500,
    image: null,
    badge: "Nuevo",
  },
  {
    id: "srv-r660",
    category: "servidores",
    brand: "Dell",
    name: "PowerEdge R660",
    pitch: "Virtualización y bases de datos para tu datacenter interno.",
    specs: ["2× Xeon Silver", "128 GB RAM", "RAID + hot-swap", "Fuentes redundantes", "iDRAC9"],
    price: 69000,
    image: null,
  },
  {
    id: "nas-ds1825",
    category: "servidores",
    brand: "Synology",
    name: "DiskStation DS1825+",
    pitch: "Respaldo centralizado y archivos compartidos con snapshots.",
    specs: ["8 bahías", "Hasta 160 TB", "10GbE opcional", "Backup automatizado", "Sincronización nube"],
    price: 18600,
    image: null,
  },
  {
    id: "srv-ml30",
    category: "servidores",
    brand: "HP",
    name: "ProLiant ML30 Gen11",
    pitch: "El primer servidor de una PyME: directorio activo, archivos y respaldo.",
    specs: ["Xeon E-2400", "32 GB RAM", "4 bahías LFF", "Torre silenciosa", "iLO 6"],
    price: 24800,
    image: null,
    badge: "Mejor precio",
  },
  {
    id: "net-c9200",
    category: "red",
    brand: "Cisco",
    name: "Catalyst C9200L-48P",
    pitch: "Switch de acceso PoE+ para 48 puntos con garantía de por vida.",
    specs: ["48 puertos PoE+ 370W", "4× uplink 10G", "Stacking", "Cisco DNA ready"],
    price: 31800,
    image: null,
  },
  {
    id: "net-u7",
    category: "red",
    brand: "Ubiquiti",
    name: "UniFi U7 Pro",
    pitch: "WiFi 7 de alta densidad con administración centralizada.",
    specs: ["WiFi 7 tri-banda", "Hasta 300 clientes", "PoE+", "Montaje techo/pared"],
    price: 1650,
    image: null,
  },
  {
    id: "net-fg60",
    category: "red",
    brand: "Fortinet",
    name: "FortiGate 60F",
    pitch: "Firewall perimetral con filtrado, VPN e inspección SSL.",
    specs: ["10 Gbps firewall", "SD-WAN", "IPS y antivirus", "VPN site-to-site", "10 puertos GE"],
    price: 6900,
    image: null,
  },
];
