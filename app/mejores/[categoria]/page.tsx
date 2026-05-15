import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { categories, getCategoryBySlug } from "@/lib/categories"
import type { Metadata } from "next"
import auriculares from "@/data/auriculares.json"
import smartwatches from "@/data/smartwatches.json"
import altavoces from "@/data/altavoces-bluetooth.json"
import tablets from "@/data/tablets.json"

interface Producto {
  position: number
  name: string
  image: string
  price: number
  affiliate_url: string
  badge: string | null
}

interface RankingData {
  categoria: string
  updated_at: string
  productos: Producto[]
}

const rankingMap: Record<string, RankingData> = {
  auriculares: auriculares as unknown as RankingData,
  smartwatches: smartwatches as unknown as RankingData,
  "altavoces-bluetooth": altavoces as unknown as RankingData,
  tablets: tablets as unknown as RankingData,
}

const positionBadge: Record<number, string> = {
  1: "bg-amber-400 text-amber-900",
  2: "bg-slate-300 text-slate-700",
  3: "bg-amber-700 text-white",
}

const cardHighlight: Record<number, string> = {
  1: "border-amber-200 bg-amber-50/30",
  2: "border-[#E2E8F0]",
  3: "border-[#E2E8F0]",
}

export function generateStaticParams() {
  return categories.map((cat) => ({ categoria: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>
}): Promise<Metadata> {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)
  if (!category) return {}
  const title = `Los 10 Mejores ${category.name} de 2026`
  const description = `Ranking actualizado de los 10 mejores ${category.name.toLowerCase()} en Amazon España. Curación manual, sin publicidad de pago.`
  return {
    title,
    description,
    alternates: { canonical: `/mejores/${categoria}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/mejores/${categoria}`,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>
}) {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)
  if (!category) notFound()

  const data = rankingMap[categoria]
  if (!data) notFound()

  const top3 = data.productos.slice(0, 3)
  const rest = data.productos.slice(3)

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Los 10 Mejores ${category.name} de 2026`,
    description: category.description,
    numberOfItems: data.productos.length,
    itemListElement: data.productos.map((p) => ({
      "@type": "ListItem",
      position: p.position,
      item: {
        "@type": "Product",
        name: p.name,
        image: `https://rankzon.es${p.image}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: p.price.toFixed(2),
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Amazon España" },
        },
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://rankzon.es/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `https://rankzon.es/mejores/${categoria}` },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
        <Link href="/" className="hover:text-[#2563EB] transition-colors">
          Inicio
        </Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-[#1E293B] font-medium">{category.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
        Los 10 Mejores {category.name} de 2026
      </h1>
      <p className="mt-3 text-[#64748B]">
        {category.description}. Selección actualizada el {data.updated_at}, sin publicidad de pago.
      </p>

      {/* Top 3 */}
      <div className="mt-8 space-y-4">
        {top3.map((producto) => (
          <article
            key={producto.position}
            className={`bg-white border rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-6 items-start hover:shadow-md transition-all ${cardHighlight[producto.position] ?? "border-[#E2E8F0]"}`}
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${positionBadge[producto.position] ?? "bg-[#2563EB] text-white"}`}
              aria-label={`Posición ${producto.position}`}
            >
              {producto.position}
            </div>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-[#F8FAFC] rounded-xl overflow-hidden">
              <Image
                src={producto.image}
                alt={producto.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 96px, 112px"
                priority={producto.position === 1}
              />
            </div>
            <div className="flex-1 min-w-0">
              {producto.badge && (
                <span className="inline-block text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full mb-2">
                  {producto.badge}
                </span>
              )}
              <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">{producto.name}</h2>
              <p className="mt-1 text-[#64748B] font-medium tabular-nums">
                {producto.price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
              <Link
                href={producto.affiliate_url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="mt-3 inline-block w-full sm:w-auto text-center bg-[#EA580C] hover:bg-[#c2410c] active:scale-95 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all cursor-pointer"
              >
                Ver en Amazon
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Lista compacta #4–10 */}
      <p className="mt-8 mb-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
        Posiciones 4 – 10
      </p>
      <div className="space-y-2">
        {rest.map((producto) => (
          <div
            key={producto.position}
            className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center hover:border-[#2563EB] transition-colors"
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] flex items-center justify-center font-bold text-sm">
              {producto.position}
            </span>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-[#F8FAFC] rounded-lg overflow-hidden">
              <Image
                src={producto.image}
                alt={producto.name}
                fill
                className="object-contain p-1"
                sizes="56px"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1E293B] text-sm sm:text-base">{producto.name}</p>
              <p className="text-sm text-[#64748B] tabular-nums">
                {producto.price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
            </div>
            <Link
              href={producto.affiliate_url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="shrink-0 text-xs sm:text-sm font-semibold text-[#EA580C] hover:underline active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Ver →
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-[#64748B] border-t border-[#E2E8F0] pt-6">
        Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
      </p>
    </div>
  )
}
