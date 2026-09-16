"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button";
import { navLinks } from "@/lib/site-config";
import { waLink, waMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-bg/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/65"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#inicio" className="shrink-0" aria-label="ARTEMIX, ir al inicio">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[0.9375rem] text-muted transition-colors hover:bg-surface-2 hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <ButtonLink
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href="#cotizador" size="sm" className="hidden sm:inline-flex">
              Cotizar proyecto
            </ButtonLink>

            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-text lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-bg lg:hidden"
          >
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <div className="relative flex h-full flex-col">
              <div className="container-x flex h-[4.5rem] items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="container-x mt-6 flex flex-1 flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-border py-5 font-display text-2xl font-semibold"
                    >
                      {link.label}
                      <span className="text-sm font-normal text-faint">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="container-x flex flex-col gap-3 pb-10">
                <ButtonLink href="#cotizador" size="lg" onClick={() => setOpen(false)}>
                  Cotizar mi proyecto
                </ButtonLink>
                <ButtonLink
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escribir por WhatsApp
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
