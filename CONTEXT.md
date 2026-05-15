# Rankzon — Contexto de dominio

## Glosario

- **Ranking:** lista de los 10 mejores productos de una categoría, ordenada por posición (1-10)
- **Categoría:** agrupación de productos del mismo tipo (auriculares, smartwatches, etc.)
- **Posición:** número del 1 al 10 que indica el lugar de un producto en su ranking
- **Badge:** etiqueta opcional sobre un producto ("Mejor valorado", "Mejor calidad-precio", "Elección premium")
- **Link de afiliado:** URL a Amazon con el tag `?tag=rankzon-21` que genera comisión si el usuario compra
- **Curación manual:** proceso de seleccionar y ordenar los 10 productos de cada categoría a mano
- **PA API:** Amazon Product Advertising API — fuente de datos automática en fase 2
- **Top 3:** los tres primeros productos del ranking, con presentación visual destacada
- **Lista compacta:** los productos del #4 al #10, en formato más reducido
- **Press kit:** recursos de imagen oficiales del fabricante, de uso libre para prensa
- **Trust signal:** elemento que refuerza la credibilidad del sitio (actualización mensual, curación manual, sin publicidad de pago)
- **Disclaimer de afiliados:** texto legal obligatorio que indica la relación comercial con Amazon
- **E-E-A-T:** Experience, Expertise, Authority, Trust — criterios de calidad de Google para ranking SEO

## Relaciones clave

- Un **ranking** pertenece a una **categoría**
- Un **ranking** contiene exactamente 10 **productos**
- Cada **producto** tiene una **posición** única dentro de su ranking
- Cada **producto** tiene un **link de afiliado** y opcionalmente un **badge**
- El **Top 3** son los productos en posición 1, 2 y 3
- La **lista compacta** son los productos en posición 4 a 10

## Decisiones de diseño relevantes

- El usuario llega por búsqueda SEO ("mejores auriculares 2026") — no por brand
- La conversión es el click en "Ver en Amazon" — no hay carrito ni checkout
- La actualización es mensual (manual) → semanal (automatizada con PA API)
- Los datos viven en JSON, no en base de datos — simplicidad primero
