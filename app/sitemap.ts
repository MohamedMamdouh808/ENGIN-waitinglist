import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://engin.dev").replace(/\/$/, "");
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
