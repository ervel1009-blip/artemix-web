"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site-config";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Lo que todos preguntan antes de contratar"
          description="Y si falta la tuya, escríbenos por WhatsApp: respondemos personas, no bots."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "text-[1.0625rem] font-semibold transition-colors md:text-lg",
                        isOpen ? "text-accent" : "group-hover:text-accent"
                      )}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400",
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-accent-contrast"
                          : "border-border text-faint group-hover:border-accent/50 group-hover:text-accent"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.6, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 leading-relaxed text-muted">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
