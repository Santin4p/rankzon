"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sections } from "@/lib/categories"

export default function NavbarDesktopMenu() {
  const pathname = usePathname()
  const activeSections = sections.filter((s) => s.categories.length > 0)

  return (
    <ul className="hidden md:flex items-center gap-1">
      {activeSections.map((section) => {
        const isActive = pathname.startsWith(`/mejores/${section.slug}`)
        return (
          <li key={section.slug} className="relative group">
            <Link
              href={`/mejores/${section.slug}`}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                isActive
                  ? "text-[#2563EB] bg-blue-50"
                  : "text-[#1E293B] hover:text-[#2563EB] hover:bg-[#F8FAFC]"
              }`}
            >
              {section.name}
              <svg className="w-3 h-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50">
              <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-2 min-w-[180px]">
                {section.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/mejores/${section.slug}/${cat.slug}`}
                    className="block px-3 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] hover:text-[#2563EB] rounded-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
