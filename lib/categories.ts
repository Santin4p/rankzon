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
      {
        slug: "televisores",
        name: "Televisores",
        description: "Los mejores televisores Smart TV para tu hogar",
        previewImage: "/images/televisores/xiaomi-tv-f-32.jpg",
      },
      {
        slug: "monitores",
        name: "Monitores",
        description: "Los mejores monitores para trabajo, estudio y gaming",
        previewImage: "/images/monitores/philips-24e1n1100a-monitor-23-8-pulgadas-fhd.jpg",
      },
      {
        slug: "impresoras",
        name: "Cartuchos de Impresora",
        description: "Los cartuchos de tinta más vendidos para impresoras HP y Epson",
        previewImage: "/images/impresoras/epson-ecotank-et-2870-impresora-de-deposito-de-t.jpg",
      },
      {
        slug: "routers-wifi",
        name: "Redes y WiFi",
        description: "Los mejores repetidores WiFi, routers y adaptadores de red",
        previewImage: "/images/routers-wifi/nuevo-tp-link-deco-x1500-2-pack-sistema-wi.jpg",
      },
      {
        slug: "discos-duros-externos",
        name: "Almacenamiento",
        description: "Las mejores tarjetas de memoria, pendrives y discos externos",
        previewImage: "/images/discos-duros-externos/sandisk-128gb-ultra.jpg",
      },
      {
        slug: "lectores-ebook",
        name: "Lectores eBook",
        description: "Los mejores lectores digitales y tabletas e-Ink para leer",
        previewImage: "/images/lectores-ebook/kindle-scribe-2022.jpg",
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
      {
        slug: "microondas",
        name: "Microondas",
        description: "Los mejores microondas para tu cocina",
        previewImage: "/images/microondas/cecotec-microondas-proclean-2010-700-w-de-poten.jpg",
      },
      {
        slug: "batidoras",
        name: "Batidoras",
        description: "Las mejores batidoras y robots de cocina",
        previewImage: "/images/batidoras/cecotec-batidora-de-mano-power-titanblack-1500-x.jpg",
      },
      {
        slug: "purificadores-aire",
        name: "Climatización",
        description: "Los mejores ventiladores, purificadores de aire y deshumidificadores",
        previewImage: "/images/purificadores-aire/philips-purificador-de-aire-serie-600.jpg",
      },
      {
        slug: "ollas-programables",
        name: "Ollas Programables",
        description: "Las mejores ollas de cocción lenta y programables",
        previewImage: "/images/ollas-programables/crockpot-olla-de-coccion-lenta-digital-7.jpg",
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
      {
        slug: "realidad-virtual",
        name: "Realidad Virtual",
        description: "Los mejores visores y accesorios de realidad virtual",
        previewImage: "/images/realidad-virtual/meta-quest-3-512-gb-die-leistungsstarkste-ques.jpg",
      },
      {
        slug: "alfombrillas-gaming",
        name: "Alfombrillas Gaming",
        description: "Las mejores alfombrillas y tapetes para gaming",
        previewImage: "/images/alfombrillas-gaming/amazon-basics-irregular-alfombrilla-para-raton-c.jpg",
      },
      {
        slug: "webcams",
        name: "Webcams",
        description: "Las mejores webcams para streaming y videollamadas",
        previewImage: "/images/webcams/ugreen-webcam-full-hd-1080p-30fps-usb-a-pc-camar.jpg",
      },
      {
        slug: "microfonos-gaming",
        name: "Micrófonos Gaming",
        description: "Los mejores micrófonos para gaming y streaming",
        previewImage: "/images/microfonos-gaming/tonor-pc-microfono-dinamico-gaming-con-brazo-sop.jpg",
      },
    ],
  },
  {
    slug: "belleza",
    name: "Belleza",
    description: "Los mejores productos de belleza y cuidado personal",
    categories: [
      {
        slug: "afeitadoras-electricas",
        name: "Afeitadoras Eléctricas",
        description: "Las mejores afeitadoras eléctricas y recortadoras de barba",
        previewImage: "/images/afeitadoras-electricas/philips-oneblade-original-360-cuchillas.jpg",
      },
      {
        slug: "secadores-pelo",
        name: "Secadores de Pelo",
        description: "Los mejores secadores de pelo para uso doméstico y profesional",
        previewImage: "/images/secadores-pelo/cecotec-secador-de-pelo-ionico-bamba-ionicare-54.jpg",
      },
      {
        slug: "planchas-pelo",
        name: "Planchas de Pelo",
        description: "Las mejores planchas de pelo para alisado y ondulado",
        previewImage: "/images/planchas-pelo/ghd-gold-plancha-de-pelo-profesional-para-un-c.jpg",
      },
      {
        slug: "cuidado-piel",
        name: "Cuidado de Piel",
        description: "Los mejores serums, cremas y productos de skincare",
        previewImage: "/images/cuidado-piel/d-alba-doble-serum-multi-balsamo-con-trufas-blan.jpg",
      },
      {
        slug: "maquillaje",
        name: "Maquillaje",
        description: "Los mejores productos de maquillaje más vendidos",
        previewImage: "/images/maquillaje/maybelline-new-york.jpg",
      },
      {
        slug: "cuidado-pelo",
        name: "Cuidado de Pelo",
        description: "Los mejores champús, acondicionadores y tratamientos capilares",
        previewImage: "/images/cuidado-pelo/revlon-professional-uniqone-all-in-one-protector.jpg",
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
  {
    slug: "deporte",
    name: "Deporte",
    description: "Los mejores artículos deportivos más vendidos",
    categories: [
      {
        slug: "padel",
        name: "Pádel",
        description: "Las mejores palas, pelotas y accesorios de pádel",
        previewImage: "/images/padel/head-tube-3-pelotas-de-padel.jpg",
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
