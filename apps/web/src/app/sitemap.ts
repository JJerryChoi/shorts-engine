import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/products";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://shorts-engine.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/p/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...productPages,
  ];
}
