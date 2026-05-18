import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <span className="inline-block text-xs font-semibold text-primary bg-primary-tint px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
          Amazon España · Actualizado 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Los mejores productos{" "}
          <span className="text-primary">en Amazon España</span>
        </h1>
        <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
          Rankings curados de los más vendidos y mejor valorados. Sin publicidad de pago, sin relleno.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {[
            "Curación manual",
            "Reseñas verificadas",
            "Sin publicidad de pago",
          ].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {text}
            </span>
          ))}
        </div>

        <Link
          href="#categorias"
          className="mt-8 inline-block bg-primary hover:bg-primary-dark active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Ver rankings
        </Link>
      </div>
    </section>
  )
}
