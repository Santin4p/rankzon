import { MetadataRoute } from "next"
import { categories } from "@/lib/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rankzon.es"
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...categories.map((cat) => ({
      url: `${base}/mejores/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${base}/sobre-rankzon`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/aviso-legal`, changeFrequency: "yearly" as const, priority: 0.1 },
    { url: `${base}/privacidad`, changeFrequency: "yearly" as const, priority: 0.1 },
    { url: `${base}/cookies`, changeFrequency: "yearly" as const, priority: 0.1 },
  ]
}
