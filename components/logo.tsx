import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

/**
 * Marca de ARTEMIX.
 * La "A" angular remite al arco de Artemisa y, girada, al vértice de una
 * topología de red. Se dibuja en SVG para que escale y herede el acento
 * del tema activo — sin archivos de imagen que mantener.
 *
 * ⚠️ Si ya tienes un logotipo profesional, sustituye este componente por
 *    un <Image src="/logo.svg" .../> y conserva la misma firma de props.
 */
export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="artemix-mark" x1="4" y1="28" x2="28" y2="4">
            <stop offset="0%" stopColor="var(--accent-lo)" />
            <stop offset="55%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-hi)" />
          </linearGradient>
        </defs>
        <path
          d="M16 2.5 28.5 29h-5.9L16 13.9 9.4 29H3.5L16 2.5Z"
          fill="url(#artemix-mark)"
        />
        <path
          d="M11.1 22.6h9.8"
          stroke="var(--bg)"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="16" cy="19.5" r="1.9" fill="var(--accent-hi)" />
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em]">
          {site.name}
        </span>
      )}
    </span>
  );
}
