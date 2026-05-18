import Link from "next/link"
import { sections } from "@/lib/categories"

export default function Hero() {
  const totalCategories = sections.reduce((acc, s) => acc + s.categories.length, 0)
  const totalProducts = totalCategories * 10

  return (
    <section className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <span className="inline-block text-xs font-semibold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          Amazon España · Actualizado 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight">
          Los mejores productos{" "}
          <span className="text-[#2563EB]">en Amazon España</span>
        </h1>
        <p className="mt-4 text-lg text-[#64748B] max-w-xl mx-auto">
          Rankings curados de los más vendidos y mejor valorados. Sin publicidad de pago, sin relleno.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#64748B]">
          {[
            "Curación manual",
            "Reseñas verificadas",
            "Sin publicidad de pago",
          ].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#2563EB] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {text}
            </span>
          ))}
        </div>

        <Link
          href="#categorias"
          className="mt-8 inline-block bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Ver rankings
        </Link>

        <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[
            { value: totalCategories, label: "categorías" },
            { value: `+${totalProducts}`, label: "productos" },
            { value: "4", label: "secciones" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-[#1E293B] tabular-nums">{value}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
