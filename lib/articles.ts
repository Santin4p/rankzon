export interface ArticleSection {
  heading: string
  body: string
  list?: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt: string
  category: string
  categorySlug?: string
  sectionSlug?: string
  readingTime: number
  intro: string
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    slug: "mejores-moviles-2026",
    title: "Los Mejores Móviles de 2026: Análisis Completo por Gama",
    description: "Guía actualizada con los mejores smartphones del mercado en 2026: gama alta, media y económica. Qué comprar según tu presupuesto y uso.",
    publishedAt: "2026-05-28",
    updatedAt: "2026-05-30",
    category: "Tecnología",
    categorySlug: "moviles",
    sectionSlug: "tecnologia",
    readingTime: 7,
    intro: "El mercado de smartphones en 2026 está más maduro que nunca. La diferencia entre un móvil de 250€ y uno de 600€ es real, pero no tan abismal como hace tres años. Esta guía actualizada te dice qué comprar en cada gama con datos de ventas y análisis real.",
    sections: [
      {
        heading: "Gama alta (más de 800€): Samsung, Apple y Google lideran",
        body: "El Samsung Galaxy S25 Ultra mantiene el liderato en Android con su S Pen integrado, cámara de 200MP y la mejor pantalla del mercado. El iPhone 16 Pro Max sigue siendo el rey de la fotografía en condiciones difíciles y ofrece 7 años de actualizaciones garantizadas. El Google Pixel 9 Pro es la apuesta más interesante por su IA fotográfica y precio más contenido que los anteriores.",
        list: [
          "Samsung Galaxy S25 Ultra: el más completo del mercado Android",
          "iPhone 16 Pro Max: la mejor cámara y el soporte más largo",
          "Google Pixel 9 Pro: IA fotográfica sin rival, precio más razonable",
        ],
      },
      {
        heading: "Gama media (250-600€): donde está la mejor relación calidad/precio",
        body: "El Xiaomi 14T ofrece cámara Leica y chip MediaTek Dimensity 8300 Ultra a menos de 500€. El Samsung Galaxy A56 mejora la duración de batería y mantiene la pantalla AMOLED de 120Hz. El Google Pixel 9a es la novedad de 2026 con IA Gemini y precio ajustado. Cualquiera de estos tres supera a flagships de hace dos años.",
      },
      {
        heading: "Gama económica (menos de 250€): qué esperar en 2026",
        body: "El Redmi Note 14 de Xiaomi y el Samsung Galaxy A35 son los más vendidos en España por debajo de 250€. Ofrecen pantalla AMOLED, carga rápida y cámara decente para uso casual. El Motorola Moto G85 destaca por su construcción premium para el precio.",
      },
      {
        heading: "iOS vs Android en 2026: ¿sigue siendo relevante el debate?",
        body: "La brecha se ha reducido. Android con One UI de Samsung o el Android puro de Google ofrece una experiencia muy pulida. iOS sigue ganando en consistencia de actualizaciones y privacidad por diseño. La decisión depende más del ecosistema (Mac, iPad, Apple Watch) que del sistema operativo en sí. Si tienes otros dispositivos Apple, iPhone tiene ventajas concretas; si no, Android ofrece más variedad y precio.",
      },
      {
        heading: "Lo que debes evitar en 2026",
        body: "Los chips MediaTek Helio y Snapdragon 4 Gen 1 de más de dos generaciones ya se quedan cortos para el día a día fluido. El almacenamiento de 64GB se llena en meses. Los modelos sin actualización garantizada de al menos 3 años son una mala inversión. Las cámaras de 50MP con sensor diminuto no superan a un buen sensor de 12MP.",
      },
    ],
  },
  {
    slug: "playstation-5-vs-xbox-series-x-2026",
    title: "PS5 vs Xbox Series X en 2026: ¿Cuál Comprar?",
    description: "Comparativa actualizada de PS5 y Xbox Series X en 2026: juegos exclusivos, rendimiento, precio y Game Pass. Todo lo que necesitas saber antes de decidir.",
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-30",
    category: "Gaming",
    readingTime: 6,
    intro: "La guerra de consolas lleva tres años sin un ganador claro en ventas, pero sí hay diferencias concretas que importan según tu uso. Esta comparativa actualizada a 2026 va al grano: juegos disponibles, servicios de suscripción y rendimiento real.",
    sections: [
      {
        heading: "Catálogo de juegos exclusivos: PS5 gana por ahora",
        body: "PlayStation 5 tiene el catálogo de exclusivos más sólido: God of War Ragnarök, Spider-Man 2, Ghost of Tsushima, Horizon Forbidden West y la saga de FromSoftware en PS5. Xbox Series X apuesta por estudios potentes (Bethesda, Activision con Call of Duty, Obsidian) pero los exclusivos llegan tarde y a menudo también en PC.",
        list: [
          "PS5 exclusivos destacados: Spider-Man 2, Demon's Souls Remake, Returnal, Astro Bot",
          "Xbox exclusivos destacados: Halo Infinite, Forza Horizon 6, Stalker 2, Indiana Jones",
          "Xbox ventaja: todos sus juegos llegan el día 1 a Game Pass",
        ],
      },
      {
        heading: "Game Pass vs PlayStation Plus: el duelo de servicios",
        body: "Game Pass Ultimate a 17,99€/mes incluye cientos de juegos disponibles desde el día de lanzamiento, EA Play y juegos en la nube. PlayStation Plus Extra (14,99€/mes) tiene biblioteca de calidad pero los estrenos de Sony no suelen llegar al servicio en meses. Si juegas mucho y valoras la variedad, Game Pass ofrece más por el precio. Si juegas a pocos juegos y los quieres comprados, la diferencia importa menos.",
      },
      {
        heading: "Rendimiento técnico: prácticamente idéntico",
        body: "Ambas consolas corren la mayoría de juegos a 4K60 o 1440p120 dependiendo del título. El SSD NVMe de PS5 es ligeramente más rápido en carga, lo cual se nota especialmente en los juegos que aprovechan el almacenamiento directamente. Xbox Series X tiene algo más de GPU en papel, pero en la práctica los juegos multiplataforma rinden igual en ambas.",
      },
      {
        heading: "Precio y disponibilidad en 2026",
        body: "La PS5 digital (sin lector) cuesta 449€ y la edición con lector 499€. Xbox Series X está a 499€. Xbox Series S (gama media) a 299€ es la entrada más económica al ecosistema Xbox con Game Pass, aunque solo corre juegos hasta 1440p. En España, la disponibilidad de ambas es estable en 2026 sin necesidad de colas.",
      },
      {
        heading: "¿Cuál comprar según tu perfil?",
        body: "Elige PS5 si: ya tienes amigos en PlayStation, te interesan los exclusivos de Sony o quieres la consola con el catálogo más diverso ahora mismo. Elige Xbox si: juegas en PC y quieres Game Pass en ambas plataformas, prefieres la suscripción como modelo de consumo o quieres la Xbox Series S para iniciarte. Si solo juegas 5-6 juegos al año, cualquiera vale; si consumes mucho, Game Pass es un argumento difícil de ignorar.",
      },
    ],
  },
  {
    slug: "guia-monitores-gaming-2026",
    title: "Guía de Monitores Gaming 2026: Todo lo que Necesitas Saber",
    description: "Resolución, tasa de refresco, tiempo de respuesta y paneles para gaming. La guía completa para elegir el monitor gamer correcto en 2026.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-30",
    category: "Gaming",
    categorySlug: "monitores",
    sectionSlug: "gaming",
    readingTime: 8,
    intro: "Los monitores gaming han evolucionado enormemente: los paneles OLED para gaming ya están a precios accesibles, el 4K120Hz es el nuevo estándar en gama alta y hay opciones decentes por menos de 200€. Esta guía actualizada te ayuda a encontrar el monitor correcto para tu configuración y presupuesto.",
    sections: [
      {
        heading: "Resolución: 1080p, 1440p o 4K",
        body: "1080p (Full HD) sigue siendo válido para gaming competitivo en pantallas de hasta 27 pulgadas: la GPU necesita menos potencia y es más fácil alcanzar 144Hz o más. 1440p (QHD) es el punto dulce en 2026: mejor imagen que 1080p sin el coste de GPU del 4K, perfecto para pantallas de 27-32 pulgadas. 4K (UHD) para gaming requiere una GPU de gama alta (RTX 4080+ o RX 7900 XT+) para correr juegos modernos a 60fps; a 4K120fps necesitas lo mejor del mercado.",
        list: [
          "1080p: gaming competitivo, presupuesto ajustado, GPU media",
          "1440p: el equilibrio imagen/rendimiento de 2026",
          "4K: inmersión máxima, requiere GPU de alta gama",
        ],
      },
      {
        heading: "Tasa de refresco: 144Hz, 165Hz, 240Hz",
        body: "La diferencia entre 60Hz y 144Hz es enorme y cualquier gamer lo nota inmediatamente. La diferencia entre 144Hz y 240Hz es real pero menos pronunciada; importa especialmente en shooters competitivos donde cada frame cuenta. 360Hz+ solo tiene sentido para jugadores de élite en FPS como CS2 o Valorant. Para la mayoría, 144Hz o 165Hz es el objetivo mínimo y suficiente para la gran mayoría de géneros.",
      },
      {
        heading: "Paneles: IPS, VA, OLED para gaming",
        body: "IPS: los mejores colores y ángulos de visión, tiempos de respuesta de 1ms GtG en modelos gaming. El estándar para la mayoría. VA: contraste nativo muy superior (3000:1 vs 1000:1 del IPS), ideal para juegos de atmósfera oscura, pero ghosting en movimientos rápidos. OLED: el futuro ya presente, contraste infinito, tiempo de respuesta de 0.03ms, sin ghosting. El problema: precio elevado y riesgo de burn-in en interfaces estáticas. Los modelos de 2026 han mejorado la protección anti burn-in considerablemente.",
      },
      {
        heading: "Adaptive Sync: FreeSync vs G-Sync",
        body: "FreeSync es el estándar de AMD y también funciona en GPUs Nvidia en la mayoría de monitores modernos. G-Sync requiere módulo interno propio y eleva el precio del monitor 100-150€ sin una mejora proporcional en la experiencia. En 2026, un monitor FreeSync Premium Pro es la elección correcta tanto para AMD como para Nvidia; G-Sync queda para quienes buscan la compatibilidad garantizada.",
      },
      {
        heading: "Recomendaciones por presupuesto",
        body: "Menos de 200€: AOC 24G2 1080p 144Hz IPS, un clásico imbatible por el precio. Entre 200 y 350€: LG 27GP850-B 1440p 165Hz Nano IPS, la referencia del mercado QHD. Entre 350 y 600€: Samsung Odyssey G7 o LG UltraGear 32GQ950 para 4K120Hz. Más de 600€: ASUS ROG Swift OLED PG27AQDP o LG OLED 27GR95QE para la experiencia definitiva.",
      },
    ],
  },
  {
    slug: "mejores-auriculares-inalambricos-2026",
    title: "Mejores Auriculares Inalámbricos 2026: Ranking con Análisis Real",
    description: "Los mejores auriculares Bluetooth con cancelación de ruido en 2026: Sony, Bose, Apple AirPods y más. Comparativa con pros y contras de cada modelo.",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-30",
    category: "Tecnología",
    categorySlug: "auriculares",
    sectionSlug: "tecnologia",
    readingTime: 6,
    intro: "El mercado de auriculares inalámbricos en 2026 tiene dos o tres modelos que destacan claramente sobre el resto según el uso. Esta comparativa actualizada va directo a los hechos: qué cancela mejor el ruido, qué suena mejor y dónde está la mejor relación calidad/precio.",
    sections: [
      {
        heading: "Los mejores con ANC (cancelación activa de ruido)",
        body: "Sony WH-1000XM5 sigue siendo el referente en cancelación de ruido: reduce el ruido de avión y tren mejor que cualquier competidor. Bose QuietComfort 45 tiene la ANC más suave para voces; ideal para oficinas ruidosas. Apple AirPods Max es la opción para el ecosistema Apple, con integración perfecta y calidad de construcción sin igual. La diferencia en ANC entre el Sony y el Bose es mínima; la diferencia de precio no.",
        list: [
          "Sony WH-1000XM5: mejor ANC general, batería 30h, multipoint",
          "Bose QC45: ANC más cómoda para llamadas, construcción premium",
          "Apple AirPods Max: ecosistema Apple, calidad de construcción excepcional",
        ],
      },
      {
        heading: "Los mejores in-ear (TWS) de 2026",
        body: "Apple AirPods Pro 2 con el chip H2 sigue siendo la referencia en TWS: la mejor ANC en formato pequeño, la mejor integración con iPhone y audio espacial real. Samsung Galaxy Buds 3 Pro son la alternativa Android con ANC comparable y mejor en llamadas. Jabra Evolve2 Buds destaca para profesionales que necesitan calidad de micrófono en reuniones. Sony WF-1000XM5 mejora al modelo anterior y compite directamente con los AirPods Pro.",
      },
      {
        heading: "La mejor relación calidad/precio",
        body: "Soundcore by Anker Space Q45 a 79€ ofrece el 80% de la experiencia de los Sony WH-1000XM5 a menos de la mitad del precio. Edifier WH950NB a 69€ tiene ANC decente y sonido calido. 1More SonoFlow a 59€ sorprende con sonido detallado en su rango. Para gaming, SteelSeries Arctis Nova 3 Wireless es la referencia en su precio.",
      },
      {
        heading: "Códecs y calidad de audio: qué importa en 2026",
        body: "El códec LDAC (Sony) sigue siendo el de mayor ancho de banda para Android. aptX Lossless de Qualcomm está llegando a más dispositivos y ofrece audio sin pérdida a 24bit/96kHz. AAC es el estándar de Apple y funciona bien en iPhone. En la práctica, para la música del día a día con Spotify y Apple Music, la diferencia entre códecs es menor de lo que el marketing sugiere. Lo que sí importa más es el controlador (driver) del auricular y el tuning de fábrica.",
      },
    ],
  },
  {
    slug: "mejores-freidoras-aire-2026",
    title: "Las Mejores Freidoras de Aire de 2026: Comparativa por Uso y Precio",
    description: "Cosori, Ninja, Philips y más. Comparativa actualizada de freidoras de aire 2026 para 1-2, 3-4 o 5+ personas, con análisis de consumo eléctrico y facilidad de limpieza.",
    publishedAt: "2026-05-10",
    updatedAt: "2026-05-30",
    category: "Electrodomésticos",
    categorySlug: "freidoras-aire",
    sectionSlug: "electrodomesticos",
    readingTime: 5,
    intro: "Las freidoras de aire están en casi una de cada tres cocinas españolas. El mercado es enorme y hay opciones para todos los presupuestos, pero no todas valen lo mismo. Esta comparativa va al grano: cuál comprar según cuántas personas soís y cuánto estáis dispuestos a gastar.",
    sections: [
      {
        heading: "La mejor para 1-2 personas: Cosori Compact 2.1L",
        body: "La Cosori Compact de 2.1 litros es perfecta para individuos o parejas. Compacta, fácil de limpiar, con 5 funciones preconfiguradas y temperatura hasta 230°C. A 59€ es la que mejor relación calidad/espacio tiene para cocinas pequeñas. La cesta es apta para lavavajillas y el precalentamiento automático es un plus que ahorra tiempo.",
      },
      {
        heading: "La mejor para 3-4 personas: Cosori Pro LE 5.5L",
        body: "La Cosori Pro LE de 5.5 litros es la freidora más vendida en España por un amplio margen. A 99€ tiene 9 funciones preconfiguradas, control por app (Alexa/Google), y una cesta que aguanta una bandeja de alitas o patatas para 4 personas sin necesitar dos tandas. El panel táctil es intuitivo y el ruido es bajo comparado con competidoras.",
      },
      {
        heading: "La mejor doble cesta: Ninja DualZone AF400EU",
        body: "Si cocinais cosas diferentes o para 5+ personas, el Ninja DualZone con dos cestas es el cambio de nivel. Permite cocinar pollo en una cesta y patatas en otra, sincronizando los tiempos para que terminen juntos. A 199€ es el doble que una Cosori estándar, pero elimina el problema de tener que hacer tandas para familias numerosas.",
      },
      {
        heading: "La más premium: Philips 3000 XL 6.2L",
        body: "Philips fue la creadora del concepto de freidora de aire y sigue teniendo la mejor construcción. El modelo 3000 XL de 6.2 litros tiene la tecnología TurboStar que distribuye el calor uniformemente, lo que produce resultados más homogéneos que la competencia. A 139€ es más cara que la Cosori equivalente, pero dura más y el acabado es superior.",
      },
      {
        heading: "Consumo eléctrico: lo que no te cuentan",
        body: "Una freidora de aire consume entre 1400W y 2000W. Para freír 400g de patatas se tarda 18-22 minutos: unos 0.5-0.7 kWh por tanda. Comparado con un horno convencional (2000-3000W durante 30-40 minutos), la freidora consume un 50-60% menos de energía. El ahorro en la factura eléctrica es real, especialmente si hacías uso frecuente del horno.",
      },
    ],
  },
  {
    slug: "nintendo-switch-2-analisis",
    title: "Nintendo Switch 2: Análisis Completo tras 3 Meses de Uso",
    description: "Todo sobre la Nintendo Switch 2: rendimiento, catálogo de juegos, compatibilidad con juegos anteriores y si merece la pena la actualización desde Switch 1.",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-30",
    category: "Videojuegos",
    readingTime: 7,
    intro: "La Nintendo Switch 2 lleva varios meses en el mercado y ya hay datos suficientes para un análisis honesto. ¿Merece la pena actualizarse desde la Switch original? ¿El catálogo justifica el precio? Esta es nuestra valoración tras tres meses de uso intensivo.",
    sections: [
      {
        heading: "Rendimiento: un salto generacional real",
        body: "La Switch 2 corre los juegos en modo portátil a 1080p60fps con DLSS, algo que la Switch 1 no podía ni en televisor. En modo dock alcanza los 4K con upscaling. Mario Kart World y Donkey Kong Bananza muestran gráficos que no tienen nada que envidiar a un PC de gama media. La pantalla OLED de 7.9 pulgadas mejora notablemente la experiencia portátil.",
      },
      {
        heading: "Compatibilidad con la biblioteca anterior",
        body: "La gran mayoría de juegos de Switch 1 son compatibles con Switch 2. Algunos títulos como Breath of the Wild y Tears of the Kingdom reciben mejoras visuales automáticas. Los cartuchos físicos de Switch 1 funcionan sin adaptador. La biblioteca retroactiva de Nintendo sigue siendo uno de los argumentos más fuertes de la plataforma.",
      },
      {
        heading: "Catálogo exclusivo en el primer año",
        body: "Mario Kart World (incluido en el bundle) es el mejor juego de carreras de la generación. Metroid Prime 4: Beyond, Donkey Kong Bananza y el nuevo Pokémon protagonizan el año 1. Nintendo tiene el calendario más consistente de exclusivos de todas las plataformas; raro es el mes sin un lanzamiento relevante.",
      },
      {
        heading: "Joy-Con magnéticos: la mejora más sorprendente",
        body: "La conexión magnética de los Joy-Con 2 elimina el drift estructural que tenían los originales. El mecanismo es mucho más preciso y el click de enganche da seguridad inmediata. El botón C (GameChat) para comunicación con amigos en partida es cómodo de usar. Las cámaras de los Joy-Con para juegos con IR son un extra que aún esperamos que los desarrolladores aprovechen más.",
      },
      {
        heading: "¿Merece la pena actualizarse desde Switch 1?",
        body: "Si tienes una Switch OLED original y juegas principalmente en modo portátil, el salto no es urgente. Si tienes una Switch Lite o la modelo original de 2017, el salto en rendimiento y pantalla es enorme. Si eres fan de Nintendo y juegas en televisor, la mejora visual es muy notable. El precio de 469€ (bundle con Mario Kart World) se justifica si ya tienes biblioteca de Switch 1 que reutilizas.",
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function generateArticleStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}
