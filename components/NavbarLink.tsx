"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  href: string
  children: React.ReactNode
}

export default function NavbarLink({ href, children }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors pb-0.5 ${
        isActive
          ? "text-[#2563EB] border-b-2 border-[#2563EB]"
          : "text-[#1E293B] hover:text-[#2563EB] border-b-2 border-transparent"
      }`}
    >
      {children}
    </Link>
  )
}
