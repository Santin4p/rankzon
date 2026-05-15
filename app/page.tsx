import type { Metadata } from "next"
import Hero from "@/components/Hero"
import CategoryGrid from "@/components/CategoryGrid"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rankzon — Los mejores productos tech en Amazon España",
    description: "Rankings curados de los mejores productos tecnológicos en Amazon España. Actualizado mensualmente.",
    url: "/",
    type: "website",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rankzon",
  url: "https://rankzon.es",
  description: "Rankings curados de los mejores productos tecnológicos en Amazon España. Actualizado mensualmente.",
  inLanguage: "es-ES",
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Hero />
      <CategoryGrid />
    </>
  )
}
