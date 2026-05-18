# Rankzon — CLAUDE.md

> **Next.js version note:** Lee `AGENTS.md` antes de escribir código Next.js — esta versión puede tener breaking changes respecto a tu training data.

Sitio web de rankings curados de productos tech en Amazon España. El usuario busca "los mejores X" y encuentra un top 10 con links de afiliado. Mercado: España (amazon.es). Monetización: Amazon Afiliados → AdSense futuro.

## Stack

- **Framework:** Next.js (SSG — `generateStaticParams` + `getStaticProps`)
- **Hosting:** Vercel (deploy automático en push a `main`)
- **Datos:** JSON estáticos en `/data/[categoria].json`
- **Estilos:** Tailwind CSS
- **Tipografía:** Rubik (headings) + Nunito Sans (body) — Google Fonts
- **Analytics:** Google Analytics 4 + Google Search Console
- **Dominio:** rankzon.es

## Estructura de carpetas

```
rankzon/
├── app/
│   ├── page.tsx                  # Home: Hero + Category Grid
│   ├── mejores/
│   │   └── [categoria]/
│   │       └── page.tsx          # Página de ranking por categoría
│   ├── sobre-rankzon/
│   │   └── page.tsx
│   ├── aviso-legal/page.tsx
│   ├── privacidad/page.tsx
│   └── cookies/page.tsx
├── components/
│   ├── Hero.tsx
│   ├── CategoryGrid.tsx
│   ├── CategoryCard.tsx
│   ├── ProductTop3.tsx           # Top 3 destacado
│   ├── ProductList.tsx           # Lista compacta #4-#10
│   ├── ProductCard.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── data/
│   ├── auriculares.json
│   ├── smartwatches.json
│   ├── altavoces-bluetooth.json
│   └── tablets.json
├── public/
│   └── images/
│       ├── auriculares/
│       ├── smartwatches/
│       ├── altavoces-bluetooth/
│       └── tablets/
└── lib/
    └── categories.ts             # Config central de categorías
```

## Esquema JSON de producto

```json
{
  "position": 1,
  "name": "Sony WH-1000XM5",
  "image": "/images/auriculares/sony-wh1000xm5.webp",
  "price": 279,
  "affiliate_url": "https://www.amazon.es/dp/B09XS7JWHH?tag=rankzon-21",
  "badge": "Mejor valorado",
  "updated_at": "2026-05-01"
}
```

Campos reservados para fase 2 (PA API): `asin`, `description`, `pros[]`, `cons[]`, `rating`, `reviews_count`.

## Convenciones

- **URLs:** `/mejores/[categoria]` — slug en español, sin artículos. Ej: `/mejores/auriculares`
- **Title tag:** `Los 10 Mejores [Categoría] de Amazon en 2026 — Rankzon`
- **Meta description:** única por categoría, incluye keyword principal
- **Imágenes:** WebP, guardadas localmente en `/public/images/`. Fuente: press kits del fabricante (no screenshots de Amazon)
- **Links afiliado:** siempre con `?tag=rankzon-21`, atributo `rel="nofollow sponsored"`, abrir en nueva pestaña
- **Sin comentarios** salvo WHY no obvio

## Design System

- **Estilo:** Minimalism + Vibrant accents
- **Primary:** `#2563EB` — navbar, badges de posición, links
- **Accent:** `#EA580C` — botones "Ver en Amazon" (CTA principal)
- **Background:** `#F8FAFC`
- **Card:** `#FFFFFF`
- **Foreground:** `#1E293B`
- **Muted:** `#64748B` — precio, fecha actualización

## Layout páginas clave

**Home (`/`):**
1. Navbar
2. Hero — headline + subtítulo + CTA "Ver rankings"
3. Strip — 3 trust signals
4. Category Grid — 4 tarjetas con imagen del producto #1
5. Footer

**Categoría (`/mejores/auriculares`):**
1. Navbar
2. H1 + intro (1 párrafo, keyword incluida)
3. Top 3 destacado — más espacio, badges prominentes
4. Lista compacta #4-#10
5. Disclaimer afiliados
6. Footer

**Navbar:** Logo + links de categoría directos. Preparado para colapsar a dropdown cuando supere 6 categorías.

**Footer (medio):** Disclaimer afiliados · Aviso Legal · Privacidad · Cookies · links categorías · email contacto.

## Disclaimer obligatorio (footer, todas las páginas)

> Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.

## Comandos útiles

```bash
npm run dev          # servidor local
npm run build        # build de producción
npm run lint         # linting
```

## Skills recomendados

- `/ui-ux-pro-max` — al construir o revisar cualquier componente
- `/tdd` — para lógica con tests
- `/simplify` — tras implementar una feature
- `/security-review` — antes de deploy a producción
- `/to-issues` — para convertir tareas en issues de GitHub

## Categorías MVP

| Slug | Nombre visible | Estado |
|---|---|---|
| `auriculares` | Auriculares | pendiente |
| `smartwatches` | Smartwatches | pendiente |
| `altavoces-bluetooth` | Altavoces Bluetooth | pendiente |
| `tablets` | Tablets | pendiente |

## Hoja de ruta

- **MVP:** 4 categorías · datos manuales (JSON) · afiliados · legales · GA4
- **Fase 2:** fichas individuales de producto · descripción · pros/contras · ratings
- **Fase 3:** Amazon PA API · actualizaciones automáticas · frecuencia semanal

## Agent skills

### Issue tracker

Issues del repo en GitHub Issues (`Santin4p/rankzon`). Ver `docs/agents/issue-tracker.md`.

### Triage labels

Etiquetas canónicas sin modificar (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). Ver `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` en la raíz + `docs/adr/`. Ver `docs/agents/domain.md`.
