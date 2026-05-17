export interface Category {
  slug: string
  name: string
  description: string
  previewImage: string
}

export interface Section {
  slug: string
  name: string
  description: string
  categories: Category[]
}

export const sections: Section[] = [
  {
    slug: "tecnologia",
    name: "Tecnología",
    description: "Los mejores gadgets y dispositivos tecnológicos",
    categories: [
      {
        slug: "auriculares",
        name: "Auriculares",
        description: "Los mejores auriculares inalámbricos y con cable",
        previewImage: "/images/auriculares/xiaomi-redmi-buds-6-play-auriculares-inalambri.jpg",
      },
      {
        slug: "smartwatches",
        name: "Smartwatches",
        description: "Los mejores relojes inteligentes del mercado",
        previewImage: "/images/smartwatches/xiaomi-redmi-watch-5-active.jpg",
      },
      {
        slug: "altavoces-bluetooth",
        name: "Altavoces Bluetooth",
        description: "Los mejores altavoces portátiles y de hogar",
        previewImage: "/images/altavoces-bluetooth/jbl-go-4.jpg",
      },
      {
        slug: "tablets",
        name: "Tablets",
        description: "Las mejores tablets para trabajo y ocio",
        previewImage: "/images/tablets/apple-ipad-de-11-pulgadas-chip-a16.jpg",
      },
      {
        slug: "moviles",
        name: "Móviles",
        description: "Los mejores smartphones del mercado",
        previewImage: "/images/moviles/xiaomi-redmi-note-14-smartphone-de-8-256gb.jpg",
      },
      {
        slug: "portatiles",
        name: "Portátiles",
        description: "Los mejores portátiles para trabajo y estudio",
        previewImage: "/images/portatiles/apple-macbook-air-de-13.jpg",
      },
    ],
  },
  {
    slug: "electrodomesticos",
    name: "Electrodomésticos",
    description: "Los mejores electrodomésticos para tu hogar",
    categories: [
      {
        slug: "freidoras-aire",
        name: "Freidoras de Aire",
        description: "Las mejores freidoras de aire sin aceite",
        previewImage: "/images/freidoras-aire/cosori-freidora-de-aire-5.jpg",
      },
      {
        slug: "robots-aspirador",
        name: "Robots Aspirador",
        description: "Los mejores robots aspiradores y friegasuelos",
        previewImage: "/images/robots-aspirador/dreame-l10s-ultra-gen-2-robot-aspirador-y-fregas.jpg",
      },
      {
        slug: "cafeteras",
        name: "Cafeteras",
        description: "Las mejores cafeteras para cada estilo de café",
        previewImage: "/images/cafeteras/nespresso-de-longhi-inissia-en80-b-cafetera-mo.jpg",
      },
      {
        slug: "aspiradoras",
        name: "Aspiradoras",
        description: "Las mejores aspiradoras sin cable y de trineo",
        previewImage: "/images/aspiradoras/vactechpro-aspiradora-sin-cable.jpg",
      },
    ],
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Los mejores productos para gamers",
    categories: [
      {
        slug: "mandos-gaming",
        name: "Mandos Gaming",
        description: "Los mejores mandos para PC y consolas",
        previewImage: "/images/mandos-gaming/gamesir-nova-lite-controlador-inalambrico.jpg",
      },
      {
        slug: "auriculares-gaming",
        name: "Auriculares Gaming",
        description: "Los mejores auriculares para gaming",
        previewImage: "/images/auriculares-gaming/jbl-quantum-100m2-cascos-circumaurales-para-gami.jpg",
      },
      {
        slug: "ratones-gaming",
        name: "Ratones Gaming",
        description: "Los mejores ratones para gaming",
        previewImage: "/images/ratones-gaming/logitech-g-g203-lightsync-raton-gaming-con-ilumi.jpg",
      },
      {
        slug: "teclados-gaming",
        name: "Teclados Gaming",
        description: "Los mejores teclados para gaming",
        previewImage: "/images/teclados-gaming/krom-kalista-teclado-gaming-de-membrana-rgb-ra.jpg",
      },
    ],
  },
  {
    slug: "videojuegos",
    name: "Videojuegos",
    description: "Los mejores videojuegos y títulos más vendidos",
    categories: [
      {
        slug: "juegos-ps5",
        name: "Juegos PS5",
        description: "Los juegos más vendidos para PlayStation 5",
        previewImage: "/images/juegos-ps5/star-wars-outlaws-limited-edition-exclusive-to.jpg",
      },
      {
        slug: "juegos-switch",
        name: "Juegos Nintendo Switch",
        description: "Los juegos más vendidos para Nintendo Switch",
        previewImage: "/images/juegos-switch/minecraft-nintendo-switch-edition.jpg",
      },
      {
        slug: "juegos-xbox",
        name: "Juegos Xbox",
        description: "Los juegos más vendidos para Xbox Series X/S",
        previewImage: "/images/juegos-xbox/forza-horizon-6-xbox-series-x.jpg",
      },
      {
        slug: "juegos-switch-2",
        name: "Juegos Nintendo Switch 2",
        description: "Los juegos más vendidos para Nintendo Switch 2",
        previewImage: "/images/juegos-switch-2/tomodachi-life-una-vida-de-ensueno-standard-n.jpg",
      },
    ],
  },
]

export function getAllCategories(): Array<Category & { sectionSlug: string }> {
  return sections.flatMap((s) =>
    s.categories.map((c) => ({ ...c, sectionSlug: s.slug }))
  )
}

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug)
}

export function getCategoryBySlug(
  categorySlug: string,
  sectionSlug?: string
): (Category & { sectionSlug: string }) | undefined {
  const pool = sectionSlug ? sections.filter((s) => s.slug === sectionSlug) : sections
  for (const section of pool) {
    const cat = section.categories.find((c) => c.slug === categorySlug)
    if (cat) return { ...cat, sectionSlug: section.slug }
  }
}
