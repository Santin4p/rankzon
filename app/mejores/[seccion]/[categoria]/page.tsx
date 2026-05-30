import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getAllCategories, getCategoryBySlug, getSectionBySlug } from "@/lib/categories"
import { guides } from "@/lib/guides"
import { articles } from "@/lib/articles"
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
import televisores from "@/data/televisores.json"
import monitores from "@/data/monitores.json"
import realidadVirtual from "@/data/realidad-virtual.json"
import alfombrillasGaming from "@/data/alfombrillas-gaming.json"
import webcams from "@/data/webcams.json"
import microfonosGaming from "@/data/microfonos-gaming.json"
import microondas from "@/data/microondas.json"
import batidoras from "@/data/batidoras.json"
import purificadoresAire from "@/data/purificadores-aire.json"
import ollasProgramables from "@/data/ollas-programables.json"
import impresoras from "@/data/impresoras.json"
import routersWifi from "@/data/routers-wifi.json"
import discosExternos from "@/data/discos-duros-externos.json"
import lectoresEbook from "@/data/lectores-ebook.json"
import afeitadorasElectricas from "@/data/afeitadoras-electricas.json"
import secadoresPelo from "@/data/secadores-pelo.json"
import planchasPelo from "@/data/planchas-pelo.json"
import cuidadoPiel from "@/data/cuidado-piel.json"
import maquillaje from "@/data/maquillaje.json"
import cuidadoPelo from "@/data/cuidado-pelo.json"
import padel from "@/data/padel.json"
import memoriasRam from "@/data/memorias-ram.json"
import tirasLed from "@/data/tiras-led.json"
import cablesUsbC from "@/data/cables-usb-c.json"
import cargadoresInalámbricos from "@/data/cargadores-inalambricos.json"
import powerbanks from "@/data/powerbanks.json"
import sillasGaming from "@/data/sillas-gaming.json"
import cepillosDentalesElectricos from "@/data/cepillos-dentales-electricos.json"
import zapatillasRunning from "@/data/zapatillas-running.json"
import relojesHombre from "@/data/relojes-hombre.json"
import equipamientoFitness from "@/data/equipamiento-fitness.json"
import mochilas from "@/data/mochilas.json"

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
  televisores: televisores as unknown as RankingData,
  monitores: monitores as unknown as RankingData,
  "realidad-virtual": realidadVirtual as unknown as RankingData,
  "alfombrillas-gaming": alfombrillasGaming as unknown as RankingData,
  webcams: webcams as unknown as RankingData,
  "microfonos-gaming": microfonosGaming as unknown as RankingData,
  microondas: microondas as unknown as RankingData,
  batidoras: batidoras as unknown as RankingData,
  "purificadores-aire": purificadoresAire as unknown as RankingData,
  "ollas-programables": ollasProgramables as unknown as RankingData,
  impresoras: impresoras as unknown as RankingData,
  "routers-wifi": routersWifi as unknown as RankingData,
  "discos-duros-externos": discosExternos as unknown as RankingData,
  "lectores-ebook": lectoresEbook as unknown as RankingData,
  "afeitadoras-electricas": afeitadorasElectricas as unknown as RankingData,
  "secadores-pelo": secadoresPelo as unknown as RankingData,
  "planchas-pelo": planchasPelo as unknown as RankingData,
  "cuidado-piel": cuidadoPiel as unknown as RankingData,
  maquillaje: maquillaje as unknown as RankingData,
  "cuidado-pelo": cuidadoPelo as unknown as RankingData,
  padel: padel as unknown as RankingData,
  "memorias-ram": memoriasRam as unknown as RankingData,
  "tiras-led": tirasLed as unknown as RankingData,
  "cables-usb-c": cablesUsbC as unknown as RankingData,
  "cargadores-inalambricos": cargadoresInalámbricos as unknown as RankingData,
  powerbanks: powerbanks as unknown as RankingData,
  "sillas-gaming": sillasGaming as unknown as RankingData,
  "cepillos-dentales-electricos": cepillosDentalesElectricos as unknown as RankingData,
  "zapatillas-running": zapatillasRunning as unknown as RankingData,
  "relojes-hombre": relojesHombre as unknown as RankingData,
  "equipamiento-fitness": equipamientoFitness as unknown as RankingData,
  mochilas: mochilas as unknown as RankingData,
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
  const guide = guides.find((g) => g.categorySlug === categoria)
  const relatedArticles = articles.filter(
    (a) => a.categorySlug === categoria || a.sectionSlug === seccion
  ).slice(0, 2)

  const formattedDate = (() => {
    const [y, m, d] = data.updated_at.split("-").map(Number)
    return new Date(y, m - 1, d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
  })()

  const valuePickPosition = (() => {
    const eligible = top3.filter((p) => p.price != null && p.rating != null)
    if (eligible.length < 2) return -1
    return eligible.reduce((best, p) =>
      p.rating! / p.price! > best.rating! / best.price! ? p : best
    ).position
  })()

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
        ...(p.rating != null && p.reviews != null && p.reviews > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.rating,
            reviewCount: p.reviews,
            bestRating: 5,
            worstRating: 1,
          },
        }),
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

      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <Link href={`/mejores/${seccion}`} className="hover:text-primary transition-colors">{section.name}</Link>
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        Los 10 Mejores {category.name} de Amazon en 2026
      </h1>
      <p className="mt-3 text-muted">
        {category.description}. Selección actualizada el {formattedDate}, sin publicidad de pago.
      </p>

      <div className="mt-8 space-y-4">
        {top3.map((producto) => (
          <ProductTop3Card
            key={producto.position}
            producto={producto}
            valuePick={producto.position === valuePickPosition}
            categoryName={category.name}
          />
        ))}
      </div>

      <p className="mt-8 mb-3 text-xs font-semibold text-muted uppercase tracking-wide">
        Posiciones 4 – 10
      </p>
      <div className="space-y-2">
        {rest.map((producto) => (
          <div
            key={producto.position}
            className="bg-card border border-border rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center hover:border-primary transition-colors"
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-background border border-border text-muted flex items-center justify-center font-bold text-sm">
              {producto.position}
            </span>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-card rounded-lg overflow-hidden">
              <Image src={producto.image} alt={`${producto.name} — ${category.name.toLowerCase()} nº${producto.position} en Amazon España`} fill className="object-contain" sizes="56px" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm sm:text-base">{producto.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-sm text-muted tabular-nums">
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
              className="shrink-0 py-3 px-3 text-xs sm:text-sm font-semibold text-accent hover:underline active:scale-95 transition-colors cursor-pointer whitespace-nowrap"
            >
              Ver →
              <span className="sr-only"> {producto.name} en Amazon (se abre en nueva pestaña)</span>
            </Link>
          </div>
        ))}
      </div>

      {guide && (
        <div className="mt-10 rounded-xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">¿No sabes cuál elegir?</p>
          <p className="mt-1 text-sm text-muted">Consulta nuestra guía antes de decidir: qué mirar, qué ignorar y qué esperar por precio.</p>
          <Link
            href={`/guias/${guide.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {guide.shortTitle}: guía de compra →
          </Link>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="mt-10">
          <p className="text-sm font-semibold text-foreground mb-3">Artículos relacionados</p>
          <div className="space-y-2">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
                <div className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors flex items-center gap-3">
                  <svg className="w-4 h-4 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{article.title}</p>
                    <p className="text-xs text-muted mt-0.5">{article.readingTime} min de lectura</p>
                  </div>
                  <svg className="w-4 h-4 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mt-10 text-xs text-muted border-t border-border pt-6">
        Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
      </p>
    </div>
  )
}
