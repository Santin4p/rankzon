export interface GuideSection {
  heading: string
  body: string
  list?: string[]
}

export interface Guide {
  slug: string
  title: string
  shortTitle: string
  description: string
  updatedAt: string
  sectionSlug: string
  categorySlug: string
  categoryName: string
  intro: string
  sections: GuideSection[]
}

export const guides: Guide[] = [
  {
    slug: "como-elegir-auriculares",
    title: "Cómo Elegir Auriculares: Guía de Compra 2026",
    shortTitle: "Auriculares",
    description:
      "Todo lo que debes saber antes de comprar auriculares: tipos, cancelación de ruido, autonomía, conectividad y qué esperar en cada rango de precio.",
    updatedAt: "mayo 2026",
    sectionSlug: "tecnologia",
    categorySlug: "auriculares",
    categoryName: "Auriculares",
    intro:
      "Hay auriculares para todo: el commuter que necesita bloquear el metro, el runner que busca que no se caigan, el audiófilo que quiere extraer lo máximo de cada canción. El problema es que el mercado mezcla modelos de 20 € con otros de 400 € en el mismo escaparate. Esta guía te ayuda a identificar qué importa para tu caso y a ignorar lo que no.",
    sections: [
      {
        heading: "Tipos de auriculares: in-ear, on-ear y over-ear",
        body: "Los in-ear (intraurales) se introducen en el canal auditivo: son los más compactos, los más fáciles de llevar encima y los que mejor aislan de forma pasiva. Los on-ear apoyan sobre el pabellón auricular sin rodearlo: más cómodos en trayectos cortos pero con menor aislamiento. Los over-ear rodean completamente la oreja: la mejor calidad de sonido y comodidad en sesiones largas, pero pesan más y no caben en un bolsillo.",
        list: [
          "In-ear: transporte, deporte, uso diario intensivo",
          "On-ear: uso ocasional, viajes de fin de semana",
          "Over-ear: trabajo en casa, viajes largos en avión, audiofilia",
        ],
      },
      {
        heading: "Con cable o inalámbricos",
        body: "Los inalámbricos Bluetooth eliminan el cable y ofrecen libertad de movimiento, pero añaden latencia y dependen de batería. Los con cable tienen latencia cero, no se quedan sin batería a mitad del día y suelen sonar mejor por el mismo precio, pero limitan el movimiento. Si vas a usarlos en el móvil de forma exclusiva y la batería te preocupa, los inalámbricos son más prácticos. Si los conectas a un ordenador fijo para trabajar o escuchar música con atención, el cable tiene ventajas reales.",
      },
      {
        heading: "Cancelación activa de ruido (ANC): cuándo merece la pena",
        body: "El ANC usa micrófonos externos para analizar el ruido del entorno y generar una señal opuesta que lo cancela. Funciona especialmente bien con ruidos continuos y de baja frecuencia: motores de avión, tren, aire acondicionado. Con voces humanas o ruido urbano impredecible, el efecto es menor. Los mejores sistemas ANC hoy (Sony WH-1000XM5, Bose QC45, AirPods Pro 2) marcan diferencia real en vuelos largos. Los ANC de gama media-baja hacen algo, pero no son transformadores.",
        list: [
          "ANC vale la pena si: viajas mucho en avión o tren, trabajas en espacios ruidosos",
          "ANC prescindible si: uso doméstico, deporte, presupuesto ajustado",
        ],
      },
      {
        heading: "Autonomía y carga",
        body: "Los in-ear TWS (True Wireless Stereo) suelen ofrecer 6-8 horas en el auricular más 2-3 cargas adicionales en el estuche, para un total de 24-32 horas. Los over-ear sin ANC llegan fácilmente a 30-50 horas. Fíjate en si tienen carga rápida: 10 minutos para 1-2 horas de uso es una función muy útil cuando se te acaba la batería antes de salir. La carga inalámbrica Qi existe en gamas altas pero no cambia la vida.",
      },
      {
        heading: "Calidad de sonido: qué importa de verdad",
        body: "Los megapíxeles de las cámaras tienen su equivalente aquí en los milímetros del driver y la respuesta en frecuencia, cifras que los fabricantes usan para impresionar sin que digan demasiado. Lo que sí importa: la firma sonora (cálida/basshead vs. neutra vs. brillante), el nivel de detalle en medios y agudos, y el escenario sonoro. Para la mayoría de usuarios, los Sony, Jabra y Apple de gama media ya superan con creces lo que el oído no entrenado puede distinguir.",
      },
      {
        heading: "Conectividad Bluetooth: versión, códecs y multipoint",
        body: "Bluetooth 5.0 o superior garantiza una conexión estable sin cortes en el uso normal. El códec de audio determina la calidad de la transmisión: AAC funciona bien con iPhone, aptX y aptX HD con Android de gama alta, LDAC (Sony) es el de mayor calidad pero consume más batería. El multipoint, que permite conectar dos dispositivos a la vez y saltar entre ellos sin reconectar, es una función muy práctica si alternas entre móvil y ordenador.",
        list: [
          "iPhone: prioriza AAC",
          "Android gama alta: aptX o LDAC si el sonido es prioridad",
          "Uso profesional entre dispositivos: busca multipoint",
        ],
      },
      {
        heading: "Qué esperar según el presupuesto",
        body: "Por debajo de 50 €: sonido decente, posiblemente sin ANC ni multipoint, buena opción para un segundo par. Entre 50 y 150 €: aquí está la mejor relación calidad/precio del mercado; marcas como Jabra, Sony o Sennheiser ofrecen funciones que antes costaban el doble. Por encima de 150 €: refinamiento del ANC, mejor micrófono para llamadas, materiales premium y funciones avanzadas. Solo merece la pena si le vas a dar uso diario y exigente.",
      },
    ],
  },
  {
    slug: "como-elegir-movil",
    title: "Cómo Elegir Móvil: Guía de Compra 2026",
    shortTitle: "Móviles",
    description:
      "Qué procesador, cuánta RAM, qué cámara y qué batería necesitas realmente. Guía práctica para elegir el móvil que mejor encaja con tu uso y presupuesto.",
    updatedAt: "mayo 2026",
    sectionSlug: "tecnologia",
    categorySlug: "moviles",
    categoryName: "Móviles",
    intro:
      "Cambiamos de móvil cada 3-4 años de media, así que la decisión importa más de lo que parece. El mercado en 2026 está muy maduro: un teléfono de 200 € hace cosas que antes requerían gastar 600 €. La clave es entender qué especificaciones marcan diferencia real en el uso cotidiano y cuáles son solo marketing.",
    sections: [
      {
        heading: "Android vs iOS: la decisión que afecta todo lo demás",
        body: "Android te da más libertad: puedes personalizar más, hay más rangos de precio, y la integración con Google es mejor. iOS es más simple, tiene actualizaciones más largas (6-7 años) y funciona excepcionalmente bien si ya usas otros dispositivos Apple. Si tienes un Mac o un iPad, el ecosistema Apple añade valor real. Si no, Android es la opción más flexible y económica.",
      },
      {
        heading: "Procesador: el dato más importante que pocos miran",
        body: "El procesador determina la fluidez hoy y en tres años. En Android, los chips Snapdragon 8 Gen 3/4 de Qualcomm son los de mayor rendimiento; los Dimensity de MediaTek son competitivos en gamas medias. El Apple A18 es el chip más eficiente del mercado. Evita procesadores de más de dos generaciones de antigüedad aunque el precio sea tentador: el soporte de software se acorta.",
        list: [
          "Gama alta: Snapdragon 8 Gen 4, Apple A18",
          "Gama media: Snapdragon 7s Gen 3, Dimensity 7300",
          "Gama de entrada: Snapdragon 4 Gen 2, Dimensity 6300",
        ],
      },
      {
        heading: "RAM y almacenamiento: cuánto necesitas",
        body: "8 GB de RAM es el mínimo recomendable en 2026 para un uso fluido sin recargas de aplicaciones en segundo plano. 12 GB es el punto dulce para la mayoría. El almacenamiento base suele ser 128 o 256 GB; calcula que el sistema operativo y las apps ocupan 20-30 GB y las fotos se acumulan rápido. Si el modelo no admite microSD, elige directamente la versión de 256 GB.",
      },
      {
        heading: "Pantalla: lo que ves el 100% del tiempo",
        body: "AMOLED ofrece negros absolutos, mayor contraste y colores más vivos que LCD; merece la pena en cualquier gama media o alta. La resolución FHD+ (1080p) es suficiente hasta 6.7 pulgadas; más arriba se agradece QHD. La tasa de refresco de 120 Hz hace la interfaz notablemente más fluida que 60 Hz y ya está disponible en gamas medias. El brillo en exteriores (mínimo 600-800 nits) es más útil en el día a día que la resolución máxima.",
      },
      {
        heading: "Cámara: megapíxeles vs procesamiento",
        body: "Los megapíxeles importan menos que el tamaño del sensor, la apertura y, sobre todo, el procesamiento de imagen. Un 50 MP con sensor pequeño pierde contra un 12 MP con sensor grande y buena IA. Fíjate en muestras fotográficas reales en condiciones de poca luz, que es donde más se diferencia la gama alta de la media. La cámara frontal para videollamadas importa más de lo que se suele reconocer.",
        list: [
          "Lo que importa: tamaño de sensor, apertura, procesamiento",
          "Lo que no importa tanto: número de megapíxeles, número de cámaras traseras",
          "Poca luz: el mayor diferenciador entre gamas",
        ],
      },
      {
        heading: "Batería: autonomía real vs mAh en el papel",
        body: "Los mAh en el papel no son comparables entre marcas porque la eficiencia del procesador importa igual. Un iPhone con 3500 mAh suele durar más que un Android de 5000 mAh con chip menos eficiente. En la práctica, busca reseñas con pruebas de autonomía real (horas de vídeo o PCMark). La carga rápida de 65-120W recarga el teléfono en 30-40 minutos; la inalámbrica es cómoda pero más lenta.",
      },
      {
        heading: "Qué esperar por presupuesto",
        body: "Menos de 200 €: uso básico, gama de entrada, actualizaciones cortas. Entre 200 y 450 €: la mejor relación calidad/precio del mercado en 2026; cámara decente, buena pantalla, 3-4 años de soporte. Más de 450 €: la gama alta de Samsung, Google y Apple; se nota en el procesador, la cámara en condiciones difíciles y el soporte largo. Por encima de 800 €, lo que pagas es el nombre y detalles de acabado.",
      },
    ],
  },
  {
    slug: "como-elegir-portatil",
    title: "Cómo Elegir Portátil: Guía de Compra 2026",
    shortTitle: "Portátiles",
    description:
      "Windows, macOS o ChromeOS, Intel o AMD o Apple Silicon, cuánta RAM y qué almacenamiento. Todo lo que necesitas para elegir el portátil que se adapta a tu uso.",
    updatedAt: "mayo 2026",
    sectionSlug: "tecnologia",
    categorySlug: "portatiles",
    categoryName: "Portátiles",
    intro:
      "Un portátil es la herramienta que usas más horas al día. Elegir mal tiene un coste alto: te acompañará 4-6 años. El error más común es fijarse solo en el precio y la pantalla. Lo que realmente define la experiencia a largo plazo es el procesador, la RAM soldada y la calidad de la batería.",
    sections: [
      {
        heading: "Define para qué lo necesitas antes de mirar specs",
        body: "Uso ofimático y web (Office, emails, videollamadas): cualquier portátil moderno con 8-16 GB de RAM cumple. Edición de foto/vídeo casual: 16 GB RAM, SSD rápido, pantalla con buena cobertura sRGB. Programación/desarrollo: 16-32 GB RAM, buen teclado, batería larga. Gaming: GPU dedicada, pantalla 144 Hz. Si intentas optimizar para todo a la vez, acabarás pagando por cosas que no usas.",
        list: [
          "Ofimático/web: 8-16 GB RAM, cualquier CPU moderna",
          "Foto/vídeo: 16 GB, pantalla sRGB >95%, SSD NVMe",
          "Desarrollo: 16-32 GB, teclado cómodo, batería >10h",
          "Gaming: GPU dedicada RTX 4060+, 144 Hz",
        ],
      },
      {
        heading: "Sistema operativo: Windows, macOS y ChromeOS",
        body: "Windows tiene el catálogo de software más amplio, más rangos de precio y es imprescindible si usas software específico (Adobe en modo completo, AutoCAD, muchos juegos). macOS es más estable, tiene actualizaciones largas y los chips Apple Silicon ofrecen una eficiencia energética que Windows no iguala aún. ChromeOS es para uso web exclusivo: no instala apps nativas fuera del ecosistema Android/web.",
      },
      {
        heading: "Procesador: Intel, AMD y Apple Silicon",
        body: "En Windows, los AMD Ryzen 7 y los Intel Core Ultra ofrecen rendimiento similar; AMD suele ganar en eficiencia energética en portátiles delgados. Los Apple M3/M4 siguen siendo líderes en eficiencia: más rendimiento por vatio que cualquier chip x86, lo que se traduce en baterías de 15-18 horas reales. Evita procesadores Pentium, Celeron o los Intel i3/i5 de undécima generación o anterior: ya están obsoletos para 2026.",
      },
      {
        heading: "RAM: cuánto necesitas y por qué no puedes añadir más después",
        body: "La mayoría de portátiles delgados de 2025-2026 tienen la RAM soldada a la placa. Lo que compras es lo que tendrás siempre. 8 GB es el mínimo absoluto en 2026; con Chrome + Teams + Slack abiertos ya se nota la presión. 16 GB es el punto dulce para uso general cómodo. 32 GB solo si editas vídeo de forma habitual o corres máquinas virtuales. No escatimes aquí.",
      },
      {
        heading: "Almacenamiento: SSD NVMe, no SATA ni HDD",
        body: "Un SSD NVMe es entre 3 y 10 veces más rápido que un SSD SATA antiguo y hace que el sistema arranque, abra aplicaciones y mueva archivos a otra velocidad. Si ves un portátil 2026 con HDD o SSD SATA, descártalo sin importar el precio. 512 GB es el mínimo razonable; con el sistema, las apps y algunos proyectos, 256 GB se llena antes de lo esperado. Los portátiles con slot M.2 libre te permiten ampliar después, lo cual es un punto a favor.",
      },
      {
        heading: "Pantalla: tamaño, resolución y panel",
        body: "13-14 pulgadas: portabilidad máxima, ideal para quien viaja o trabaja en espacios reducidos. 15-16 pulgadas: el equilibrio entre pantalla y peso para uso diario. 17 pulgadas: para quien rara vez mueve el portátil. En resolución, FHD (1920×1080) es el mínimo en 2026; en 14 pulgadas o más se agradece 2K (2560×1600). Los paneles IPS ofrecen buenos ángulos de visión; OLED da negros absolutos pero puede tener burn-in a largo plazo en uso de escritorio.",
      },
      {
        heading: "Batería: autonomía real vs la cifra del fabricante",
        body: "Los fabricantes miden en condiciones ideales. En uso real con brillo al 60-70% y WiFi activo, resta un 30-40% a lo que anuncian. Los MacBook con M3/M4 son la excepción: sus cifras son bastante fiables. En Windows, busca reseñas con pruebas de batería en uso mixto. Para uso de todo el día sin enchufe necesitas al menos 10-12 horas en condiciones controladas.",
      },
      {
        heading: "Qué esperar por presupuesto",
        body: "Menos de 600 €: portátil decente para ofimática y web; acepta compromisos en pantalla o RAM. Entre 600 y 1000 €: aquí está la mejor relación calidad/precio; LG Gram, ASUS ZenBook, Lenovo IdeaPad Pro. Más de 1000 €: MacBook Air/Pro, Dell XPS, ThinkPad X1; construcción premium, pantallas excelentes, soporte largo. Por encima de 1500 €, estás pagando por GPU dedicada o pantalla OLED 4K que pocos necesitan.",
      },
    ],
  },
  {
    slug: "como-elegir-television",
    title: "Cómo Elegir Televisor: Guía de Compra 2026",
    shortTitle: "Televisores",
    description:
      "Tamaño, OLED vs QLED, tasa de refresco, HDR y Smart TV. Todo lo que necesitas saber para elegir el televisor ideal para tu salón y tu bolsillo.",
    updatedAt: "mayo 2026",
    sectionSlug: "tecnologia",
    categorySlug: "televisores",
    categoryName: "Televisores",
    intro:
      "Un televisor bien elegido dura 8-10 años. El mercado ha cambiado mucho: los televisores baratos de 2026 son mejores que los de gama media de hace cinco años, y las diferencias entre tecnologías de panel ya no son tan brutales como antes. Pero sigue habiendo elecciones que marcan la diferencia.",
    sections: [
      {
        heading: "El tamaño correcto según tu distancia de visionado",
        body: "La regla general es que la distancia de visionado ideal equivale a 1.5-2.5 veces la diagonal de la pantalla. Para un sofá a 3 metros de la TV, un televisor de 55-65 pulgadas es lo correcto. Muchos compradores se quedan cortos por miedo a que sea demasiado grande: en la práctica, lo habitual es arrepentirse de haber comprado pequeño.",
        list: [
          "2-2.5 m de distancia: 43-50 pulgadas",
          "2.5-3.5 m de distancia: 55-65 pulgadas",
          "Más de 3.5 m: 65-77 pulgadas o más",
        ],
      },
      {
        heading: "Resolución: 4K es el estándar, 8K no tiene sentido hoy",
        body: "4K (3840×2160) es el estándar actual y el que tiene más contenido disponible en streaming, Blu-ray y juegos. Full HD (1920×1080) solo tiene sentido en televisores muy pequeños (32-40 pulgadas) a precio de entrada. El 8K existe pero no tiene contenido nativo, el upscaling a 8K no justifica el sobrecoste y los televisores 8K actuales son caros para lo que aportan.",
      },
      {
        heading: "Tecnología de panel: LED, QLED, OLED y MiniLED",
        body: "LED/LCD estándar: luminoso, duradero, asequible, pero el control de negro es limitado. QLED (Samsung): LED con capa de puntos cuánticos; colores más saturados, mayor brillo, buena elección para habitaciones luminosas. OLED: cada píxel se ilumina de forma independiente, negros perfectos, contraste infinito; ideal para ver películas en ambientes oscuros. MiniLED: LED con zonas de iluminación muy pequeñas; se acerca al OLED en contraste pero es más luminoso y más barato.",
      },
      {
        heading: "Tasa de refresco: 60 Hz, 120 Hz y el marketing de los Hz ficticios",
        body: "60 Hz es suficiente para películas y series, pero 120 Hz nativo marca diferencia en deportes, videojuegos y movimiento rápido. Cuidado con las cifras de marketing: 'Motion Rate 240' de Samsung o 'TruMotion 120' de LG no son Hz nativos, son procesados. Busca siempre el panel refresh rate nativo. Para gaming, 120 Hz con HDMI 2.1 es lo que permite PS5 y Xbox Series X a máxima fluidez.",
      },
      {
        heading: "HDR: qué versiones importan y cuáles son solo etiqueta",
        body: "HDR10 es el mínimo y está en prácticamente todos los televisores. Dolby Vision es el formato más avanzado y el que más plataformas de streaming usan (Netflix, Disney+, Apple TV+). HDR10+ es la alternativa de Samsung y Amazon. Un televisor sin Dolby Vision en 2026 se queda fuera de una parte significativa del contenido premium disponible.",
      },
      {
        heading: "Smart TV: sistema operativo y apps",
        body: "Los principales sistemas son webOS (LG), Tizen (Samsung), Google TV/Android TV y Fire TV (Amazon). Google TV y Android TV tienen el catálogo de apps más amplio. webOS y Tizen son más fluidos y con mejor interfaz pero dependen del soporte del fabricante. Fire TV de Amazon es simple pero funcional. Lo más importante: comprueba que tiene las apps que usas (Netflix, Max, Disney+, Prime) antes de comprar.",
      },
      {
        heading: "Sonido: dónde invertir y dónde ahorrar",
        body: "El sonido integrado de la mayoría de televisores delgados de 2026 es mediocre. Los altavoces hacia abajo sin caja de resonancia dan resultados pobres independientemente de los vatios anunciados. Si el audio importa, presupuesta una barra de sonido básica junto con el televisor en lugar de gastarte el 30% más en el televisor de mayor gama. Asegúrate de que el televisor tiene eARC (enhanced Audio Return Channel) para conectar la barra con un solo cable HDMI.",
      },
    ],
  },
  {
    slug: "como-elegir-freidora-aire",
    title: "Cómo Elegir Freidora de Aire: Guía de Compra 2026",
    shortTitle: "Freidoras de Aire",
    description:
      "Freidora de cesta o de horno, litros según el número de personas, potencia, funciones y marcas más fiables. Guía completa para elegir la freidora de aire correcta.",
    updatedAt: "mayo 2026",
    sectionSlug: "electrodomesticos",
    categorySlug: "freidoras-aire",
    categoryName: "Freidoras de Aire",
    intro:
      "Las freidoras de aire han pasado de ser una moda a estar en casi una de cada tres cocinas españolas. El concepto es simple: circulación de aire caliente que cocina con muy poco o nada de aceite. Pero hay tantos modelos que elegir se ha vuelto confuso. Esta guía va al grano.",
    sections: [
      {
        heading: "Freidora de cesta vs freidora-horno: cuál encaja en tu cocina",
        body: "Las de cesta son más compactas, calientan más rápido y son perfectas para el uso habitual: patatas, croquetas, pollo, pescado. Las freidoras-horno (tipo Cosori DualBlaze o Ninja Foodi) ocupan más espacio pero permiten cocinar piezas enteras, pizzas o bandejas más grandes. Si tu cocina es pequeña y cocinas para 1-4 personas, la de cesta es casi siempre la respuesta correcta.",
      },
      {
        heading: "Capacidad: litros según cuántos coméis",
        body: "Este es el dato que más se infravalora. Una freidora de 3 litros es justa para 1-2 personas; si quieres cocinar una tanda decente de patatas tienes que hacerlo en dos pasadas. Para 3-4 personas, 5-6 litros es lo correcto. Para familias numerosas o cocinar grandes cantidades, 7 litros o un modelo de dos cestas (como el Ninja DualZone) que permite cocinar dos cosas a la vez.",
        list: [
          "1-2 personas: 3-4 litros",
          "3-4 personas: 5-6 litros",
          "5 o más personas: 7+ litros o modelo de doble cesta",
        ],
      },
      {
        heading: "Potencia: más vatios no siempre es mejor",
        body: "La potencia estándar está entre 1400 W y 2000 W. Más potencia significa que alcanza la temperatura objetivo más rápido, lo cual reduce el tiempo total de cocción. Pero también consume más electricidad. Para uso doméstico normal, 1500-1700 W es suficiente. Solo compensa más potencia si tienes capacidades grandes (7+ litros) o si cocinas piezas muy gruesas con frecuencia.",
      },
      {
        heading: "Control: analógico vs digital",
        body: "Los mandos analógicos (tiempos y temperaturas de rueda) son más intuitivos y difíciles de estropear. Los paneles táctiles digitales permiten mayor precisión y suelen incluir programas preconfigurados para alimentos concretos. Si los vas a usar otras personas en casa que no tienen paciencia con menús digitales, el analógico gana en practicidad. Si cocinas cosas variadas y quieres control preciso, el digital merece la pena.",
      },
      {
        heading: "Facilidad de limpieza: el factor que más importa a largo plazo",
        body: "La cesta y la bandeja deben ser aptas para lavavajillas, sí o sí. Los revestimientos antiadherentes de calidad facilitan la limpieza manual pero se deterioran si se friegan con estropajos metálicos. El interior de la freidora se limpia simplemente con un paño húmedo si no hay salpicaduras; las modelos con bandeja separadora del fondo facilitan esto. Evita modelos con muchas piezas pequeñas que son difíciles de encajar o perder.",
      },
      {
        heading: "Funciones extra: cuáles valen y cuáles son relleno",
        body: "La función de deshidratación (para hacer chips de fruta o carne seca) es útil si la vas a usar. La rotisserie (para pollo entero giratorio) requiere el tamaño y la forma correcta. El modo rehogado o salteado no añade valor real sobre una sartén. Los programas preconfigurados (pizza, pollo, patatas...) son convenientes al principio pero la mayoría acaban usando tiempo y temperatura manual. No pagues más solo por 10 programas preconfigurados.",
      },
      {
        heading: "Marcas más fiables en España",
        body: "Cosori lidera en ventas y calidad por precio: sus modelos tienen buenas cestas antiadherentes, panel táctil claro y garantía sólida. Ninja es la mejor opción si buscas modelos de doble cesta o mayor capacidad. Philips fue pionera y sigue siendo fiable, aunque sus precios son más altos que la competencia comparable. Cecotec y Tefal son buenas opciones de precio medio con amplia red de servicio técnico en España.",
      },
    ],
  },
  {
    slug: "como-elegir-robot-aspirador",
    title: "Cómo Elegir Robot Aspirador: Guía de Compra 2026",
    shortTitle: "Robots Aspirador",
    description:
      "Potencia de succión, navegación LiDAR vs giroscópica, base de vaciado automático y compatibilidad con mascotas. Todo para elegir el robot aspirador que realmente limpie tu casa.",
    updatedAt: "mayo 2026",
    sectionSlug: "electrodomesticos",
    categorySlug: "robots-aspirador",
    categoryName: "Robots Aspirador",
    intro:
      "Un robot aspirador solo ahorra tiempo si funciona bien. Los modelos baratos de hace cinco años dejaban una mancha en cada habitación y se quedaban atascados con cualquier cable. Los de 2026 navegan con mapas láser, evitan obstáculos y algunos hasta vacían su propio depósito. Pero la diferencia de precio entre el más barato y el mejor es brutal. Esta guía te ayuda a encontrar el punto justo.",
    sections: [
      {
        heading: "Solo aspiración vs aspiración + fregado",
        body: "Los modelos 2-en-1 que aspiran y friegan se han convertido en la categoría dominante. Los mejores (Dreame, Roborock, Ecovacs) tienen mopas que se levantan automáticamente cuando detectan alfombra y depósitos de agua limpias y sucias separados. Los de gama media simplemente arrastran una bayeta húmeda, que da resultados mediocres en suelos muy sucios. Si tienes suelos de madera o gres y quieres también el fregado, asegúrate de que el modelo tiene mopa motorizada, no solo bayeta.",
      },
      {
        heading: "Potencia de succión: Pascales (Pa) como referencia",
        body: "La potencia se mide en Pascales. Por debajo de 2000 Pa: recoge polvo y suciedad ligera. Entre 3000 y 5000 Pa: buen rendimiento en pelo de mascota, gravilla y suciedad cotidiana. Por encima de 6000 Pa (gama alta): profundidad en alfombras de pelo largo y limpieza a fondo. Las cifras de marketing a veces se inflan; compara con pruebas reales más que con el número del fabricante.",
        list: [
          "Uso básico (suelos lisos, sin mascotas): 2000-3000 Pa",
          "Uso general (alfombras finas, mascotas ocasionales): 3000-5000 Pa",
          "Intensivo (mascotas de pelo largo, alfombras gruesas): 6000+ Pa",
        ],
      },
      {
        heading: "Navegación: giroscópica vs LiDAR vs cámara",
        body: "La navegación giroscópica (modelos baratos) se basa en sensores de impacto y rutas aleatorias o en zigzag: limpia toda la habitación pero no eficientemente, y no sabe dónde ha estado. La navegación LiDAR crea un mapa láser preciso de la casa, planifica rutas eficientes y permite definir zonas a evitar desde el móvil. En 2026, cualquier robot por encima de 250 € ya tiene LiDAR; es el estándar mínimo para que el robot valga la pena.",
      },
      {
        heading: "Autonomía y vuelta automática a la base",
        body: "La mayoría de robots de 2026 tienen 150-300 minutos de autonomía, suficiente para la mayoría de casas. Más importante que la autonomía total es si el robot tiene 'limpieza continuada': cuando la batería baja, vuelve a cargar y retoma donde lo dejó. Sin esta función, en pisos grandes puede dejar partes sin limpiar. La velocidad de carga varía mucho: de 2 a 6 horas según el modelo.",
      },
      {
        heading: "Base de vaciado automático: merece la pena o es un lujo",
        body: "Las bases con vaciado automático aspiran el depósito del robot cada vez que vuelve a la base, con bolsas que aguantan 30-60 días sin vaciarse. El beneficio real no es la comodidad (vaciar el depósito manualmente tarda 10 segundos) sino no tener que manipular el polvo y el pelo de mascota. Si tienes alergias o mascotas, el vaciado automático tiene valor real. Para el resto, es un extra que sube el precio 150-200 € y es prescindible.",
      },
      {
        heading: "Mapas y personalización: qué funciones son útiles",
        body: "La posibilidad de definir zonas de exclusión (donde el robot nunca entra), programar habitaciones concretas y ajustar la intensidad por zona son funciones que se usan de verdad. Los mapas multiplanta son útiles en casas de dos pisos. El reconocimiento de obstáculos en tiempo real (cables, calcetines, excrementos de mascota) está en gamas altas y evita sorpresas desagradables.",
      },
      {
        heading: "Mascotas: qué buscar si tienes animales en casa",
        body: "El pelo de mascota satura los cepillos convencionales y se enreda. Busca modelos con cepillo de goma sin cerdas o cepillo híbrido: se enredan mucho menos y son más fáciles de limpiar. El filtro HEPA es importante si alguien en casa tiene alergia a los ácaros o al pelo de animal. Con mascotas, el depósito se llena más rápido: los modelos con base de vaciado automático tienen más sentido en este caso.",
      },
      {
        heading: "Marcas y qué esperar por presupuesto",
        body: "Menos de 200 €: navegación giroscópica o LiDAR básico, sin app sofisticada; cumple en pisos pequeños y sin obstáculos. Entre 200 y 400 €: LiDAR con mapas, app completa, buena succión; el mejor equilibrio para la mayoría. Entre 400 y 700 €: fregado con mopa motorizada, vaciado automático, reconocimiento de obstáculos. Más de 700 €: Dreame y Roborock de gama ultra, con estaciones de limpieza de mopa completas.",
      },
    ],
  },
  {
    slug: "como-elegir-afeitadora-electrica",
    title: "Cómo Elegir Afeitadora Eléctrica: Guía de Compra 2026",
    shortTitle: "Afeitadoras Eléctricas",
    description:
      "Rotativa vs láminas, húmedo vs seco, autonomía y precio. Todo lo que debes saber antes de comprar una afeitadora eléctrica para hombre o mujer.",
    updatedAt: "mayo 2026",
    sectionSlug: "belleza",
    categorySlug: "afeitadoras-electricas",
    categoryName: "Afeitadoras Eléctricas",
    intro:
      "La afeitadora eléctrica ideal depende más de tu tipo de barba y tu piel que de la marca. Una afeitadora de láminas de 40 € puede dar mejor resultado que una rotativa de 150 € si tu barba es fina y cortas a diario. Esta guía explica las diferencias reales para que no compres por el embalaje.",
    sections: [
      {
        heading: "Rotativas vs láminas: cuál te conviene",
        body: "Las afeitadoras rotativas (Philips, Braun Series) tienen cabezales circulares que giran sobre la piel siguiendo los contornos del rostro; son mejores para barbas densas e irregulares y para personas que no se afeitan a diario. Las de láminas (Braun, Panasonic) usan una rejilla metálica con cuchillas oscilantes: dan un acabado más apurado y son más indicadas para uso diario y pieles sensibles. No hay una mejor en absoluto: depende de tu barba y tu rutina.",
        list: [
          "Rotativas: barba gruesa, uso cada 2-3 días, contornos del rostro complejos",
          "Láminas: barba fina o media, afeitado diario, acabado más apurado",
        ],
      },
      {
        heading: "Afeitado húmedo o seco",
        body: "Las afeitadoras básicas solo funcionan en seco. Los modelos 'wet & dry' permiten usarse bajo el agua, con gel o espuma de afeitar, y se pueden limpiar directamente bajo el grifo. El afeitado húmedo es más suave para la piel y da un resultado más cercano. Si tienes piel sensible o irritación frecuente, el húmedo/seco justifica la diferencia de precio. Los modelos solo-seco son perfectos si afeitarás en el coche o en la oficina.",
      },
      {
        heading: "Autonomía y carga",
        body: "La mayoría de afeitadoras de gama media ofrecen 45-60 minutos de autonomía, suficiente para 10-15 afeitados sin cargar. Lo que varía es el tiempo de carga: los modelos de entrada tardan 8-12 horas; los de gama alta tienen carga rápida de 5 minutos para un afeitado de emergencia. Si viajas frecuentemente, comprueba que admite voltaje universal (100-240V).",
        list: [
          "Uso doméstico regular: 45 min de autonomía es suficiente",
          "Viajes: busca carga rápida y voltaje universal",
          "Uso intensivo: modelos con base de carga y limpieza automática",
        ],
      },
      {
        heading: "Recortadora de precisión integrada",
        body: "Casi todos los modelos llevan un trimmer pop-up lateral para perfilar patillas y bigote. La diferencia está en la calidad de ese trimmer: en gamas básicas es suficiente para un perfil limpio; en modelos avanzados como el Philips OneBlade, el trimmer es casi tan bueno como la afeitadora principal. Si también perfilas barba con regularidad, esto importa más de lo que parece.",
      },
      {
        heading: "Sistemas de limpieza automática",
        body: "Las bases de limpieza automática (Braun Clean & Charge, Philips SmartClean) lavan, lubrican y cargan la afeitadora sola. La diferencia de mantenimiento es real: sin base, hay que limpiar los cabezales a mano con agua o spray limpiador cada 1-2 semanas para mantener el rendimiento. Las bases añaden 40-80 € al precio y consumen cartuchos recargables. Útiles si el mantenimiento manual te parece engorroso.",
      },
      {
        heading: "Qué esperar por presupuesto",
        body: "Menos de 30 €: básica, solo seco, autonomía justa; cumple para afeitados ocasionales. Entre 30 y 80 €: húmedo/seco, buena autonomía, trimmer incluido; la zona de mejor relación calidad-precio. Entre 80 y 150 €: láminas o rotativas premium, cabezales flexibles, mayor adaptación al rostro. Más de 150 €: bases de limpieza automática, tecnología de sensor de barba, acabado profesional.",
      },
    ],
  },
  {
    slug: "como-elegir-secador-pelo",
    title: "Cómo Elegir Secador de Pelo: Guía de Compra 2026",
    shortTitle: "Secadores de Pelo",
    description:
      "Potencia, motor de CA vs CC, tecnología iónica y difusores. Todo lo que importa para elegir el secador de pelo que cuide tu cabello y dure años.",
    updatedAt: "mayo 2026",
    sectionSlug: "belleza",
    categorySlug: "secadores-pelo",
    categoryName: "Secadores de Pelo",
    intro:
      "Un secador de pelo es uno de esos electrodomésticos que usas cada dos días y que, si no funciona bien, nota el pelo de inmediato. La diferencia entre un secador de 20 € y uno de 100 € no está en el calor (ambos pueden superar los 200 °C) sino en cómo ese calor trata el cabello. Esta guía explica qué parámetros importan de verdad.",
    sections: [
      {
        heading: "Potencia: cuántos vatios necesitas",
        body: "La potencia (vatios) determina la velocidad de secado, no la temperatura. Un secador de 1600 W seca más despacio que uno de 2400 W, pero no necesariamente peor. Para cabello fino o corto, 1600-2000 W son suficientes. Para cabello largo y denso, 2000-2400 W reducen el tiempo de forma notable. Los secadores de viaje suelen tener 1000-1600 W para reducir tamaño y peso.",
        list: [
          "Cabello fino o corto: 1600-2000 W",
          "Cabello largo o denso: 2000-2400 W",
          "Viajes y uso ocasional: 1000-1600 W plegable",
        ],
      },
      {
        heading: "Motor de CA vs CC: la diferencia que dura años",
        body: "Los secadores baratos tienen motores de corriente continua (CC): son más ligeros y silenciosos al principio, pero se degradan antes. Los motores de corriente alterna (CA), típicos de modelos profesionales, duran 3-5 veces más y mantienen constante el flujo de aire. Un secador con motor CA de 60 € durará más que uno con motor CC de 40 €. Si usas el secador a diario, el motor CA es una inversión que se rentabiliza.",
      },
      {
        heading: "Tecnología iónica: menos frizz, más brillo",
        body: "Los iones negativos que emiten los secadores iónicos contrarrestan la carga estática del cabello, reducen el encrespamiento y aportan más brillo. La diferencia es especialmente visible en cabellos teñidos, dañados o muy rizados. Los modelos baratos dicen ser 'iónicos' con resultados mínimos; los que tienen generadores de iones reales (Remington, Rowenta gama alta, Dyson) marcan diferencia perceptible. No es marketing puro, pero sí varía mucho entre marcas.",
      },
      {
        heading: "Difusores y concentradores: para qué sirven",
        body: "El concentrador estrecho dirige el flujo de aire en línea recta: ideal para alisar o dar forma a secciones concretas con cepillo redondo. El difusor distribuye el aire en un radio amplio con poca presión directa: esencial para cabellos rizados o con ondas naturales que no quieres alterar con la fuerza del chorro. Muchos secadores incluyen ambos accesorios; si no, se pueden comprar por separado.",
      },
      {
        heading: "Temperatura y velocidad: cuántos ajustes son útiles",
        body: "La mayoría de secadores tienen 2-3 temperaturas y 2 velocidades. La función de aire frío final es más útil de lo que parece: cerrar la cutícula del cabello con aire frío después del secado aporta brillo y fija el estilo. Con 2 temperaturas (alta para secar rápido, baja para finalizar) y la función frío, tienes todo lo necesario. Más ajustes son comodidad, no necesidad.",
      },
      {
        heading: "Qué esperar por presupuesto",
        body: "Menos de 25 €: motor CC, sin iones reales, accesorios básicos; cumple para uso ocasional. Entre 25 y 60 €: motor CA o iones funcionales, difusor y concentrador incluidos; el mejor punto para uso diario. Entre 60 y 120 €: iones avanzados, motor de larga duración, accesorios de calidad. Más de 200 €: Dyson Supersonic y similares, con tecnología de motor ultrarrápido, menos daño térmico y acabado profesional.",
      },
    ],
  },
  {
    slug: "como-elegir-plancha-pelo",
    title: "Cómo Elegir Plancha de Pelo: Guía de Compra 2026",
    shortTitle: "Planchas de Pelo",
    description:
      "Placas de cerámica vs titanio, temperatura variable y tamaño de placa. Todo para elegir la plancha de pelo que alise o rice sin dañar tu cabello.",
    updatedAt: "mayo 2026",
    sectionSlug: "belleza",
    categorySlug: "planchas-pelo",
    categoryName: "Planchas de Pelo",
    intro:
      "Una plancha de pelo aplica calor directo sobre el cabello: a diferencia del secador, el margen de error es menor. Una temperatura demasiado alta o un material de placa equivocado deja el cabello quebradizo en semanas. Esta guía explica qué parámetros controlan el daño y cuánto tienes que gastar para que la diferencia sea real.",
    sections: [
      {
        heading: "Material de las placas: cerámica, titanio o turmalina",
        body: "Las placas cerámicas distribuyen el calor uniformemente, reducen el frizz y son las más suaves para el cabello cotidiano. Son el estándar para uso doméstico. Las placas de titanio se calientan más rápido y son más duraderas, pero transmiten calor más agresivo: indicadas para cabellos muy gruesos o muy rizados que necesitan más temperatura. Las placas de turmalina emiten iones negativos igual que los secadores iónicos, reduciendo el encrespamiento. Para la mayoría, la cerámica de calidad es suficiente.",
        list: [
          "Cabello fino, teñido o dañado: placas cerámicas a temperatura baja (150-180 °C)",
          "Cabello normal o grueso: cerámica a temperatura media (180-200 °C)",
          "Cabello muy grueso o resistente: titanio a temperatura alta (200-230 °C)",
        ],
      },
      {
        heading: "Temperatura variable: el ajuste más importante",
        body: "Las planchas baratas tienen temperatura fija a 200-230 °C. Las de gama media y alta permiten ajustar entre 150 y 230 °C. Para cabellos finos o teñidos, usar menos de 180 °C marca la diferencia en el daño acumulado a largo plazo. Si compras una plancha con temperatura fija, estás aplicando siempre la máxima temperatura aunque no la necesites. La temperatura variable no es un lujo sino el control básico sobre el daño.",
      },
      {
        heading: "Ancho de placa según tu tipo de cabello y uso",
        body: "Las placas estrechas (menos de 2 cm) son más precisas para hacer ondas, rizos o trabajar flequillos y secciones pequeñas. Las placas anchas (2.5-3.5 cm) cubren más cantidad de cabello por pasada y son más rápidas para alisado completo en cabellos largos. Para uso mixto (alisado + algo de forma), una placa de 2-2.5 cm es el equilibrio más versátil.",
      },
      {
        heading: "Tiempo de calentamiento y apagado automático",
        body: "Los modelos de gama alta se calientan en 20-30 segundos. Los básicos tardan 1-2 minutos. Más importante que el tiempo de calentamiento es el apagado automático: la mayoría de planchas modernas se apagan tras 30-60 minutos de inactividad. Es una función de seguridad real, no un extra.",
      },
      {
        heading: "Planchas para rizar: más versátiles de lo que parecen",
        body: "Las planchas de bordes redondeados permiten hacer ondas y rizos además de alisar, doblando el pelo sobre la placa en movimiento circular. Los rizadores (tenacillas) son más precisos para rizos definidos pero solo sirven para eso. Si quieres versatilidad, una plancha de bordes redondeados hace las dos cosas. Si solo rizas, una tenacilla del tamaño de barra adecuado da mejores resultados.",
      },
      {
        heading: "Qué esperar por presupuesto",
        body: "Menos de 20 €: temperatura fija, cerámica básica; funciona pero sin control sobre el daño. Entre 20 y 50 €: temperatura variable, cerámica de calidad, apagado automático; el punto de mejor relación calidad-cuidado. Entre 50 y 120 €: calentamiento rápido, placas flotantes para mejor contacto, control digital. Más de 150 €: ghd, BaByliss Gold y similares; temperatura optimizada automáticamente, materiales premium, durabilidad profesional.",
      },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function generateGuideStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}
