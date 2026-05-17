import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: "/mejores/auriculares", destination: "/mejores/tecnologia/auriculares", permanent: true },
      { source: "/mejores/smartwatches", destination: "/mejores/tecnologia/smartwatches", permanent: true },
      { source: "/mejores/altavoces-bluetooth", destination: "/mejores/tecnologia/altavoces-bluetooth", permanent: true },
      { source: "/mejores/tablets", destination: "/mejores/tecnologia/tablets", permanent: true },
    ]
  },
}

export default nextConfig
