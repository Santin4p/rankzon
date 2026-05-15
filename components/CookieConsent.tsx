"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GoogleAnalytics } from "@next/third-parties/google"

export default function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent") as "accepted" | "rejected" | null
    if (stored) {
      setConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem("cookie_consent", "accepted")
    setConsent("accepted")
    setVisible(false)
  }

  function reject() {
    localStorage.setItem("cookie_consent", "rejected")
    setConsent("rejected")
    setVisible(false)
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId="G-6L4KEDLXCZ" />}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm text-[#1E293B]">
              Usamos cookies de analítica (Google Analytics) para mejorar el sitio. No se comparten datos con terceros.{" "}
              <Link href="/cookies" className="text-[#2563EB] hover:underline">
                Política de cookies
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={reject}
                className="text-sm font-semibold text-[#64748B] hover:text-[#1E293B] px-4 py-2 rounded-lg border border-[#E2E8F0] hover:border-[#94A3B8] transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] px-4 py-2 rounded-lg transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
