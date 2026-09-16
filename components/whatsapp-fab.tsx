"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { contact, site } from "@/lib/site-config";
import { waLink } from "@/lib/whatsapp";

/**
 * Botón flotante de WhatsApp con panel de atajos.
 *
 * Aparece tras 600px de scroll: mostrarlo de entrada compite con el CTA del
 * hero y resta conversión. Los atajos prellenan el mensaje según la intención,
 * lo que reduce la fricción de tener que escribir el primer mensaje.
 */

const quickMessages = [
  {
    label: "Quiero cotizar un proyecto",
    message: `Hola ${site.name}, quiero cotizar un proyecto de software.`,
  },
  {
    label: "Necesito equipos de cómputo",
    message: `Hola ${site.name}, necesito cotizar equipos de cómputo para mi empresa.`,
  },
  {
    label: "Tengo un problema de red",
    message: `Hola ${site.name}, tengo un problema con la red de mi empresa y necesito asesoría.`,
  },
  {
    label: "Solo quiero información",
    message: `Hola ${site.name}, me gustaría recibir más información sobre sus servicios.`,
  },
];

export function WhatsappFab() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8"
        >
          {/* Panel de atajos */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.94 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-[19rem] origin-bottom-right overflow-hidden rounded-panel border border-border bg-surface shadow-lift"
              >
                <div className="flex items-center gap-3 border-b border-border bg-[#25D366]/10 px-5 py-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-[#04231a]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.9375rem] font-semibold">
                      Equipo {site.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.75rem] text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                      Normalmente responde en minutos
                    </span>
                  </span>
                </div>

                <div className="p-3">
                  <p className="px-2 pb-2 pt-1 text-[0.75rem] text-faint">
                    ¿Con qué te ayudamos?
                  </p>
                  {quickMessages.map((item) => (
                    <a
                      key={item.label}
                      href={waLink(item.message, contact.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-3 rounded-card px-3 py-2.5 text-[0.875rem] transition-colors hover:bg-surface-2"
                    >
                      <span>{item.label}</span>
                      <Send className="h-3.5 w-3.5 shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-[#25D366]" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
            aria-expanded={open}
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-[#04231a] shadow-[0_12px_38px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {!open && (
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]"
                aria-hidden
              />
            )}
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
