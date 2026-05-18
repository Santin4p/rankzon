import Link from "next/link"
import { sections } from "@/lib/categories"

export default function Footer() {
  const activeSections = sections.filter((s) => s.categories.length > 0)

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)_0.8fr] gap-x-6 gap-y-8 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-bold text-primary">Rankzon</span>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Rankings curados de los mejores productos en Amazon España.
            </p>
          </div>

          {activeSections.map((section) => (
            <div key={section.slug}>
              <p className="text-sm font-semibold text-foreground mb-3">{section.name}</p>
              <ul className="space-y-1.5">
                {section.categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/mejores/${section.slug}/${cat.slug}`}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Legal</p>
            <ul className="space-y-1.5">
              {[
                { href: "/sobre-rankzon", label: "Sobre Rankzon" },
                { href: "/aviso-legal", label: "Aviso Legal" },
                { href: "/privacidad", label: "Privacidad" },
                { href: "/cookies", label: "Cookies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-2">
          <p className="text-xs text-muted">
            Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Rankzon · Contacto:{" "}
            <a href="mailto:contacto@rankzon.es" className="hover:text-primary transition-colors">
              contacto@rankzon.es
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
