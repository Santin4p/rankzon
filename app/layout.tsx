import type { Metadata } from "next"
import { Rubik, Nunito_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CookieConsent from "@/components/CookieConsent"

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rankzon.es"),
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
    <html lang="es" className={`${rubik.variable} ${nunitoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
