import { cn } from '@/lib/cn'

/** Dependency-free SVG line/area chart. Color follows `currentColor`. */
export function Sparkline({
  data,
  className,
  area = true,
  height = 40,
}: {
  data: number[]
  className?: string
  area?: boolean
  height?: number
}) {
  const w = 100
  const h = height
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = w / (data.length - 1)
  const y = (d: number) => h - ((d - min) / range) * (h - 4) - 2

  const line = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${(i * stepX).toFixed(2)},${y(d).toFixed(2)}`)
    .join(' ')
  const fill = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height }}
      aria-hidden
    >
      {area && <path d={fill} className="fill-current opacity-10" />}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
