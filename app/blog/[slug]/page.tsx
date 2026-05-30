import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getArticleBySlug, generateArticleStaticParams, articles } from "@/lib/articles"
import { sections } from "@/lib/categories"

export function generateStaticParams() {
  return generateArticleStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Rankzon`,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  }
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)

  const categoryLink = article.sectionSlug && article.categorySlug
    ? `/mejores/${article.sectionSlug}/${article.categorySlug}`
    : null

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "Rankzon" },
    publisher: { "@type": "Organization", name: "Rankzon", url: "https://rankzon.es" },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-foreground font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4 text-sm text-muted">
          <span className="bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full text-xs">
            {article.category}
          </span>
          <span>{article.readingTime} min de lectura</span>
          <span>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-muted text-lg leading-relaxed">{article.intro}</p>
      </header>

      <article className="prose-rankzon space-y-8">
        {article.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-foreground mb-3">{section.heading}</h2>
            <p className="text-foreground/80 leading-relaxed">{section.body}</p>
            {section.list && (
              <ul className="mt-3 space-y-1.5">
                {section.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                    <svg className="w-4 h-4 mt-0.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {categoryLink && (
        <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-sm font-semibold text-foreground mb-1">¿Buscas el mejor producto?</p>
          <p className="text-sm text-muted mb-3">
            Ve nuestro ranking actualizado de los mejores {article.category.toLowerCase()} en Amazon España.
          </p>
          <Link
            href={categoryLink}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver ranking →
          </Link>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold text-foreground mb-4">Artículos relacionados</h3>
          <div className="space-y-3">
            {relatedArticles.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="block group">
                <div className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                    {a.title}
                  </p>
                  <p className="text-xs text-muted mt-1">{a.readingTime} min · {formatDate(a.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-border text-xs text-muted">
        Actualizado el {formatDate(article.updatedAt)} · Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
      </div>
    </div>
  )
}
