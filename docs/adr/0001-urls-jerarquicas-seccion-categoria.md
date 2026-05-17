# ADR-0001: URLs jerárquicas `/mejores/[seccion]/[categoria]`

**Estado:** Aceptado  
**Fecha:** 2026-05-17

---

## Contexto

El sitio arrancó con 4 categorías planas (`/mejores/auriculares`, `/mejores/smartwatches`, etc.). La decisión de escalar a 20+ categorías agrupadas en secciones temáticas (`tecnologia`, `electrodomesticos`, `gaming`, `videojuegos`) obligó a elegir estructura de URLs antes de seguir añadiendo contenido.

## Decisión

URLs jerárquicas con sección como nivel intermedio:

```
/mejores/[seccion]/            ← hub page de sección (indexable, SEO propio)
/mejores/[seccion]/[categoria] ← página de ranking
```

## Alternativa descartada

**URLs planas** `/mejores/[categoria]` — más simples, sin migración, pero no escalan visualmente ni permiten hub pages de sección con keywords de nivel superior ("mejores electrodomésticos 2026").

## Consecuencias

- Las 4 URLs existentes se migran con redirects 301 a su nueva ruta bajo `tecnologia`
- Se añade una ruta `app/mejores/[seccion]/page.tsx` para las hub pages
- La ruta de categoría pasa a `app/mejores/[seccion]/[categoria]/page.tsx`
- `lib/categories.ts` necesita el concepto de `Sección` con sus categorías hijas
- El navbar evoluciona a dropdown por sección (desktop) y colapsable (móvil)
- Coste de cambiar de opinión: alto — implicaría nuevos 301s y pérdida de link equity acumulado
