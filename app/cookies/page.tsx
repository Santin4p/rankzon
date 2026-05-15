import type { Metadata } from "next"

export const metadata: Metadata = { title: "Política de Cookies" }

export default function Cookies() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1E293B]">Política de Cookies</h1>
      <div className="mt-8 space-y-6 text-[#1E293B]">
        <p className="text-sm text-[#64748B]">Última actualización: mayo de 2026</p>
        <p>
          Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de usuario y analizar el tráfico web.
        </p>
        <h2 className="text-xl font-bold mt-6">Cookies utilizadas</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="text-left p-3 border border-[#E2E8F0]">Cookie</th>
              <th className="text-left p-3 border border-[#E2E8F0]">Proveedor</th>
              <th className="text-left p-3 border border-[#E2E8F0]">Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-[#E2E8F0]">_ga, _ga_*</td>
              <td className="p-3 border border-[#E2E8F0]">Google Analytics</td>
              <td className="p-3 border border-[#E2E8F0]">Analítica anónima de navegación</td>
            </tr>
          </tbody>
        </table>
        <p>
          Puede configurar su navegador para rechazar o eliminar cookies. Tenga en cuenta que esto puede afectar al funcionamiento del sitio.
        </p>
      </div>
    </div>
  )
}
