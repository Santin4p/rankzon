import type { Metadata } from "next"

export const metadata: Metadata = { title: "Aviso Legal" }

export default function AvisoLegal() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1E293B]">Aviso Legal</h1>
      <div className="mt-8 space-y-6 text-[#1E293B]">
        <p className="text-sm text-[#64748B]">Última actualización: mayo de 2026</p>
        <p>
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilitan los siguientes datos del titular del sitio web <strong>rankzon.es</strong>.
        </p>
        <p>
          Para cualquier consulta, puede contactar a través del correo electrónico:{" "}
          <a href="mailto:hola@rankzon.es" className="text-[#2563EB] hover:underline">
            hola@rankzon.es
          </a>
        </p>
        <p>
          El acceso y uso de este sitio web implica la aceptación de las condiciones de uso establecidas. El titular se reserva el derecho a modificar el contenido del sitio web en cualquier momento y sin previo aviso.
        </p>
      </div>
    </div>
  )
}
