"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import StarRating from "@/components/StarRating"

interface Producto {
  position: number
  name: string
  image: string
  price: number | null
  rating: number | null
  reviews: number | null
  affiliate_url: string
  badge: string | null
  pros?: string[]
  cons?: string[]
  user_summary?: string
}

const positionBadge: Record<number, string> = {
  1: "bg-amber-400 text-amber-900",
  2: "bg-slate-300 text-slate-700",
  3: "bg-amber-700 text-white",
}

const cardHighlight: Record<number, string> = {
  1: "border-amber-200 bg-amber-50/30",
  2: "border-[#E2E8F0]",
  3: "border-[#E2E8F0]",
}

const hasDetails = (p: Producto) =>
  (p.pros && p.pros.length > 0) || (p.cons && p.cons.length > 0) || !!p.user_summary

export default function ProductTop3Card({ producto }: { producto: Producto }) {
  const [open, setOpen] = useState(false)
  const showToggle = hasDetails(producto)

  return (
    <article
      className={`bg-white border rounded-2xl p-5 sm:p-6 hover:shadow-md transition-all ${cardHighlight[producto.position] ?? "border-[#E2E8F0]"}`}
    >
      <div className="flex gap-4 sm:gap-6 items-start">
        <div
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${positionBadge[producto.position] ?? "bg-[#2563EB] text-white"}`}
          aria-label={`Posición ${producto.position}`}
        >
          {producto.position}
        </div>
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-white rounded-xl overflow-hidden">
          <Image
            src={producto.image}
            alt={producto.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, 112px"
            priority={producto.position === 1}
          />
        </div>
        <div className="flex-1 min-w-0">
          {producto.badge && (
            <span className="inline-block text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full mb-2">
              {producto.badge}
            </span>
          )}
          <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">{producto.name}</h2>
          {producto.rating != null && (
            <div className="mt-1.5">
              <StarRating rating={producto.rating} reviews={producto.reviews} size="md" />
            </div>
          )}
          <p className="mt-1 text-[#64748B] font-medium tabular-nums">
            {producto.price != null
              ? `${producto.price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
              : "Ver precio"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={producto.affiliate_url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block w-full sm:w-auto text-center bg-[#EA580C] hover:bg-[#c2410c] active:scale-95 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              Ver en Amazon
            </Link>
            {showToggle && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors cursor-pointer"
                aria-expanded={open}
              >
                {open ? "Ocultar detalles" : "Ver pros y contras"}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Acordeón */}
      {showToggle && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] mt-5" : "grid-rows-[0fr] mt-0"}`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#E2E8F0] pt-4 grid sm:grid-cols-2 gap-4">
              {producto.pros && producto.pros.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Lo mejor</p>
                  <ul className="space-y-1.5">
                    {producto.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                        <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {producto.cons && producto.cons.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">A mejorar</p>
                  <ul className="space-y-1.5">
                    {producto.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#1E293B]">
                        <svg className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {producto.user_summary && (
              <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Qué dicen los compradores</p>
                <p className="text-sm text-[#1E293B] leading-relaxed">{producto.user_summary}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
