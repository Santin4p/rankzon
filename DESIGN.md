---
name: Rankzon
description: Rankings curados de los mejores productos en Amazon España
colors:
  primary: "oklch(44% 0.24 238)"
  primary-dark: "oklch(38% 0.24 238)"
  primary-tint: "oklch(96% 0.035 238)"
  accent: "oklch(56% 0.17 44)"
  accent-dark: "oklch(49% 0.17 44)"
  background: "#F8FAFC"
  card: "#FFFFFF"
  foreground: "#1E293B"
  muted: "#475569"
  border: "#E2E8F0"
typography:
  display:
    fontFamily: "Rubik, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "Rubik, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Rubik, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  "2xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
  chip-label:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "2px 12px"
  card-category:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-product:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  row-compact:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Rankzon

## 1. Overview

**Creative North Star: "El Criterio Curado"**

Rankzon es la voz del amigo que sabe de tecnología: opina sin rodeos, elige sin patrocinios, y te ahorra horas de research. El sistema visual traduce eso en densidad de datos sin ruido decorativo. Cada píxel que no informa, no existe. El fondo casi-blanco (`#F8FAFC`) es papel; la tinta oscura (`#1E293B`) es criterio; el azul eléctrico-añil es el acento de confianza editorial; el cobre cálido es el empuje hacia la acción.

La paleta usa OKLCH como doctrina. Los valores de primary (`oklch(44% 0.24 238)`) y accent (`oklch(56% 0.17 44)`) están desplazados intencionalmente de los defaults de Tailwind: el azul 26° hacia cyan (lejos del morado corporativo de blue-600), el cobre 14° hacia ámbar (lejos del naranja de alarma de orange-600). No son colores de "sitio de afiliados genérico".

El sistema rechaza explícitamente: plantillas WordPress de afiliados circa 2015 (gradientes morados/naranja saturado, shadow-xl en todo), el exceso editorial de Wirecutter (texto denso, sin jerarquía visual rápida), y el ruido publicitario de TechRadar/PCMag (superficies llenas de banners, sin zona de respiro).

**Key Characteristics:**
- Escaneabilidad antes que lectura: posición > nombre > precio > CTA visible en < 3 segundos
- Datos sobre decoración: precio, rating, reseñas son trust signals, no acompañamiento
- Un solo CTA: "Ver en Amazon" en cobre. Todo lo demás es contexto
- Flat by default: las sombras aparecen solo en hover, nunca en reposo
- OKLCH-only: todos los colores de marca en formato perceptualmente uniforme

## 2. Colors: La Paleta del Criterio

Dos colores de marca (azul-añil para confianza editorial, cobre para acción), neutrales con ligera temperatura cálida, sin colores secundarios decorativos.

### Primary
- **Azul Eléctrico-Añil** (`oklch(44% 0.24 238)`): El color de la marca. Navbar logo, links activos, badges de categoría, active states en nav, checkmarks de trust signals. Aparece en ≤ 15% de cualquier pantalla. Su escasez es lo que hace que señale "aquí confías".
- **Azul-Añil Profundo** (`oklch(38% 0.24 238)`): Hover del primary. Solo en estados de interacción, nunca en reposo.
- **Tinte Añil** (`oklch(96% 0.035 238)`): Fondo de chips/badges del primary. Fondo de nav item activo. Sigue al primary automáticamente via token.

### Secondary
- **Cobre Editorial** (`oklch(56% 0.17 44)`): El único CTA de conversión: "Ver en Amazon" y "Ver ranking →". Prohibido para cualquier otro uso. Su exclusividad le da peso.
- **Cobre Oscuro** (`oklch(49% 0.17 44)`): Hover del accent. Solo en estados interactivos.

### Neutral
- **Blanco Papel** (`#F8FAFC`): Fondo global. No es blanco puro — tiene 0.5% de temperatura fría que evita la crudeza de `#fff` sin enfriar la lectura.
- **Blanco Tarjeta** (`#FFFFFF`): Superficie de cards, navbar, footer. Un paso por encima del fondo.
- **Tinta Oscura** (`#1E293B`): Todo el texto primario. Casi negro con componente azul — la tinta del periódico de calidad.
- **Gris Pizarra** (`#475569`): Texto secundario: precios, fechas, descripciones, labels uppercase. Contraste 6.66:1 sobre `#F8FAFC` — pasa WCAG AA y AAA.
- **Línea Suave** (`#E2E8F0`): Bordes, separadores, divisores. Visible sin competir. Usado en `border-border`.

**La Regla del Cobre Único.** El accent cobre aparece exclusivamente en CTAs de conversión directa: "Ver en Amazon →" y "Ver ranking →". Nunca en decoración, iconos informativos, ni estados neutros. Si algo es cobre, el usuario sabe que lleva a Amazon.

**La Regla del Azul Escaso.** El primary azul ocupa ≤ 15% de cualquier pantalla. Su uso en el logo, nav activo, y badges es suficiente para orientar sin dominar. No colorear headings, párrafos, ni fondos de sección con primary.

## 3. Typography

**Display Font:** Rubik (Google Fonts, subsets: latin, weights: 400/500/600/700)
**Body Font:** Nunito Sans (Google Fonts, subsets: latin, weights: 400/600/700)

**Character:** Rubik aporta la autoridad redondeada de los rankings: geométrico, bold, sin serifa intimidante. Nunito Sans complementa con legibilidad amable para listas largas de productos. La pareja funciona porque Rubik manda y Nunito Sans obedece — no compiten.

### Hierarchy
- **Display** (700, `clamp(1.875rem, 4vw, 2.25rem)`, lh 1.2): H1 de páginas de categoría y hub pages. "Los 10 Mejores Auriculares de Amazon en 2026". Escala fija en rem, no fluida.
- **Headline** (700, `1.5rem`, lh 1.3): H2 de sección: "Rankings por categoría", headings de guías de compra.
- **Title** (700, `1.125rem`, lh 1.4): H3 de sección en home, nombres de categoría en CategoryCard, nombres de producto en ProductTop3Card.
- **Body** (400, `1rem`, lh 1.6, max `65ch`): Descripciones de categoría, intros de hub page, guías de compra. Limitar línea a 65-75ch en bloques de texto continuo.
- **Label** (600, `0.75rem`, lh 1, `0.05em` letter-spacing, uppercase): "TOP 10", "LO MEJOR", "A MEJORAR", "POSICIONES 4–10". Siempre en texto muted o primary, nunca en foreground.

**La Regla de los Dos Roles.** Rubik solo en headings (`h1–h6`). Nunito Sans en todo lo demás: precios, descripciones, labels, botones, footer. El mixing se gestiona via CSS global (`h1-h6 { font-family: var(--font-rubik) }`), no via clases individuales.

## 4. Elevation

Flat by default. Las superficies en reposo no tienen sombra. La profundidad se comunica mediante capas de color: fondo (`#F8FAFC`) < tarjeta (`#FFFFFF`) < navbar (`#FFFFFF` + `border-bottom`). Esta jerarquía tonal es suficiente para los tres planos que necesita el site.

Las sombras aparecen exclusivamente como respuesta al hover, indicando que un elemento es interactivo y está "levantado" por la atención del usuario.

### Shadow Vocabulary
- **Hover Lift** (`0 4px 16px rgba(0,0,0,0.08)`): Aparece en CategoryCard y ProductTop3Card al hacer hover. Implementado como `hover:shadow-md` en Tailwind. Difuso, poco contraste — eleva sin dramatizar.

**La Regla Flat-By-Default.** Ninguna superficie lleva sombra en estado de reposo. Si un diseño nuevo incluye `box-shadow` en el estado estático de un componente, está mal. La sombra solo comunica estado, no jerarquía estructural.

## 5. Components

### Buttons
- **Shape:** Redondeado suave (8px). `rounded-lg` en Tailwind. No pill, no square.
- **Primary (Ver en Amazon):** Fondo cobre editorial (`oklch(56% 0.17 44)`), texto blanco, `font-semibold`, padding `12px 20px` mínimo (≥ 44px altura para touch). En desktop: `inline-block`. En mobile: `block w-full`.
- **Hover:** Fondo cobre oscuro (`oklch(49% 0.17 44)`), `transition-colors 150ms ease-out`.
- **Active:** `scale(0.97)` via `active:scale-95`.
- **Focus visible:** `outline: 2px solid primary`, `outline-offset: 2px`.
- No hay botones secundarios ni ghost en el sistema actual.

### Chips y Badges
- **Label chip** (badge, categoría): Fondo `primary-tint`, texto `primary`, `font-semibold`, `text-xs`, `rounded-full`, padding `2px 8-12px`. Usado en "Más vendido", "Mejor relación calidad/precio", "Amazon España · Actualizado 2026".
- **Position badge** (posición 1-3): Círculo 40×40px, `rounded-full`. Colores semánticos: posición 1 = `bg-amber-400 text-amber-900`; posición 2 = `bg-slate-300 text-slate-700`; posición 3 = `bg-amber-700 text-white`. Posiciones 4-10: `bg-background border-border text-muted`.
- Los colores del position badge son semánticos (oro/plata/bronce), no tokens de marca. No modificarlos.

### Cards / Containers
- **CategoryCard:** `rounded-2xl` (16px), `bg-card`, `border border-border`, padding `24px`. Hover: `border-primary + shadow-md`, `transition-[colors,shadow]`. El link envuelve toda la card — área de tap completa.
- **ProductTop3Card:** `rounded-2xl`, `bg-card`, `border`. Posición 1 con highlight `border-amber-200 bg-amber-50/30` para diferenciación visual. Acordeón interno con `transition-[grid-template-rows]`.
- **Compact Row (posiciones 4-10):** `rounded-xl` (12px), `bg-card`, `border border-border`, padding `12-16px`. Hover: `border-primary transition-colors`. Layout: flex row con position badge + imagen + texto + CTA.
- **Regla sin cards anidadas.** El acordeón de pros/contras usa `bg-background border-border rounded-xl` como recuadro interior del card — esto es el límite máximo de nesting. Nunca un card dentro de un card dentro de un card.

### Navigation
- **Navbar:** `bg-card`, `border-b border-border`, sticky top-0, altura 64px. Logo en `text-primary font-bold text-xl` (Rubik). Links de sección con padding `8px 12px`, `rounded-lg`, hover `bg-primary-tint text-primary`, active state `bg-primary-tint text-primary`.
- **Dropdown desktop:** CSS `group-hover:block group-focus-within:block`. Panel `bg-card border-border rounded-xl shadow-lg`. Items con hover `bg-background text-primary`.
- **Mobile menu:** Toggle hamburger (44×44px touch target con `p-3`). Secciones como botones acordeón. Categorías como links indentados. Cierra al navegar con `onClick={() => { setOpen(false); setOpenSection(null) }}`.

### Signature: ProductTop3Card Accordion
El acordeón de pros/contras es el componente más complejo del sistema. Usa `grid-template-rows: 0fr → 1fr` con `transition-[grid-template-rows] 300ms ease-out` para la animación de apertura. El trigger es un `<button>` con `aria-expanded`. Las listas usan iconos SVG: checkmark verde (`text-emerald-500`) para pros, X roja (`text-rose-400`) para contras. El resumen de compradores va en recuadro `bg-background border-border rounded-xl`.

## 6. Do's and Don'ts

### Do:
- **Do** usar `text-primary` para orientar (logo, nav activo, links informativos) y `text-accent` / `bg-accent` exclusivamente para CTAs de conversión. La distinción es la interfaz.
- **Do** mostrar precio, rating y número de reseñas juntos en cada producto. Los tres datos juntos son el trust signal. Ninguno solo es suficiente.
- **Do** mantener el H1 de cada página de ranking con la keyword exacta: "Los 10 Mejores [Categoría] de Amazon en 2026". El SEO y la UX coinciden aquí.
- **Do** usar `sr-only` en todos los `target="_blank"`: "Ver [nombre] en Amazon (se abre en nueva pestaña)". Los CTAs sin contexto no existen para AT.
- **Do** mantener los touch targets ≥ 44px en todos los elementos interactivos. El site convierte en mobile.
- **Do** aplicar `rel="nofollow sponsored noopener noreferrer"` en todos los links de afiliado, siempre.
- **Do** usar tokens (`text-primary`, `text-muted`, `border-border`) en lugar de hex hardcoded. Cambiar una paleta es una línea en `globals.css`.
- **Do** escalar sombras con el estado: sin sombra en reposo, `shadow-md` en hover, nunca `shadow-xl` ni `shadow-2xl`.

### Don't:
- **Don't** usar el accent cobre (`text-accent`, `bg-accent`) fuera de CTAs de conversión. Ni en iconos informativos, ni en texto de categoría, ni en decoración. El cobre = "ir a Amazon", siempre.
- **Don't** añadir el hero-metrics template: tres números grandes con labels pequeños bajo el H1. Está prohibido en el sistema (anti-pattern de SaaS). Los trust signals son texto + icono check, no estadísticas del propio site.
- **Don't** crear sombras en reposo. Cualquier `box-shadow` estático en un card o panel está mal. Las sombras son respuesta al hover, no decoración estructural.
- **Don't** usar gradient text (`background-clip: text`). Nunca, por ningún motivo.
- **Don't** animar propiedades de layout salvo `grid-template-rows` en el acordeón existente (caso documentado y aceptado). Nada más.
- **Don't** mezclar Rubik en body text ni Nunito Sans en headings. Los dos roles están definidos en CSS global y no se sobreescriben en componentes individuales.
- **Don't** copiar el estilo de Wirecutter (texto denso sin jerarquía visual rápida), TechRadar/PCMag (superficies con ruido publicitario) ni plantillas WordPress de afiliados circa 2015 (gradientes morado-naranja, bordes decorativos de colores, tarjetas con stripe izquierdo de color).
- **Don't** usar `transition-all`. Especificar siempre qué propiedad transiciona: `transition-colors`, `transition-[colors,shadow]`, `transition-[grid-template-rows]`.
- **Don't** añadir dark mode sin rediseñar la paleta completa. La escena física del usuario (tarde de sábado, móvil, comparando antes de comprar) justifica el light mode. No añadir dark mode por moda.
