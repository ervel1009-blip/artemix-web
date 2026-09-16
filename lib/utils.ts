import { twMerge } from "tailwind-merge";

/**
 * Une clases y resuelve conflictos de Tailwind: la última gana.
 *
 * Es imprescindible porque nuestros componentes traen clases base y aceptan
 * un `className` externo. Con un simple join, `hidden` no anulaba el
 * `inline-flex` del botón (ambas son utilidades de display y el ganador lo
 * decide el orden del CSS, no el del atributo), y los botones marcados como
 * ocultos en móvil seguían visibles.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
