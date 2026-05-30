import Link from "next/link"
import { articles } from "@/lib/articles"

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
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long" })
}

export default function BlogPreview() {
  const recent = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3)

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Últimos artículos</h2>
        <Link href="/blog" className="text-sm text-primary hover:underline font-medium">
          Ver todos →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recent.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
            <div className="bg-card border border-border rounded-xl p-5 h-full hover:border-primary transition-colors flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-muted/20 text-muted"}`}>
                  {article.category}
                </span>
                <span className="text-xs text-muted">{article.readingTime} min</span>
              </div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-snug mb-2 flex-1">
                {article.title}
              </h3>
              <p className="text-xs text-muted">{formatDate(article.publishedAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
