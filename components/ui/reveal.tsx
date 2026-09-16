"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retardo en segundos. Úsalo para escalonar elementos de una misma fila. */
  delay?: number;
  /** Distancia del desplazamiento inicial en píxeles. */
  y?: number;
  className?: string;
};

/**
 * Aparición al entrar en viewport. Discreta a propósito:
 * 18px de desplazamiento y 0.6s. Más que eso se siente barato.
 */
export function Reveal({ children, delay = 0, y = 18, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
