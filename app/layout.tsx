import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CookieConsent from "@/components/CookieConsent"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rankzon.es"),
  title: {
    default: "Rankzon — Los mejores productos tech en Amazon España",
    template: "%s — Rankzon",
  },
  description: "Rankings curados de los mejores productos tecnológicos en Amazon España. Actualizado mensualmente.",
  openGraph: {
    siteName: "Rankzon",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "g96-x_ZyGqGYU2YIHrclN-b3ygKJrfqc_1w5FTdv2SI",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
