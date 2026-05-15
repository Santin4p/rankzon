export interface Category {
  slug: string
  name: string
  description: string
}

export const categories: Category[] = [
  {
    slug: "auriculares",
    name: "Auriculares",
    description: "Los mejores auriculares inalámbricos y con cable",
  },
  {
    slug: "smartwatches",
    name: "Smartwatches",
    description: "Los mejores relojes inteligentes del mercado",
  },
  {
    slug: "altavoces-bluetooth",
    name: "Altavoces Bluetooth",
    description: "Los mejores altavoces portátiles y de hogar",
  },
  {
    slug: "tablets",
    name: "Tablets",
    description: "Las mejores tablets para trabajo y ocio",
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
