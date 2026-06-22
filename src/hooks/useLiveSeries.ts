import { useEffect, useState } from 'react'
import { useReducedMotionPref } from './useReducedMotionPref'

/**
 * A self-updating numeric series for "live" demo charts. Shifts in a new point
 * on each interval (random walk within [min, max]). Frozen when reduced-motion.
 */
export function useLiveSeries(
  seed: number[],
  { interval = 1800, min = 0, max = 100, volatility = 0.18 } = {},
) {
  const reduced = useReducedMotionPref()
  const [data, setData] = useState(seed)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1] ?? (min + max) / 2
        let next = last + (Math.random() - 0.5) * (max - min) * volatility * 2
        if (next < min) next = min + Math.random() * (max - min) * 0.12
        if (next > max) next = max - Math.random() * (max - min) * 0.12
        return [...prev.slice(1), Math.round(next * 10) / 10]
      })
    }, interval)
    return () => clearInterval(id)
  }, [reduced, interval, min, max, volatility])

  return data
}
