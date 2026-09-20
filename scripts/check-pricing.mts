/**
 * Comprobación del motor de cotización.
 *   npm run check:pricing
 *
 * Ejecútalo cada vez que ajustes precios en lib/pricing.ts. Valida que los
 * rangos sean coherentes, que el desglose cuadre con el total, que subir la
 * urgencia nunca abarate el proyecto y que los alcances sin precio de lista
 * devuelvan una cotización a medida en lugar de una cifra inventada.
 */
import {
  calculateQuote,
  hasPricing,
  scopes,
  addons,
  sizes,
  urgencies,
  formatMoney,
  type QuoteSelection,
} from "../lib/pricing.ts";

let failures = 0;
const fail = (msg: string) => {
  console.log("   ✗ " + msg);
  failures++;
};

// ── 1. Sitios web: los precios que ve el cliente ──────────────
console.log("\n▸ SITIOS WEB — precios visibles\n");

const web = (size: string, extras: string[] = []): QuoteSelection => ({
  service: "software",
  scope: "landing",
  size,
  addons: extras,
  urgency: "normal",
});

for (const size of sizes.software) {
  const r = calculateQuote(web(size.id));
  if (!r || r.kind !== "estimate") {
    fail(`El sitio web ${size.label} debería tener precio`);
    continue;
  }
  console.log(
    `   ${size.label.padEnd(12)} ${formatMoney(r.min)} – ${formatMoney(r.max)}   (${r.weeks[0]}–${r.weeks[1]} sem)`
  );
}

const conExtras = calculateQuote(web("m", ["ecommerce", "seo"]));
if (conExtras?.kind === "estimate") {
  console.log(
    `\n   Estándar + tienda + SEO: ${formatMoney(conExtras.min)} – ${formatMoney(conExtras.max)}`
  );
  for (const l of conExtras.lines) {
    console.log(`     · ${l.label}: ${formatMoney(l.amount)}`);
  }
  const sum = conExtras.lines.reduce((a, l) => a + l.amount, 0);
  if (sum < conExtras.min * 0.98 || sum > conExtras.max * 1.02) {
    fail(`El desglose (${formatMoney(sum)}) no cuadra con el rango mostrado`);
  }
} else {
  fail("El sitio web con complementos debería dar una estimación");
}

// ── 2. Todo lo demás debe ser "a medida" ──────────────────────
console.log("\n▸ PROYECTOS A MEDIDA — sin cifras\n");

// El sitio web es el ÚNICO alcance con precio en todo el cotizador.
const aMedida: { service: QuoteSelection["service"]; scope: string }[] = Object.entries(
  scopes
).flatMap(([service, list]) =>
  list
    .filter((s) => !(service === "software" && s.id === "landing"))
    .map((s) => ({ service: service as QuoteSelection["service"], scope: s.id }))
);

for (const c of aMedida) {
  const r = calculateQuote({
    service: c.service,
    scope: c.scope,
    size: null,
    addons: [],
    urgency: "normal",
  });
  const label = `${c.service}/${c.scope}`;
  if (!r) {
    fail(`${label}: no devolvió resultado`);
  } else if (r.kind !== "custom") {
    fail(`${label}: NO debería mostrar precio`);
  } else {
    console.log(`   ${label.padEnd(24)} a medida · ${r.weeks[0]}–${r.weeks[1]} sem`);
  }
  if (hasPricing(c.service, c.scope)) fail(`${label}: hasPricing debería ser false`);
}

// ── 3. Equipos: sin catálogo público, también se cotizan ──────
console.log("\n▸ EQUIPOS — sin precio de vitrina\n");

const equipos = calculateQuote({
  service: "equipos",
  scope: "workstation",
  size: "q2",
  addons: ["setup", "migration"],
  urgency: "normal",
});
if (equipos?.kind === "custom") {
  console.log(`   6 a 20 equipos: a medida · ${equipos.weeks[0]}–${equipos.weeks[1]} sem`);
  console.log(`   resumen: ${equipos.summary.join(" · ")}`);
} else {
  fail("Los equipos no deberían mostrar precio calculado");
}

// ── 4. Invariantes ────────────────────────────────────────────
const base: QuoteSelection = { service: "software", scope: "landing", size: "m", addons: [], urgency: null };
const precios = urgencies.map((u) => {
  const r = calculateQuote({ ...base, urgency: u.id });
  return r?.kind === "estimate" ? r.max : 0;
});
console.log("\n▸ Monotonía por urgencia: " + precios.map((p) => formatMoney(p)).join(" ≤ "));
if (precios.some((p, i) => i > 0 && p < precios[i - 1])) {
  fail("El precio no crece de forma monótona con la urgencia");
}

for (const id of ["software", "saas", "redes", "equipos"] as const) {
  if (!scopes[id]?.length || !sizes[id]?.length || !addons[id]?.length) {
    fail(`Faltan datos de catálogo para el servicio "${id}"`);
  }
}

console.log(
  failures === 0
    ? "\n✓ Todas las comprobaciones pasaron\n"
    : `\n✗ ${failures} comprobación(es) fallaron\n`
);
process.exit(failures === 0 ? 0 : 1);
