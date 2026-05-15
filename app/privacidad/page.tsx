import type { Metadata } from "next"

export const metadata: Metadata = { title: "Política de Privacidad" }

export default function Privacidad() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1E293B]">Política de Privacidad</h1>
      <div className="mt-8 space-y-6 text-[#1E293B]">
        <p className="text-sm text-[#64748B]">Última actualización: mayo de 2026</p>
        <p>
          En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD), se informa de la política de privacidad de <strong>rankzon.es</strong>.
        </p>
        <h2 className="text-xl font-bold mt-6">Datos que recopilamos</h2>
        <p>
          Este sitio utiliza Google Analytics 4 para recopilar datos anónimos de navegación (páginas visitadas, tiempo de sesión, dispositivo). Estos datos no permiten identificar a usuarios individuales y se utilizan exclusivamente para mejorar el sitio.
        </p>
        <h2 className="text-xl font-bold mt-6">Derechos del usuario</h2>
        <p>
          Puede ejercer sus derechos de acceso, rectificación, supresión y oposición enviando un correo a{" "}
          <a href="mailto:hola@rankzon.es" className="text-[#2563EB] hover:underline">
            hola@rankzon.es
          </a>.
        </p>
      </div>
    </div>
  )
}
