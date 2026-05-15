import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Rankzon",
  description: "Qué es Rankzon, cómo seleccionamos los productos y nuestra política de transparencia.",
}

export default function SobreRankzon() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1E293B]">Sobre Rankzon</h1>
      <div className="mt-8 prose prose-slate max-w-none space-y-6 text-[#1E293B]">
        <p>
          Rankzon es un sitio independiente de rankings de productos tecnológicos disponibles en Amazon España. Nuestro objetivo es ayudarte a encontrar el mejor producto de cada categoría sin tener que perder horas investigando.
        </p>
        <p>
          Todos los rankings se elaboran de forma manual, analizando las características técnicas, valoraciones de usuarios y relación calidad-precio de cada producto. No aceptamos pagos de fabricantes ni marcas para mejorar la posición de ningún producto en nuestros rankings.
        </p>
        <p>
          <strong>Transparencia sobre afiliados:</strong> Rankzon participa en el Programa de Afiliados de Amazon. Esto significa que si haces clic en uno de nuestros enlaces y realizas una compra, podemos recibir una pequeña comisión sin coste adicional para ti. Esto nos ayuda a mantener el sitio en funcionamiento. Nuestra independencia editorial no se ve afectada por estos acuerdos — el ranking refleja nuestra opinión honesta, no el importe de la comisión.
        </p>
      </div>
    </div>
  )
}
