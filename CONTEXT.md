# Rankzon — Contexto de dominio

## Glosario

- **Sección:** agrupación de categorías del mismo ámbito (`tecnologia`, `electrodomesticos`, `gaming`, `videojuegos`). Tiene URL propia (`/mejores/[seccion]/`) con página hub indexable.
- **Hub page:** página de sección que lista sus categorías. URL: `/mejores/[seccion]/`. Tiene H1 y meta propios para SEO de nivel superior.
- **Ranking:** lista de los 10 mejores productos de una categoría, ordenada por posición (1-10)
- **Categoría:** agrupación de productos del mismo tipo dentro de una sección (auriculares, smartwatches, etc.). URL: `/mejores/[seccion]/[categoria]/`.
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

- Una **sección** contiene una o más **categorías**
- Una **categoría** pertenece a exactamente una **sección**
- Un **ranking** pertenece a una **categoría**
- Un **ranking** contiene exactamente 10 **productos**
- Cada **producto** tiene una **posición** única dentro de su ranking
- Cada **producto** tiene un **link de afiliado** y opcionalmente un **badge**
- El **Top 3** son los productos en posición 1, 2 y 3
- La **lista compacta** son los productos en posición 4 a 10

## Secciones definidas

| Slug | Nombre | Contenido |
|---|---|---|
| `tecnologia` | Tecnología | auriculares, smartwatches, altavoces, tablets, móviles, portátiles... |
| `electrodomesticos` | Electrodomésticos | freidoras de aire, robots aspirador, cafeteras... |
| `gaming` | Gaming | sillas, auriculares gaming, mandos, monitores, periféricos — todo lo del hobby declarado como gaming |
| `videojuegos` | Videojuegos | títulos: mejores juegos PS5, Switch, PC, más vendidos... |

**Regla de clasificación Gaming vs Tecnología:** si el fabricante lo vende como "gaming", va a `gaming`. Si no lleva ese descriptor, va a `tecnologia`. La intención de búsqueda es diferente y justifica rankings independientes.

## Decisiones de diseño relevantes

- El usuario llega por búsqueda SEO ("mejores auriculares 2026") — no por brand
- La conversión es el click en "Ver en Amazon" — no hay carrito ni checkout
- La actualización es mensual (manual) → semanal (automatizada con PA API)
- Los datos viven en JSON, no en base de datos — simplicidad primero
- URLs jerárquicas `/mejores/[seccion]/[categoria]/` — permite hub pages por sección y escala a 20+ categorías
- Home: grid mixto — bloques por sección con sus categorías destacadas debajo (un clic hasta el ranking)
- Navbar: dropdown por sección en desktop, secciones colapsables en móvil
- Formato de `videojuegos` (títulos): decidir cuando se implemente — puede requerir campo `platform`
