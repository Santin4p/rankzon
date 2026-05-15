"use client"
import { useState } from "react"
import Link from "next/link"
import { categories } from "@/lib/categories"

export default function NavbarMobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden ml-auto">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? (
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E2E8F0] shadow-md z-50 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/mejores/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#1E293B] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
