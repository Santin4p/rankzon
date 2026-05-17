import { notFound } from "next/navigation"
import Link from "next/link"
import { sections, getSectionBySlug } from "@/lib/categories"
import type { Metadata } from "next"
import CategoryCard from "@/components/CategoryCard"

export function generateStaticParams() {
  return sections
    .filter((s) => s.categories.length > 0)
    .map((s) => ({ seccion: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seccion: string }>
}): Promise<Metadata> {
  const { seccion } = await params
  const section = getSectionBySlug(seccion)
  if (!section) return {}
  const title = `Los mejores productos de ${section.name} de 2026`
  const description = `Rankings curados de los mejores productos de ${section.name.toLowerCase()} en Amazon España. Actualizado mensualmente, sin publicidad de pago.`
  return {
    title,
    description,
    alternates: { canonical: `/mejores/${seccion}` },
    openGraph: { title, description, type: "website", url: `/mejores/${seccion}` },
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ seccion: string }>
}) {
  const { seccion } = await params
  const section = getSectionBySlug(seccion)
  if (!section || section.categories.length === 0) notFound()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://rankzon.es/" },
      { "@type": "ListItem", position: 2, name: section.name, item: `https://rankzon.es/mejores/${seccion}` },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
        <Link href="/" className="hover:text-[#2563EB] transition-colors">Inicio</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-[#1E293B] font-medium">{section.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
        Los mejores productos de {section.name} de 2026
      </h1>
      <p className="mt-3 text-[#64748B]">
        {section.description}. Selección actualizada mensualmente, sin publicidad de pago.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        {section.categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} sectionSlug={seccion} />
        ))}
      </div>
    </div>
  )
}
