# ARTEMIX — Sitio web corporativo

Sitio orientado a conversión para ARTEMIX: desarrollo de software, aplicaciones SaaS,
diseño de redes y venta de equipos de cómputo. Incluye cotizador con estimación en vivo
y comunicación directa por WhatsApp.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Vercel

---

## 1. Arrancar en local

```bash
npm install
```

```bash
npm run dev
```

Abre <http://localhost:3000>.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción (lo mismo que ejecuta Vercel) |
| `npm run start` | Sirve el build de producción en local |
| `npm run typecheck` | Verifica los tipos sin generar archivos |
| `npm run check:pricing` | Valida el motor de cotización tras cambiar precios |

> No ejecutes `npm run build` mientras `npm run dev` está corriendo: ambos escriben en
> `.next` y el servidor de desarrollo se queda sin estilos. Detén uno antes de lanzar el otro.

---

## 2. Lo primero que debes personalizar

Casi todo el contenido vive en **`lib/site-config.ts`**. Busca los comentarios `⚠️ EDITAR`.

| Qué | Dónde |
| --- | --- |
| Nombre, razón social, URL, moneda | `lib/site-config.ts` → `site` |
| **WhatsApp, correo, teléfono, dirección** | `lib/site-config.ts` → `contact` |
| Métricas del hero (proyectos, años, clientes) | `lib/site-config.ts` → `metrics` |
| **Clientes y marcas con las que trabajaste** | `lib/site-config.ts` → `clients` |
| Fabricantes y partners (Cisco, Dell, HP…) | `lib/site-config.ts` → `partners` |
| Testimonios | `lib/site-config.ts` → `testimonials` |
| Preguntas frecuentes | `lib/site-config.ts` → `faqs` |
| Descripción de los 4 servicios | `lib/services.ts` |
| **Precios del cotizador** | `lib/pricing.ts` |
| Catálogo de equipos | `lib/catalog.ts` |
| Textos legales | `app/privacidad/`, `app/terminos/` |

### El número de WhatsApp

Es lo más importante. Va en formato internacional, **sin `+`, espacios ni guiones**:

| País | Formato | Ejemplo |
| --- | --- | --- |
| México | `52` + `1` + 10 dígitos | `5215512345678` |
| Perú | `51` + 9 dígitos | `51987654321` |
| Colombia | `57` + 10 dígitos | `573001234567` |
| Chile | `56` + 9 dígitos | `56912345678` |

Ponlo en `lib/site-config.ts` o, mejor, en la variable de entorno `NEXT_PUBLIC_WHATSAPP`.

### Logotipos de clientes

En `clients` y `partners`, cada entrada acepta `logo: "/logos/archivo.svg"` o `logo: null`.
Con `null` se muestra el nombre en tipografía, que se ve limpio mientras consigues los
archivos. Cuando los tengas, ponlos en `public/logos/` y actualiza la ruta.

> Usa el logotipo de un cliente solo si te autorizó a hacerlo. Es la práctica habitual
> pedirlo por escrito; algunos contratos lo prohíben explícitamente.

---

## 3. Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

| Variable | Obligatoria | Para qué |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Sí | SEO, sitemap y previsualización al compartir |
| `NEXT_PUBLIC_WHATSAPP` | Sí | Todos los botones de WhatsApp |
| `CONTACT_TO_EMAIL` | Sí | Dónde llegan las cotizaciones |
| `RESEND_API_KEY` | No | Envío de correo. Sin ella, las solicitudes quedan en los logs de Vercel y el usuario conserva la salida por WhatsApp |
| `RESEND_FROM_EMAIL` | No | Remitente de esos correos |

Para activar el correo: crea una cuenta en [resend.com](https://resend.com) (tiene plan
gratuito), verifica tu dominio y copia la API key.

---

## 4. Subir a GitHub

```bash
git init -b main
```

```bash
git add . && git commit -m "Sitio web ARTEMIX"
```

Crea el repositorio en GitHub y enlázalo (sustituye `TU-USUARIO`):

```bash
git remote add origin https://github.com/TU-USUARIO/artemix-web.git
```

```bash
git push -u origin main
```

---

## 5. Publicar en Vercel

El dominio del proyecto es **artemixsa.com**.

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
2. Vercel detecta Next.js solo: no cambies los ajustes de build.
3. En **Environment Variables**, añade las del punto 3 —`NEXT_PUBLIC_SITE_URL`
   debe ser exactamente `https://artemixsa.com`, sin barra final.
4. **Deploy**. En unos dos minutos tendrás una URL `*.vercel.app`.

### Conectar el dominio

En el proyecto de Vercel → **Settings → Domains** → añade `artemixsa.com`.

Si el dominio ya está en tu cuenta de Vercel pero asignado a otro proyecto, quítalo de
ese primero: un dominio solo puede apuntar a un proyecto a la vez.

Cuando compraste el dominio a través de Vercel, el DNS ya está configurado y no tienes
que tocar nada más. Si está registrado en otro proveedor, Vercel te indicará los
registros a crear:

- Dominio raíz: registro `A` → `76.76.21.21`
- `www`: registro `CNAME` → `cname.vercel-dns.com`

El certificado HTTPS se emite solo en cuanto el DNS propaga.

> Elige una versión canónica: o `artemixsa.com` o `www.artemixsa.com`. En Vercel se
> marca una como principal y la otra queda redirigiendo. Tener las dos activas sin
> redirección divide la autoridad SEO entre ambas.

A partir de ahí, cada `git push` a `main` publica automáticamente, y cada pull request
genera una URL de vista previa para revisar cambios antes de que salgan al aire.

---

## 6. Cómo funciona el cotizador

El motor está en `lib/pricing.ts`:

```
subtotal = base(alcance) × factorTamaño + Σ complementos
total    = subtotal × factorUrgencia
rango    = [total × 0.85 , total × 1.20]
```

Se muestra un **rango**, no un precio cerrado: da una señal de costo honesta sin
comprometerte antes del diagnóstico.

Para ajustar precios toca solo los números (`base`, `price`, `percent`, `factor`) y
después ejecuta:

```bash
npm run check:pricing
```

Eso valida que los rangos sean coherentes, que el desglose cuadre con el total y que
subir la urgencia nunca abarate el proyecto.

**Recorrido del usuario:** servicio → alcance y dimensión → complementos → plazo →
datos de contacto. La estimación aparece desde el segundo paso en el panel lateral.
Al enviar, la solicitud va a `/api/cotizar` (correo) y el usuario conserva un botón de
WhatsApp con el resumen completo ya escrito.

---

## 7. Estructura

```
app/
  layout.tsx            Metadatos, fuentes, JSON-LD, script de tema
  page.tsx              Orden de las secciones de la home
  globals.css           Sistema de diseño: colores, tipografía, utilidades
  opengraph-image.tsx   Imagen social generada en el servidor
  api/cotizar/route.ts  Recepción de cotizaciones
  privacidad/, terminos/
components/
  hero, services, process, clients, equipment, faq, cta, footer…
  quote/                Wizard, tarjetas de opción y panel de estimación
  ui/                   Botón, Reveal, Counter, encabezado de sección
lib/
  site-config.ts        ⚠️ Contenido editable
  services.ts           Los 4 servicios y el proceso
  pricing.ts            Motor de cotización
  catalog.ts            Equipos de cómputo
  whatsapp.ts           Construcción de enlaces y mensajes
scripts/
  check-pricing.mts     Verificación del motor
```

---

## 8. Sistema de diseño

La dirección es **75% moderno / 25% futurista**. El 75% lo aportan la retícula, el
espacio negativo y la tipografía; el 25% vive únicamente en cuatro recursos:

1. El resplandor del color de acento (solo en el botón principal y elementos activos).
2. La retícula técnica de fondo.
3. Los bordes con gradiente que aparecen al pasar el cursor.
4. Las micro-animaciones de entrada.

**No los uses en el texto de lectura.** Es lo que separa un sitio que se ve profesional
de uno que se ve recargado.

Los colores son variables CSS en `app/globals.css`, definidas dos veces: `:root` para el
tema claro y `[data-theme="dark"]` para el oscuro. Para cambiar el acento de la marca,
modifica `--accent`, `--accent-hi` y `--accent-lo` en ambos bloques.

Todas las animaciones respetan `prefers-reduced-motion`.

---

## 9. Antes de publicar

- [ ] Sustituir el número de WhatsApp y los correos reales
- [ ] Cambiar métricas, clientes y testimonios por los verdaderos
- [ ] Ajustar los precios de `lib/pricing.ts` a tus costos
- [ ] Revisar los textos legales con un abogado y borrar el aviso de plantilla
- [ ] Añadir `NEXT_PUBLIC_SITE_URL` con el dominio final
- [ ] Probar el cotizador y que el mensaje llegue a tu WhatsApp
- [ ] Verificar el sitio en un teléfono real
