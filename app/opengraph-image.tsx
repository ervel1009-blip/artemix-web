import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site-config";

/**
 * Imagen que se ve al compartir el sitio en WhatsApp, LinkedIn o X.
 * Se genera en el servidor: no hay ningún PNG que mantener a mano, y si
 * cambias el nombre o el tagline en site-config, la imagen cambia sola.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // El renderizador corre en el servidor y no resuelve rutas públicas, así
  // que el monograma se incrusta como data URI. Tiene que ser PNG: Satori no
  // admite WebP y falla con "u2 is not iterable".
  const mark = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06080b",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Halo de acento */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "#22d3ee",
            opacity: 0.16,
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} alt="" width={116} height={68} />
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#e9f0f7",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </span>
        </div>

        {/* Mensaje */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#e9f0f7",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            Construimos la tecnología que hace crecer tu empresa
          </span>
          <span style={{ fontSize: 30, color: "#94a6b8", maxWidth: 900 }}>
            Software a medida · SaaS · Redes empresariales · Equipos de cómputo
          </span>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderTop: "1px solid #1d2733",
            paddingTop: 28,
          }}
        >
          <span
            style={{
              background: "#22d3ee",
              color: "#04141a",
              fontSize: 22,
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: 999,
              display: "flex",
            }}
          >
            Cotiza tu proyecto en un minuto
          </span>
          <span style={{ fontSize: 22, color: "#64788c", marginLeft: "auto" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    size
  );
}
