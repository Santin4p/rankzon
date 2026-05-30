import Link from "next/link"
import type { Metadata } from "next"
import { articles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Blog de Tecnología y Gadgets 2026 — Rankzon",
  description: "Análisis, comparativas y guías de compra actualizadas de móviles, consolas, electrodomésticos y más. Contenido editorial sin publicidad de pago.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Tecnología y Gadgets 2026 — Rankzon",
    description: "Análisis, comparativas y guías de compra actualizadas.",
    type: "website",
    url: "/blog",
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  "Tecnología": "bg-blue-100 text-blue-700",
  "Gaming": "bg-purple-100 text-purple-700",
  "Electrodomésticos": "bg-green-100 text-green-700",
  "Videojuegos": "bg-orange-100 text-orange-700",
  "Belleza": "bg-pink-100 text-pink-700",
  "Deporte": "bg-teal-100 text-teal-700",
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
}

export default function BlogPage() {
  const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const featured = sorted[0]
  const rest = sorted.slice(1)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Blog</h1>
        <p className="mt-2 text-muted text-lg">
          Análisis, comparativas y consejos de compra sin publicidad de pago.
        </p>
      </div>

      {/* Featured article */}
      <Link href={`/blog/${featured.slug}`} className="block group mb-10">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? "bg-muted/20 text-muted"}`}>
              {featured.category}
            </span>
            <span className="text-xs text-muted">{featured.readingTime} min de lectura</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
            {featured.title}
          </h2>
          <p className="text-muted text-base leading-relaxed mb-4">{featured.description}</p>
          <p className="text-sm text-muted">{formatDate(featured.publishedAt)}</p>
        </div>
      </Link>

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rest.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
            <div className="bg-card border border-border rounded-xl p-5 h-full hover:border-primary transition-colors flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-muted/20 text-muted"}`}>
                  {article.category}
                </span>
                <span className="text-xs text-muted">{article.readingTime} min</span>
              </div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base leading-snug mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{article.description}</p>
              <p className="text-xs text-muted mt-3">{formatDate(article.publishedAt)}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-4 bg-muted/10 border border-border rounded-xl text-sm text-muted text-center">
        Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
      </div>
    </div>
  )
}
