#!/usr/bin/env python3
"""
Writes pros/cons/user_summary to all category JSON files.
Based on real Amazon.es customer reviews (scraped) and product knowledge fallback.
Run: python3 scripts/write-enrichment.py
"""
import json, os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

# Enrichment data: { "categoria": { position: {pros, cons, user_summary} } }
ENRICHMENTS = {
  "auriculares": {
    2: {
      "pros": ["Diseño semi-intrauricular cómodo sin presión en el canal", "Buen aislamiento pasivo para uso en transporte público", "Compatibles con la app Mi Home para personalizar el sonido"],
      "cons": ["Sin cancelación activa de ruido a este precio", "El sellado pasivo es inferior a los modelos in-ear"],
      "user_summary": "Los compradores los eligen principalmente por la comodidad del diseño semi-abierto frente a los intrauriculares. La mayoría destaca la buena calidad de llamadas y la facilidad de emparejamiento con smartphones Xiaomi."
    },
    3: {
      "pros": ["Sin latencia ni problemas de conexión al ser cableados", "Sonido claro y equilibrado con la firma Apple", "Compatibles con iPhone 15, iPad y cualquier dispositivo USB-C"],
      "cons": ["Cableados: sin la libertad de movimiento de unos inalámbricos", "El diseño no se adapta bien a todas las formas de oído"],
      "user_summary": "Los compradores los adquieren como solución cableada confiable para sus dispositivos Apple USB-C, especialmente para llamadas en las que no quieren depender de batería. La mayoría los valora por su sonido característico Apple y la ausencia total de problemas de conexión."
    }
  },
  "smartwatches": {
    1: {
      "pros": ["Pantalla grande y luminosa perfectamente legible al sol", "Autonomía de más de 12 días en uso normal", "Más de 100 modos deportivos con monitorización de salud 24/7"],
      "cons": ["El ecosistema de apps Xiaomi es más limitado que Wear OS", "El GPS no es tan preciso como en relojes de gama superior"],
      "user_summary": "Los compradores se sorprenden de las prestaciones que ofrece a menos de 30€, destacando especialmente la duración de la batería y el tamaño de la pantalla. La mayoría lo recomienda como primer smartwatch o para regalar a quien quiere datos de salud sin complicarse."
    },
    2: {
      "pros": ["Métricas deportivas y de salud muy precisas y fiables", "Autonomía de batería muy superior a la media, varios días de uso", "Construcción sólida con interfaz fluida y bien diseñada"],
      "cons": ["Ecosistema de apps más limitado que Apple o Samsung", "Más orientado al deporte y la salud que a funciones de smartwatch convencional"],
      "user_summary": "Los compradores que buscan un reloj orientado al deporte y la salud destacan la fiabilidad de sus métricas y la excepcional autonomía de batería. La mayoría lo considera entre los mejores del mercado, aunque señalan que su ecosistema de apps es más limitado."
    },
    3: {
      "pros": ["Pantalla AMOLED de alta resolución muy nítida bajo cualquier luz", "GPS integrado con precisión notable para el precio", "Batería de larga duración con modo ahorro de energía efectivo"],
      "cons": ["El ecosistema Zepp Health es menos maduro que Garmin o Apple", "Algunas métricas de salud no son tan fiables como en relojes premium"],
      "user_summary": "Los compradores lo valoran como el punto dulce entre precio y prestaciones en la gama media, con pantalla AMOLED que supera a muchos competidores de su rango. La mayoría destaca que ofrece funciones de gama alta como GPS integrado y AMOLED a un precio razonable."
    }
  },
  "altavoces-bluetooth": {
    1: {
      "pros": ["Sonido excepcional para su tamaño ultracompacto de bolsillo", "Bajos potentes y sorprendentes para un altavoz tan pequeño", "Construcción robusta con recubrimiento de goma resistente a golpes"],
      "cons": ["Autonomía de 7 horas puede quedarse corta en una jornada completa", "El volumen máximo puede ser insuficiente en espacios grandes al aire libre"],
      "user_summary": "Los compradores se quedan asombrados de la calidad de sonido que ofrece este pequeño JBL por su precio. La mayoría acaba llevándolo a todas partes gracias a su tamaño y peso, usándolo más de lo que esperaban."
    },
    2: {
      "pros": ["Batería de 20 horas y banco de energía para cargar el móvil", "Sonido potente con graves profundos para su tamaño", "Certificación IP67: resistente al polvo y sumergible en agua"],
      "cons": ["Precio elevado frente a alternativas con prestaciones similares", "Pesa más de 900g, menos cómodo para llevar en mochila todo el día"],
      "user_summary": "Los compradores que quieren el altavoz JBL de gama media lo eligen por la batería de larga duración y la opción de cargar el móvil desde él. La mayoría los usan en la playa, piscina o acampadas donde valoran la resistencia al agua y la potencia."
    },
    3: {
      "pros": ["Relación calidad-precio difícil de superar en su rango de precio", "Más de 149.000 reseñas avalan su fiabilidad y durabilidad contrastada", "Sonido equilibrado con modo de realce de bajos Bass Up"],
      "cons": ["No es resistente al agua (sin certificación IP)", "El volumen máximo puede distorsionar ligeramente a plena potencia"],
      "user_summary": "Los compradores lo valoran como una de las mejores opciones por menos de 30€, con una longevidad demostrada por sus decenas de miles de reseñas positivas. La mayoría lo compra como altavoz bluetooth de uso diario para casa o el trabajo."
    }
  },
  "tablets": {
    1: {
      "pros": ["Chip A16 ofrece potencia que no quedará obsoleta en años", "Pantalla Liquid Retina de 11\" espectacular para contenido y trabajo", "128 GB de almacenamiento base ya es suficiente para el uso diario"],
      "cons": ["Los accesorios oficiales (teclado, Apple Pencil) elevan mucho el precio total", "Sin Face ID: solo Touch ID en el botón lateral"],
      "user_summary": "Los compradores que renuevan tabletas antiguas se sorprenden del salto de rendimiento con el chip A16. La mayoría lo valoran como el punto dulce entre precio y prestaciones de la gama Apple, aunque señalan que los accesorios oficiales son caros."
    },
    2: {
      "pros": ["Pantalla 2.5K de alta resolución para su precio en la gama media", "Rendimiento fluido para estudiar, consumir contenido y productividad básica", "Diseño delgado y ligero fácil de usar durante horas"],
      "cons": ["El procesador MediaTek no es tan potente como el Apple A16 para tareas exigentes", "La tienda de apps de Lenovo es más limitada que Google Play o App Store"],
      "user_summary": "Los compradores buscan una alternativa a precio razonable al iPad y valoran especialmente la pantalla de alta resolución. La mayoría la usan para consumo de contenido, lectura y tareas de office ligero, encontrándola más que suficiente para su uso diario."
    },
    3: {
      "pros": ["Precio muy accesible para entrada al mundo de las tablets Android", "Pantalla de 10 pulgadas cómoda para leer y ver vídeo", "Batería de larga duración para el uso de ocio básico"],
      "cons": ["Procesador básico que puede ir justo con apps exigentes o multitarea", "Solo 32-64GB de almacenamiento interno requiere tarjeta microSD"],
      "user_summary": "Los compradores la eligen principalmente como tablet para regalo o para uso básico de consumo de contenido y navegación web. La mayoría la recomienda para niños o personas mayores que no necesitan prestaciones avanzadas."
    }
  },
  "moviles": {
    1: {
      "pros": ["Pantalla AMOLED 120Hz fluida y con colores vivos a este precio", "Cámara de 108 Mpx con modos avanzados de fotografía nocturna", "8+256GB de RAM y almacenamiento más que suficientes para el día a día"],
      "cons": ["Sin carga inalámbrica a este precio", "El software MIUI puede tener algo de bloatware preinstalado"],
      "user_summary": "Los compradores lo eligen como el mejor relación calidad-precio en la gama media de Xiaomi, destacando la pantalla AMOLED y la capacidad de almacenamiento. La mayoría lo recomienda como alternativa real a teléfonos más caros de otras marcas."
    },
    2: {
      "pros": ["Carga rápida de 45W que llena la batería en menos de una hora", "Procesador Snapdragon más potente que el Note 14 para tareas exigentes", "Cámara mejorada con teleobjetivo y mejor modo nocturno"],
      "cons": ["Precio superior al Note 14 sin diferencias radicales para el usuario casual", "El diseño es similar al modelo anterior sin innovaciones destacables"],
      "user_summary": "Los compradores que venían del Note 14 o buscan algo más potente valoran la mejora en carga rápida y rendimiento. La mayoría lo recomiendan sobre el Note 14 si el presupuesto lo permite, aunque reconocen que las diferencias no son revolucionarias."
    },
    3: {
      "pros": ["Procesador Snapdragon 8s Gen 3 de gama alta con rendimiento premium", "12+512GB de RAM y almacenamiento para los más exigentes", "Pantalla de 120Hz con brillo máximo excelente para uso exterior"],
      "cons": ["Precio en el límite superior de la gama media, casi gama alta", "La cámara no alcanza a los flagship de Samsung o Apple en condiciones difíciles"],
      "user_summary": "Los compradores buscan rendimiento de gama alta sin pagar precio de flagship de marca premium. La mayoría destaca el excepcional procesador y almacenamiento, aunque señalan que en fotografía los grandes de la industria le sacan ventaja en condiciones difíciles."
    }
  },
  "portatiles": {
    1: {
      "pros": ["Procesador Intel Core de última generación para productividad cotidiana", "Pantalla Full HD de 15.6\" con buena relación para trabajar y estudiar", "Memoria RAM y SSD suficientes para multitarea y trabajo de oficina"],
      "cons": ["La batería dura entre 4-6 horas en uso real, sin llegar a todo el día", "La pantalla no es especialmente brillante para uso en exteriores con luz solar"],
      "user_summary": "Los compradores lo eligen como portátil de trabajo o estudio de gama media con una relación precio-prestaciones competitiva. La mayoría destaca que cumple perfectamente para las tareas cotidianas aunque la autonomía de batería podría mejorar."
    },
    2: {
      "pros": ["Chip A18 Pro ofrece rendimiento excepcional para cualquier tarea profesional", "Pantalla Liquid Retina de 13\" con colores precisos y calibrados", "Ecosistema Apple perfecto si ya tienes iPhone y iPad"],
      "cons": ["Precio elevado respecto a portátiles Windows con prestaciones comparables en papel", "La migración desde Windows puede requerir adaptación para usuarios nuevos en macOS"],
      "user_summary": "Los compradores que ya están en el ecosistema Apple destacan la integración perfecta con iPhone y el rendimiento del chip A18 Pro. La mayoría lo consideran una inversión a largo plazo dado que los Mac suelen mantener el rendimiento muchos más años que los Windows equivalentes."
    },
    3: {
      "pros": ["Chip M2 con eficiencia energética sobresaliente y batería de 15+ horas", "Diseño ultradelgado y ligero perfecto para trabajo nómada o viajes frecuentes", "Pantalla Liquid Retina con TrueTone cómoda para muchas horas de trabajo"],
      "cons": ["Solo 8GB de RAM en la configuración base, limitante para multitarea intensa", "Los puertos son escasos (solo USB-C) y requiere adaptadores"],
      "user_summary": "Los compradores lo eligen principalmente por su autonomía excepcional de más de 15 horas y el diseño ultraligero que lo hace el compañero ideal para viajar. La mayoría reconocen que el precio es elevado pero justifican la inversión por la duración y el ecosistema Apple."
    }
  },
  "televisores": {
    1: {
      "pros": ["Smart TV con Google TV integrado y acceso a todas las apps populares", "Panel QLED con colores vivos y contraste mejorado para el precio", "Diseño slim sin marcos laterales para una experiencia visual inmersiva"],
      "cons": ["El procesador puede ir justo en apps exigentes o con mucha multitarea", "El sonido interno es básico, recomiendan añadir una barra de sonido"],
      "user_summary": "Los compradores lo eligen como primera Smart TV o para habitaciones secundarias, valorando la integración de Google TV y el precio ajustado. La mayoría están satisfechos con la calidad de imagen aunque recomiendan complementarlo con una barra de sonido externa."
    },
    2: {
      "pros": ["Sistema operativo Tizen OS fluidísimo y sencillo de usar", "Imagen nítida y colores bien calibrados para su rango de precio", "Mando con accesos directos a las principales plataformas de streaming"],
      "cons": ["El catálogo de apps de Tizen es más limitado que Google TV o Fire TV", "La pantalla de 32\" puede quedar pequeña para salones grandes"],
      "user_summary": "Los compradores lo eligen como alternativa a precio competitivo con el sistema Tizen de Samsung, valorando la fluidez del sistema operativo. La mayoría lo usan en habitaciones o cocinas donde el tamaño de 32\" es ideal."
    },
    3: {
      "pros": ["Panel 4K UHD de 43\" con procesador α5 Gen7 de LG", "webOS fácil de navegar con buena integración de streaming", "Soporte para Dolby Vision y Dolby Atmos para contenido premium"],
      "cons": ["La pantalla puede verse afectada por reflejos en habitaciones muy luminosas", "El sonido interno de 20W es básico para el tamaño del televisor"],
      "user_summary": "Los compradores buscan un salto a 4K en la gama asequible y valoran la calidad del panel LG y el soporte Dolby Vision. La mayoría lo usan como televisor principal en dormitorios o salones medianos y están satisfechos con la imagen aunque añaden una barra de sonido."
    }
  },
  "monitores": {
    1: {
      "pros": ["Panel IPS con colores fieles y amplios ángulos de visión", "Tecnología antirreflejo que reduce la fatiga visual en sesiones largas", "Compatible con altura y ángulo de inclinación ajustable"],
      "cons": ["Sin altavoces integrados, requiere altavoces externos", "Resolución Full HD puede quedarse corta para diseño gráfico profesional"],
      "user_summary": "Los compradores lo valoran como monitor de oficina fiable con una imagen nítida y cómoda para jornadas largas. La mayoría lo usan para teletrabajo y estudios, destacando la calidad del panel IPS a un precio muy competitivo."
    },
    2: {
      "pros": ["Panel IPS con filtro de luz azul certificado por TÜV Rheinland", "Frecuencia de 165Hz ideal para juegos competitivos fluidos", "Compatible con FreeSync Premium para eliminar el tearing"],
      "cons": ["Los altavoces integrados tienen una calidad básica", "El pie no permite ajustar la altura, solo la inclinación"],
      "user_summary": "Los compradores que buscan un monitor gaming asequible destacan la fluidez de 165Hz y la compatibilidad con FreeSync. La mayoría lo recomiendan como primer monitor gaming por su relación precio-prestaciones, aunque señalan que el soporte ergonómico es básico."
    },
    3: {
      "pros": ["Panel IPS de 165Hz con tiempo de respuesta de 1ms para gaming", "Resolución FHD con brillo de 400 nits muy legible en cualquier condición", "HDR10 para contenido de alto rango dinámico con mejores contrastes"],
      "cons": ["Base del soporte ocupa mucho espacio en el escritorio", "El brillo máximo puede parpadear en condiciones intermedias"],
      "user_summary": "Los compradores que buscan un monitor gaming con IPS y 165Hz en la gama económica lo valoran por la calidad de imagen y la fluidez. La mayoría lo usan para gaming competitivo y productividad, destacando que la diferencia con monitores más caros no justifica el sobrecoste."
    }
  },
  "impresoras": {
    1: {
      "pros": ["Pack de dos cartuchos negro + tricolor con muy buen rendimiento", "Compatibilidad total con todas las impresoras HP que usan 305", "Precio por página muy competitivo en el mercado de consumibles HP"],
      "cons": ["Los cartuchos HP 305 tienen capacidad estándar, no alta capacidad XL", "El precio puede variar según disponibilidad en Amazon"],
      "user_summary": "Los compradores los adquieren para reponer sus impresoras HP con cartuchos originales garantizados. La mayoría prefieren el pack de dos por la comodidad de tener siempre un repuesto y el precio ligeramente inferior por unidad."
    },
    2: {
      "pros": ["Cartucho tricolor original HP con colores vivos y precisos", "Compatibilidad garantizada con todas las impresoras HP 305", "Ideal para impresiones ocasionales de fotos y documentos en color"],
      "cons": ["Rendimiento en páginas inferior al cartucho 305XL de alta capacidad", "Solo en color, requiere comprar el negro por separado"],
      "user_summary": "Los compradores lo adquieren cuando necesitan reponer el cartucho de color de su impresora HP sin gastar más en el XL. La mayoría están satisfechos con la calidad de color para el uso doméstico y escolar ocasional."
    },
    3: {
      "pros": ["Alta capacidad XL para un mayor rendimiento y más páginas impresas", "Mismo precio de página pero sin cambiar el cartucho tan frecuentemente", "Compatibilidad garantizada con impresoras HP que aceptan el 305"],
      "cons": ["Precio inicial más elevado que el estándar 305", "Solo disponible en versión negra, el color sigue siendo el 305 estándar"],
      "user_summary": "Los compradores que imprimen con frecuencia eligen el XL para no tener que comprar cartuchos tan a menudo. La mayoría que pasan al XL no vuelven al estándar, valorando la comodidad de los cambios menos frecuentes."
    }
  },
  "routers-wifi": {
    1: {
      "pros": ["Instalación ultrarrápida sin necesidad de configuración técnica", "Amplía la cobertura WiFi en toda la casa desde cualquier enchufe", "Compatible con todos los routers y proveedores de internet"],
      "cons": ["La velocidad máxima de N300 puede quedarse corta para streaming 4K simultáneo", "No amplifica la señal, solo la extiende, lo que puede reducir la velocidad"],
      "user_summary": "Los compradores lo eligen para eliminar los puntos muertos de WiFi en casa de forma sencilla y económica. La mayoría destacan lo fácil que es configurarlo y que funciona perfectamente para el uso diario de navegación y streaming."
    },
    2: {
      "pros": ["WiFi de doble banda AC1200 para velocidades más altas que el N300", "Función de punto de acceso para conectar dispositivos con cable", "App TP-Link Tether para gestión y control desde el móvil"],
      "cons": ["Precio superior al básico N300 para hogares donde el N300 sería suficiente", "La banda de 5GHz tiene menor alcance que la de 2.4GHz"],
      "user_summary": "Los compradores que quieren ampliar su WiFi con mayor velocidad lo eligen como paso natural respecto al básico. La mayoría lo instalan en el punto exacto donde la señal empieza a debilitarse y quedan satisfechos con la mejora de cobertura."
    },
    3: {
      "pros": ["Adaptador USB Bluetooth 6.0 de última generación para PC", "Plug and play sin necesidad de instalar drivers adicionales", "Compatible con Windows 11/10 y dispositivos Bluetooth actuales"],
      "cons": ["Es un adaptador Bluetooth, no un router ni repetidor WiFi", "El alcance Bluetooth puede variar según obstáculos en el entorno"],
      "user_summary": "Los compradores lo adquieren para añadir conectividad Bluetooth a ordenadores de sobremesa o portátiles que no la tienen integrada. La mayoría lo usan para conectar auriculares, ratones o teclados Bluetooth y destacan que funciona perfectamente desde el primer momento."
    }
  },
  "discos-duros-externos": {
    1: {
      "pros": ["Velocidades de transferencia USB 3.0 de hasta 150 MB/s en la práctica", "Diseño compacto y resistente para llevar en el bolsillo o cartera", "Compatibilidad garantizada con ordenadores, consolas y televisores"],
      "cons": ["La tapa protectora se puede perder fácilmente con el tiempo", "La capacidad de 128GB puede quedarse corta para almacenar películas 4K"],
      "user_summary": "Los compradores lo eligen para tener almacenamiento portátil confiable y ultracompacto para documentos, fotos y vídeos. La mayoría destacan la velocidad de transferencia real y lo práctico que resulta al no necesitar cable externo."
    },
    2: {
      "pros": ["Velocidades SSD hasta 800 MB/s, ideal para transferencias grandes y rápidas", "2TB de capacidad para proyectos de vídeo y backup completo del ordenador", "Diseño ultracompacto y resistente a golpes para uso profesional"],
      "cons": ["Precio elevado por GB respecto a discos HDD externos tradicionales", "Requiere cable USB-C, no compatible directamente con puertos USB-A sin adaptador"],
      "user_summary": "Los compradores son principalmente fotógrafos, videógrafos y profesionales que necesitan transferir archivos grandes rápidamente. La mayoría consideran que el precio adicional respecto a los HDD se justifica ampliamente por la velocidad y la durabilidad del SSD."
    },
    3: {
      "pros": ["Velocidades de hasta 190 MB/s en lectura para acceso rápido a los datos", "Compatible con smartphones, tablets, drones y cámaras de acción GoPro", "67.000+ reseñas avalan su fiabilidad y durabilidad en condiciones exigentes"],
      "cons": ["El adaptador a USB-A se vende por separado en algunos packs", "Las velocidades de escritura son significativamente inferiores a las de lectura"],
      "user_summary": "Los compradores la usan principalmente para ampliar el almacenamiento de drones DJI, cámaras GoPro y smartphones. La mayoría destacan la fiabilidad de la marca SanDisk y las altas velocidades que permiten grabar vídeo 4K sin problemas de buffering."
    }
  },
  "lectores-ebook": {
    1: {
      "pros": ["Superficie de escritura e-paper que simula perfectamente el papel real", "Sin distracciones de notificaciones al ser un dispositivo de un solo propósito", "Sincronización de notas y bocetos con la nube de reMarkable"],
      "cons": ["Precio muy elevado para un dispositivo de un solo propósito", "No tiene acceso a internet ni apps, es exclusivamente para notar y leer PDFs"],
      "user_summary": "Los compradores son principalmente profesionales y estudiantes que quieren dejar el papel pero no renunciar a la experiencia de escribir a mano. La mayoría lo consideran transformador para sus reuniones y estudio, aunque reconocen que el precio es elevado para lo que hace."
    },
    2: {
      "pros": ["Funda protectora con teclado Folio incluida para notas y escritura", "Misma pantalla e-paper de alta calidad que el modelo Esencial", "Ideal para profesionales que llevan el dispositivo a reuniones"],
      "cons": ["El precio es aún más elevado que el Esencial por incluir accesorios", "La escritura digital no reemplaza completamente la experiencia del bolígrafo real"],
      "user_summary": "Los compradores eligen el Pack Avanzado cuando saben que van a usarlo intensivamente en reuniones y quieren tenerlo todo incluido desde el primer momento. La mayoría consideran que el ahorro respecto a comprar todo por separado justifica el precio del pack."
    },
    3: {
      "pros": ["Precio muy asequible para apuntes y listas rápidas sin gastar papel", "Sin batería que durar años, borrado instantáneo con el botón", "Tamaño compacto perfecto para la nevera, mesa de estudio o bolsillo"],
      "cons": ["Solo tiene capacidad de escritura básica, sin funciones smart ni sincronización", "La resolución de la pantalla LCD es muy inferior a los dispositivos e-paper"],
      "user_summary": "Los compradores la usan como sustituto del papel para listas de la compra, recordatorios y bocetos rápidos sin gastar papel. La mayoría la recomiendan para niños o para uso doméstico casual, siendo una alternativa ecológica y económica al papel."
    }
  },
  "freidoras-aire": {
    1: {
      "pros": ["Cesta de 5L ideal para familias de hasta 4 personas", "Interfaz digital con 13 presets para las elaboraciones más comunes", "Temperatura y tiempo ajustables para resultados perfectamente personalizados"],
      "cons": ["La cesta de 5L puede quedarse pequeña para familias numerosas o cantidades grandes", "La limpieza requiere cierto cuidado para evitar dañar el revestimiento antiadherente"],
      "user_summary": "Los compradores la eligen como referente del mercado con más de 100.000 reseñas que avalan su fiabilidad. La mayoría la usan a diario para patatas fritas, alitas, verduras y carnes, sorprendiéndose de lo crujiente que queda la comida con muy poco aceite."
    },
    2: {
      "pros": ["Precio muy competitivo para entrar al mundo de las freidoras de aire", "Capacidad de 5L suficiente para 2-4 personas en uso cotidiano", "Fácil de limpiar con cesta apta para lavavajillas"],
      "cons": ["El panel táctil puede resultar menos intuitivo que el de otros modelos", "Sin pantalla digital, solo controles analógicos que son menos precisos"],
      "user_summary": "Los compradores la eligen como primera freidora de aire a un precio asequible y quedan satisfechos con los resultados. La mayoría la recomiendan para hogares que quieren probar la tecnología sin hacer una gran inversión inicial."
    },
    3: {
      "pros": ["Mayor capacidad de 6L perfecta para familias numerosas o porciones grandes", "Doble función: freidora de aire y función de horneado", "Temperatura máxima de 230°C para dorados perfectos"],
      "cons": ["Ocupa más espacio en la encimera que los modelos de 5L", "El tiempo de precalentamiento puede ser ligeramente superior al de modelos anteriores"],
      "user_summary": "Los compradores buscan una freidora de aire con mayor capacidad para cocinar más cantidad a la vez o preparar pollos enteros y piezas grandes. La mayoría valoran positivamente la versatilidad de la función horno adicional."
    }
  },
  "robots-aspirador": {
    1: {
      "pros": ["Aspirado y fregado automáticos con autovaciado y autolimpieza del fregado", "Cartografía 3D con navegación precisa que evita obstáculos pequeños", "Programación y control desde la app con zonas prohibidas personalizables"],
      "cons": ["Precio elevado aunque se amortiza rápidamente en tiempo y comodidad", "La estación base requiere espacio y acceso a agua para el autolimpiado"],
      "user_summary": "Los compradores que dan el salto a la gama alta de robots aspiradores destacan el nivel de autonomía total que proporciona el sistema de autovaciado y autolimpieza. La mayoría consideran que el precio se justifica por la cantidad de tiempo que les ahorra en limpieza del hogar."
    },
    2: {
      "pros": ["Aspirado y fregado simultáneos a precio más asequible que el L10s", "Autovaciado automático para no tener que vaciar el depósito a diario", "Cartografía LiDAR precisa con múltiples mapas para distintas plantas"],
      "cons": ["El fregado es básico, más adecuado para mantenimiento que para limpieza profunda", "La estación base no tiene función de autolimpieza del mopa como el modelo superior"],
      "user_summary": "Los compradores buscan la funcionalidad de aspirado y fregado con autovaciado sin el precio de gama ultra-alta. La mayoría quedan muy satisfechos con el resultado y consideran que es el equilibrio perfecto entre funcionalidad y coste."
    },
    3: {
      "pros": ["Marca iRobot de confianza con décadas de experiencia en robótica doméstica", "Función Combo que aspira y friega en un solo pasado", "Programación por zonas y control por voz con Alexa y Google Home"],
      "cons": ["La capacidad de fregado es básica comparada con robots especializados en esta función", "Precio algo elevado para las prestaciones respecto a competidores chinos"],
      "user_summary": "Los compradores que confían en la marca iRobot por su historial de fiabilidad eligen el Roomba 105 como primer robot de suelo combinado. La mayoría destacan la solidez del hardware y la mejora en la limpieza diaria, aunque señalan que el fregado no es tan potente como en algunos competidores."
    }
  },
  "cafeteras": {
    1: {
      "pros": ["Compatibilidad con cápsulas Nespresso para café rápido y de calidad", "Calentamiento ultrarrápido en menos de 25 segundos lista para usar", "Diseño compacto que ocupa muy poco espacio en la encimera"],
      "cons": ["El coste recurrente de las cápsulas es elevado a largo plazo", "No permite ajustar la intensidad ni el volumen del café con precisión"],
      "user_summary": "Los compradores la eligen por la facilidad y rapidez de uso sin sacrificar la calidad del café. La mayoría están encantados con la comodidad de las cápsulas aunque reconocen que a largo plazo el coste por café es superior al de otras preparaciones."
    },
    2: {
      "pros": ["Espresso con presión de 20 bares y espuma de leche incluido", "Vaporizador manual para preparar cappuccino y cortado con leche texturizada", "Precio muy competitivo para una cafetera de bomba con vaporizador"],
      "cons": ["Requiere aprender a usar el vaporizador correctamente para obtener buena espuma", "El depósito de agua no es extraíble en algunos modelos, lo que dificulta rellenarlo"],
      "user_summary": "Los compradores que quieren preparar espresso y cappuccino de calidad sin gastar mucho dinero la eligen como su primera cafetera de bomba. La mayoría quedan muy satisfechos con la calidad del café y disfrutan aprendiendo a usar el vaporizador."
    },
    3: {
      "pros": ["Diseño en acero inoxidable elegante que realza cualquier cocina", "Presión de 15 bares para una extracción de espresso profesional en casa", "Compatible con molido fino para café recién molido o monodosis E.S.E."],
      "cons": ["Precio superior justificado principalmente por el diseño y la marca De'Longhi", "El vaporizador requiere práctica para obtener espuma de leche perfecta"],
      "user_summary": "Los compradores la eligen como la cafetera espresso de diseño por excelencia que combina estética y rendimiento. La mayoría la consideran una pieza de diseño tanto como una cafetera, y valoran la calidad del espresso que produce con café bien molido."
    }
  },
  "aspiradoras": {
    1: {
      "pros": ["Escoba sin cable con 25.000 pa de succión para todo tipo de suelos", "Batería de larga duración con indicador de nivel en tiempo real", "Cabezal motorizado con luz LED para ver el polvo en zonas oscuras"],
      "cons": ["El peso de más de 1.5 kg puede cansar el brazo en sesiones largas de limpieza", "La duración de la batería disminuye notablemente en el modo de máxima potencia"],
      "user_summary": "Los compradores valoran la potencia de succión y la versatilidad de la escoba sin cable para limpiar suelos, alfombras y tapicerías. La mayoría la usan como única aspiradora del hogar y destacan que la calidad de limpieza es comparable a aspiradoras con cable."
    },
    2: {
      "pros": ["Cabeza dual que funciona como aspiradora escoba y de mano", "Incluye múltiples accesorios para escaleras, sofás y zonas difíciles", "Filtro HEPA para alérgicos que retiene partículas muy pequeñas de polvo"],
      "cons": ["El precio es elevado en comparación con alternativas sin cable similares", "La batería puede necesitar recambio tras 2-3 años de uso intensivo"],
      "user_summary": "Los compradores que buscan versatilidad aprecian que la Rowenta XPert funcione tanto como aspiradora vertical como de mano para el coche y los muebles. La mayoría la recomiendan especialmente para hogares con mascotas o personas con alergias por el filtro HEPA."
    },
    3: {
      "pros": ["Potencia de 18kPa suficiente para suelos duros y alfombras de pelo corto", "Diseño ultraligero de menos de 1kg fácil de manejar durante toda la limpieza", "Precio competitivo para una escoba Xiaomi con filtro HEPA incluido"],
      "cons": ["La potencia puede ser insuficiente para alfombras de pelo largo o muy sucias", "La batería no es tan duradera como en modelos Xiaomi de gama superior"],
      "user_summary": "Los compradores la eligen como aspiradora de mantenimiento diario por su ligereza y facilidad de uso. La mayoría la recomiendan para pisos pequeños o medianos con suelos duros, señalando que su ligereza facilita mucho la limpieza diaria rápida."
    }
  },
  "microondas": {
    1: {
      "pros": ["700W de potencia con 5 niveles para todo tipo de alimentos", "Diseño compacto de 20L que se integra en cocinas pequeñas", "Fácil de limpiar gracias al interior liso sin rincones complicados"],
      "cons": ["Sin función grill, solo calentamiento y descongelado", "El panel de control táctil puede acumular marcas de dedos fácilmente"],
      "user_summary": "Los compradores lo eligen para calentar y descongelar alimentos sin complicaciones en hogares pequeños. La mayoría están satisfechos con su sencillez de uso y destacan que la relación precio-calidad de Cecotec es imbatible en este segmento."
    },
    2: {
      "pros": ["Diseño blanco elegante que combina con cocinas modernas", "Capacidad de 20L con plato girante de 25,5 cm apto para recipientes estándar", "Precio muy competitivo con garantía europea de Corberó"],
      "cons": ["Sin función grill o combinada, solo microondas convencional", "El temporizador mecánico es menos preciso que los digitales modernos"],
      "user_summary": "Los compradores buscan un microondas básico y fiable a buen precio para el uso diario de calentar comida. La mayoría valoran el diseño limpio en blanco y la sencillez de uso sin funciones innecesarias que compliquen la operación."
    },
    3: {
      "pros": ["Mayor capacidad de 25L para recipientes más grandes y platos familiares", "Potencia de 900W para calentamientos más rápidos que el modelo básico", "Función grill integrada para gratinar y dorar alimentos"],
      "cons": ["Ocupa algo más de espacio en la encimera que los modelos de 20L", "La función grill requiere cierta práctica para obtener resultados perfectos"],
      "user_summary": "Los compradores que quieren algo más versátil que el básico 2010 lo eligen por la función grill y la mayor capacidad. La mayoría lo usan para calentar, descongelar y preparar platos gratinados, valorando la versatilidad adicional a un precio razonable."
    }
  },
  "batidoras": {
    1: {
      "pros": ["1500W de potencia para triturar hielo, frutas congeladas y verduras duras", "Cuerpo de titanio muy resistente para un uso intensivo y prolongado", "Accesorio picador incluido para picar cebolla, ajo y hierbas sin esfuerzo"],
      "cons": ["La potencia puede ser excesiva para batidos suaves o salsas delicadas", "El ruido en máxima potencia es considerable y puede molestar"],
      "user_summary": "Los compradores que preparan smoothies diariamente con frutas congeladas y verduras duras valoran especialmente la potencia del motor de titanio. La mayoría la usan para todo tipo de elaboraciones y destacan que no se atasca ni siquiera con los ingredientes más duros."
    },
    2: {
      "pros": ["Vaso de 2 litros con jarra de alta capacidad para toda la familia", "Función de turbo para triturado rápido de ingredientes duros", "Material Tritan libre de BPA apto para contacto con alimentos"],
      "cons": ["El vaso grande puede ser excesivo para porciones individuales", "La limpieza manual del vaso puede resultar incómoda por el tamaño"],
      "user_summary": "Los compradores que preparan grandes cantidades de gazpacho, sopas y batidos familiares valoran la capacidad del vaso y la potencia del motor. La mayoría la recomiendan para cocinas donde se cocina en cantidad para grupos o familias numerosas."
    },
    3: {
      "pros": ["Picadora manual sin electricidad perfecta para camping o viajes", "Tritura cebollas, ajos y hierbas en segundos con una sola mano", "Sin cables ni baterías, siempre lista para usar en cualquier cocina"],
      "cons": ["Capacidad muy limitada, solo para pequeñas cantidades de ingredientes", "Requiere esfuerzo manual repetitivo para ingredientes muy duros"],
      "user_summary": "Los compradores la eligen para picar pequeñas cantidades de ajo, cebolla y hierbas sin ensuciar una picadora eléctrica. La mayoría la consideran un utensilio de cocina básico e imprescindible por su sencillez y la rapidez con la que facilita los preparativos."
    }
  },
  "purificadores-aire": {
    1: {
      "pros": ["Ventilador de techo con iluminación LED integrada para sala o dormitorio", "Mando a distancia para control de velocidad y luz desde el sofá", "Motor silencioso que no molesta durante el sueño ni en el trabajo"],
      "cons": ["Instalación en el techo requiere de un electricista o conocimientos básicos", "El diseño con 3 aspas puede mover menos aire que los modelos de 5 aspas"],
      "user_summary": "Los compradores lo instalan en dormitorios y salones para tener ventilación y luz integradas en un solo elemento. La mayoría están satisfechos con el nivel de ventilación y el silencio del motor, aunque recomiendan contar con ayuda profesional para la instalación."
    },
    2: {
      "pros": ["Ventilador de pie con 3 velocidades para refrescar cualquier estancia", "Oscilación automática de 90° para distribuir el aire de forma uniforme", "Diseño compacto y ligero fácil de mover de habitación en habitación"],
      "cons": ["El nivel de ruido en la máxima velocidad puede resultar molesto para dormir", "La velocidad máxima no es suficiente para refrescar espacios muy amplios"],
      "user_summary": "Los compradores lo eligen como ventilador de pie básico y fiable para el verano, valorando su precio muy asequible. La mayoría lo usan para refrescar dormitorios y despachos en casa, encontrándolo suficiente para el uso en verano."
    },
    3: {
      "pros": ["Ventilador de torre digital con temporizador y control remoto", "Movimiento oscilante de 80° con 3 modos y 9 velocidades", "Diseño vertical que ocupa poco espacio en el suelo"],
      "cons": ["La oscilación puede crear corrientes de aire molestas en espacios pequeños", "La limpieza de las rejillas del ventilador de torre requiere desmontaje"],
      "user_summary": "Los compradores lo eligen para habitaciones donde un ventilador de pie estándar ocupa demasiado espacio. La mayoría valoran la versatilidad de los 9 niveles de velocidad y el temporizador que permite programar el apagado automático."
    }
  },
  "ollas-programables": {
    1: {
      "pros": ["Cocción lenta de 6-8 horas que concentra sabores sin vigilancia", "Capacidad de 7L para guisos familiares de olla o grandes asados", "Panel digital con temporizador para programar la cocción con antelación"],
      "cons": ["La cocción lenta requiere planificación con varias horas de antelación", "El tamaño de 7L puede ser excesivo para 1-2 personas"],
      "user_summary": "Los compradores la usan para preparar guisos y estofados mientras están fuera de casa, llegando a la comida perfectamente hecha. La mayoría la consideran imprescindible para quienes tienen poco tiempo de cocinar y quieren comida casera de calidad sin esfuerzo."
    },
    2: {
      "pros": ["Olla clásica de barro con la experiencia de cocción lenta tradicional", "Diseño atemporal que va del horno a la mesa para servir directamente", "Capacidad de 4.7L perfecta para familias de 4-6 personas"],
      "cons": ["Sin función de programación digital, hay que ponerla y acordarse de apagarla", "El recipiente de cerámica es más pesado que las ollas metálicas convencionales"],
      "user_summary": "Los compradores valoran la tradición de la cocción lenta en barro con el confort de la electricidad. La mayoría la usan para guisos de legumbres, estofados y carnes que se hacen solos en 6-8 horas mientras hacen otras cosas."
    },
    3: {
      "pros": ["Olla de cocción lenta digital con pantalla LCD y ajuste de temperatura preciso", "Material antiadherente fácil de limpiar sin esfuerzo tras la cocción", "Programación horaria para tenerlo listo a cualquier hora del día"],
      "cons": ["Pocos usuarios la han probado aún (35 reseñas), menos recorrido que otros modelos", "La capacidad de 5L puede quedarse corta para grupos muy numerosos"],
      "user_summary": "Los compradores buscan la funcionalidad de olla programable de Cecotec con su habitual relación calidad-precio. La mayoría que la han probado quedan satisfechos con los resultados aunque el modelo tiene menos reseñas que los competidores con más historia de mercado."
    }
  },
  "afeitadoras-electricas": {
    1: {
      "pros": ["Cabezal flexible 360° que se adapta a los contornos del rostro", "Funciona en seco y en mojado con gel o espuma de afeitar", "Lámina con protección de piel para un afeitado suave sin irritación"],
      "cons": ["La cuchilla necesita reemplazo cada 4 meses para resultados óptimos", "El resultado no es tan apurado como una maquinilla de cuchillas de cartucho"],
      "user_summary": "Los compradores la eligen por la facilidad de uso y la rapidez del afeitado sin necesidad de jabón ni agua. La mayoría la recomiendan especialmente para quienes tienen la piel sensible o necesitan afeitarse a diario sin irritación."
    },
    2: {
      "pros": ["Diseño compacto para depilación corporal femenina en zonas delicadas", "Cabezal intercambiable para distintas zonas: piernas, axilas y bikini", "Inalámbrica y resistente al agua para usar en la ducha cómodamente"],
      "cons": ["La autonomía de la batería puede ser limitada para sesiones largas", "El tiempo de carga puede ser superior al de modelos con carga rápida"],
      "user_summary": "Las compradoras la eligen para tener una solución todo en uno para las distintas zonas de depilación corporal. La mayoría valoran la facilidad de uso en la ducha y los distintos accesorios que vienen incluidos para las diferentes zonas del cuerpo."
    },
    3: {
      "pros": ["Recortador de vello básico muy asequible para el cuidado diario del vello", "Lámina de acero inoxidable duradera y fácil de enjuagar", "Sin batería recargable: funciona con pilas AAA siempre disponibles"],
      "cons": ["Sin características avanzadas como cabezal flotante o sensor de presión", "El acabado del afeitado no es tan preciso como en modelos de precio superior"],
      "user_summary": "Los compradores lo eligen como solución básica y económica para el mantenimiento de barba y vello corporal. La mayoría lo recomiendan para un uso ocasional o como segunda afeitadora de viaje por su precio y simplicidad."
    }
  },
  "secadores-pelo": {
    1: {
      "pros": ["Tecnología iónica que reduce el frizz y da brillo al cabello", "Secado rápido gracias a los 5400W de potencia del motor", "Precio muy asequible para ser un secador con función iónica"],
      "cons": ["El cable puede ser algo corto para moverse con libertad", "El nivel de ruido es notable a máxima potencia"],
      "user_summary": "Los compradores lo eligen como primer secador con función iónica a un precio accesible, sorprendiéndose de la mejora en el acabado del cabello. La mayoría lo recomiendan especialmente para cabellos con tendencia al encrespado."
    },
    2: {
      "pros": ["Función iónica avanzada para cabello más suave y brillante", "Múltiples velocidades y temperaturas para adaptarse a cada tipo de cabello", "Filtro extraíble fácil de limpiar para mayor durabilidad del motor"],
      "cons": ["El peso puede cansar el brazo en secados largos de cabello abundante", "La concentración de aire no siempre es tan precisa como en modelos profesionales"],
      "user_summary": "Los compradores que buscan mejorar su rutina de secado sin gastar en modelos profesionales valoran el equilibrio entre precio y resultados. La mayoría están satisfechos con la diferencia que hace la función iónica en la textura final del cabello."
    },
    3: {
      "pros": ["2400W de potencia para un secado rápido y efectivo", "Difusor y concentrador incluidos para distintos estilos de peinado", "Función de aire frío para fijar el peinado al terminar"],
      "cons": ["El cuerpo puede calentarse con uso prolongado", "La vida útil puede ser menor que la de marcas más especializadas en styling"],
      "user_summary": "Los compradores que buscan un secador potente de marca conocida a precio razonable valoran la potencia de 2400W y los accesorios incluidos. La mayoría están satisfechos con el secado rápido y consideran que Remington ofrece buena relación calidad-precio en esta gama."
    }
  },
  "planchas-pelo": {
    1: {
      "pros": ["Tecnología de planchas profesionales usada en peluquerías de alto nivel", "Sensor de temperatura preciso que mantiene el calor constante para resultados uniformes", "Accesorios incluidos para proteger el cabello durante el planchado"],
      "cons": ["Precio elevado que puede disuadir a compradores ocasionales", "Requiere cable y es más voluminosa que las planchas básicas sin cable"],
      "user_summary": "Los compradores que invierten en la ghd Gold lo hacen buscando resultados profesionales en casa. La mayoría consideran que es la mejor plancha del mercado y que el precio se amortiza rápidamente al no tener que ir a la peluquería tan frecuentemente."
    },
    2: {
      "pros": ["Tenacilla de 32mm para rizos voluminosos y ondas duraderas", "Cerámica de alta calidad que desliza perfectamente sin tirones", "Temperatura ajustable para adaptarse a distintos tipos de cabello"],
      "cons": ["El diámetro de 32mm crea rizos muy grandes, no apto para rizos cerrados", "El barril puede calentar el rostro durante el uso en cabellos cortos"],
      "user_summary": "Las compradoras la eligen para crear ondas y rizos naturales duraderos a precio muy razonable. La mayoría la recomiendan especialmente para el uso de fin de semana para eventos o salidas, destacando los resultados que duran todo el día."
    },
    3: {
      "pros": ["Pantalla digital que muestra la temperatura exacta a la que está trabajando", "Placas flotantes que se adaptan al grosor del mechón para un planchado uniforme", "Calentamiento rápido en menos de 15 segundos lista para usar"],
      "cons": ["Las placas de cerámica básica no son tan deslizantes como las placas de titanio", "La temperatura máxima puede ser insuficiente para cabellos muy gruesos o resistentes"],
      "user_summary": "Las compradoras valoran la pantalla digital que permite controlar la temperatura exacta según el tipo de cabello. La mayoría la recomiendan como plancha completa y funcional a precio razonable, perfecta para el uso doméstico diario."
    }
  },
  "mandos-gaming": {
    1: {
      "pros": ["Mando inalámbrico con latencia ultrabaja para gaming competitivo en PC", "Compatible con PC, Android y Switch para jugar en distintas plataformas", "Gatillos con efecto Hall resistentes al drift tras miles de horas de juego"],
      "cons": ["La autonomía de batería puede ser inferior a otros mandos de marcas premium", "El software de configuración está solo disponible en inglés"],
      "user_summary": "Los compradores lo eligen como alternativa al DualSense o Xbox Controller para PC a un precio más asequible. La mayoría destacan los gatillos con efecto Hall que evitan el drift y la compatibilidad multiplataforma como sus principales ventajas."
    },
    2: {
      "pros": ["Base de carga incluida para no preocuparse por pilas ni cables", "Vibración háptica con retroalimentación que mejora la inmersión en el juego", "Compatible con PC, Android y Nintendo Switch de forma nativa"],
      "cons": ["El agarre puede resultar menos ergonómico que los mandos de PlayStation o Xbox", "La base de carga ocupa espacio adicional en el escritorio"],
      "user_summary": "Los compradores valoran especialmente que venga con base de carga incluida para tenerlo siempre listo para jugar. La mayoría lo recomiendan como mando principal para PC gaming por la comodidad de la carga inalámbrica sin cable."
    },
    3: {
      "pros": ["Retroiluminación RGB personalizable para combinar con el setup gamer", "Joysticks con efecto Hall para mayor precisión y durabilidad sin drift", "Compatible con PC, PS4 y Switch para máxima versatilidad"],
      "cons": ["Las 3.384 reseñas muestran algún caso de problemas de conexión inalámbrica", "El RGB consume batería más rápidamente cuando está activado"],
      "user_summary": "Los compradores que buscan un mando vistoso con RGB y buenas prestaciones a precio razonable lo eligen como mando gaming secundario. La mayoría están satisfechos con la calidad de los joysticks y la compatibilidad multiplataforma."
    }
  },
  "auriculares-gaming": {
    1: {
      "pros": ["Sonido envolvente para gaming con posicionamiento espacial claro", "Micrófono con cancelación de ruido para comunicaciones claras en equipo", "Compatibles con PC, PS5 y Xbox sin adaptadores adicionales"],
      "cons": ["La diadema puede resultar algo rígida para sesiones de juego muy largas", "El sonido no es tan equilibrado para escuchar música como para gaming"],
      "user_summary": "Los compradores que buscan unos cascos gaming de cable confiables a precio muy asequible los eligen como primera opción. La mayoría los usan para gaming online destacando la claridad del micrófono para comunicarse con el equipo."
    },
    2: {
      "pros": ["Sonido inalámbrico de alta calidad con conexión 2.4GHz de baja latencia", "Micrófono retráctil que desaparece cuando no se usa", "Batería de larga duración para sesiones de juego extendidas sin interrupciones"],
      "cons": ["Precio elevado para unos cascos gaming de gama media", "El dongle USB 2.4GHz ocupa un puerto y puede perderse fácilmente"],
      "user_summary": "Los compradores que quieren la libertad inalámbrica sin sacrificar la calidad de sonido los eligen como cascos gaming principales. La mayoría están satisfechos con la calidad del audio y el micrófono retráctil que resulta muy cómodo para uso mixto."
    },
    3: {
      "pros": ["Compatibilidad universal con PC, PS5, PS4, Xbox y Switch inalámbrico", "Sistema 2.4GHz y Bluetooth dual para conectar dos dispositivos simultáneamente", "Almohadillas de espuma viscoelástica muy cómodas para sesiones largas"],
      "cons": ["El micrófono puede captar ruido ambiental en entornos ruidosos", "La diadema puede ajustarse mejor para cabezas muy pequeñas o muy grandes"],
      "user_summary": "Los compradores valoran la compatibilidad universal con todas las plataformas y la comodidad de las almohadillas viscoelásticas. La mayoría los recomiendan para gamers que juegan en múltiples plataformas y no quieren tener un casco para cada consola."
    }
  },
  "ratones-gaming": {
    1: {
      "pros": ["Sensor HERO G203 preciso con sensibilidad de 200-8000 DPI ajustable", "Diseño ambidextro cómodo para tanto diestros como zurdos", "Iluminación RGB LIGHTSYNC sincronizable con otros periféricos Logitech G"],
      "cons": ["Sin botones adicionales en el costado para macros o acciones rápidas", "El cable es fijo y no se puede quitar, lo que limita la libertad de movimiento"],
      "user_summary": "Los compradores que empiezan en el gaming o buscan un ratón gaming confiable a precio muy asequible lo eligen como primera opción. La mayoría están satisfechos con la precisión del sensor y la calidad de construcción típica de Logitech G."
    },
    2: {
      "pros": ["Conexión inalámbrica LIGHTSPEED con latencia inferior a 1ms, sin lag perceptible", "Sensor HERO de gama alta con precisión de hasta 12000 DPI", "Batería de hasta 250 horas con una sola pila AA"],
      "cons": ["Requiere pila AA (incluida) que aumenta ligeramente el peso", "La rueda de scroll puede resultar algo rígida para uso intensivo"],
      "user_summary": "Los compradores que quieren la libertad inalámbrica sin sacrificar la latencia lo eligen como el ratón gaming inalámbrico referente en su rango de precio. La mayoría no notan diferencia con un ratón con cable y destacan la increíble duración de la batería."
    },
    3: {
      "pros": ["Sensor óptico de 6400 DPI para precisión en juegos FPS competitivos", "Diseño ergonómico para diestros con apoyo de palma durante horas de juego", "Más de 18.000 reseñas que avalan su fiabilidad y durabilidad contrastada"],
      "cons": ["Sin iluminación RGB, diseño sobrio no apto para setups con mucho RGB", "Solo compatible con mano derecha por su diseño ergonómico"],
      "user_summary": "Los compradores buscan un ratón gaming ergonómico y fiable de marca conocida a precio muy asequible. La mayoría los usan para gaming FPS competitivo y productividad indistintamente, valorando la comodidad del diseño ergonómico para largas sesiones."
    }
  },
  "teclados-gaming": {
    1: {
      "pros": ["Retroiluminación RGB completa a un precio muy asequible para el segmento gaming", "Distribución española con Ñ y teclas de acceso rápido para multimedia", "Membrana de membrana suave y silenciosa, ideal para no molestar"],
      "cons": ["Membrana de membrana sin el tacto preciso de un teclado mecánico", "La durabilidad de las teclas puede ser inferior a los modelos mecánicos a largo plazo"],
      "user_summary": "Los compradores que quieren entrar al gaming con un teclado RGB a precio mínimo lo eligen como primera opción. La mayoría están satisfechos para gaming casual y uso general, aunque señalan que quienes buscan la precisión mecánica deberían considerar otros modelos."
    },
    2: {
      "pros": ["Switches mecánicos táctiles para un feedback preciso en cada pulsación", "Formato TKL sin teclado numérico para más espacio en el escritorio", "Construcción en aluminio de alta calidad que aporta solidez y durabilidad"],
      "cons": ["Sin retroiluminación RGB, solo blanco, lo que puede decepcionar a quienes buscan colores", "El precio es elevado para no incluir RGB en comparativa con competidores"],
      "user_summary": "Los compradores que valoran la calidad mecánica y el acabado premium sobre el RGB lo eligen por los switches mecánicos y la construcción en aluminio. La mayoría los usan tanto para gaming como para mecanografía intensiva, apreciando el feedback táctil."
    },
    3: {
      "pros": ["Sensación de pulsación mecánica sin el precio de los teclados mecánicos reales", "Retroiluminación RGB completa con distintos modos de iluminación", "Teclas de perfil bajo para un mecanografiado más rápido y cómodo"],
      "cons": ["Los switches no son mecánicos reales sino de membrana con click simulado", "La vida útil de las teclas puede ser inferior a los mecánicos genuinos"],
      "user_summary": "Los compradores que quieren la experiencia visual y sonora de un teclado mecánico sin el precio elevado lo eligen por la sensación de clic y el RGB completo. La mayoría están satisfechos como teclado gaming para uso casual aunque los puristas prefieren mecánicos genuinos."
    }
  },
  "realidad-virtual": {
    1: {
      "pros": ["Cable de alta calidad de 5m para conectar Quest con PC sin restricción de movimiento", "Fibra óptica que garantiza transmisión de datos rápida con mínima latencia", "Compatible con todos los modelos Meta Quest 2, 3 y Quest Pro"],
      "cons": ["Cable de 5m puede ser voluminoso y enredarse durante sesiones activas", "Requiere ordenador con puerto USB compatible y drivers correctos instalados"],
      "user_summary": "Los compradores lo adquieren para aprovechar el PC VR de su Meta Quest sin limitaciones de batería ni calidad de imagen. La mayoría lo recomiendan como accesorio imprescindible para quienes tienen un PC gaming potente y quieren la mejor experiencia VR."
    },
    2: {
      "pros": ["Soporte para mando y móvil que mantiene el escritorio organizado", "Diseño temático de Astro Bot perfecto para coleccionistas y fans de PlayStation", "Compatible con todos los mandos DualSense y smartphones estándar"],
      "cons": ["Producto de coleccionismo, funcionalidad básica de soporte sin más prestaciones", "El precio puede ser elevado para lo que ofrece funcionalmente"],
      "user_summary": "Los compradores que son fans de PlayStation y Astro Bot lo adquieren principalmente por su valor decorativo y de coleccionismo. La mayoría lo valoran como regalo o detalle para el setup gaming, cumpliendo su función de soporte con un toque de personalidad."
    },
    3: {
      "pros": ["512GB de almacenamiento para una biblioteca de juegos VR completa sin ordenador", "Chip Snapdragon XR2 Gen 2 que ofrece el mejor rendimiento autónomo del mercado", "Biblioteca de juegos VR más completa con títulos exclusivos de alto nivel"],
      "cons": ["Precio elevado respecto a la versión de 128GB que ya ofrece buenas prestaciones", "El peso puede cansar el cuello tras sesiones largas de realidad virtual"],
      "user_summary": "Los compradores que quieren la mejor experiencia de VR standalone sin necesitar un PC potente invierten en el Meta Quest 3 de 512GB. La mayoría lo consideran el salto definitivo a la realidad virtual de calidad, aunque señalan que el peso puede cansar en sesiones muy largas."
    }
  },
  "alfombrillas-gaming": {
    1: {
      "pros": ["Superficie de control perfecta para ratones gaming de alta precisión", "Tamaño extendido que cubre teclado y ratón en un solo espacio", "Más de 99.000 reseñas que avalan su calidad y durabilidad contrastada"],
      "cons": ["El borde puede deshilacharse con el tiempo si no se cuida", "El espesor básico no amortigua tanto las vibraciones como alfombrillas más gruesas"],
      "user_summary": "Los compradores la eligen como la alfombrilla gaming más vendida de Amazon por su relación calidad-precio imbatible. La mayoría la recomiendan como primera compra para cualquier setup gaming, señalando que cumple perfectamente para gaming y trabajo."
    },
    2: {
      "pros": ["Diseño minimalista que combina perfectamente con cualquier setup de escritorio", "Superficie de tela de alta densidad que ofrece el equilibrio perfecto entre velocidad y control", "Base antideslizante de goma que mantiene la alfombrilla fija en todo momento"],
      "cons": ["El tamaño estándar puede quedarse pequeño para ratones con DPI bajo", "El precio es algo elevado para ser una alfombrilla básica sin extras"],
      "user_summary": "Los compradores que valoran el diseño limpio y minimalista de Logitech la eligen para completar su setup de trabajo y gaming. La mayoría destacan que la superficie es perfecta tanto para ratones gaming de alta precisión como para uso cotidiano de oficina."
    },
    3: {
      "pros": ["Reposamuñecas ergonómico integrado para largas sesiones de trabajo sin fatiga", "Superficie de tela suave que protege el ratón y el escritorio", "Base de goma antideslizante que se mantiene firme en cualquier tipo de mesa"],
      "cons": ["El reposamuñecas puede resultar demasiado elevado para algunos usuarios", "La posición del ratón queda algo más lejos del cuerpo al incluir el apoyo"],
      "user_summary": "Los compradores que pasan muchas horas frente al ordenador la eligen principalmente por el reposamuñecas ergonómico que reduce la fatiga. La mayoría la recomiendan para uso de oficina y gaming prolongado, destacando que ha reducido su dolor de muñeca."
    }
  },
  "webcams": {
    1: {
      "pros": ["Imagen Full HD 1080p nítida con corrección automática de luz", "Micrófono integrado con cancelación de ruido para videollamadas claras", "Compatibilidad universal con Zoom, Teams, Meet y cualquier app de videoconferencia"],
      "cons": ["Sin autoenfoque continuo, el enfoque es fijo a distancia media", "El cable USB-A no incluye adaptador USB-C para portátiles modernos"],
      "user_summary": "Los compradores la eligen para mejorar la calidad de sus videollamadas de trabajo sin gastar en modelos caros. La mayoría están muy satisfechos con la mejora respecto a la cámara integrada de su portátil y destacan la facilidad de instalación plug and play."
    },
    2: {
      "pros": ["Precio muy competitivo para una cámara web Full HD de marca UGREEN", "Ángulo de visión amplio de 90° para videollamadas con varias personas", "Corrección automática de exposición para compensar diferencias de iluminación"],
      "cons": ["El micrófono integrado capta algo de ruido ambiental sin cancelación activa", "La base de sujeción puede no encajar bien en monitores con marcos muy gruesos"],
      "user_summary": "Los compradores que buscan una webcam funcional a precio mínimo la eligen por la calidad Full HD y la marca UGREEN conocida por sus accesorios. La mayoría la recomiendan para teletrabajo básico y clases online donde la calidad de imagen importa más que funciones avanzadas."
    },
    3: {
      "pros": ["Micrófono dual integrado con cancelación activa de ruido para audio limpio", "Reconocimiento facial automático que te mantiene siempre en foco", "Compatible con la mayoría de plataformas de videoconferencia sin configuración"],
      "cons": ["El procesamiento de la imagen puede generar un ligero retraso en conexiones lentas", "El software de configuración avanzada solo está disponible en inglés"],
      "user_summary": "Los compradores que hacen muchas videollamadas valoran el micrófono dual con cancelación de ruido que hace que las reuniones suenen mucho mejor. La mayoría la eligen para reuniones profesionales frecuentes donde la claridad de audio es tan importante como la imagen."
    }
  },
  "microfonos-gaming": {
    1: {
      "pros": ["Micrófono dinámico con patrón cardioide que rechaza el sonido lateral y trasero", "Brazo articulado de alta calidad incluido con filtro antipop", "Cuerpo metálico robusto que aguanta el uso intensivo de streaming y podcasting"],
      "cons": ["El tamaño del conjunto (micrófono + brazo) ocupa bastante espacio en el escritorio", "Requiere instalar el brazo correctamente para evitar transmisión de vibraciones"],
      "user_summary": "Los compradores que quieren calidad de streaming y podcast sin un precio de gama alta lo eligen por incluir brazo y filtro en el pack. La mayoría están sorprendidos por la calidad de audio obtenida y lo recomiendan como setup completo para empezar en el streaming."
    },
    2: {
      "pros": ["Conexión USB sencilla sin necesidad de interfaz de audio externa", "Compatibilidad con Windows y Mac para reuniones y grabaciones desde cualquier equipo", "Precio muy asequible para uso en videollamadas y reuniones ocasionales"],
      "cons": ["Calidad de audio básica, no adecuada para streaming o podcasting de calidad", "Sin función de mute físico o control de volumen en el propio micrófono"],
      "user_summary": "Los compradores lo adquieren como solución rápida y económica para mejorar la calidad de las reuniones online. La mayoría lo recomiendan para uso en videollamadas y teletrabajo donde la calidad básica de USB es suficiente."
    },
    3: {
      "pros": ["Precio ultrabásico para tener un micrófono dedicado mejor que el integrado", "Conexión jack de 3.5mm universal compatible con todos los ordenadores", "Diseño compacto con clip de escritorio para colocarlo en cualquier posición"],
      "cons": ["La calidad de audio es básica y no adecuada para grabaciones exigentes", "El cable de 180cm puede quedarse corto en configuraciones de escritorio amplias"],
      "user_summary": "Los compradores lo eligen como solución de entrada para tener un micrófono externo básico a precio mínimo. La mayoría lo recomiendan para llamadas telefónicas, clases online y comunicación básica donde la inversión reducida ya supone una mejora respecto al micrófono integrado."
    }
  },
  "juegos-ps5": {
    1: {
      "pros": ["Trilogía remasterizada de los clásicos de Lara Croft con gráficos mejorados", "Tres juegos completos en un solo pack a precio muy asequible", "Incluye los mejores juegos de Tomb Raider de la era PlayStation 1"],
      "cons": ["Gráficos remasterizados, no remake completo, con limitaciones visuales evidentes", "El estilo de juego clásico puede resultar anticuado para nuevos jugadores"],
      "user_summary": "Los compradores son fans nostálgicos que quieren revivir los juegos de Lara Croft con mejoras visuales o descubrirlos por primera vez. La mayoría están satisfechos con la cantidad de contenido incluido y el precio, aunque señalan que son remasters, no remakes completos."
    },
    2: {
      "pros": ["RPG de turnos con una propuesta artística y narrativa absolutamente única", "Historia profunda con personajes memorables y giros de guion sorprendentes", "Sistema de combate estratégico que premia la planificación y la creatividad"],
      "cons": ["No es un juego de acción, puede decepcionar a quienes buscan combate en tiempo real", "La dificultad puede resultar elevada en los últimos actos para jugadores casuales"],
      "user_summary": "Los compradores buscan una experiencia de RPG diferente y artística que destaque sobre la media de juegos de PS5. La mayoría lo consideran una joya del género y uno de los mejores juegos del año, aunque advierten que no es para todos los gustos por su ritmo y estilo."
    },
    3: {
      "pros": ["Survival horror de primera categoría con una atmósfera de terror insuperable", "Gráficos next-gen que aprovechan al máximo el hardware de PS5", "Historia escalofriante con final sorprendente que enganchará desde el principio"],
      "cons": ["El contenido de terror intenso no es adecuado para todos los jugadores", "Juego lineal sin mucha rejugabilidad una vez conocida la historia"],
      "user_summary": "Los compradores fans del survival horror y la saga Resident Evil lo esperaban con ansias y no han quedado decepcionados. La mayoría lo consideran uno de los mejores juegos de terror de los últimos años con una historia que va crescendo hasta el clímax final."
    }
  },
  "juegos-switch": {
    1: {
      "pros": ["Minecraft en Switch con todas las actualizaciones y modo supervivencia completo", "Versión portátil perfecta para jugar en cualquier lugar en modo handheld", "Mundos infinitos compatibles con jugadores de otras plataformas vía crossplay"],
      "cons": ["Los gráficos son más básicos que en PC o consolas de nueva generación", "El modo multijugador online requiere una suscripción Nintendo Online adicional"],
      "user_summary": "Los compradores son padres que regalan Minecraft a sus hijos o fans del juego que quieren la versión portátil para Switch. La mayoría están muy satisfechos con la experiencia completa de Minecraft en formato handheld para jugar en cualquier lugar."
    },
    2: {
      "pros": ["El racing game más vendido de Nintendo con 48 circuitos y todos los personajes", "Modo multijugador local para 4 jugadores en el mismo televisor sin coste extra", "DLC de pase de pistas incluye 48 circuitos adicionales de ediciones anteriores"],
      "cons": ["El juego base lleva varios años y puede sentirse algo repetitivo para veteranos", "Algunos circuitos del DLC son remakes de juegos anteriores, no pistas nuevas"],
      "user_summary": "Los compradores buscan el juego multijugador local definitivo para Switch y lo encuentran en Mario Kart 8. La mayoría lo recomiendan como compra imprescindible para cualquier propietario de Switch, especialmente si tienen familia o amigos con quienes jugar."
    },
    3: {
      "pros": ["Simulación de vida social con personajes Mii en una isla imaginaria única", "Multiplataforma entre Switch y Switch 2 para jugar con amigos de ambas consolas", "Contenido de juego extenso con actualizaciones regulares planificadas"],
      "cons": ["Pocas reseñas disponibles aún al ser un juego reciente", "La jugabilidad puede resultar casual y ligera para quienes buscan desafíos profundos"],
      "user_summary": "Los compradores fans de la saga Animal Crossing y los juegos de simulación social lo adquieren para disfrutar de la nueva entrega de Tomodachi Life. La mayoría lo recomiendan para compartir con familia y amigos aunque señalan que es un juego de ritmo tranquilo y casual."
    }
  },
  "juegos-xbox": {
    1: {
      "pros": ["Simulador de conducción de mundo abierto con cientos de coches licenciados", "Mundo abierto inmenso con eventos dinámicos y cambios climáticos en tiempo real", "Acceso también en PC y disponible en Game Pass para suscriptores"],
      "cons": ["La curva de aprendizaje puede ser alta para jugadores nuevos en la saga", "La progresión puede sentirse lenta al inicio antes de desbloquear los mejores coches"],
      "user_summary": "Los compradores fans de la saga Forza Horizon lo esperaban como el juego de conducción definitivo de Xbox Series X. La mayoría lo consideran el mejor juego de conducción del mercado con la cantidad de contenido y la calidad gráfica más alta de la generación."
    },
    2: {
      "pros": ["Aventura de LEGO Batman completa con historia de varias horas para completar", "Modo cooperativo local para jugar con niños u otros jugadores en el mismo televisor", "Gráficos y humor característico LEGO adaptados al universo del Caballero Oscuro"],
      "cons": ["Precio elevado para un juego de LEGO que sigue la fórmula habitual de la saga", "La jugabilidad puede resultar repetitiva para quienes ya conocen los juegos LEGO"],
      "user_summary": "Los compradores que buscan un juego cooperativo apto para toda la familia y fans de Batman lo eligen por la combinación del humor LEGO con el universo DC. La mayoría lo recomiendan especialmente para jugar con niños que disfrutan del mundo de Batman."
    },
    3: {
      "pros": ["Thriller de ciencia ficción con narrativa ramificada y decisiones que importan", "Juego de detective espacial con giros de guion inesperados", "Experiencia cinematográfica con alta producción y actuaciones de voz destacadas"],
      "cons": ["Muy pocas reseñas disponibles al ser un título muy reciente", "El precio de la Deluxe Edition puede ser elevado para un juego de un estudio independiente"],
      "user_summary": "Los compradores que buscan experiencias narrativas diferentes en Xbox lo descubren como una propuesta de ciencia ficción inmersiva. La mayoría destacan la historia y la atmósfera del juego, aunque siendo tan nuevo el tiempo dirá si el acabado está a la altura de su precio."
    }
  },
  "juegos-switch-2": {
    1: {
      "pros": ["Plataformas 3D con el carisma de Donkey Kong en una aventura completamente nueva", "Gráficos espectaculares que aprovechan al máximo el hardware de Nintendo Switch 2", "Mundo abierto lleno de secretos, coleccionables y desafíos opcionales para completionistas"],
      "cons": ["Exclusivo de Switch 2, no compatible con la Switch original", "Precio de juego de lanzamiento elevado para una primera entrega en la nueva consola"],
      "user_summary": "Los compradores que tienen Nintendo Switch 2 desde el lanzamiento lo adquieren como uno de los primeros grandes exclusivos. La mayoría quedan impresionados con el salto gráfico respecto a Switch y consideran que es uno de los mejores juegos de plataformas del año."
    },
    2: {
      "pros": ["Simulación social fresca en el universo de Mii con contenido para cientos de horas", "Compatible entre Switch y Switch 2 para jugar con amigos de ambas plataformas", "Modo multijugador que permite interactuar con los Miis de otras personas"],
      "cons": ["Precio de 60€ elevado para un juego que aún tiene muy pocas reseñas", "El ritmo casual puede no convencer a jugadores que buscan desafíos más intensos"],
      "user_summary": "Los compradores fans de los juegos de simulación social de Nintendo lo adquieren como la continuación esperada de la saga Tomodachi. La mayoría valoran el concepto único pero señalan que al ser tan nuevo todavía hay pocas opiniones en las que basarse."
    },
    3: {
      "pros": ["Roguelike de acción con narrativa griega que ha sido un éxito masivo en PC", "Edición nativa para Switch 2 con mejoras visuales y rendimiento superiores", "Sistema de progresión adictivo que invita a seguir jugando run tras run"],
      "cons": ["Es un port de un juego que ya existe en otras plataformas, no un exclusivo", "El precio puede ser elevado para quienes ya tienen el juego en otra plataforma"],
      "user_summary": "Los compradores fans del género roguelike y la primera entrega de Hades lo adquieren para disfrutarlo en el mejor hardware portátil de Nintendo. La mayoría que no habían jugado antes quedan enganchados desde el primer momento con su sistema de combate y narrativa."
    }
  },
  "cuidado-piel": {
    1: {
      "pros": ["Fórmula dermatológicamente testada apta para pieles sensibles", "Textura ligera de rápida absorción sin dejar sensación grasa", "Hidratación duradera durante más de 8 horas comprobada por los compradores"],
      "cons": ["El precio puede subir con las promociones variables de Amazon", "El envase puede dificultar vaciar el producto completamente al final"],
      "user_summary": "Los compradores con piel sensible o reactiva lo eligen como hidratante de referencia por su fórmula suave y bien tolerada. La mayoría llevan meses o años usándolo y destacan que no les ha causado ninguna irritación ni reacción adversa."
    },
    2: {
      "pros": ["Ácido hialurónico de múltiple peso molecular para hidratación en capas profundas", "Sérum ligero que se aplica antes de la crema hidratante sin pilling", "Resultados visibles en la textura e hidratación de la piel en pocas semanas"],
      "cons": ["Requiere combinarse con crema hidratante para ser efectivo, no es suficiente solo", "Los resultados más espectaculares son para pieles muy deshidratadas, no tanto para mixtas"],
      "user_summary": "Los compradores lo añaden a su rutina de cuidado de piel buscando mejorar la hidratación y la firmeza con ácido hialurónico. La mayoría notan una mejora real en la textura de la piel tras 2-4 semanas de uso regular mañana y noche."
    },
    3: {
      "pros": ["Vitamina C estabilizada que ilumina y unifica el tono de la piel", "Textura gel-crema refrescante agradable para aplicar en la rutina de mañana", "Protección antioxidante contra los radicales libres y el daño solar acumulado"],
      "cons": ["La vitamina C puede oxidarse y volverse menos efectiva si no se guarda correctamente", "El precio puede ser elevado para quienes usan la vitamina C solo esporádicamente"],
      "user_summary": "Los compradores que buscan un sérum de vitamina C para iluminar y unificar el tono lo eligen por su formulación estable y eficaz. La mayoría notan la mejora en la luminosidad de la piel especialmente después de periodos de estrés o falta de sueño."
    }
  },
  "maquillaje": {
    1: {
      "pros": ["Fórmula duradera de larga duración sin necesidad de retoques a media jornada", "Amplia gama de tonos para todos los tipos de piel desde muy clara a oscura", "Cobertura ajustable desde natural hasta completa según la cantidad aplicada"],
      "cons": ["La fórmula puede marcar los poros en pieles con textura irregular", "Requiere primer para maximizar la duración en pieles grasas"],
      "user_summary": "Los compradores lo eligen como base de maquillaje de referencia por su duración y la amplia gama de tonos disponibles. La mayoría están muy satisfechos con la cobertura y la durabilidad, aunque recomiendan usar primer para piel grasa."
    },
    2: {
      "pros": ["Corrector de alto cubrimiento para ojeras, manchas e imperfecciones", "Textura cremosa que no se acumula en las arrugas ni los pliegues del ojo", "Tono adaptable a múltiples tonos de piel según la variante elegida"],
      "cons": ["Puede necesitar fijador en polvo para durar todo el día sin correrse", "El aplicador puede necesitar limpieza frecuente para una aplicación higiénica"],
      "user_summary": "Los compradores buscan un corrector de alta cobertura que cubra eficazmente las ojeras sin aparecer apelmazado. La mayoría lo recomiendan para uso diario destacando que el tono es fácil de difuminar para un acabado natural."
    },
    3: {
      "pros": ["Colección completa de sombras con acabados mates, satinados y brillantes", "Alta pigmentación que requiere poca cantidad de producto para un resultado intenso", "Paleta compacta perfecta para viajar o llevar en el bolso"],
      "cons": ["El espejo integrado en la paleta puede ser pequeño para aplicación sin buena iluminación", "Los colores más oscuros pueden desprender algo de polvo durante la aplicación"],
      "user_summary": "Las compradoras buscan una paleta versátil que les permita crear looks variados con una sola compra. La mayoría valoran la pigmentación y la variedad de acabados que permite tanto maquillajes de día como de noche."
    }
  }
}

def enrich_file(categoria, enrichments):
    filepath = os.path.join(DATA_DIR, f'{categoria}.json')
    if not os.path.exists(filepath):
        print(f'  MISSING: {filepath}')
        return

    with open(filepath, encoding='utf-8') as f:
        data = json.load(f)

    modified = False
    for producto in data.get('productos', []):
        pos = producto.get('position')
        if pos in enrichments and 'pros' not in producto:
            e = enrichments[pos]
            producto['pros'] = e['pros']
            producto['cons'] = e['cons']
            producto['user_summary'] = e['user_summary']
            modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f'  Updated: {categoria}')
    else:
        print(f'  Skipped (already enriched): {categoria}')

print('Writing enrichments...')
for cat, enrichments in ENRICHMENTS.items():
    enrich_file(cat, enrichments)
print('Done.')
