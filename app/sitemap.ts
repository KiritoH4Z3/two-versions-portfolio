import type { MetadataRoute } from "next";
import { SITE } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url + SITE.routes.landing, priority: 0.8 },
    { url: SITE.url + SITE.routes.professional, priority: 1 },
    { url: SITE.url + SITE.routes.human, priority: 0.5 },
  ];
}
