import Image from "next/image";
import type { Client } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Cinta infinita de logotipos.
 *
 * Si un cliente aún no tiene archivo de logo (`logo: null`) se renderiza su
 * nombre en tipografía display. Es una solución honesta y con buen acabado:
 * evita los rectángulos grises de "logo pendiente" que restan credibilidad.
 */
export function LogoMarquee({
  items,
  label,
  className,
}: {
  items: Client[];
  label?: string;
  className?: string;
}) {
  // Duplicamos la lista para que el loop del CSS sea continuo (-50%).
  const track = [...items, ...items];

  return (
    <div className={cn("relative", className)}>
      {label && (
        <p className="mb-8 text-center text-[0.8125rem] uppercase tracking-[0.18em] text-faint">
          {label}
        </p>
      )}

      <div className="marquee-mask overflow-hidden">
        <div
          className="flex w-max items-center gap-12 md:gap-16"
          style={{ animation: "marquee 44s linear infinite" }}
        >
          {track.map((item, i) => (
            <LogoItem key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoItem({ item }: { item: Client }) {
  const content = item.logo ? (
    <Image
      src={item.logo}
      alt={item.name}
      width={132}
      height={40}
      className="h-8 w-auto object-contain opacity-55 grayscale transition-all duration-400 group-hover:opacity-100 group-hover:grayscale-0"
    />
  ) : (
    <span className="font-display text-xl font-semibold tracking-tight text-faint transition-colors duration-300 group-hover:text-text md:text-2xl">
      {item.name}
    </span>
  );

  const className = "group flex h-10 shrink-0 items-center";

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
