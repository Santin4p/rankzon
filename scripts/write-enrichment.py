#!/usr/bin/env python3
"""
Writes pros/cons/user_summary to all category JSON files.
Based on real Amazon.es customer reviews (scraped via Apify) and product knowledge.
Run: python3 scripts/write-enrichment.py
"""
import json, os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

# Enrichment data: { "categoria": { position: {pros, cons, user_summary} } }
# Updated 2026-05-30 with real Amazon.es review data from Apify + product knowledge.
ENRICHMENTS = {
  "auriculares": {
    1: {
      "pros": ["Batería de hasta 36 horas totales con estuche de carga", "Ultraligeros y cómodos, apenas se notan en el oído", "Conexión Bluetooth 5.4 instantánea y sin cortes", "Calidad de sonido sorprendente para su precio"],
      "cons": ["Sin cancelación activa de ruido a este precio", "El volumen máximo podría ser algo más alto"],
      "user_summary": "Los compradores se sorprenden de las prestaciones que ofrecen por su precio, destacando la batería de 36 horas y la comodidad. La mayoría los recomiendan como la mejor opción de auriculares TWS por menos de 15€."
    },
    2: {
      "pros": ["Graves potentes con driver de titanio de 14.2mm", "Batería de 37 horas con estuche de carga USB-C", "Conexión dual a 2 dispositivos simultáneamente", "Resistencia IP54 al agua y al sudor"],
      "cons": ["Cambiar entre dispositivos requiere resetear los auriculares", "Sin detector de presencia que pausa la música al quitarlos"],
      "user_summary": "Los compradores quedan sorprendidos por la calidad de sonido respecto a modelos anteriores Xiaomi y el gran salto en graves. La mayoría los recomiendan para deporte y uso diario por la resistencia al agua y la larga batería."
    },
    3: {
      "pros": ["Sin latencia ni cortes al ser cableados con USB-C", "Micrófono excelente para llamadas nítidas en cualquier situación", "Compatibles con iPhone 15, iPad y cualquier dispositivo USB-C"],
      "cons": ["Cableados: sin libertad de movimiento como unos inalámbricos", "El diseño no se adapta bien a todas las formas de oído"],
      "user_summary": "Los compradores los adquieren como solución cableada confiable para sus dispositivos Apple, especialmente para llamadas sin preocuparse por la batería. La mayoría los valoran por el sonido característico Apple y la ausencia total de problemas de conexión."
    }
  },
  "smartwatches": {
    1: {
      "pros": ["Pantalla LCD de 2\" grande y muy legible incluso al sol", "Batería de hasta 18 días de autonomía real", "Llamadas Bluetooth claras sin sacar el móvil del bolsillo", "Más de 140 modos deportivos con monitorización 24/7"],
      "cons": ["La caja es grande, puede resultar prominente en muñecas pequeñas", "El GPS requiere tener el móvil cerca para funcionar"],
      "user_summary": "Los compradores se sorprenden de las prestaciones que ofrece a menos de 40€, destacando especialmente la duración de batería y el tamaño de pantalla. La mayoría lo recomiendan como primer smartwatch o para regalar a quien quiere salud y conectividad sin complicarse."
    },
    2: {
      "pros": ["Batería de 1000mAh para una semana de uso real", "Pantalla grande y luminosa con diseño militar resistente", "100+ modos deportivos con monitor de salud completo", "Certificación IP68 para actividades acuáticas"],
      "cons": ["Marca genérica con ecosistema de apps más limitado", "La app de configuración puede resultar algo básica"],
      "user_summary": "Los compradores valoran la gran batería y la pantalla grande que se ve perfectamente en exteriores. La mayoría lo recomiendan como smartwatch práctico y resistente para uso deportivo y cotidiano a precio muy accesible."
    },
    3: {
      "pros": ["Pantalla AMOLED nítida con colores vivos bajo cualquier luz", "GPS integrado con mapas gratuitos para rutas sin móvil", "NFC para pagos y batería de 10 días con uso intensivo", "160+ modos deportivos con IA integrada Zepp"],
      "cons": ["La configuración del NFC para pagos es compleja via Curve", "La memoria interna es limitada para apps y esferas adicionales"],
      "user_summary": "Los compradores lo valoran como el punto dulce entre precio y prestaciones con pantalla AMOLED y GPS. La mayoría destacan que ofrece funciones de gama alta como GPS y AMOLED a un precio muy competitivo respecto a Garmin o Apple Watch."
    }
  },
  "altavoces-bluetooth": {
    1: {
      "pros": ["Sonido excepcional para su tamaño ultracompacto de bolsillo", "Bajos potentes y sorprendentes para un altavoz tan pequeño", "Construcción robusta con recubrimiento de goma resistente"],
      "cons": ["Autonomía de 7 horas puede quedarse corta en una jornada completa", "El volumen máximo puede ser insuficiente en espacios grandes al aire libre"],
      "user_summary": "Los compradores se quedan asombrados de la calidad de sonido que ofrece este pequeño JBL por su precio. La mayoría acaban llevándolo a todas partes gracias a su tamaño, usándolo más de lo que esperaban."
    },
    2: {
      "pros": ["Batería de 20 horas y función de banco de energía para cargar el móvil", "Sonido potente con graves profundos para su tamaño y peso", "Certificación IP67: resistente al polvo y sumergible en agua"],
      "cons": ["Precio elevado frente a alternativas con prestaciones similares", "Pesa más de 900g, menos cómodo para llevar en mochila todo el día"],
      "user_summary": "Los compradores que quieren el altavoz JBL de gama media lo eligen por la batería de larga duración y la opción de cargar el móvil. La mayoría los usan en la playa, piscina o acampadas donde valoran la resistencia al agua."
    },
    3: {
      "pros": ["Relación calidad-precio difícil de superar en su rango de precio", "Más de 149.000 reseñas avalan su fiabilidad y durabilidad", "Sonido equilibrado con modo Bass Up para más graves"],
      "cons": ["No es resistente al agua (sin certificación IP)", "El volumen máximo puede distorsionar ligeramente a plena potencia"],
      "user_summary": "Los compradores lo valoran como una de las mejores opciones por menos de 30€, con una longevidad demostrada. La mayoría lo compran como altavoz bluetooth de uso diario para casa o el trabajo."
    }
  },
  "aspiradoras": {
    1: {
      "pros": ["Potencia de succión sin cable para todo tipo de suelos y alfombras", "Diseño versátil que funciona como escoba y aspiradora de mano", "Cabezal con luz LED para ver el polvo en zonas oscuras"],
      "cons": ["El peso puede cansar el brazo en sesiones largas de limpieza", "La batería dura menos en el modo de máxima potencia"],
      "user_summary": "Los compradores valoran la potencia de succión y la versatilidad de la escoba sin cable. La mayoría la usan como única aspiradora del hogar y destacan que la calidad de limpieza es comparable a aspiradoras con cable."
    },
    2: {
      "pros": ["18kPa de succión con filtro HEPA para alérgicos", "Diseño ultraligero de menos de 1.5kg fácil de manejar", "Precio competitivo con la calidad reconocida de Xiaomi"],
      "cons": ["La potencia puede ser insuficiente para alfombras de pelo largo", "La batería no es tan duradera como en modelos Xiaomi de gama superior"],
      "user_summary": "Los compradores la eligen como aspiradora de mantenimiento diario por su ligereza y precio. La mayoría la recomiendan para pisos con suelos duros, señalando que la ligereza facilita la limpieza diaria rápida."
    },
    3: {
      "pros": ["Aspiradora escoba versátil con múltiples accesorios incluidos", "Filtro HEPA certificado para retener el polvo fino y alérgenos", "Marca Rowenta reconocida por su durabilidad y rendimiento"],
      "cons": ["Precio más elevado que alternativas chinas con potencia similar", "La batería puede necesitar recambio tras 2-3 años de uso intensivo"],
      "user_summary": "Los compradores que buscan una aspiradora escoba de marca fiable con filtro HEPA la eligen especialmente para hogares con mascotas o personas con alergias. La mayoría valoran la calidad de construcción y el filtrado superior de Rowenta."
    }
  },
  "auriculares-gaming": {
    1: {
      "pros": ["Sonido envolvente para gaming con posicionamiento espacial preciso", "Micrófono retráctil con cancelación de ruido para comunicaciones claras", "Compatibles con PC, PS5 y Xbox sin adaptadores adicionales"],
      "cons": ["La diadema puede resultar algo rígida para sesiones muy largas", "El sonido no es tan equilibrado para escuchar música como para gaming"],
      "user_summary": "Los compradores que buscan unos cascos gaming de cable confiables a precio muy asequible los eligen como primera opción. La mayoría los usan para gaming online destacando la claridad del micrófono para comunicarse con el equipo."
    },
    2: {
      "pros": ["Sonido inalámbrico de alta calidad con conexión de baja latencia", "Almohadillas premium muy cómodas para sesiones de gaming largas", "Batería de larga duración para partidas extendidas sin interrupciones"],
      "cons": ["Precio elevado para unos cascos gaming de gama media-alta", "El receptor USB ocupa un puerto y puede perderse fácilmente"],
      "user_summary": "Los compradores que quieren calidad de audio sin cables los eligen como cascos gaming principales. La mayoría están satisfechos con la calidad del sonido y el micrófono que resulta muy cómodo para uso mixto gaming y comunicación."
    },
    3: {
      "pros": ["Sonido envolvente 7.1 virtual para una experiencia gaming inmersiva", "Compatibilidad con PC, PS y Xbox en un solo auricular", "Almohadillas mullidas de espuma que no presionan el oído"],
      "cons": ["El micrófono puede captar ruido ambiental en entornos ruidosos", "La diadema puede ajustarse mejor para cabezas muy pequeñas o grandes"],
      "user_summary": "Los compradores valoran la compatibilidad universal con todas las plataformas y la comodidad de las almohadillas. La mayoría los recomiendan para gamers que juegan en múltiples plataformas y no quieren un casco para cada consola."
    }
  },
  "batidoras": {
    1: {
      "pros": ["1500W de potencia para triturar hielo, frutas congeladas y verduras duras", "Cuerpo de titanio muy resistente para uso intensivo y prolongado", "Accesorio picador incluido para picar cebolla, ajo y hierbas"],
      "cons": ["La potencia puede ser excesiva para batidos suaves o salsas delicadas", "El ruido a máxima potencia es considerable"],
      "user_summary": "Los compradores que preparan smoothies diariamente con frutas congeladas y verduras duras valoran especialmente la potencia del motor. La mayoría la usan para todo tipo de elaboraciones y destacan que no se atasca ni con los ingredientes más duros."
    },
    2: {
      "pros": ["Vaso de alta capacidad perfecto para batidos y gazpachos familiares", "Función turbo para triturado rápido de ingredientes duros", "Material libre de BPA apto para contacto con alimentos"],
      "cons": ["El vaso grande puede ser excesivo para porciones individuales", "La limpieza manual del vaso puede resultar incómoda por el tamaño"],
      "user_summary": "Los compradores que preparan grandes cantidades de gazpacho, sopas y batidos familiares valoran la capacidad y la potencia. La mayoría la recomiendan para cocinas donde se cocina en cantidad para grupos o familias numerosas."
    },
    3: {
      "pros": ["Picadora manual sin electricidad perfecta para cantidades pequeñas", "Tritura cebollas, ajos y hierbas en segundos con una sola mano", "Sin cables ni baterías, siempre lista para usar"],
      "cons": ["Capacidad muy limitada, solo para pequeñas cantidades de ingredientes", "Requiere esfuerzo manual repetitivo para ingredientes muy duros"],
      "user_summary": "Los compradores la eligen para picar pequeñas cantidades de ajo, cebolla y hierbas sin ensuciar una picadora eléctrica. La mayoría la consideran un utensilio de cocina imprescindible por su sencillez y rapidez en los preparativos."
    }
  },
  "cafeteras": {
    1: {
      "pros": ["Compatibilidad con cápsulas Nespresso para café rápido y consistente", "Calentamiento ultrarrápido en menos de 25 segundos", "Diseño compacto que ocupa muy poco espacio en la encimera"],
      "cons": ["El coste recurrente de las cápsulas es elevado a largo plazo", "No permite ajustar la intensidad del café con precisión"],
      "user_summary": "Los compradores la eligen por la facilidad y rapidez de uso sin sacrificar calidad de café. La mayoría están encantados con la comodidad de las cápsulas aunque reconocen que el coste por café es superior a otras preparaciones."
    },
    2: {
      "pros": ["Cafetera de goteo de 950W con función antigoteo y termo de calor", "Jarra de vidrio de 1.2L perfecta para preparar café para toda la familia", "Precio muy asequible con todas las funciones esenciales de una buena cafetera"],
      "cons": ["Sin función de programación horaria para tenerlo listo al despertar", "El calentamiento del café en la placa puede alterar ligeramente el sabor"],
      "user_summary": "Los compradores la eligen como cafetera de goteo diaria a precio muy asequible para preparar varios cafés seguidos. La mayoría la recomiendan para hogares donde se consume mucho café al día y se valora la sencillez de uso."
    },
    3: {
      "pros": ["Bomba de 20 bares para extracción de espresso de calidad en casa", "Vaporizador manual para preparar cappuccino y leche texturizada", "Precio muy competitivo para una cafetera de espresso con bomba de presión"],
      "cons": ["Requiere aprender a usar el vaporizador para obtener buena espuma", "El depósito no es extraíble en todos los modelos, puede ser incómodo de llenar"],
      "user_summary": "Los compradores que quieren espresso y cappuccino de calidad sin gastar mucho la eligen como primera cafetera de bomba. La mayoría quedan muy satisfechos con la calidad del café y disfrutan aprendiendo a usar el vaporizador."
    }
  },
  "cuidado-pelo": {
    1: {
      "pros": ["Protector térmico todo en uno que nutre, desencrespa y protege el cabello", "Fórmula sin aclarado que se aplica en 1 minuto en cabello húmedo o seco", "Más de 10 beneficios en un solo producto para simplificar la rutina"],
      "cons": ["El precio puede resultar elevado para usarlo diariamente en cantidades generosas", "No es suficiente como único tratamiento para cabellos muy dañados o secos"],
      "user_summary": "Las compradoras lo adquieren para simplificar su rutina de cabello con un solo producto multifunción. La mayoría lo consideran imprescindible para proteger el cabello del calor y conseguir un acabado suave y brillante con mínimo esfuerzo."
    },
    2: {
      "pros": ["Cafeína que estimula la circulación del cuero cabelludo contra la caída", "Fórmula sin siliconas que limpia el cabello sin apelmazar", "Eficacia clínicamente probada para reducir la caída por estrés y hormonas"],
      "cons": ["Olor a cafeína intenso que puede no gustar a todos", "Se necesita usar mínimo 3 meses para apreciar resultados visibles"],
      "user_summary": "Los compradores con problemas de caída de cabello lo eligen por su fórmula con cafeína clínicamente respaldada. La mayoría notan una reducción de la caída tras varios meses de uso regular aunque señalan que el olor es bastante intenso."
    },
    3: {
      "pros": ["Champú anticaspa con piritionato de zinc de eficacia probada", "Limpia el cuero cabelludo en profundidad sin resecar el cabello", "Precio muy asequible para un champú dermocosméticoé de farmacia"],
      "cons": ["Uso continuado puede resecar ligeramente cabellos muy secos o teñidos", "El tamaño del envase puede agotarse rápido con cabellos largos o pelo muy abundante"],
      "user_summary": "Los compradores con problemas de caspa lo eligen por su eficacia dermocosmética probada a un precio muy razonable. La mayoría lo recomiendan como champú anticaspa de referencia que cumple mejor que las alternativas más económicas de supermercado."
    }
  },
  "cuidado-piel": {
    1: {
      "pros": ["Suero y bálsamo 2 en 1 con extracto de trufa blanca para nutrición intensa", "Textura bálsamo rica que se convierte en aceite al aplicarse", "Piel más luminosa y nutrida tras pocas semanas de uso regular"],
      "cons": ["Textura más densa, puede resultar pesada para pieles mixtas o grasas", "Precio elevado para un suero de cuidado facial de lujo"],
      "user_summary": "Las compradoras con piel seca o necesitada de nutrición intensa lo eligen como tratamiento nocturno estrella. La mayoría destacan el cambio en la luminosidad y suavidad de la piel tras usarlo regularmente, justificando el precio."
    },
    2: {
      "pros": ["FPS50+ con alta protección solar para uso diario todo el año", "Textura ligera no grasa que no deja manchas blancas en la piel", "Fórmula hidratante que actúa como crema y protector solar en un solo paso"],
      "cons": ["El olor puede resultar algo fuerte para quienes son sensibles a los aromas", "Puede dejar algo de brillo en pieles mixtas durante las horas de más calor"],
      "user_summary": "Los compradores lo eligen como protector solar diario que también hidrata sin necesitar dos productos. La mayoría lo recomiendan especialmente para el verano y viajes, valorando la practicidad de combinar hidratación y protección solar."
    },
    3: {
      "pros": ["Bálsamo reparador multipropósito para pieles muy secas, irritadas o dañadas", "Sin perfume ni irritantes, apto para pieles sensibles y bebés", "Acelera la recuperación de rojeces, rozaduras y piel dañada por el frío"],
      "cons": ["Textura densa que puede resultar pesada para uso en la cara de día", "Tarda en absorberse completamente, recomiendan aplicarlo de noche"],
      "user_summary": "Los compradores lo adquieren como el tratamiento de emergencia para piel muy seca o irritada de La Roche-Posay. La mayoría lo tienen como imprescindible en el botiquín para rozaduras, labios cortados y pieles castigadas por el frío o el sol."
    }
  },
  "discos-duros-externos": {
    1: {
      "pros": ["Memoria flash ultracompacta con velocidades USB de hasta 130 MB/s", "Diseño sin tapas con conector retráctil que no se puede perder", "Compatible con PC, Mac, televisores y consolas de forma universal"],
      "cons": ["La capacidad de 128GB puede quedarse corta para almacenar series y películas 4K", "La velocidad de escritura es inferior a la de lectura"],
      "user_summary": "Los compradores la eligen para tener almacenamiento portátil ultracompacto para documentos, fotos y vídeos. La mayoría destacan la velocidad y la comodidad del conector retráctil que no requiere tapas ni se pierde."
    },
    2: {
      "pros": ["Tarjeta SD de alta velocidad para fotógrafos y videógrafos profesionales", "Velocidades de hasta 200 MB/s en lectura para cámaras de alta resolución", "Resistente al agua, temperatura, golpes y campos magnéticos"],
      "cons": ["Precio elevado respecto a tarjetas SD de menor velocidad para uso básico", "Requiere lector de tarjetas compatible con UHS-II para velocidades máximas"],
      "user_summary": "Los compradores son fotógrafos y videógrafos que necesitan grabar RAW, burst o vídeo 4K sin que la tarjeta sea el cuello de botella. La mayoría la consideran la mejor inversión para cámaras mirrorless de gama media-alta."
    },
    3: {
      "pros": ["Doble conector USB-C y USB-A para usar en smartphones, tablets y PC", "Velocidades de hasta 150 MB/s para transferencias rápidas", "Diseño ultracompacto que cabe en cualquier bolsillo o bolso"],
      "cons": ["La capacidad puede variar según la versión, revisar antes de comprar", "El conector USB-A es fijo y no se puede guardar"],
      "user_summary": "Los compradores la eligen para transferir fotos y vídeos entre el smartphone y el PC sin cables ni aplicaciones. La mayoría la usan para liberar espacio del teléfono copiando contenido directamente al ordenador."
    }
  },
  "equipamiento-fitness": {
    1: {
      "pros": ["Material técnico transpirable que seca rápido durante el ejercicio intenso", "Diseño ergonómico que permite total libertad de movimiento", "Precio muy competitivo para una camiseta de entrenamiento de marca deportiva"],
      "cons": ["El tallaje puede variar, recomiendan consultar la tabla de tallas antes de pedir", "Los colores vivos pueden desteñir ligeramente en los primeros lavados"],
      "user_summary": "Los compradores buscan ropa deportiva funcional de marca reconocida a precio asequible para entrenar. La mayoría están satisfechos con la transpirabilidad y la comodidad para todo tipo de actividades deportivas."
    },
    2: {
      "pros": ["Cintura elástica con cordón ajustable para mayor comodidad en movimiento", "Tejido ligero que no limita los movimientos en ningún tipo de ejercicio", "Bolsillos laterales para llevar el móvil o llaves durante el entrenamiento"],
      "cons": ["El tallaje puede quedar algo grande, recomiendan pedir una talla menos", "El tejido fino puede verse a contraluz en colores claros"],
      "user_summary": "Los compradores los eligen para tener unos pantalones de entrenamiento cómodos y versátiles a precio muy asequible. La mayoría los recomiendan para running, gym y actividades al aire libre por la comodidad y ligereza del tejido."
    },
    3: {
      "pros": ["Par de mancuernas de neopreno suave y fácil de agarrar", "Disponibles en distintos pesos para adaptar al nivel de entrenamiento", "Ideales para tonificación, aeróbic y ejercicios de bajo impacto en casa"],
      "cons": ["El neopreno puede retener humedad y olor con el uso intensivo", "El peso máximo disponible puede ser insuficiente para atletas avanzados"],
      "user_summary": "Los compradores las eligen para comenzar a entrenar en casa sin equipamiento caro ni complejo. La mayoría las recomiendan para ejercicios de tonificación y clases dirigidas donde el peso ligero es el adecuado."
    }
  },
  "freidoras-aire": {
    1: {
      "pros": ["Capacidad de 5L ideal para familias de hasta 4 personas", "Interfaz digital con 13 presets para las elaboraciones más comunes", "Temperatura y tiempo ajustables para resultados perfectamente personalizados"],
      "cons": ["La cesta de 5L puede quedarse pequeña para familias muy numerosas", "La limpieza requiere cuidado para evitar dañar el revestimiento antiadherente"],
      "user_summary": "Los compradores la eligen como referente del mercado con más de 100.000 reseñas que avalan su fiabilidad. La mayoría la usan a diario para patatas fritas, alitas y verduras, sorprendiéndose de lo crujiente que queda la comida con muy poco aceite."
    },
    2: {
      "pros": ["Precio muy competitivo para entrar al mundo de las freidoras de aire", "Capacidad de 5L suficiente para 2-4 personas en uso cotidiano", "Fácil de limpiar con cesta apta para lavavajillas"],
      "cons": ["El panel táctil puede resultar menos intuitivo que el de otros modelos", "Sin presets digitales, solo controles que son menos precisos"],
      "user_summary": "Los compradores la eligen como primera freidora de aire a precio asequible y quedan satisfechos con los resultados. La mayoría la recomiendan para hogares que quieren probar la tecnología sin hacer una gran inversión inicial."
    },
    3: {
      "pros": ["Mayor capacidad de 6L perfecta para familias numerosas o porciones grandes", "Temperatura máxima de 230°C para dorados perfectos y crocantes", "Pantalla digital con múltiples modos y programas preestablecidos"],
      "cons": ["Ocupa más espacio en la encimera que los modelos de 5L", "El tiempo de precalentamiento puede ser ligeramente superior a modelos más pequeños"],
      "user_summary": "Los compradores buscan una freidora de aire con mayor capacidad para cocinar más cantidad a la vez. La mayoría valoran positivamente la versatilidad de la temperatura y los modos adicionales respecto a los modelos de 5L."
    }
  },
  "impresoras": {
    1: {
      "pros": ["Pack de dos cartuchos negro + tricolor con excelente rendimiento por página", "Compatibilidad total con todas las impresoras HP que usan el modelo 305", "Precio muy competitivo para cartuchos originales HP con garantía"],
      "cons": ["Los cartuchos HP 305 tienen capacidad estándar, no alta capacidad XL", "El precio puede variar con la demanda en Amazon"],
      "user_summary": "Los compradores los adquieren para reponer sus impresoras HP con cartuchos originales garantizados. La mayoría prefieren el pack de dos por la comodidad de tener siempre un repuesto y el precio ligeramente inferior por unidad."
    },
    2: {
      "pros": ["Cartucho negro XL con alta capacidad para imprimir el doble que el estándar", "Compatible con todas las impresoras HP que aceptan el modelo 305", "Precio por página inferior al cartucho estándar 305 en uso frecuente"],
      "cons": ["Precio inicial superior al modelo estándar 305", "Solo formato negro, el cartucho de color sigue siendo el 305 tricolor"],
      "user_summary": "Los compradores que imprimen con frecuencia eligen el XL para no tener que comprar cartuchos tan a menudo. La mayoría que pasan al XL no vuelven al estándar, valorando la comodidad de los cambios menos frecuentes."
    },
    3: {
      "pros": ["Cartucho tricolor original HP con colores vivos y precisos", "Compatibilidad garantizada con todas las impresoras HP 305", "Ideal para impresiones ocasionales de fotos y documentos en color"],
      "cons": ["Rendimiento en páginas inferior al cartucho negro 305", "Solo en color, requiere comprar el negro por separado"],
      "user_summary": "Los compradores lo adquieren cuando necesitan reponer el cartucho de color de su impresora HP. La mayoría están satisfechos con la calidad de color para el uso doméstico y escolar ocasional."
    }
  },
  "juegos-ps5": {
    1: {
      "pros": ["Aventura de acción con la firma James Bond 007 en PS5", "Gráficos next-gen que aprovechan el hardware de PS5 al máximo", "Edición especial con contenido exclusivo adicional para coleccionistas"],
      "cons": ["Pocas reseñas disponibles al ser un título muy reciente", "El precio de la edición especial puede ser elevado para un título nuevo"],
      "user_summary": "Los compradores fans de la saga James Bond y los shooters de acción lo adquieren como el regreso del espía más famoso. La mayoría destacan el apartado gráfico y la acción del espionaje, aunque siendo tan nuevo todavía hay pocas opiniones consolidadas."
    },
    2: {
      "pros": ["Mundo abierto de Assassin's Creed en el Japón feudal con máxima calidad gráfica", "Edición limitada con contenido adicional para los fans de la saga", "Jugabilidad mejorada que combina lo mejor de Origins, Odyssey y Valhalla"],
      "cons": ["Duración de la campaña principal puede ser excesiva para jugadores casuales", "El precio de la edición limitada es elevado respecto a la edición estándar"],
      "user_summary": "Los compradores fans de Assassin's Creed lo esperaban como la entrega definitiva ambientada en Japón. La mayoría quedan impresionados con el entorno visual del periodo Sengoku y las mejoras en el sistema de combate."
    },
    3: {
      "pros": ["Aventura en el Japón feudal con la calidad gráfica y narrativa de Ghost of Tsushima", "Edición estándar completa con la historia principal sin recortes", "Exclusivo de PlayStation que muestra el poder del hardware de PS5"],
      "cons": ["Pocas reseñas disponibles al ser un lanzamiento reciente", "El precio de lanzamiento es el habitual de un AAA pero bajará con el tiempo"],
      "user_summary": "Los compradores fans de Ghost of Tsushima y los juegos de mundo abierto japoneses lo adquieren como continuación esperada. La mayoría destacan el salto gráfico y la atmósfera del juego en el mundo samurái de Yotei."
    }
  },
  "juegos-switch": {
    1: {
      "pros": ["Minecraft completo en Switch con todas las actualizaciones y contenidos", "Versión portátil perfecta para jugar en cualquier lugar en modo handheld", "Mundos infinitos compatibles con jugadores de otras plataformas via crossplay"],
      "cons": ["Gráficos más básicos que en PC o consolas de nueva generación", "El multijugador online requiere suscripción Nintendo Online adicional"],
      "user_summary": "Los compradores son padres que regalan Minecraft a sus hijos o fans que quieren la versión portátil para Switch. La mayoría están muy satisfechos con la experiencia completa de Minecraft en formato handheld."
    },
    2: {
      "pros": ["Recopilatorio con varios juegos indie de calidad a precio reducido", "Incluye títulos con narrativa y mecánicas originales difíciles de encontrar", "Excelente relación calidad-precio para un pack de varios juegos"],
      "cons": ["Los juegos son de menor presupuesto que los AAA de Nintendo", "Algunos títulos pueden no ser del gusto de todos los jugadores"],
      "user_summary": "Los compradores buscan juegos indie con propuesta artística diferente para Switch a buen precio. La mayoría valoran la variedad de la colección y el precio competitivo respecto a comprarlos por separado."
    },
    3: {
      "pros": ["Dos juegos completos de la saga Mario Galaxy en un único cartucho para Switch", "Uno de los mejores juegos de plataformas 3D de la historia de Nintendo", "Diseño artemporal que sigue siendo divertido y fresco décadas después de su lanzamiento"],
      "cons": ["Son ports de Wii, los gráficos no están actualizados para la era Switch 2", "El precio puede resultar elevado para juegos de una generación anterior"],
      "user_summary": "Los compradores fans de Mario y los plataformas 3D los adquieren para revivir los clásicos o descubrirlos por primera vez. La mayoría coinciden en que Mario Galaxy sigue siendo de los mejores juegos de plataformas disponibles aunque sean ports de Wii."
    }
  },
  "juegos-switch-2": {
    1: {
      "pros": ["Simulación social con personajes Mii en una isla imaginaria única de Nintendo", "Compatible entre Switch y Switch 2 para jugar con amigos de ambas plataformas", "Contenido extenso con actualizaciones regulares planificadas por Nintendo"],
      "cons": ["Pocas reseñas disponibles aún al ser un juego reciente de lanzamiento", "Ritmo casual y tranquilo puede no convencer a jugadores que buscan desafíos intensos"],
      "user_summary": "Los compradores fans de la saga Animal Crossing y los juegos sociales de Nintendo lo adquieren para la nueva entrega de Tomodachi Life. La mayoría lo recomiendan para compartir con familia y amigos aunque señalan que es un juego de ritmo tranquilo."
    },
    2: {
      "pros": ["Plataformas 3D con Donkey Kong en una aventura completamente nueva para Switch 2", "Gráficos espectaculares que aprovechan el hardware de Nintendo Switch 2", "Mundo lleno de secretos, coleccionables y desafíos para completionistas"],
      "cons": ["Exclusivo de Switch 2, no compatible con la Switch original", "Precio de lanzamiento elevado como es habitual en los grandes exclusivos de Nintendo"],
      "user_summary": "Los compradores que tienen Nintendo Switch 2 lo adquieren como uno de los primeros grandes exclusivos de la consola. La mayoría quedan impresionados con el salto gráfico respecto a Switch y la jugabilidad característica de la saga DK."
    },
    3: {
      "pros": ["El juego de carreras definitivo de Nintendo en Switch 2 con pistas nuevas", "Multijugador local para hasta 4 jugadores en el mismo televisor", "Gráficos mejorados respecto a Mario Kart 8 aprovechando el hardware de Switch 2"],
      "cons": ["Si ya tienes Mario Kart 8 con DLC, el salto puede no justificar el precio", "Las carreras online requieren suscripción Nintendo Online para multijugador"],
      "user_summary": "Los compradores que se han pasado a Switch 2 lo adquieren como el juego de carreras social de referencia para toda la familia. La mayoría lo consideran imprescindible para cualquier propietario de Switch 2 con personas con quien jugar."
    }
  },
  "juegos-xbox": {
    1: {
      "pros": ["Aventura de acción con la firma James Bond 007 para Xbox Series X", "Gráficos y jugabilidad que aprovechan el hardware de la nueva generación", "Edición especial con contenido adicional exclusivo para coleccionistas"],
      "cons": ["Pocas reseñas disponibles al ser un lanzamiento reciente", "El precio de la edición especial es elevado para un título de acción nuevo"],
      "user_summary": "Los compradores fans de la saga James Bond en Xbox lo adquieren como el regreso del espía más famoso al gaming. La mayoría destacan la producción visual y la acción, aunque siendo tan nuevo hay pocas opiniones consolidadas disponibles."
    },
    2: {
      "pros": ["Mundo abierto de conducción con cientos de coches licenciados reales", "Gráficos de nueva generación en mundo abierto con clima dinámico en tiempo real", "Acceso también en PC y disponible en Game Pass para suscriptores"],
      "cons": ["La progresión puede sentirse lenta al inicio antes de desbloquear los mejores coches", "Requiere mucho espacio de almacenamiento para la instalación completa"],
      "user_summary": "Los compradores fans de la saga Forza Horizon lo esperan como el juego de conducción definitivo de Xbox. La mayoría lo consideran el mejor juego de conducción del mercado con la cantidad de contenido y la calidad gráfica de nueva generación."
    },
    3: {
      "pros": ["Metroidvania aclamado por la crítica finalmente disponible para consola", "Jugabilidad de plataformas y exploración que ha enamorado a millones de jugadores", "Historia profunda y atmosférica con un mundo interconectado para explorar"],
      "cons": ["Pocas reseñas disponibles aún como título reciente para Xbox", "La dificultad puede ser alta para jugadores nuevos en el género metroidvania"],
      "user_summary": "Los compradores fans del género metroidvania y la primera entrega de Hollow Knight lo adquieren para disfrutar de la secuela muy esperada. La mayoría que conocen el original están emocionados con la continuación de la historia de Hornet."
    }
  },
  "lectores-ebook": {
    1: {
      "pros": ["Tableta e-paper que simula perfectamente la escritura a mano sobre papel real", "Sin distracciones de notificaciones, dedicada exclusivamente a lectura y notas", "Sincronización de notas y documentos en la nube de reMarkable"],
      "cons": ["Precio muy elevado para un dispositivo de un solo propósito", "No tiene acceso a tienda de ebooks ni apps adicionales"],
      "user_summary": "Los compradores son profesionales y estudiantes que quieren dejar el papel pero no renunciar a la experiencia de escribir a mano. La mayoría lo consideran transformador para reuniones y estudio, aunque reconocen que el precio es elevado para lo que hace."
    },
    2: {
      "pros": ["Pantalla e-ink de gran tamaño para leer documentos PDF y ebooks cómodamente", "Stylus incluido para tomar notas directamente sobre los documentos", "Integración con el ecosistema Kindle y Amazon Books para comprar contenido"],
      "cons": ["El precio es elevado para ser un ebook reader, más cercano a una tablet especializada", "El peso es mayor que el de los Kindle de lectura convencionales"],
      "user_summary": "Los compradores que quieren combinar la lectura de libros con la toma de notas a mano lo eligen como dispositivo todo en uno. La mayoría lo recomiendan para quien ya usa Kindle y quiere añadir la funcionalidad de escritura."
    },
    3: {
      "pros": ["Precio ultrabásico como pizarra LCD para apuntes rápidos sin gastar papel", "Sin batería que cargar, borrado instantáneo con el botón lateral", "Tamaño compacto perfecto para la nevera, mesa de estudio o bolsillo"],
      "cons": ["Solo tiene capacidad de escritura básica, sin funciones inteligentes ni sincronización", "La resolución LCD es muy inferior a los dispositivos e-paper de calidad"],
      "user_summary": "Los compradores la usan como sustituto del papel para listas, recordatorios y bocetos rápidos sin gastar hojas. La mayoría la recomiendan para niños o uso doméstico casual como alternativa ecológica y económica al papel."
    }
  },
  "mandos-gaming": {
    1: {
      "pros": ["Mando inalámbrico con base de carga incluida siempre lista para usar", "Compatible con PC, Android y Switch sin necesidad de adaptadores", "Gatillos asimétricos ergonómicos para mayor comodidad en sesiones largas"],
      "cons": ["La autonomía puede ser inferior a los mandos de marcas premium", "El software de configuración está solo disponible en inglés"],
      "user_summary": "Los compradores lo eligen como mando gaming para PC a precio asequible con base de carga incluida. La mayoría destacan la comodidad de la carga inalámbrica y la compatibilidad multiplataforma como sus principales ventajas."
    },
    2: {
      "pros": ["Diseño económico con cable para gaming sin preocupaciones de batería", "Compatible con PC y múltiples plataformas sin configuración adicional", "Precio muy accesible para jugadores que buscan su primer mando gaming"],
      "cons": ["El cable puede limitar la libertad de movimiento respecto a los inalámbricos", "El nivel de acabado y materiales es básico para el precio"],
      "user_summary": "Los compradores buscan un mando gaming básico y funcional a precio mínimo para empezar. La mayoría lo recomiendan para jugadores ocasionales o como mando secundario para gaming con amigos donde no es necesaria la máxima calidad."
    },
    3: {
      "pros": ["Mando inalámbrico premium con joysticks de efecto Hall sin drift", "Compatible con PC, Android y Switch para máxima versatilidad", "Perfil personalizable y retroiluminación para un setup gaming completo"],
      "cons": ["El precio es superior al de alternativas básicas sin características avanzadas", "El RGB consume batería más rápidamente cuando está activado al máximo"],
      "user_summary": "Los compradores que buscan un mando inalámbrico premium con joysticks sin drift lo eligen para gaming competitivo en PC. La mayoría están muy satisfechos con la precisión de los joysticks y la compatibilidad con múltiples plataformas."
    }
  },
  "maquillaje": {
    1: {
      "pros": ["Fórmula de larga duración sin necesidad de retoques frecuentes", "Amplia gama de tonos para todos los tipos de piel", "Cobertura ajustable desde natural hasta completa según la cantidad"],
      "cons": ["La fórmula puede marcar los poros en pieles con textura irregular", "Requiere primer para maximizar la duración en pieles grasas"],
      "user_summary": "Los compradores lo eligen como base de maquillaje de referencia por su duración y la amplia gama de tonos. La mayoría están muy satisfechos con la cobertura y la durabilidad, aunque recomiendan usar primer para piel grasa."
    },
    2: {
      "pros": ["Crema CC con cobertura natural que unifica el tono de la piel", "Textura ligera que no se asienta en poros ni arrugas", "Fórmula con extracto de centella asiática para calmar pieles sensibles"],
      "cons": ["La cobertura ligera puede ser insuficiente para imperfecciones muy marcadas", "La gama de tonos es más limitada que las bases de maquillaje convencionales"],
      "user_summary": "Las compradoras con piel sensible o que prefieren un acabado natural lo eligen como alternativa ligera a las bases convencionales. La mayoría valoran el acabado natural y el efecto calmante sobre la piel, especialmente en días sin maquillaje completo."
    },
    3: {
      "pros": ["Spray fijador que prolonga la duración del maquillaje durante todo el día", "Acabado no graso que mantiene el maquillaje fresco en climas cálidos", "Aplicación rápida en el último paso de la rutina de maquillaje"],
      "cons": ["El aroma del spray puede ser intenso para personas sensibles a los fragancias", "Puede requerir 2-3 capas para una fijación óptima en pieles muy grasas"],
      "user_summary": "Las compradoras lo usan como paso final de la rutina de maquillaje para prolongar su duración. La mayoría lo consideran imprescindible en días largos, eventos y verano donde el maquillaje tiende a moverse o correrse."
    }
  },
  "microfonos-gaming": {
    1: {
      "pros": ["Micrófono dinámico con patrón cardioide que rechaza el sonido lateral", "Brazo articulado de alta calidad con filtro antipop incluido en el pack", "Cuerpo metálico robusto para streaming, podcasting y gaming intensivo"],
      "cons": ["El conjunto micrófono + brazo ocupa bastante espacio en el escritorio", "Requiere instalar el brazo correctamente para evitar vibraciónes de mesa"],
      "user_summary": "Los compradores que quieren calidad de streaming y podcast sin un precio alto lo eligen por incluir brazo y filtro en el pack. La mayoría están sorprendidos por la calidad de audio y lo recomiendan como setup completo para empezar en el streaming."
    },
    2: {
      "pros": ["Conexión USB sencilla sin necesidad de interfaz de audio externa", "Omnidireccional para captar la voz de varias personas en reuniones", "Precio muy asequible para mejorar la calidad de audio en videollamadas"],
      "cons": ["Calidad de audio básica, no adecuada para streaming o podcasting de calidad", "Sin función de mute físico o control de volumen en el propio micrófono"],
      "user_summary": "Los compradores lo adquieren como solución rápida y económica para mejorar la calidad de las reuniones online. La mayoría lo recomiendan para teletrabajo básico y clases online donde la calidad básica de USB es suficiente."
    },
    3: {
      "pros": ["Precio ultrabásico para tener un micrófono dedicado mejor que el integrado", "Conexión jack de 3.5mm universal compatible con todos los ordenadores", "Diseño compacto con soporte de escritorio para colocarlo en cualquier posición"],
      "cons": ["La calidad de audio es básica, no adecuada para grabaciones exigentes", "El cable de 180cm puede quedarse corto en configuraciones de escritorio amplias"],
      "user_summary": "Los compradores lo eligen como solución de entrada para tener un micrófono externo básico a precio mínimo. La mayoría lo recomiendan para llamadas, clases online y comunicación básica donde ya supone una mejora respecto al micrófono integrado."
    }
  },
  "microondas": {
    1: {
      "pros": ["700W de potencia con 5 niveles para calentar cualquier tipo de alimento", "Diseño compacto de 20L que se integra perfectamente en cocinas pequeñas", "Panel sencillo e intuitivo sin funciones innecesarias que compliquen el uso"],
      "cons": ["Sin función grill, solo calentamiento y descongelado básico", "El panel táctil puede acumular marcas de dedos con facilidad"],
      "user_summary": "Los compradores lo eligen para calentar y descongelar alimentos sin complicaciones en hogares pequeños. La mayoría están satisfechos con la sencillez de uso y destacan que la relación precio-calidad de Cecotec es muy buena en este segmento."
    },
    2: {
      "pros": ["Diseño blanco elegante que combina con cocinas modernas", "Capacidad de 20L con plato girante apto para recipientes estándar", "Precio muy competitivo con garantía europea incluida"],
      "cons": ["Sin función grill o combinada, solo microondas convencional", "El temporizador puede ser menos preciso que los digitales modernos"],
      "user_summary": "Los compradores buscan un microondas básico y fiable a buen precio para el uso diario. La mayoría valoran el diseño limpio en blanco y la sencillez de uso sin funciones innecesarias."
    },
    3: {
      "pros": ["Mayor capacidad de 20L con 700W para calentar platos de tamaño familiar", "Función grill integrada para gratinar y dorar alimentos sin horno", "Panel digital con 8 programas automáticos para los alimentos más comunes"],
      "cons": ["Ocupa algo más de espacio en la encimera que modelos sin grill", "La función grill requiere práctica para obtener resultados óptimos"],
      "user_summary": "Los compradores que quieren algo más versátil que el básico lo eligen por la función grill y los programas automáticos. La mayoría lo usan para calentar, descongelar y preparar platos gratinados, valorando la versatilidad adicional."
    }
  },
  "monitores": {
    1: {
      "pros": ["Panel IPS 1080p con colores fieles y amplios ángulos de visión", "Tecnología antirreflejo que reduce la fatiga visual en sesiones largas", "Diseño delgado sin marcos laterales con soporte ergonómico ajustable"],
      "cons": ["Sin altavoces integrados, requiere altavoces externos", "Resolución Full HD puede quedarse corta para diseño gráfico profesional"],
      "user_summary": "Los compradores lo valoran como monitor de oficina fiable con imagen nítida y cómoda para jornadas largas. La mayoría lo usan para teletrabajo y estudios, destacando la calidad del panel IPS a un precio muy competitivo."
    },
    2: {
      "pros": ["Panel IPS de 165Hz ideal para juegos competitivos fluidos", "Compatible con FreeSync Premium para eliminar el tearing en gaming", "Diseño gaming con bajo consumo y tiempo de respuesta de 1ms"],
      "cons": ["Los altavoces integrados tienen una calidad básica", "El soporte no permite ajustar la altura, solo la inclinación"],
      "user_summary": "Los compradores que buscan un monitor gaming asequible destacan la fluidez de 165Hz y la compatibilidad con FreeSync. La mayoría lo recomiendan como primer monitor gaming por su relación precio-prestaciones."
    },
    3: {
      "pros": ["Monitor portátil ultradelgado perfecto para trabajar en cualquier lugar", "Conectividad USB-C con carga pass-through para portátiles modernos", "Pantalla de 15.6\" que extiende el escritorio del portátil fácilmente"],
      "cons": ["La resolución y brillo puede ser inferior a monitores de escritorio fijos", "Requiere soporte externo o funda para mantenerse en pie correctamente"],
      "user_summary": "Los compradores lo eligen como segunda pantalla portátil para trabajar en viajes, cafeterías o en casa con el portátil. La mayoría valoran la comodidad de tener un segundo monitor sin cables complicados gracias al USB-C."
    }
  },
  "moviles": {
    1: {
      "pros": ["Pantalla AMOLED 120Hz fluida y con colores vivos a precio muy accesible", "Batería de gran capacidad con autonomía de más de un día completo", "8+256GB de RAM y almacenamiento más que suficientes para el uso diario"],
      "cons": ["Sin carga inalámbrica a este precio", "El software HyperOS puede tener algo de bloatware preinstalado"],
      "user_summary": "Los compradores lo eligen como el mejor relación calidad-precio de Xiaomi en la gama media, destacando la pantalla AMOLED y el almacenamiento generoso. La mayoría lo recomiendan como alternativa real a teléfonos más caros de otras marcas."
    },
    2: {
      "pros": ["Procesador mejorado respecto al Note 14 con mayor rendimiento en gaming", "Cámara con sistema de múltiples lentes para mejor fotografía en condiciones variadas", "Pantalla con mayor brillo y mejoras visuales respecto a la generación anterior"],
      "cons": ["Precio superior al Note 14 sin diferencias radicales para el usuario casual", "El diseño es evolutivo sin innovaciones visuales destacables"],
      "user_summary": "Los compradores que venían del Note 14 o buscan algo más potente valoran la mejora en rendimiento y cámara. La mayoría lo recomiendan sobre el Note 14 si el presupuesto lo permite, aunque reconocen que las diferencias no son revolucionarias."
    },
    3: {
      "pros": ["Precio muy asequible para entrar al ecosistema Xiaomi en la gama de entrada", "Pantalla amplia con resolución HD+ cómoda para uso diario y multimedia", "Batería de gran capacidad para autonomía extensa en uso básico"],
      "cons": ["Procesador de gama de entrada que puede ir justo con apps exigentes", "Cámara básica sin las mejoras del sistema de varias lentes de los Note"],
      "user_summary": "Los compradores buscan un móvil Xiaomi básico y fiable a precio mínimo para uso cotidiano. La mayoría lo recomiendan para usuarios que no exigen mucho del procesador y priorizan la autonomía y el tamaño de pantalla."
    }
  },
  "ollas-programables": {
    1: {
      "pros": ["Cocción lenta de 6-8 horas que concentra sabores sin vigilancia", "Capacidad de 7L para guisos familiares o grandes asados para varios días", "Panel digital con temporizador para programar la cocción con antelación"],
      "cons": ["La cocción lenta requiere planificación con varias horas de antelación", "El tamaño de 7L puede ser excesivo para 1-2 personas"],
      "user_summary": "Los compradores la usan para preparar guisos y estofados mientras están fuera de casa. La mayoría la consideran imprescindible para quienes tienen poco tiempo de cocinar y quieren comida casera de calidad sin esfuerzo."
    },
    2: {
      "pros": ["Olla de cocción lenta clásica de 4.7L perfecta para familias de 4-6 personas", "Diseño atemporal que va del horno a la mesa para servir directamente", "Precio muy asequible con la garantía de marca Crockpot reconocida"],
      "cons": ["Sin función de programación digital, hay que acordarse de apagarla manualmente", "El recipiente de cerámica es más pesado que las ollas metálicas convencionales"],
      "user_summary": "Los compradores valoran la tradición de la cocción lenta con el confort de la electricidad y la sencillez de Crockpot. La mayoría la usan para guisos de legumbres, estofados y carnes que se hacen solos en horas."
    },
    3: {
      "pros": ["Olla de cocción lenta digital con pantalla LCD y control de temperatura preciso", "Material antiadherente muy fácil de limpiar tras la cocción lenta", "Capacidad de 5L para una familia estándar de 4-6 personas"],
      "cons": ["Modelo relativamente nuevo con menos reseñas para contrastar fiabilidad", "La capacidad de 5L puede quedarse corta para grupos muy numerosos"],
      "user_summary": "Los compradores buscan la funcionalidad de olla programable de Cecotec con su relación calidad-precio característica. La mayoría que la han probado quedan satisfechos con los resultados aunque el modelo tiene menos historial que los competidores."
    }
  },
  "padel": {
    1: {
      "pros": ["Bote de 3 pelotas homologadas para torneos y uso competitivo", "Presión regulada para rebote consistente y duración superior", "Marca Head de referencia para los jugadores más exigentes del padel"],
      "cons": ["El precio es algo superior a las pelotas de marcas blancas pero la calidad lo justifica", "Las pelotas pierden presión gradualmente con el uso, como cualquier pelota de padel"],
      "user_summary": "Los jugadores de padel las eligen como la referencia de calidad para partidos y torneos. La mayoría confían en la marca Head para sus partidos habituales, destacando la consistencia del rebote y la durabilidad respecto a marcas blancas."
    },
    2: {
      "pros": ["Overgrip de alta adherencia para un agarre firme incluso con sudor en la mano", "Pack múltiple que ofrece un precio por unidad muy competitivo", "Compatible con todas las palas de padel del mercado"],
      "cons": ["El overgrip se desgasta con el uso intensivo y requiere reposición frecuente", "El grosor puede aumentar ligeramente el diámetro del mango según el gusto del jugador"],
      "user_summary": "Los jugadores los adquieren para renovar el agarre de su pala y mejorar el control durante el juego. La mayoría los recomiendan especialmente para jugadores que sudan mucho o juegan con frecuencia y necesitan máximo agarre."
    },
    3: {
      "pros": ["Protector transparente que no altera la estética de la pala", "Adhesivo de alta resistencia que aguanta golpes contra la pared y el suelo", "Protege la zona más vulnerable de la pala evitando desportillamientos"],
      "cons": ["La instalación requiere práctica para evitar burbujas de aire", "Puede necesitar reemplazarse después de muchos golpes fuertes contra la pared"],
      "user_summary": "Los jugadores lo instalan en sus palas para protegerlas de los golpes inevitables durante el juego. La mayoría lo consideran imprescindible para proteger la inversión en una buena pala de padel y prolongar su vida útil."
    }
  },
  "planchas-pelo": {
    1: {
      "pros": ["Tecnología de planchas profesionales ghd usada en las mejores peluquerías", "Sensor de temperatura preciso que mantiene el calor constante para resultados uniformes", "Acabado brillante y duradero que aguanta todo el día"],
      "cons": ["Precio elevado que puede disuadir a compradores ocasionales", "Requiere cable y es más voluminosa que las planchas básicas sin cable"],
      "user_summary": "Los compradores que invierten en la ghd Gold lo hacen buscando resultados profesionales en casa. La mayoría consideran que el precio se amortiza rápidamente al no tener que ir a la peluquería tan frecuentemente."
    },
    2: {
      "pros": ["Pantalla digital que muestra la temperatura exacta de trabajo", "Placas flotantes que se adaptan al grosor del mechón para un planchado uniforme", "Calentamiento rápido en menos de 15 segundos lista para usar"],
      "cons": ["Las placas cerámicas básicas no son tan deslizantes como las de titanio premium", "La temperatura máxima puede ser insuficiente para cabellos muy gruesos o resistentes"],
      "user_summary": "Las compradoras valoran la pantalla digital que permite controlar la temperatura exacta según el tipo de cabello. La mayoría la recomiendan como plancha completa y funcional a precio razonable, perfecta para el uso doméstico diario."
    },
    3: {
      "pros": ["Diseño de ondas que permite planchado y ondulado con la misma herramienta", "Cerámica de alta calidad que desliza perfectamente sin tirones en el cabello", "Temperatura ajustable para adaptarse a distintos tipos de cabello"],
      "cons": ["Las ondas resultantes son de un tipo específico, no para rizos muy cerrados", "El mango puede calentarse ligeramente con un uso muy prolongado"],
      "user_summary": "Las compradoras la eligen para tener versatilidad entre el planchado liso y las ondas con una sola herramienta. La mayoría la recomiendan para el uso de fin de semana para eventos o salidas donde se quiere un look con onda natural."
    }
  },
  "portatiles": {
    1: {
      "pros": ["Chip A18 Pro con rendimiento excepcional para cualquier tarea profesional", "Batería de hasta 18 horas de autonomía real trabajando todo el día sin enchufar", "Ecosistema Apple perfecto para usuarios de iPhone e iPad"],
      "cons": ["Precio elevado respecto a portátiles Windows con más especificaciones en papel", "No es adecuado para juegos exigentes ni edición de video pesada con GPU"],
      "user_summary": "Los compradores del ecosistema Apple lo eligen por la integración perfecta con iPhone y el rendimiento del chip A18 Pro. La mayoría lo consideran una inversión a largo plazo dado que los Mac mantienen el rendimiento muchos más años que los Windows equivalentes."
    },
    2: {
      "pros": ["16GB RAM + 1TB SSD de serie para productividad sin limitaciones de espacio", "AMD Ryzen 5-7520U con buen rendimiento para ofimática y multitarea", "Pantalla FHD de 15.6\" cómoda para trabajo y consumo de contenido"],
      "cons": ["Solo un puerto USB-C, sin puerto Ethernet para conexión cableada", "El firmware puede llegar desactualizado de fábrica, requiere actualización inicial"],
      "user_summary": "Los compradores lo eligen por la generosa cantidad de RAM y almacenamiento que ofrece de serie. La mayoría lo recomiendan para trabajo y estudio ya que el Ryzen 5 maneja sin problemas la multitarea diaria."
    },
    3: {
      "pros": ["Motor extremadamente silencioso que funciona casi en refrigeración pasiva", "Batería excepcional de hasta 8 horas en uso real de ofimática", "Wi-Fi 6 para conexiones más rápidas y estables en cualquier red moderna"],
      "cons": ["8GB RAM en single channel, limitante para multitarea muy exigente", "Sin retroiluminación en el teclado para uso en ambientes oscuros"],
      "user_summary": "Los compradores lo valoran especialmente por el silencio del ventilador y la excepcional duración de batería. La mayoría lo recomiendan para estudiantes o trabajo de oficina donde la autonomía y el silencio son prioritarios."
    }
  },
  "purificadores-aire": {
    1: {
      "pros": ["Ventilador de torre digital con temporizador y control remoto incluido", "Movimiento oscilante de 80° con múltiples modos y velocidades", "Diseño vertical que ocupa poco espacio en el suelo"],
      "cons": ["La oscilación puede crear corrientes de aire molestas en espacios pequeños", "La limpieza de las rejillas del ventilador de torre requiere desmontaje"],
      "user_summary": "Los compradores lo eligen para habitaciones donde un ventilador de pie estándar ocupa demasiado espacio. La mayoría valoran los niveles de velocidad y el temporizador que permite programar el apagado automático."
    },
    2: {
      "pros": ["Ventilador de pie con 3 velocidades y oscilación automática de 90°", "Diseño compacto y ligero fácil de mover de habitación en habitación", "Precio muy asequible para refrescar el hogar en verano"],
      "cons": ["El nivel de ruido en máxima velocidad puede resultar molesto para dormir", "La velocidad máxima no es suficiente para refrescar espacios muy amplios"],
      "user_summary": "Los compradores lo eligen como ventilador de pie básico y fiable para el verano, valorando su precio. La mayoría lo usan para refrescar dormitorios y despachos en casa, encontrándolo suficiente para el uso en verano."
    },
    3: {
      "pros": ["Ventilador de techo con iluminación LED integrada para dormitorio o salón", "Mando a distancia para control de velocidad y luz desde el sofá", "Motor silencioso que no molesta durante el sueño ni en el trabajo"],
      "cons": ["Instalación en el techo requiere conocimientos básicos de electricidad", "El diseño de 3 aspas puede mover menos aire que modelos con más aspas"],
      "user_summary": "Los compradores lo instalan en dormitorios y salones para tener ventilación y luz integradas en un solo elemento. La mayoría están satisfechos con el nivel de ventilación y el silencio del motor, aunque recomiendan contar con ayuda profesional para la instalación."
    }
  },
  "ratones-gaming": {
    1: {
      "pros": ["Sensor HERO de alta precisión con sensibilidad de 200-8000 DPI ajustable", "Diseño ambidextro cómodo para diestros y zurdos por igual", "Iluminación RGB LIGHTSYNC sincronizable con otros periféricos Logitech G"],
      "cons": ["Sin botones adicionales en el costado para macros o acciones rápidas", "El cable es fijo y no se puede quitar, limitando la libertad de movimiento"],
      "user_summary": "Los compradores que empiezan en el gaming o buscan un ratón confiable a precio asequible lo eligen como primera opción. La mayoría están satisfechos con la precisión del sensor y la calidad de construcción típica de Logitech G."
    },
    2: {
      "pros": ["Conexión inalámbrica LIGHTSPEED con latencia inferior a 1ms sin lag perceptible", "Sensor HERO de gama alta con hasta 12000 DPI de precisión", "Batería de hasta 250 horas con una sola pila AA incluida"],
      "cons": ["Requiere pila AA que aumenta ligeramente el peso respecto a los recargables", "La rueda de scroll puede resultar algo rígida para uso intensivo"],
      "user_summary": "Los compradores que quieren libertad inalámbrica sin sacrificar la latencia lo eligen como el ratón gaming inalámbrico referente. La mayoría no notan diferencia con un ratón con cable y destacan la increíble duración de la batería."
    },
    3: {
      "pros": ["Sensor de alta precisión para juegos FPS y MOBA competitivos", "Diseño ergonómico para diestros con apoyo de palma durante horas de juego", "Compatibilidad universal con todos los softwares y plataformas gaming"],
      "cons": ["Sin iluminación RGB, diseño sobrio no apto para setups con mucho colorido", "Solo compatible con mano derecha por su diseño ergonómico asimétrico"],
      "user_summary": "Los compradores buscan un ratón gaming ergonómico y fiable de Logitech a precio asequible. La mayoría los usan para gaming competitivo y productividad indistintamente, valorando la comodidad del diseño ergonómico para largas sesiones."
    }
  },
  "realidad-virtual": {
    1: {
      "pros": ["Cable de 5m de fibra óptica para VR PC sin restricción de movimiento", "Transmisión de datos rápida con mínima latencia para VR de alta calidad", "Compatible con Meta Quest 2, 3 y Quest Pro para Air Link"],
      "cons": ["Cable de 5m puede enredarse durante sesiones de VR muy activas", "Requiere PC con USB compatible y drivers correctos para funcionar"],
      "user_summary": "Los compradores lo adquieren para aprovechar el PC VR de su Meta Quest sin limitaciones de batería ni calidad de imagen. La mayoría lo recomiendan como accesorio imprescindible para quienes tienen un PC gaming potente."
    },
    2: {
      "pros": ["512GB de almacenamiento para una biblioteca de juegos VR completa sin ordenador", "Chip Snapdragon XR2 Gen 2 con el mejor rendimiento autónomo del mercado VR", "Biblioteca de juegos VR más completa con títulos exclusivos de alto nivel"],
      "cons": ["Precio muy elevado respecto a la versión de 128GB que ya ofrece buenas prestaciones", "El peso puede cansar el cuello tras sesiones largas de realidad virtual"],
      "user_summary": "Los compradores que quieren la mejor experiencia de VR standalone sin necesitar un PC potente invierten en el Meta Quest 3. La mayoría lo consideran el salto definitivo a la realidad virtual de calidad, aunque señalan que el peso puede cansar en sesiones largas."
    },
    3: {
      "pros": ["Soporte decorativo temático de Astro Bot para organizar el escritorio gaming", "Compatible con mando DualSense y smartphones de cualquier tamaño", "Diseño exclusivo perfecto para coleccionistas y fans de PlayStation"],
      "cons": ["Es un soporte decorativo, funcionalidad básica sin prestaciones adicionales", "El precio puede ser elevado para lo que ofrece funcionalmente"],
      "user_summary": "Los compradores que son fans de PlayStation y Astro Bot lo adquieren principalmente por su valor decorativo y de coleccionismo. La mayoría lo valoran como regalo o detalle para el setup gaming, cumpliendo su función con un toque de personalidad."
    }
  },
  "robots-aspirador": {
    1: {
      "pros": ["Navegación láser con cartografía precisa y rutas optimizadas inteligentemente", "Control completo desde app con zonas prohibidas y limpieza por habitaciones", "Precio ajustado para un robot aspirador con navegación LiDAR profesional"],
      "cons": ["La estación base requiere espacio libre y acceso permanente para el vaciado", "La batería puede tardar en cargarse completamente para cubrir pisos grandes"],
      "user_summary": "Los compradores que quieren un robot aspirador con navegación precisa a precio razonable lo eligen como primera opción de Cecotec con LiDAR. La mayoría quedan satisfechos con la limpieza autónoma aunque señalan que Cecotec requiere algo de configuración inicial."
    },
    2: {
      "pros": ["Aspirado y fregado simultáneos con autovaciado en la estación base", "Navegación LiDAR de alta precisión con mapas de múltiples plantas", "Potencia de aspiración ajustable para distintos tipos de suelo y alfombras"],
      "cons": ["El fregado es complementario al aspirado, no reemplaza un fregado manual profundo", "La estación de autovaciado ocupa espacio y requiere acceso libre a la pared"],
      "user_summary": "Los compradores buscan un robot aspirador de gama alta con aspirado y fregado integrados y autovaciado. La mayoría quedan muy satisfechos con el resultado y consideran que es el equilibrio perfecto entre funcionalidad y coste."
    },
    3: {
      "pros": ["Brazos extensibles para limpiar esquinas y zonas junto a paredes y rodapiés", "Aspirado y fregado con control preciso de la humedad del mopa", "App Xiaomi Home con integración en el ecosistema de hogar inteligente"],
      "cons": ["Los brazos extensibles pueden atascarse con cables u obstáculos pequeños", "Requiere configuración inicial en la app para aprovechar todas las funciones"],
      "user_summary": "Los compradores del ecosistema Xiaomi lo eligen por la integración con Xiaomi Home y los brazos extensibles que limpian las esquinas. La mayoría valoran las mejoras en la limpieza de bordes que los robots sin brazos no consiguen."
    }
  },
  "routers-wifi": {
    1: {
      "pros": ["Instalación ultrarrápida sin configuración técnica desde cualquier enchufe", "Amplía la cobertura WiFi en toda la casa eliminando zonas muertas", "Compatible con todos los routers y proveedores de internet de España"],
      "cons": ["La velocidad N300 puede quedarse corta para streaming 4K simultáneo", "No amplifica la señal, solo la extiende, lo que puede reducir la velocidad"],
      "user_summary": "Los compradores lo eligen para eliminar los puntos muertos de WiFi en casa de forma sencilla y económica. La mayoría destacan lo fácil que es configurarlo y que funciona perfectamente para el uso diario de navegación y streaming."
    },
    2: {
      "pros": ["WiFi de doble banda AC1200 para velocidades más altas que los repetidores N300", "Función de punto de acceso para conectar dispositivos con cable Ethernet", "App TP-Link Tether para gestión y control desde el móvil en cualquier lugar"],
      "cons": ["Precio superior al básico N300 para hogares donde el N300 sería suficiente", "La banda de 5GHz tiene menor alcance que la de 2.4GHz"],
      "user_summary": "Los compradores que quieren ampliar su WiFi con mayor velocidad lo eligen como paso natural respecto al repetidor básico. La mayoría lo instalan donde la señal empieza a debilitarse y quedan satisfechos con la mejora de cobertura."
    },
    3: {
      "pros": ["Sistema WiFi Mesh Deco con cobertura uniforme en toda la casa sin puntos muertos", "WiFi 6 AX1500 para velocidades superiores con múltiples dispositivos conectados", "Pack de 3 nodos que cubre hasta 370m² con señal consistente"],
      "cons": ["Precio elevado respecto a un solo repetidor básico, requiere inversión mayor", "La gestión de la red Mesh puede resultar compleja para usuarios no técnicos"],
      "user_summary": "Los compradores con casas grandes o plantas múltiples lo eligen para tener WiFi estable en toda la vivienda. La mayoría que dan el salto a Mesh no vuelven a los repetidores convencionales, destacando la estabilidad y el ancho de banda superior."
    }
  },
  "secadores-pelo": {
    1: {
      "pros": ["Tecnología iónica que reduce el frizz y aporta brillo al cabello", "Secado rápido gracias a la alta potencia del motor con presión de aire superior", "Precio muy asequible para un secador con función iónica de marca reconocida"],
      "cons": ["El cable puede ser algo corto para moverse con libertad durante el secado", "El nivel de ruido es notable a máxima potencia"],
      "user_summary": "Los compradores lo eligen como primer secador con función iónica a precio accesible, sorprendiéndose de la mejora en el acabado. La mayoría lo recomiendan especialmente para cabellos con tendencia al encrespado."
    },
    2: {
      "pros": ["Secador compacto y ligero perfecto para viajes y uso en el gimnasio", "Potencia suficiente para un secado efectivo en un formato manejable", "Precio muy asequible como secador de respaldo o para llevar de viaje"],
      "cons": ["La potencia puede ser insuficiente para cabellos muy gruesos o abundantes", "Sin difusor incluido, requiere comprar accesorio adicional para rizos"],
      "user_summary": "Los compradores lo eligen como secador compacto de viaje o secundario a precio mínimo. La mayoría lo recomiendan para cabellos finos o cortos y para llevar de viaje donde la compacidad es más importante que la potencia máxima."
    },
    3: {
      "pros": ["2400W de potencia para un secado rápido y efectivo de cualquier tipo de cabello", "Difusor y concentrador incluidos para distintos estilos de peinado", "Función de aire frío para fijar el peinado al terminar"],
      "cons": ["El cuerpo puede calentarse con uso muy prolongado", "La vida útil puede ser menor que la de marcas más especializadas en styling"],
      "user_summary": "Los compradores que buscan un secador potente de marca conocida a precio razonable valoran los 2400W y los accesorios incluidos. La mayoría están satisfechos con el secado rápido y consideran que Remington ofrece buena relación calidad-precio."
    }
  },
  "smartwatches": {
    1: {
      "pros": ["Pantalla LCD de 2\" grande y muy legible incluso al sol", "Batería de hasta 18 días de autonomía real", "Llamadas Bluetooth claras sin sacar el móvil del bolsillo", "Más de 140 modos deportivos con monitorización 24/7"],
      "cons": ["La caja es grande, puede resultar prominente en muñecas pequeñas", "El GPS requiere tener el móvil cerca para funcionar"],
      "user_summary": "Los compradores se sorprenden de las prestaciones que ofrece a menos de 40€, destacando especialmente la duración de batería y el tamaño de pantalla. La mayoría lo recomiendan como primer smartwatch o para regalar a quien quiere salud y conectividad."
    },
    2: {
      "pros": ["Batería de 1000mAh para una semana de uso real sin cargar", "Pantalla grande y luminosa con diseño resistente", "100+ modos deportivos con monitor de salud completo y linterna integrada", "Certificación IP68 para actividades acuáticas y lluvia"],
      "cons": ["Marca genérica con ecosistema de apps más limitado que Xiaomi o Amazfit", "La app de configuración puede resultar algo básica"],
      "user_summary": "Los compradores valoran la gran batería y la pantalla grande que se ve perfectamente en exteriores. La mayoría lo recomiendan como smartwatch práctico y resistente para uso deportivo y cotidiano a precio muy accesible."
    },
    3: {
      "pros": ["Pantalla AMOLED nítida con colores vivos bajo cualquier luz solar", "GPS integrado con mapas gratuitos para rutas y actividades sin móvil", "NFC para pagos y batería de 10 días con uso intensivo", "160+ modos deportivos con inteligencia artificial Zepp integrada"],
      "cons": ["La configuración del NFC para pagos es compleja y usa la plataforma Curve", "La memoria interna limitada restringe las apps y esferas descargables"],
      "user_summary": "Los compradores lo valoran como el punto dulce entre precio y prestaciones con pantalla AMOLED y GPS. La mayoría destacan que ofrece funciones de gama alta como GPS y AMOLED a precio muy competitivo respecto a marcas premium."
    }
  },
  "tablets": {
    1: {
      "pros": ["Chip A16 ofrece potencia que no quedará obsoleta en años", "Pantalla Liquid Retina de 11\" espectacular para contenido y trabajo", "128 GB de almacenamiento base ya suficiente para el uso diario"],
      "cons": ["Los accesorios oficiales (teclado, Apple Pencil) elevan mucho el precio total", "Sin Face ID: solo Touch ID en el botón lateral"],
      "user_summary": "Los compradores que renuevan tabletas antiguas se sorprenden del salto de rendimiento con el chip A16. La mayoría lo valoran como el punto dulce entre precio y prestaciones de la gama Apple, aunque señalan que los accesorios oficiales son caros."
    },
    2: {
      "pros": ["Pantalla 2.5K con tasa de refresco de 90Hz muy fluida para el precio", "4 altavoces con Dolby Atmos para una experiencia sonora destacada", "Lápiz incluido de serie para tomar notas con precisión desde el primer día"],
      "cons": ["WiFi 5 en lugar de WiFi 6, puede conectarse lentamente a routers modernos", "El rendimiento con apps exigentes es limitado por el procesador MediaTek"],
      "user_summary": "Los compradores buscan una tablet Android con pantalla de alta resolución y lápiz incluido a buen precio. La mayoría la recomiendan para estudio, consumo de contenido y productividad básica, encontrando en la pantalla y el lápiz sus mayores virtudes."
    },
    3: {
      "pros": ["Pantalla enorme de 12.1\" con resolución 2.5K perfecta para contenido multimedia", "Batería de 12000mAh para dos días completos de uso sin necesidad de cargar", "Snapdragon 7s Gen 4 con WiFi 6 para rendimiento fluido y conectividad rápida"],
      "cons": ["Sin cargador incluido en la caja, hay que comprarlo aparte", "6GB de RAM puede ser algo justo para multitarea muy exigente con muchas apps"],
      "user_summary": "Los compradores valoran el tamaño generoso de pantalla y la batería enorme que aguanta días de uso. La mayoría la recomiendan para consumo de contenido multimedia y estudio por la relación calidad-precio en su segmento de tamaño."
    }
  },
  "teclados-gaming": {
    1: {
      "pros": ["Switches mecánicos para un feedback preciso y satisfactorio en cada pulsación", "Retroiluminación RGB completa con distribución española con Ñ incluida", "Construcción sólida que aguanta el uso intensivo de gaming prolongado"],
      "cons": ["El ruido de los switches mecánicos puede molestar en entornos compartidos o de noche", "El precio es algo superior a los de membrana pero la calidad lo justifica"],
      "user_summary": "Los compradores que buscan su primer teclado mecánico gaming con RGB y distribución española lo eligen por la marca KROM y la calidad de switches. La mayoría están satisfechos con el tacto mecánico que marca la diferencia respecto a los de membrana."
    },
    2: {
      "pros": ["Switches mecánicos táctiles para un feedback preciso con cada pulsación", "Formato TKL sin teclado numérico para más espacio de ratón en el escritorio", "Construcción en aluminio de alta calidad que aporta solidez y durabilidad"],
      "cons": ["Sin retroiluminación RGB, solo blanco tenue, puede decepcionar a quienes buscan colores", "El precio es elevado para no incluir retroiluminación de colores"],
      "user_summary": "Los compradores que valoran la calidad mecánica y el acabado premium sobre el RGB lo eligen por los switches Logitech y la construcción en aluminio. La mayoría los usan tanto para gaming como para mecanografía intensiva, apreciando el feedback táctil preciso."
    },
    3: {
      "pros": ["Sensación de pulsación mecánica con retroiluminación RGB completa", "Formato completo con numpad y teclas multimedia para máxima versatilidad", "Precio muy competitivo para un teclado gaming con aspecto mecánico"],
      "cons": ["Los switches no son mecánicos reales sino de membrana con clic simulado", "La vida útil puede ser inferior a los mecánicos genuinos con uso muy intensivo"],
      "user_summary": "Los compradores que quieren la experiencia visual y sonora de un teclado mecánico sin el precio elevado lo eligen por la sensación de clic y el RGB. La mayoría están satisfechos para gaming casual aunque los puristas prefieren mecánicos genuinos."
    }
  },
  "televisores": {
    1: {
      "pros": ["Fire TV integrado con Alexa y acceso directo a todas las apps de streaming", "Compatible con Apple AirPlay para enviar contenido desde iPhone sin cables", "Dolby Audio y DTS Virtual:X para sonido más envolvente en su gama"],
      "cons": ["Resolución HD 720p, no Full HD ni 4K en este modelo de 32\"", "El sonido interno puede resultar algo flojo, se recomienda añadir barra de sonido"],
      "user_summary": "Los compradores la eligen para habitaciones o cocinas donde quieren una Smart TV completa sin gastar mucho. La mayoría destacan la facilidad del sistema Fire TV y la compatibilidad con AirPlay para usuarios de iPhone."
    },
    2: {
      "pros": ["Sistema Tizen OS 8.0 con la experiencia intuitiva de Samsung en marca propia", "Sintonizador triple DVB-T2/C/S2 para TDT, cable y satélite integrado", "Diseño elegante a precio muy ajustado para uso como segunda televisión"],
      "cons": ["La interfaz puede resultar algo lenta al cambiar entre apps", "El servicio técnico de TD Systems puede ser más limitado que el de marcas premium"],
      "user_summary": "Los compradores buscan una Smart TV funcional con Tizen OS a precio mínimo para habitaciones secundarias. La mayoría están satisfechos con la imagen y la facilidad del sistema Tizen, aunque señalan que la respuesta de los menús puede ser algo lenta."
    },
    3: {
      "pros": ["Panel 4K UHD de 43\" con procesador de LG para imagen nítida y detallada", "webOS 25 muy fluido e intuitivo con apps de streaming preinstaladas", "Compatibilidad con HDR10 Pro y Dolby Vision para contenido de alto rango dinámico"],
      "cons": ["El mando básico puede no incluir micrófono de voz según la versión", "Ocasionalmente puede ralentizarse al cambiar entre muchas apps abiertas"],
      "user_summary": "Los compradores buscan un salto a 4K de marca reconocida en la gama asequible. La mayoría valoran la calidad del panel LG y el webOS intuitivo, recomendándolo como televisor principal en salones y dormitorios medianos."
    }
  },
  "webcams": {
    1: {
      "pros": ["Imagen Full HD 1080p nítida con corrección automática de luz", "Micrófono integrado con cancelación de ruido para videollamadas claras", "Compatibilidad universal con Zoom, Teams, Meet y cualquier app de videoconferencia"],
      "cons": ["Sin autoenfoque continuo, el enfoque es fijo a distancia media", "El cable USB-A no incluye adaptador USB-C para portátiles modernos"],
      "user_summary": "Los compradores la eligen para mejorar la calidad de sus videollamadas de trabajo sin gastar en modelos caros. La mayoría están muy satisfechos con la mejora respecto a la cámara integrada del portátil y la facilidad de instalación plug and play."
    },
    2: {
      "pros": ["Full HD 1080p con ángulo de visión amplio de 90° para captar más espacio", "Corrección automática de exposición para compensar diferencias de iluminación", "Precio muy competitivo para una webcam de marca UGREEN reconocida"],
      "cons": ["El micrófono capta algo de ruido ambiental sin cancelación activa", "La base de sujeción puede no encajar bien en monitores con marcos muy gruesos"],
      "user_summary": "Los compradores buscan una webcam funcional Full HD a precio mínimo y la eligen por la calidad y la marca UGREEN. La mayoría la recomiendan para teletrabajo básico y clases online donde la calidad de imagen importa más que las funciones avanzadas."
    },
    3: {
      "pros": ["1080p con micrófono dual integrado y reducción de ruido de fondo", "Reconocimiento facial automático que mantiene siempre el foco en el usuario", "Compatible con la mayoría de plataformas de videoconferencia sin configuración"],
      "cons": ["El procesamiento de imagen puede generar un ligero retraso en conexiones lentas", "El software avanzado de configuración está solo disponible en inglés"],
      "user_summary": "Los compradores que hacen muchas videollamadas valoran el micrófono dual con reducción de ruido que mejora notablemente la calidad de audio. La mayoría la eligen para reuniones profesionales frecuentes donde el audio es tan importante como la imagen."
    }
  },
  "zapatillas-running": {
    1: {
      "pros": ["Smartband con seguimiento preciso de la actividad física y el sueño", "Pantalla AMOLED pequeña pero legible para notificaciones y datos de salud", "Batería de larga duración para semanas de uso sin cargar"],
      "cons": ["Es una pulsera de actividad, no unas zapatillas de running propiamente", "Sin GPS integrado para rutas de running al aire libre"],
      "user_summary": "Los compradores la adquieren como pulsera de actividad para complementar su entrenamiento diario. La mayoría la recomiendan para seguir pasos, sueño y actividad cotidiana a un precio muy asequible."
    },
    2: {
      "pros": ["Smartwatch con pantalla grande y legible para deportes y actividad diaria", "Monitorización completa de salud con GPS conectado vía smartphone", "Más de 140 modos deportivos incluyendo running y natación"],
      "cons": ["Sin GPS autónomo integrado, requiere llevar el móvil para el seguimiento de ruta", "La caja puede resultar grande para muñecas pequeñas"],
      "user_summary": "Los compradores lo eligen para tener un compañero de entrenamiento completo a precio asequible. La mayoría valoran el gran número de modos deportivos y la pantalla legible para ver los datos en tiempo real durante el ejercicio."
    },
    3: {
      "pros": ["Zapatilla Adidas Galaxy 7 cómoda y versátil para running diario y ocio", "Entresuela con tecnología de amortiguación para reducir el impacto en rodillas", "Disponibles en múltiples colores y tallas para encontrar el ajuste perfecto"],
      "cons": ["No están diseñadas para running competitivo de alta exigencia o maratones", "La suela puede desgastarse más rápido en asfalto con uso muy intensivo"],
      "user_summary": "Los compradores las eligen como zapatillas cómodas y versátiles para running casual, gym y uso diario. La mayoría las recomiendan por la amortiguación de Adidas y la calidad a precio asequible, perfectas para empezar a correr o para entrenamientos regulares."
    }
  },
  "afeitadoras-electricas": {
    1: {
      "pros": ["Cabezal flexible 360° que se adapta a los contornos del rostro sin irritación", "Funciona en seco y en mojado con gel o espuma de afeitar", "Diseño Philips OneBlade reconocido por su suavidad en pieles sensibles"],
      "cons": ["La cuchilla necesita reemplazo cada 4 meses para resultados óptimos", "El resultado no es tan apurado como una maquinilla de cuchillas de cartucho"],
      "user_summary": "Los compradores la eligen por la facilidad de uso y la rapidez del afeitado sin necesidad de jabón ni agua. La mayoría la recomiendan especialmente para quienes tienen la piel sensible o necesitan afeitarse a diario sin irritación."
    },
    2: {
      "pros": ["Diseño compacto para depilación corporal femenina en zonas delicadas", "Cabezal intercambiable para distintas zonas: piernas, axilas y bikini", "Inalámbrica y resistente al agua para usar cómodamente en la ducha"],
      "cons": ["La autonomía de la batería puede ser limitada para sesiones largas", "El tiempo de carga puede ser superior al de modelos con carga rápida"],
      "user_summary": "Las compradoras la eligen para tener una solución todo en uno para las distintas zonas de depilación corporal. La mayoría valoran la facilidad de uso en la ducha y los distintos accesorios incluidos para las diferentes zonas del cuerpo."
    },
    3: {
      "pros": ["Recortador de vello básico muy asequible para el cuidado diario", "Lámina de acero inoxidable duradera y fácil de enjuagar bajo el grifo", "Diseño compacto perfecto como segunda afeitadora de viaje o bolso"],
      "cons": ["Sin características avanzadas como cabezal flotante o sensor de presión", "El acabado del afeitado no es tan preciso como en modelos de precio superior"],
      "user_summary": "Los compradores lo eligen como solución básica y económica para el mantenimiento del vello. La mayoría lo recomiendan para un uso ocasional o como afeitadora de viaje por su precio mínimo y sencillez de uso."
    }
  },
  "alfombrillas-gaming": {
    1: {
      "pros": ["Superficie de tela premium con equilibrio perfecto entre velocidad y control", "Tamaño estándar que cubre el ratón gaming con espacio suficiente", "Base de goma antideslizante que se mantiene fija durante el gaming intenso"],
      "cons": ["El borde puede deshilacharse con el tiempo si no se cuida adecuadamente", "El espesor básico no amortigua tanto las vibraciones como alfombrillas más gruesas"],
      "user_summary": "Los compradores la eligen como alfombrilla gaming de referencia por su relación calidad-precio. La mayoría la recomiendan como primera alfombrilla para cualquier setup gaming, señalando que cumple perfectamente para gaming y trabajo."
    },
    2: {
      "pros": ["Diseño minimalista de Amazon Basics que combina con cualquier setup de escritorio", "Superficie de tela de alta densidad para precisión del ratón gaming", "Base antideslizante de goma que mantiene la alfombrilla fija en todo momento"],
      "cons": ["El tamaño estándar puede quedarse pequeño para ratones con DPI muy bajo", "Sin borde reforzado, puede deshilacharse más rápido que las de gama alta"],
      "user_summary": "Los compradores buscan una alfombrilla funcional a precio mínimo de marca reconocida. La mayoría la recomiendan como alfombrilla de trabajo o gaming casual donde no se necesitan características especiales."
    },
    3: {
      "pros": ["Reposamuñecas ergonómico integrado para largas sesiones sin fatiga", "Superficie de tela suave que protege el ratón y el escritorio", "Base de goma antideslizante firme en cualquier tipo de mesa"],
      "cons": ["El reposamuñecas puede resultar demasiado elevado para algunos usuarios", "La posición del ratón queda algo más lejos del cuerpo al incluir el apoyo"],
      "user_summary": "Los compradores que pasan muchas horas frente al ordenador la eligen principalmente por el reposamuñecas ergonómico que reduce la fatiga. La mayoría la recomiendan para uso de oficina prolongado destacando que ha reducido su dolor de muñeca."
    }
  },
  # --- Categorías re-scrapeadas 2026-05-30 (productos actuales de Amazon.es) ---
  "cables-usb-c": {
    1: {
      "pros": ["Precio imbatible por GB en memorias flash SanDisk de confianza", "Velocidades de lectura USB 3.0 rápidas para transferencias cotidianas", "Más de 165.000 reseñas avalan su fiabilidad y durabilidad contrastada"],
      "cons": ["La capacidad de 128GB puede quedarse corta para almacenar grandes colecciones", "La tapa de protección puede perderse con el tiempo"],
      "user_summary": "Los compradores la eligen como memoria flash de confianza para almacenamiento portátil cotidiano. La mayoría valoran la marca SanDisk y la velocidad de transferencia para documentos, fotos y vídeos."
    },
    2: {
      "pros": ["Pack de cartuchos originales HP con calidad de impresión garantizada", "Precio por página muy competitivo para cartuchos originales de marca", "Compatibilidad total con todas las impresoras HP que aceptan la serie 305"],
      "cons": ["Los cartuchos estándar 305 tienen menor capacidad que los XL", "Requiere comprar negro y color por separado para impresión completa"],
      "user_summary": "Los compradores los adquieren para tener cartuchos originales HP de repuesto siempre disponibles. La mayoría prefieren el pack de dos por la comodidad de tener siempre uno de reserva."
    },
    3: {
      "pros": ["Cable USB-A a USB-C de carga rápida 3.1A compatible con la mayoría de dispositivos", "Longitud de 2m para cargar con total libertad de movimiento", "Construcción reforzada en los conectores para mayor durabilidad"],
      "cons": ["Velocidad de carga limitada al máximo del puerto USB-A del cargador", "El conector USB-A solo es compatible con equipos que tienen ese puerto"],
      "user_summary": "Los compradores lo adquieren para cargar sus dispositivos Android e iOS desde puertos USB-A estándar. La mayoría valoran la longitud de 2m y la compatibilidad universal con smartphones y tablets."
    }
  },
  "cargadores-inalambricos": {
    1: {
      "pros": ["Protector de cristal templado 3 en 1 con instalación sin burbujas garantizada", "Protege la pantalla del iPhone de arañazos y golpes cotidianos", "Pack de 3 unidades para tener siempre un repuesto disponible"],
      "cons": ["Solo compatible con modelos de iPhone específicos, verificar compatibilidad", "El borde puede levantarse en fundas muy gruesas"],
      "user_summary": "Los compradores los adquieren para proteger la pantalla de su iPhone desde el primer día. La mayoría valoran el pack de 3 unidades que permite tener repuestos para toda la familia o posibles roturas."
    },
    2: {
      "pros": ["Memoria flash SanDisk con 165.000+ reseñas que avalan su fiabilidad", "Velocidades USB 3.0 para transferencias rápidas en cualquier dispositivo", "Disponible en varios colores y tamaños según necesidades"],
      "cons": ["La tapa protectora puede perderse con el uso frecuente", "Velocidad de escritura inferior a la de lectura"],
      "user_summary": "Los compradores la eligen como opción de almacenamiento portátil de confianza y reconocida fiabilidad. La mayoría la usan para transportar documentos, fotos y vídeos entre equipos."
    },
    3: {
      "pros": ["Funda para iPhone con protección reforzada en las esquinas ante caídas", "Material flexible que absorbe impactos sin añadir volumen excesivo", "Compatible con carga inalámbrica MagSafe sin necesidad de quitar la funda"],
      "cons": ["El perfil delgado puede resultar insuficiente para caídas desde altura", "Solo compatible con el modelo de iPhone especificado"],
      "user_summary": "Los compradores la adquieren para proteger su iPhone sin sacrificar el diseño delgado. La mayoría valoran la compatibilidad con carga inalámbrica y el equilibrio entre protección y perfil."
    }
  },
  "cepillos-dentales-electricos": {
    1: {
      "pros": ["Tecnología iO con sensor de presión que protege las encías", "8 modos de cepillado para adaptarse a cualquier necesidad dental", "App Oral-B con guía de cepillado en tiempo real para mejores resultados"],
      "cons": ["El precio es elevado respecto a los modelos básicos de la gama", "El cabezal de repuesto tiene un coste recurrente a considerar"],
      "user_summary": "Los compradores con necesidades específicas de salud bucodental lo eligen por los 8 modos y el sensor de presión que previene daños en las encías. La mayoría notan una mejora visible en la limpieza dental tras pocas semanas de uso."
    },
    2: {
      "pros": ["Tecnología sónica Philips con 31.000 movimientos por minuto", "Diseño delgado y manejable con cabezal que llega a zonas difíciles", "Precio más asequible dentro de la gama Sonicare con buenas prestaciones"],
      "cons": ["La batería puede necesitar carga más frecuente que otros modelos", "Sin sensor de presión en este modelo de la gama básica"],
      "user_summary": "Los compradores buscan la tecnología sónica Philips a un precio accesible y la encuentran en este modelo. La mayoría destacan el cambio en la limpieza dental respecto a los cepillos manuales y la facilidad de uso."
    },
    3: {
      "pros": ["Tres modos de cepillado para dientes sensibles, blanqueamiento y limpieza diaria", "Timer de 2 minutos con señal de cuadrante para un cepillado completo", "Cabezal CrossAction que elimina hasta el 100% más de placa que un cepillo manual"],
      "cons": ["Sin pantalla ni indicadores digitales en el mango", "El cabezal ocupa algo de espacio en el vaso de baño"],
      "user_summary": "Los compradores que quieren su primer cepillo Oral-B eléctrico a precio razonable lo eligen como el punto de entrada perfecto. La mayoría están satisfechos con la mejora en la limpieza y la duración de la batería para el precio."
    }
  },
  "memorias-ram": {
    1: {
      "pros": ["SSD portátil con velocidades de hasta 800 MB/s para transferencias ultrarrápidas", "Diseño ultracompacto y resistente a golpes sin cables adicionales", "Compatible con PC, Mac, consolas y televisores vía USB-C"],
      "cons": ["Precio más elevado por GB respecto a los HDD externos convencionales", "La carcasa puede calentarse en transferencias de archivos muy grandes"],
      "user_summary": "Los compradores que necesitan almacenamiento rápido y portátil lo eligen para fotógrafos, videógrafos y trabajo en movimiento. La mayoría valoran la velocidad SSD que hace las transferencias de archivos grandes mucho más ágiles."
    },
    2: {
      "pros": ["Pasta térmica de alta conductividad para procesadores y tarjetas gráficas", "Fácil aplicación con jeringa incluida para una cantidad precisa", "Compatible con CPUs Intel, AMD y GPUs de cualquier fabricante"],
      "cons": ["Requiere limpieza del procesador antes de aplicar una nueva capa", "La cantidad de 4g puede ser insuficiente para varios cambios de pasta"],
      "user_summary": "Los compradores que hacen mantenimiento de sus PCs o sustituyen el sistema de refrigeración la eligen como pasta térmica de referencia. La mayoría están satisfechos con la mejora de temperatura que consiguen en sus procesadores."
    },
    3: {
      "pros": ["5TB de capacidad para backup completo del ordenador y archivos multimedia", "Tecnología de compresión automática para optimizar el espacio disponible", "Compatible con Windows Backup, Time Machine de Mac y cualquier software"],
      "cons": ["El disco mecánico es más lento que un SSD para acceso aleatorio a archivos", "Requiere USB 3.0 para velocidades máximas, más lento en puertos 2.0"],
      "user_summary": "Los compradores lo adquieren para hacer backup de toda su colección digital con amplio margen de espacio. La mayoría lo recomiendan para almacenar fotos, vídeos y backups donde la capacidad importa más que la velocidad."
    }
  },
  "mochilas": {
    1: {
      "pros": ["Bolsa deportiva PUMA con compartimento principal espacioso para ropa y equipamiento", "Material resistente con cierre hermético para proteger el contenido", "Diseño ergonómico con correa ajustable para transporte cómodo"],
      "cons": ["El tamaño puede resultar excesivo para entrenamientos ligeros sin mucho equipamiento", "Sin compartimentos internos organizadores para artículos pequeños"],
      "user_summary": "Los compradores la eligen para llevar el equipamiento deportivo al entrenamiento de forma organizada. La mayoría la usan para fútbol, gimnasio y deportes de equipo, valorando la capacidad y la durabilidad del material PUMA."
    },
    2: {
      "pros": ["Bolsa de deporte multifunción con compartimento para zapatos separado", "Material impermeable que protege la ropa de la humedad después del entrenamiento", "Múltiples bolsillos para organizar ropa, zapatillas y artículos personales"],
      "cons": ["El peso puede ser considerable cuando está completamente llena", "Las asas pueden resultar algo incómodas en recorridos largos cargada"],
      "user_summary": "Los compradores buscan una bolsa de deporte funcional y organizada para el gimnasio y el trabajo. La mayoría valoran el compartimento separado para zapatillas que mantiene el resto del contenido limpio."
    },
    3: {
      "pros": ["Bolsa deportiva compacta de PUMA perfecta para entrenamientos ligeros", "Peso ultraligero que no supone una carga adicional en el transporte", "Diseño versátil que sirve tanto para deportes como para uso casual diario"],
      "cons": ["Capacidad reducida, solo apta para artículos esenciales sin mucho equipamiento", "Sin correas acolchadas para distancias largas con peso"],
      "user_summary": "Los compradores la eligen como bolsa de deporte ligera y minimalista para entrenamientos con poco equipamiento. La mayoría la usan para el gimnasio, yoga o clases dirigidas donde solo se necesita lo básico."
    }
  },
  "powerbanks": {
    1: {
      "pros": ["Protector de pantalla 3 en 1 con instalación garantizada sin burbujas", "Material de cristal templado 9H resistente a arañazos cotidianos", "Pack económico con unidades de repuesto para toda la familia"],
      "cons": ["Solo compatible con modelos de iPhone específicos", "La instalación requiere paciencia para quedar perfectamente colocado"],
      "user_summary": "Los compradores los adquieren para proteger la pantalla de su iPhone desde el primer momento. La mayoría valoran el pack múltiple que garantiza tener siempre un protector nuevo a mano."
    },
    2: {
      "pros": ["SanDisk con 165.000 reseñas que avalan años de fiabilidad contrastada", "Velocidades USB 3.0 rápidas para transferir fotos y documentos", "Tamaño ultracompacto que cabe en cualquier bolsillo o cartera"],
      "cons": ["La carcasa de plástico puede sufrir arañazos con el uso prolongado", "La tapa de protección del conector puede perderse con facilidad"],
      "user_summary": "Los compradores la eligen como memoria flash de referencia por su fiabilidad probada. La mayoría la usan para llevar documentos importantes y fotos entre el ordenador, el trabajo y casa."
    },
    3: {
      "pros": ["Funda de TPU flexible que protege el iPhone sin añadir volumen excesivo", "Material suave que no raya la pantalla al guardarse en el bolsillo", "Compatible con carga inalámbrica MagSafe y todas las funciones del iPhone"],
      "cons": ["Protección limitada ante caídas severas por su delgadez", "El material puede acumular polvo en los laterales con el tiempo"],
      "user_summary": "Los compradores la adquieren como funda fina para quienes quieren proteger el iPhone sin perder la sensación táctil del dispositivo. La mayoría la recomiendan para uso diario cuidadoso donde el estilo importa tanto como la protección."
    }
  },
  "relojes-hombre": {
    1: {
      "pros": ["Pantalla AMOLED clara y legible con notificaciones de salud en tiempo real", "Batería de hasta 20 días sin necesidad de carga frecuente", "Ligera y cómoda para llevar día y noche incluyendo durante el sueño"],
      "cons": ["Sin GPS autónomo integrado, requiere el móvil para seguimiento de rutas", "La pantalla táctil puede activarse involuntariamente durante el sueño"],
      "user_summary": "Los compradores buscan una pulsera de actividad de Xiaomi con seguimiento de salud a precio asequible. La mayoría la recomiendan para monitorizar pasos, sueño y frecuencia cardíaca sin complicaciones."
    },
    2: {
      "pros": ["Pantalla LCD de 2\" grande y muy legible incluso bajo el sol directo", "Llamadas Bluetooth para hablar sin sacar el móvil del bolsillo", "Más de 140 modos deportivos con monitorización de salud completa"],
      "cons": ["La caja grande puede resultar prominente en muñecas finas", "El GPS requiere el móvil para el seguimiento preciso de rutas largas"],
      "user_summary": "Los compradores lo eligen por la pantalla grande, las llamadas Bluetooth y la larga batería a precio muy competitivo. La mayoría están sorprendidos de las prestaciones que ofrece Xiaomi por menos de 40€."
    },
    3: {
      "pros": ["Pulsera de actividad compacta y ligera con pantalla AMOLED clara", "Seguimiento de actividad física y sueño con datos precisos y detallados", "Resistencia al agua para uso en la ducha y actividades acuáticas"],
      "cons": ["Sin pantalla táctil completa, la interacción es limitada respecto a un smartwatch", "Sin GPS independiente para deportes al aire libre con seguimiento de rutas"],
      "user_summary": "Los compradores buscan una pulsera de actividad básica y fiable de Xiaomi para el seguimiento de salud diario. La mayoría la recomiendan para quienes quieren monitorizar su actividad sin complicarse con funciones de smartwatch completo."
    }
  },
  "sillas-gaming": {
    1: {
      "pros": ["Cartuchos originales HP con calidad de impresión garantizada por la marca", "Pack con negro y color para tener siempre los dos tipos disponibles", "Precio competitivo para cartuchos originales HP con garantía oficial"],
      "cons": ["Capacidad estándar, no XL, menor rendimiento por cartucho que los XL", "Solo compatibles con impresoras HP que aceptan el modelo 305"],
      "user_summary": "Los compradores los adquieren para reponer sus impresoras HP con cartuchos originales garantizados. La mayoría prefieren el pack de dos para tener siempre un repuesto y evitar quedarse sin tinta en momentos críticos."
    },
    2: {
      "pros": ["Cable USB-A a USB-C de carga rápida 3.1A con conector reforzado", "Longitud suficiente para cargar cómodamente desde cualquier posición", "Compatible con todos los smartphones Android e iOS con conector USB-C"],
      "cons": ["La velocidad está limitada por el puerto USB-A del cargador utilizado", "El conector USB-A no es compatible con equipos que solo tienen USB-C"],
      "user_summary": "Los compradores lo adquieren para cargar sus dispositivos Android desde cargadores y ordenadores con puerto USB-A. La mayoría lo recomiendan por la construcción robusta y la compatibilidad universal."
    },
    3: {
      "pros": ["Ventilador de mano portátil y recargable para el calor del verano", "Batería USB recargable con autonomía para horas de uso continuo", "Diseño compacto que cabe en el bolso o mochila para llevar a cualquier parte"],
      "cons": ["La potencia del aire es limitada para ambientes muy calurosos al exterior", "La batería se descarga más rápido en la velocidad máxima"],
      "user_summary": "Los compradores lo adquieren para combatir el calor en transporte público, oficina o exteriores sin depender de aire acondicionado. La mayoría lo usan en verano y lo consideran imprescindible para viajes y días de mucho calor."
    }
  },
  "tiras-led": {
    1: {
      "pros": ["Auriculares TWS Xiaomi con batería total de 36 horas con estuche de carga", "Bluetooth 5.4 con conexión instantánea y sin cortes durante el uso", "Cancelación de ruido pasiva con ajuste cómodo para uso prolongado"],
      "cons": ["Sin cancelación activa de ruido (ANC) en este modelo de gama entrada", "El volumen máximo podría ser algo más elevado para entornos ruidosos"],
      "user_summary": "Los compradores los eligen como auriculares TWS de entrada a precio mínimo con excelente relación calidad-precio Xiaomi. La mayoría se sorprenden de la calidad de sonido y la autonomía que ofrecen a su precio."
    },
    2: {
      "pros": ["Driver de titanio de 14.2mm con bajos potentes y graves más profundos", "Batería de 37 horas total con estuche USB-C y conexión dual a 2 dispositivos", "Resistencia IP54 al agua y al sudor para deporte y uso en exteriores"],
      "cons": ["Sin detector de presencia para pausa automática al quitarlos del oído", "Cambiar entre varios dispositivos requiere resetear los auriculares"],
      "user_summary": "Los compradores los adquieren como upgrade de los modelos anteriores Xiaomi, notando especialmente la mejora en graves y la resistencia al agua IP54. La mayoría los recomiendan para deporte y uso diario exigente."
    },
    3: {
      "pros": ["Auriculares Apple con cable USB-C para dispositivos sin jack de 3.5mm", "Micrófono de alta calidad con cancelación de ruido para llamadas nítidas", "Sin problemas de batería ni emparejamiento al ser cableados"],
      "cons": ["Cableados: sin la libertad de movimiento de unos auriculares inalámbricos", "El ajuste en el oído puede no ser perfecto para todas las anatomías"],
      "user_summary": "Los compradores los adquieren como solución cableada fiable para iPhone 15, iPad y MacBook con USB-C. La mayoría los valoran por el micrófono excelente para llamadas y la ausencia total de problemas de batería o conexión."
    }
  },
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
