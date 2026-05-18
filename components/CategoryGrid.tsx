import Link from "next/link"
import { sections } from "@/lib/categories"
import CategoryCard from "@/components/CategoryCard"

export default function CategoryGrid() {
  const activeSections = sections.filter((s) => s.categories.length > 0)

  return (
    <section id="categorias" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-foreground mb-10">Rankings por categoría</h2>
      <div className="space-y-12">
        {activeSections.map((section) => (
          <div key={section.slug}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">{section.name}</h3>
              <Link
                href={`/mejores/${section.slug}`}
                className="text-sm font-semibold text-primary hover:underline transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {section.categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} sectionSlug={section.slug} headingAs="h3" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
