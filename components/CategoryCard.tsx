import Link from "next/link"
import Image from "next/image"
import { Category } from "@/lib/categories"

interface Props {
  category: Category
  previewImage?: string
}

export default function CategoryCard({ category, previewImage }: Props) {
  return (
    <Link
      href={`/mejores/${category.slug}`}
      className="group bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer"
    >
      {previewImage && (
        <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-white">
          <Image
            src={previewImage}
            alt={`Mejor ${category.name}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      )}
      <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide mb-1">
        Top 10
      </p>
      <h2 className="text-lg font-bold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
        {category.name}
      </h2>
      <p className="mt-1 text-sm text-[#64748B]">{category.description}</p>
      <span className="mt-4 text-sm font-semibold text-[#EA580C]">
        Ver ranking →
      </span>
    </Link>
  )
}
