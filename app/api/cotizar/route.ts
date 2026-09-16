import { NextResponse } from "next/server";
import { buildQuoteMessage, type QuoteContact } from "@/lib/whatsapp";
import type { QuoteResult, QuoteSelection } from "@/lib/pricing";
import { contact, site } from "@/lib/site-config";

export const runtime = "nodejs";

/**
 * Recibe las cotizaciones del wizard y las envía por correo.
 *
 * Diseñado para no ser un punto único de falla: si no hay RESEND_API_KEY
 * configurada, la solicitud se registra en los logs de Vercel y se responde
 * 200 igual — el cliente siempre conserva la salida por WhatsApp.
 */

type Payload = {
  selection: QuoteSelection;
  contact: QuoteContact;
  result: QuoteResult;
};

// Límite de envíos por IP. En memoria: suficiente para frenar spam casual.
// Para algo serio en producción usa Upstash Redis o Vercel KV.
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Evita que el contenido del formulario se interprete como HTML en el correo. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconocida";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  }

  const { selection, contact: info, result } = payload ?? {};

  if (
    !info ||
    typeof info.name !== "string" ||
    info.name.trim().length < 2 ||
    typeof info.email !== "string" ||
    !isEmail(info.email) ||
    !selection?.service ||
    !result
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const summary = buildQuoteMessage(selection, result, info);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.salesEmail;
  const from = process.env.RESEND_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    // Sin proveedor de correo configurado: dejamos rastro en los logs.
    console.info("[cotizacion] Nueva solicitud sin envío de correo:\n", summary);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: info.email,
        subject: `Nueva cotización — ${info.company || info.name}`,
        text: summary,
        html: `<pre style="font-family:ui-monospace,monospace;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
          summary
        )}</pre>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[cotizacion] Resend respondió con error:", res.status, detail);
      // La solicitud sí llegó al servidor; no se la devolvemos como fallo al usuario.
      console.info("[cotizacion] Contenido de la solicitud:\n", summary);
      return NextResponse.json({ ok: true, delivered: false });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[cotizacion] Fallo al enviar el correo:", error);
    console.info("[cotizacion] Contenido de la solicitud:\n", summary);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
