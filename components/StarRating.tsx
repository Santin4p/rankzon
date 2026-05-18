interface StarRatingProps {
  rating: number
  reviews?: number | null
  size?: "sm" | "md"
}

export default function StarRating({ rating, reviews, size = "md" }: StarRatingProps) {
  const isSm = size === "sm"
  const starSize = isSm ? 12 : 14
  const displayValue = Number.isInteger(rating) ? `${rating}.0` : rating.toFixed(1)

  const getStarFill = (n: number) => {
    if (rating >= n) return "full"
    if (rating >= n - 0.75) return "half"
    return "empty"
  }

  return (
    <div className={`flex items-center gap-1 ${isSm ? "text-xs" : "text-sm"}`}>
      <div className="flex items-center gap-0.5" aria-label={`${displayValue} estrellas`}>
        {[1, 2, 3, 4, 5].map((n) => {
          const fill = getStarFill(n)
          const id = `half-${n}-${size}`
          return (
            <svg key={n} width={starSize} height={starSize} viewBox="0 0 20 20" aria-hidden="true">
              {fill === "half" && (
                <defs>
                  <linearGradient id={id}>
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>
              )}
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={fill === "full" ? "#F59E0B" : fill === "half" ? `url(#${id})` : "#E2E8F0"}
              />
            </svg>
          )
        })}
      </div>
      <span className={`font-semibold text-[#1E293B] tabular-nums ${isSm ? "text-xs" : "text-sm"}`}>
        {displayValue}
      </span>
      {reviews != null && !isSm && (
        <span className="text-[#64748B] text-xs">
          ({reviews.toLocaleString("es-ES")})
        </span>
      )}
    </div>
  )
}
