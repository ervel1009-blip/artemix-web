"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, ShieldCheck, Server } from "lucide-react";

/**
 * Composición visual del hero: una topología de nodos que se dibuja sola
 * más dos tarjetas de estado flotantes.
 *
 * Es el pasaje más "futurista" del sitio y está contenido a propósito en
 * un único bloque: el resto de la página se mantiene sobrio.
 */

const nodes = [
  { id: "core", x: 50, y: 50, r: 7, label: "Core" },
  { id: "n1", x: 16, y: 22, r: 4.5 },
  { id: "n2", x: 84, y: 20, r: 4.5 },
  { id: "n3", x: 15, y: 78, r: 4.5 },
  { id: "n4", x: 85, y: 76, r: 4.5 },
  { id: "n5", x: 50, y: 12, r: 3.5 },
  { id: "n6", x: 50, y: 88, r: 3.5 },
];

const edges = [
  ["core", "n1"],
  ["core", "n2"],
  ["core", "n3"],
  ["core", "n4"],
  ["core", "n5"],
  ["core", "n6"],
  ["n1", "n5"],
  ["n2", "n5"],
  ["n3", "n6"],
  ["n4", "n6"],
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const byId = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    // Se mantiene por debajo del ancho disponible para que las tarjetas
    // flotantes, que sobresalen del cuadro, no toquen el borde de pantalla.
    <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-[30rem]">
      {/* Halo ambiental */}
      <div
        className="aurora left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--accent)", opacity: 0.16 }}
        aria-hidden
      />

      {/* Anillos concéntricos */}
      <div className="absolute inset-0 grid place-items-center" aria-hidden>
        {[100, 76, 52].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-border"
            style={{ width: `${size}%`, height: `${size}%` }}
            animate={reduce ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 24, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Topología */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
          <filter id="node-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(([a, b], i) => {
          const from = byId(a);
          const to = byId(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#edge-grad)"
              strokeWidth="0.45"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
            />
          );
        })}

        {/* Paquetes que viajan por los enlaces */}
        {!reduce &&
          edges.slice(0, 6).map(([a, b], i) => {
            const from = byId(a);
            const to = byId(b);
            return (
              <motion.circle
                key={`p-${i}`}
                r="0.9"
                fill="var(--accent-hi)"
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: 1.4 + i * 0.55,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: "backOut" }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="0.5"
              filter={node.id === "core" ? "url(#node-glow)" : undefined}
            />
            <circle cx={node.x} cy={node.y} r={node.r * 0.38} fill="var(--accent)" />
          </motion.g>
        ))}
      </svg>

      {/* Tarjetas de estado */}
      <FloatingCard
        className="left-[-8%] top-[14%]"
        delay={1}
        icon={<Activity className="h-3.5 w-3.5" />}
        label="Uptime"
        value="99.98%"
        accent
      />
      <FloatingCard
        className="right-[-6%] top-[44%]"
        delay={1.3}
        icon={<ShieldCheck className="h-3.5 w-3.5" />}
        label="Seguridad"
        value="Sin incidentes"
      />
      <FloatingCard
        className="bottom-[10%] left-[2%]"
        delay={1.6}
        icon={<Server className="h-3.5 w-3.5" />}
        label="Despliegues"
        value="En producción"
      />
    </div>
  );
}

function FloatingCard({
  className,
  delay,
  icon,
  label,
  value,
  accent = false,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div
        className="flex items-center gap-2.5 rounded-2xl border border-border bg-surface/85 px-3.5 py-2.5 backdrop-blur-md shadow-lift"
        style={reduce ? undefined : { animation: `float ${6 + delay}s ease-in-out infinite` }}
      >
        <span
          className={`grid h-7 w-7 place-items-center rounded-lg ${
            accent ? "bg-accent text-accent-contrast" : "bg-surface-2 text-accent"
          }`}
        >
          {icon}
        </span>
        <span className="leading-tight">
          <span className="block text-[0.6875rem] uppercase tracking-wider text-faint">
            {label}
          </span>
          <span className="block text-sm font-semibold">{value}</span>
        </span>
      </div>
    </motion.div>
  );
}
