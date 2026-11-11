import type { MetadataRoute } from "next";
import { SITE } from "@/data/portfolio";

export const dynamic = "force-static";

/**
 * A portfolio wants to be found and quoted, so every crawler is welcome,
 * the AI ones by name: being cited by an assistant when someone asks who
 * builds software in the UAE is the point of the page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: SITE.url + "/sitemap.xml",
  };
}
