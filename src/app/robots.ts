import type { MetadataRoute } from "next";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  const sitemap = absoluteSiteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(origin ? { host: origin.origin } : {}),
    ...(sitemap ? { sitemap } : {}),
  };
}
