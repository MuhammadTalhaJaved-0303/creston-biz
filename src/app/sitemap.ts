import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { businessCards, businessCardUrl } from "@/lib/business-cards";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cards`, changeFrequency: "monthly", priority: 0.6 },
    ...businessCards.map((card) => ({ url: businessCardUrl(card), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
