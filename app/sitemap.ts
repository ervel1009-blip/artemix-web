import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${site.url}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/terminos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
