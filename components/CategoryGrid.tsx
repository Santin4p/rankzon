import { categories } from "@/lib/categories"
import CategoryCard from "@/components/CategoryCard"
import rankingData from "@/data/auriculares.json"
import smartwatchData from "@/data/smartwatches.json"
import altavocesData from "@/data/altavoces-bluetooth.json"
import tabletsData from "@/data/tablets.json"

const previewImages: Record<string, string> = {
  auriculares: rankingData.productos[0].image,
  smartwatches: smartwatchData.productos[0].image,
  "altavoces-bluetooth": altavocesData.productos[0].image,
  tablets: tabletsData.productos[0].image,
}

export default function CategoryGrid() {
  return (
    <section id="categorias" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            previewImage={previewImages[cat.slug]}
          />
        ))}
      </div>
    </section>
  )
}
