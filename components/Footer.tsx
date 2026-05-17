import Link from "next/link"
import { sections } from "@/lib/categories"

export default function Footer() {
  const activeSections = sections.filter((s) => s.categories.length > 0)

  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-lg font-bold text-[#2563EB]">Rankzon</span>
            <p className="mt-2 text-sm text-[#64748B]">
              Rankings curados de los mejores productos en Amazon España.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1E293B] mb-3">Rankings</p>
            <ul className="space-y-2">
              {activeSections.flatMap((section) =>
                section.categories.map((cat) => (
                  <li key={`${section.slug}-${cat.slug}`}>
                    <Link
                      href={`/mejores/${section.slug}/${cat.slug}`}
                      className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1E293B] mb-3">Legal</p>
            <ul className="space-y-2">
              {[
                { href: "/sobre-rankzon", label: "Sobre Rankzon" },
                { href: "/aviso-legal", label: "Aviso Legal" },
                { href: "/privacidad", label: "Privacidad" },
                { href: "/cookies", label: "Cookies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#64748B] hover:text-[#2563EB] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E2E8F0] pt-6 space-y-2">
          <p className="text-xs text-[#64748B]">
            Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} Rankzon · Contacto:{" "}
            <a href="mailto:contacto@rankzon.es" className="hover:text-[#2563EB] transition-colors">
              contacto@rankzon.es
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
