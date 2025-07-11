import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: "",
    },
    sitemap: "https://www.lirena.in/sitemap.xml",
  };
}
