import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow mb-4 flex items-center gap-2.5",
              align === "center" ? "justify-center" : "justify-start"
            )}
          >
            <span className="inline-block h-px w-6 bg-accent" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-[clamp(1.9rem,4.4vw,3rem)] font-semibold">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
