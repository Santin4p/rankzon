import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getAllCategories, getCategoryBySlug, getSectionBySlug } from "@/lib/categories"
import type { Metadata } from "next"
import StarRating from "@/components/StarRating"
import ProductTop3Card from "@/components/ProductTop3Card"
import auriculares from "@/data/auriculares.json"
import smartwatches from "@/data/smartwatches.json"
import altavoces from "@/data/altavoces-bluetooth.json"
import tablets from "@/data/tablets.json"
import moviles from "@/data/moviles.json"
import portatiles from "@/data/portatiles.json"
import freidorasAire from "@/data/freidoras-aire.json"
import robotsAspirador from "@/data/robots-aspirador.json"
import cafeteras from "@/data/cafeteras.json"
import aspiradoras from "@/data/aspiradoras.json"
import mandosGaming from "@/data/mandos-gaming.json"
import auricularesGaming from "@/data/auriculares-gaming.json"
import ratonesGaming from "@/data/ratones-gaming.json"
import tecladosGaming from "@/data/teclados-gaming.json"
import juegosPs5 from "@/data/juegos-ps5.json"
import juegosSwitch from "@/data/juegos-switch.json"
import juegosXbox from "@/data/juegos-xbox.json"
import juegosSwitch2 from "@/data/juegos-switch-2.json"

interface Producto {
  position: number
  name: string
  image: string
  price: number | null
  rating: number | null
  reviews: number | null
  affiliate_url: string
  badge: string | null
  pros?: string[]
  cons?: string[]
  user_summary?: string
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
  moviles: moviles as unknown as RankingData,
  portatiles: portatiles as unknown as RankingData,
  "freidoras-aire": freidorasAire as unknown as RankingData,
  "robots-aspirador": robotsAspirador as unknown as RankingData,
  cafeteras: cafeteras as unknown as RankingData,
  aspiradoras: aspiradoras as unknown as RankingData,
  "mandos-gaming": mandosGaming as unknown as RankingData,
  "auriculares-gaming": auricularesGaming as unknown as RankingData,
  "ratones-gaming": ratonesGaming as unknown as RankingData,
  "teclados-gaming": tecladosGaming as unknown as RankingData,
  "juegos-ps5": juegosPs5 as unknown as RankingData,
  "juegos-switch": juegosSwitch as unknown as RankingData,
  "juegos-xbox": juegosXbox as unknown as RankingData,
  "juegos-switch-2": juegosSwitch2 as unknown as RankingData,
}

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    seccion: cat.sectionSlug,
    categoria: cat.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seccion: string; categoria: string }>
}): Promise<Metadata> {
  const { seccion, categoria } = await params
  const category = getCategoryBySlug(categoria, seccion)
  if (!category) return {}
  const title = `Los 10 Mejores ${category.name} de Amazon en 2026`
  const description = `Ranking actualizado de los 10 mejores ${category.name.toLowerCase()} de Amazon España. Curación manual, sin publicidad de pago.`
  return {
    title,
    description,
    alternates: { canonical: `/mejores/${seccion}/${categoria}` },
    openGraph: { title, description, type: "website", url: `/mejores/${seccion}/${categoria}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ seccion: string; categoria: string }>
}) {
  const { seccion, categoria } = await params
  const section = getSectionBySlug(seccion)
  const category = getCategoryBySlug(categoria, seccion)
  if (!section || !category) notFound()

  const data = rankingMap[categoria]
  if (!data) notFound()

  const top3 = data.productos.slice(0, 3)
  const rest = data.productos.slice(3)

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Los 10 Mejores ${category.name} de Amazon en 2026`,
    description: category.description,
    numberOfItems: data.productos.length,
    itemListElement: data.productos.map((p) => ({
      "@type": "ListItem",
      position: p.position,
      item: {
        "@type": "Product",
        name: p.name,
        image: `https://rankzon.es${p.image}`,
        ...(p.price != null && {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: p.price.toFixed(2),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Amazon España" },
          },
        }),
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://rankzon.es/" },
      { "@type": "ListItem", position: 2, name: section.name, item: `https://rankzon.es/mejores/${seccion}` },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://rankzon.es/mejores/${seccion}/${categoria}` },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
        <Link href="/" className="hover:text-[#2563EB] transition-colors">Inicio</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <Link href={`/mejores/${seccion}`} className="hover:text-[#2563EB] transition-colors">{section.name}</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-[#1E293B] font-medium">{category.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
        Los 10 Mejores {category.name} de Amazon en 2026
      </h1>
      <p className="mt-3 text-[#64748B]">
        {category.description}. Selección actualizada el {data.updated_at}, sin publicidad de pago.
      </p>

      <div className="mt-8 space-y-4">
        {top3.map((producto) => (
          <ProductTop3Card key={producto.position} producto={producto} />
        ))}
      </div>

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
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-white rounded-lg overflow-hidden">
              <Image src={producto.image} alt={producto.name} fill className="object-contain" sizes="56px" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1E293B] text-sm sm:text-base">{producto.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-sm text-[#64748B] tabular-nums">
                  {producto.price != null
                    ? `${producto.price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                    : "Ver precio"}
                </p>
                {producto.rating != null && <StarRating rating={producto.rating} size="sm" />}
              </div>
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
