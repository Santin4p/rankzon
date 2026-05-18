import { notFound } from "next/navigation"
import Link from "next/link"
import { sections, getSectionBySlug } from "@/lib/categories"
import type { Metadata } from "next"
import CategoryCard from "@/components/CategoryCard"

interface SectionContent {
  intro: string
  guide: { heading: string; body: string }[]
}

const sectionContent: Record<string, SectionContent> = {
  tecnologia: {
    intro:
      "Desde auriculares inalámbricos hasta portátiles y televisores, el mercado tech en Amazon España no para de moverse. En esta sección encontrarás los rankings actualizados de las categorías más buscadas: los productos más vendidos, mejor valorados y con mejor relación calidad-precio según miles de compradores reales.",
    guide: [
      {
        heading: "¿Cómo elegir el mejor producto tecnológico?",
        body: "Lo más importante es tener claro el uso principal: un auricular para deporte no es lo mismo que uno para oficina. Fíjate en la valoración media (mínimo 4 estrellas), el número de reseñas (cuantas más, más fiable) y si el vendedor es el fabricante oficial o un tercero. En Amazon España los bestsellers suelen ser la opción más segura para la mayoría.",
      },
      {
        heading: "¿Por qué fiarte de estos rankings?",
        body: "Nuestros rankings se basan en los más vendidos actuales de Amazon España, sin patrocinios ni productos de pago. Actualizamos los datos periódicamente para que siempre veas lo que realmente se está comprando, no lo que alguien quiere venderte. Las pros y contras las extraemos de reseñas verificadas de compradores reales.",
      },
    ],
  },
  electrodomesticos: {
    intro:
      "Freidoras de aire, robots aspiradores, cafeteras, batidoras… los electrodomésticos más vendidos en Amazon España cambian cada semana. Aquí tienes los rankings actualizados de las categorías más populares para que encuentres el aparato que mejor encaja en tu cocina y hogar sin perder tiempo comparando.",
    guide: [
      {
        heading: "¿Qué tener en cuenta al comprar electrodomésticos en Amazon?",
        body: "Comprueba siempre que el producto incluye enchufe español (tipo F, schuko) o que el vendedor envía desde España/UE. Revisa si el producto incluye garantía oficial del fabricante (normalmente 2 años en la UE) y que el vendedor sea Amazon o el fabricante directamente. Evita productos con menos de 100 valoraciones salvo que sean muy recientes.",
      },
      {
        heading: "Marcas más fiables en electrodomésticos pequeños",
        body: "En Amazon España dominan Cecotec, Philips, Nespresso, iRobot y Xiaomi en sus respectivas categorías. Cecotec destaca por precio-calidad en batidoras y microondas; Philips en purificadores y cafeteras; Dreame y Roborock en robots aspiradores. Consulta las reseñas más recientes para ver si el modelo actual mantiene la calidad de versiones anteriores.",
      },
    ],
  },
  gaming: {
    intro:
      "Mandos, auriculares, ratones, teclados y más. Los periféricos gaming más vendidos en Amazon España según compradores reales. Tanto si juegas en PC como en consola, aquí encontrarás los productos más valorados en cada categoría, actualizados periódicamente con los bestsellers del momento.",
    guide: [
      {
        heading: "¿Cómo elegir periféricos gaming por presupuesto?",
        body: "Para empezar, no necesitas los periféricos más caros: un ratón de 20-30€ y unos auriculares de 30-50€ cubren perfectamente cualquier género. Las marcas que mejor relación calidad-precio ofrecen en España son Logitech G, Krom, HyperX y Razer en gamas medias. Para teclados mecánicos, Krom y Redragon son opciones sólidas por debajo de 60€.",
      },
      {
        heading: "Gaming en PC vs consola: ¿qué periféricos necesitas?",
        body: "Los jugadores de PC necesitan ratón, teclado y auriculares; los de consola pueden añadir auriculares gaming con jack o USB y una alfombrilla para el mando. Los mandos de Xbox funcionan nativamente en PC vía Bluetooth o cable, lo que los convierte en una opción versátil. Para streaming añade una webcam y un micrófono de escritorio.",
      },
    ],
  },
  videojuegos: {
    intro:
      "Los juegos más vendidos en Amazon España para PS5, Nintendo Switch, Xbox Series X/S y Nintendo Switch 2. Rankings actualizados con los títulos que más se están comprando ahora mismo, sin publicidad de las distribuidoras. Perfectos para regalar o para no perderte los lanzamientos del momento.",
    guide: [
      {
        heading: "¿Dónde es más barato comprar juegos: Amazon o tienda física?",
        body: "Amazon España suele tener los mejores precios en los primeros días del lanzamiento y en rebajas periódicas. Los juegos físicos en Amazon también permiten devolución en 30 días si el precinto está intacto. Para títulos muy buscados, activa la alerta de precio en CamelCamelCamel para comprar en el momento óptimo.",
      },
      {
        heading: "Diferencias entre ediciones: Estándar, Deluxe y Gold",
        body: "La edición estándar incluye el juego base. Las ediciones Deluxe o Gold añaden DLCs, pases de temporada o contenido cosmético. Salvo que seas fan acérrimo del título, la edición estándar es suficiente y suele ser considerablemente más barata. Muchos DLCs acaban en oferta a los pocos meses del lanzamiento.",
      },
    ],
  },
}

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
  const title = `Los Mejores Productos de ${section.name} en Amazon España 2026`
  const content = sectionContent[seccion]
  const description = content
    ? content.intro.slice(0, 155) + "…"
    : `Rankings curados de los mejores ${section.name.toLowerCase()} en Amazon España. Actualizado mensualmente, sin publicidad de pago.`
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

  const content = sectionContent[seccion]

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
      <p className="mt-3 text-[#64748B] leading-relaxed">
        {content?.intro ?? `${section.description}. Selección actualizada mensualmente, sin publicidad de pago.`}
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        {section.categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} sectionSlug={seccion} />
        ))}
      </div>

      {content && (
        <div className="mt-14 space-y-8 border-t border-[#E2E8F0] pt-10">
          {content.guide.map((item) => (
            <div key={item.heading}>
              <h2 className="text-xl font-bold text-[#1E293B] mb-2">{item.heading}</h2>
              <p className="text-[#64748B] leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
