import Link from "next/link"
import Image from "next/image"
import NavbarDesktopMenu from "@/components/NavbarDesktopMenu"
import NavbarMobileMenu from "@/components/NavbarMobileMenu"

export default function Navbar() {
  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <nav className="relative max-w-6xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Rankzon mascot"
            width={36}
            height={36}
            className="object-contain"
            style={{ mixBlendMode: "multiply" }}
            priority
          />
          <span className="text-xl font-bold text-[#2563EB]">Rankzon</span>
        </Link>
        <NavbarDesktopMenu />
        <NavbarMobileMenu />
      </nav>
    </header>
  )
}
