import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";

/**
 * Marca de ARTEMIX.
 *
 * El logotipo original es una composición cuadrada con fondo espacial, el
 * monograma AM y los textos "ARTEMIX" y "S.A.". A 36 px de alto esos textos
 * serían ilegibles, así que aquí se usa solo el monograma —recortado y con
 * fondo transparente— dentro de un contenedor oscuro, y el nombre se compone
 * en tipografía. El contenedor propio es lo que permite que la marca funcione
 * igual en el tema claro, donde un monograma blanco quedaría invisible.
 *
 * El logotipo completo vive en /public/logo-artemix.webp para usos grandes.
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
      <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[0.7rem] bg-[#0a0c1a] ring-1 ring-inset ring-white/10">
        <Image
          src="/logo-mark.png"
          alt=""
          width={300}
          height={176}
          priority
          className="h-auto w-[1.85rem]"
        />
      </span>
      {withWordmark && (
        <span className="font-display text-[1.35rem] font-bold tracking-[-0.03em]">
          {site.name}
        </span>
      )}
    </span>
  );
}
