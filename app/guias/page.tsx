import Link from "next/link"
import type { Metadata } from "next"
import { guides } from "@/lib/guides"
import { sections } from "@/lib/categories"

export const metadata: Metadata = {
  title: "Guías de Compra",
  description:
    "Guías detalladas para elegir los mejores productos. Todo lo que debes tener en cuenta antes de comprar, sin publicidad de pago.",
  alternates: { canonical: "/guias" },
}

const sectionName: Record<string, string> = Object.fromEntries(
  sections.map((s) => [s.slug, s.name])
)

export default function GuidesHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">Guías de Compra</h1>
      <p className="mt-3 text-muted max-w-2xl">
        Antes de comprar, conviene saber qué mirar. Estas guías explican los criterios que importan de verdad para cada categoría, sin rodeos ni publicidad de pago.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guias/${guide.slug}`}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition-[colors,shadow] flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-semibold text-primary bg-primary-tint px-2.5 py-1 rounded-full">
                {sectionName[guide.sectionSlug] ?? guide.sectionSlug}
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {guide.shortTitle}
              </h2>
              <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">
                {guide.description}
              </p>
            </div>
            <span className="mt-auto text-sm font-semibold text-accent">
              Leer guía →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
