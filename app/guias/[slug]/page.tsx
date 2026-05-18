import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { guides, getGuideBySlug, generateGuideStaticParams } from "@/lib/guides"

export function generateStaticParams() {
  return generateGuideStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `/guias/${guide.slug}`,
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: `2026-05-01`,
    publisher: {
      "@type": "Organization",
      name: "Rankzon",
      url: "https://www.rankzon.es",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.rankzon.es/" },
      { "@type": "ListItem", position: 2, name: "Guías de Compra", item: "https://www.rankzon.es/guias" },
      { "@type": "ListItem", position: 3, name: guide.shortTitle, item: `https://www.rankzon.es/guias/${guide.slug}` },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <Link href="/guias" className="hover:text-primary transition-colors">Guías de Compra</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-foreground font-medium">{guide.shortTitle}</span>
      </nav>

      <div className="mb-3">
        <span className="text-xs font-semibold text-primary bg-primary-tint px-2.5 py-1 rounded-full">
          Guía de Compra · Actualizada {guide.updatedAt}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{guide.title}</h1>

      <p className="mt-4 text-muted leading-relaxed">{guide.intro}</p>

      <Link
        href={`/mejores/${guide.sectionSlug}/${guide.categorySlug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline transition-colors"
      >
        Ver los 10 mejores {guide.categoryName} →
      </Link>

      <div className="mt-10 space-y-8">
        {guide.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-xl font-bold text-foreground mb-2">{section.heading}</h2>
            <p className="text-foreground leading-relaxed">{section.body}</p>
            {section.list && (
              <ul className="mt-3 space-y-1.5">
                {section.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-tint border border-primary/20 rounded-2xl p-6">
        <p className="text-sm font-semibold text-primary mb-1">¿Ya sabes lo que buscas?</p>
        <p className="text-foreground mb-4">Hemos curado los {guide.sections.length > 6 ? "10" : "10"} mejores {guide.categoryName.toLowerCase()} disponibles en Amazon España.</p>
        <Link
          href={`/mejores/${guide.sectionSlug}/${guide.categorySlug}`}
          className="inline-block bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-colors"
        >
          Ver ranking de {guide.categoryName} →
          <span className="sr-only"> (volver al ranking)</span>
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted border-t border-border pt-6">
        Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
      </p>
    </div>
  )
}
