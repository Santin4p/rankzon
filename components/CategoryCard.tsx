import Link from "next/link"
import Image from "next/image"
import { Category } from "@/lib/categories"

interface Props {
  category: Category
  sectionSlug: string
  headingAs?: "h2" | "h3"
}

export default function CategoryCard({ category, sectionSlug, headingAs: Heading = "h2" }: Props) {
  return (
    <Link
      href={`/mejores/${sectionSlug}/${category.slug}`}
      className="group bg-card rounded-2xl border border-border p-6 flex flex-col hover:border-primary hover:shadow-md transition-[colors,shadow] cursor-pointer"
    >
      <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-card">
        <Image
          src={category.previewImage}
          alt={`Mejor ${category.name}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Top 10</p>
      <Heading className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </Heading>
      <p className="mt-1 text-sm text-muted">{category.description}</p>
      <span className="mt-4 text-sm font-semibold text-accent">Ver ranking →</span>
    </Link>
  )
}
