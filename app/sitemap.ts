import { MetadataRoute } from "next"
import { sections, getAllCategories } from "@/lib/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rankzon.es"
  const activeSections = sections.filter((s) => s.categories.length > 0)

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...activeSections.map((s) => ({
      url: `${base}/mejores/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...getAllCategories().map((cat) => ({
      url: `${base}/mejores/${cat.sectionSlug}/${cat.slug}`,
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
