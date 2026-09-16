/**
 * Comprobación del motor de cotización.
 *   npm run check:pricing
 *
 * Ejecútalo cada vez que ajustes precios en lib/pricing.ts. Valida que los
 * rangos sean coherentes, que el desglose cuadre con el total y que subir la
 * urgencia nunca abarate el proyecto.
 */
import {
  calculateQuote,
  scopes,
  addons,
  sizes,
  urgencies,
  formatMoney,
  type QuoteSelection,
} from "../lib/pricing.ts";

const cases: { name: string; sel: QuoteSelection }[] = [
  {
    name: "SaaS · plataforma multi-tenant · Suite · IA + facturación · urgente",
    sel: { service: "saas", scope: "platform", size: "l", addons: ["ai", "billing"], urgency: "urgent" },
  },
  {
    name: "Software · sitio corporativo · simple · SEO · flexible",
    sel: { service: "software", scope: "landing", size: "s", addons: ["seo"], urgency: "flexible" },
  },
  {
    name: "Redes · oficina pequeña · 1 sitio · sin extras · normal",
    sel: { service: "redes", scope: "small", size: "s", addons: [], urgency: "normal" },
  },
  {
    name: "Equipos · oficina · 6-20 equipos · setup + migración",
    sel: { service: "equipos", scope: "workstation", size: "q2", addons: ["setup", "migration"], urgency: "normal" },
  },
  {
    name: "Servicio elegido sin alcance (debe devolver null)",
    sel: { service: "software", scope: null, size: null, addons: [], urgency: null },
  },
];

let failures = 0;
const fail = (msg: string) => {
  console.log("   ✗ " + msg);
  failures++;
};

for (const c of cases) {
  const r = calculateQuote(c.sel);
  console.log("\n▸ " + c.name);

  if (!r) {
    console.log("   → null (sin alcance definido)");
    if (c.sel.scope !== null) fail("Se esperaba un resultado");
    continue;
  }

  console.log(`   ${formatMoney(r.min)} – ${formatMoney(r.max)} · ${r.weeks[0]}–${r.weeks[1]} semanas`);
  for (const l of r.lines) console.log(`     · ${l.label}: ${formatMoney(l.amount)}`);

  if (!(r.min > 0 && r.max > r.min)) fail("Rango inválido");
  if (!(r.weeks[0] >= 1 && r.weeks[1] > r.weeks[0])) fail("Cronograma inválido");

  const sum = r.lines.reduce((a, l) => a + l.amount, 0);
  if (sum < r.min * 0.98 || sum > r.max * 1.02) {
    fail(`El desglose (${formatMoney(sum)}) no cuadra con el rango mostrado`);
  }
}

// La urgencia nunca debe abaratar el proyecto.
const base = { service: "software", scope: "webapp", size: "m", addons: [] } as const;
const prices = urgencies.map((u) => calculateQuote({ ...base, addons: [], urgency: u.id })!.max);
console.log("\n▸ Monotonía por urgencia: " + prices.map((p) => formatMoney(p)).join(" ≤ "));
if (prices.some((p, i) => i > 0 && p < prices[i - 1])) {
  fail("El precio no crece de forma monótona con la urgencia");
}

// Todo servicio necesita alcances, tamaños y complementos definidos.
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
