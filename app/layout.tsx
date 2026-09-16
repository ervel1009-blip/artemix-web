import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site, contact } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Desarrollo de software, SaaS, redes y equipos`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "desarrollo de software",
    "aplicaciones SaaS",
    "diseño de redes",
    "cableado estructurado",
    "equipos de cómputo",
    "software a medida",
    "desarrollo web",
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    // La imagen la genera app/opengraph-image.tsx; Next la enlaza sola.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06080b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Se ejecuta antes del primer pintado para aplicar el tema guardado.
 * Sin esto hay un parpadeo blanco al cargar en modo oscuro.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('artemix-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: contact.email,
  telephone: contact.phone,
  address: { "@type": "PostalAddress", addressLocality: contact.address },
  areaServed: "LATAM",
  priceRange: "$$",
  sameAs: [contact.social.linkedin, contact.social.github].filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: [
      "Desarrollo de software a medida",
      "Aplicaciones SaaS",
      "Diseño e implementación de redes",
      "Venta de equipos de cómputo",
    ].map((n) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: n },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${display.variable} antialiased`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-contrast"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
