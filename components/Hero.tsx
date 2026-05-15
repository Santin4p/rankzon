import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight">
          Los mejores productos tech{" "}
          <span className="text-[#2563EB]">en Amazon España</span>
        </h1>
        <p className="mt-4 text-lg text-[#64748B] max-w-xl mx-auto">
          Rankings curados mensualmente para que encuentres lo que buscas sin perder tiempo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-[#64748B]">
          {["Actualizado mensualmente", "Curación manual", "Sin publicidad de pago"].map((text) => (
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
          className="mt-8 inline-block bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Ver rankings
        </Link>
      </div>
    </section>
  )
}
