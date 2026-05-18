"use client"

import { useState } from "react"
import Link from "next/link"
import { sections } from "@/lib/categories"

export default function NavbarMobileMenu() {
  const [open, setOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const activeSections = sections.filter((s) => s.categories.length > 0)

  return (
    <div className="md:hidden ml-auto">
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-lg text-foreground hover:bg-background transition-colors cursor-pointer"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-nav"
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
        <div id="mobile-nav" className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-md z-50 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {activeSections.map((section) => (
              <li key={section.slug}>
                <button
                  onClick={() => setOpenSection(openSection === section.slug ? null : section.slug)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-background hover:text-primary transition-colors cursor-pointer"
                >
                  {section.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${openSection === section.slug ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSection === section.slug && (
                  <ul className="mt-1 ml-3 space-y-0.5">
                    <li>
                      <Link
                        href={`/mejores/${section.slug}`}
                        onClick={() => { setOpen(false); setOpenSection(null) }}
                        className="block px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-background transition-colors"
                      >
                        Ver todos →
                      </Link>
                    </li>
                    {section.categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/mejores/${section.slug}/${cat.slug}`}
                          onClick={() => { setOpen(false); setOpenSection(null) }}
                          className="block px-3 py-2 rounded-lg text-sm text-foreground hover:bg-background hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
