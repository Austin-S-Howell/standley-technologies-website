import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { useLiveSeries } from '@/hooks/useLiveSeries'
import { BrowserFrame } from './BrowserFrame'
import { Sparkline } from './Sparkline'

const fmtM = (v: number) => `$${v.toFixed(2)}M`
const fmtNum = (v: number) => Math.round(v).toLocaleString()
const fmtUsd = (v: number) => `$${Math.round(v)}`

type Kpi = { label: string; target: number; format: (v: number) => string; delta: string; up: boolean }

const KPIS: Kpi[] = [
  { label: 'Revenue', target: 1.28, format: fmtM, delta: '8.2%', up: true },
  { label: 'Orders', target: 3942, format: fmtNum, delta: '5.1%', up: true },
  { label: 'Avg. order', target: 326, format: fmtUsd, delta: '2.4%', up: true },
  { label: 'Active accts', target: 412, format: fmtNum, delta: '1.2%', up: false },
]

const CATEGORIES = [
  { name: 'Software', pct: 46, color: '#2f6b4f' },
  { name: 'Cloud', pct: 34, color: '#7c9885' },
  { name: 'Support', pct: 20, color: '#c9a84c' },
]

function KpiCard({ kpi }: { kpi: Kpi }) {
  const { ref, value } = useCountUp(kpi.target)
  const Arrow = kpi.up ? ArrowUpRight : ArrowDownRight
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-0 p-2">
      <div className="truncate text-[10px] text-neutral-500">{kpi.label}</div>
      <span ref={ref} className="font-display text-base font-semibold text-neutral-900">
        {kpi.format(value)}
      </span>
      <div
        className={cn(
          'flex items-center gap-0.5 text-[10px] font-medium',
          kpi.up ? 'text-success-500' : 'text-error-500',
        )}
      >
        <Arrow className="h-3 w-3" aria-hidden /> {kpi.delta}
      </div>
    </div>
  )
}

function Donut() {
  const C = 2 * Math.PI * 15
  let offset = 0
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-14 w-14 shrink-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="15" fill="none" stroke="#eef1ee" strokeWidth="6" />
        {CATEGORIES.map((c) => {
          const len = (c.pct / 100) * C
          const el = (
            <circle
              key={c.name}
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke={c.color}
              strokeWidth="6"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <ul className="flex-1 space-y-0.5">
        {CATEGORIES.map((c) => (
          <li key={c.name} className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
            <span className="font-medium text-neutral-800">{c.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PowerBiBadge() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex items-end gap-[1.5px]" aria-hidden>
        <span className="h-2 w-[3px] rounded-[1px] bg-[#F2C811]" />
        <span className="h-2.5 w-[3px] rounded-[1px] bg-[#F2C811]" />
        <span className="h-3 w-[3px] rounded-[1px] bg-[#F2C811]" />
      </span>
      <span className="text-[10px] font-semibold text-neutral-600">Power BI</span>
    </span>
  )
}

export function PowerBiPortalDemo({ className }: { className?: string }) {
  const cols = useLiveSeries([55, 68, 60, 75, 70, 82, 78, 88, 84, 92, 86, 95], {
    min: 45,
    max: 100,
    interval: 2400,
    volatility: 0.22,
  })
  const trend = useLiveSeries([60, 64, 61, 68, 66, 72, 70, 76, 74, 80], {
    min: 52,
    max: 88,
    interval: 1900,
  })

  return (
    <BrowserFrame title="portal.acme.com · analytics" className={className}>
      {/* Portal header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-summit-700 text-[11px] font-bold text-neutral-0">
            A
          </span>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Acme Co</div>
            <div className="text-[10px] text-neutral-500">Client Portal</div>
          </div>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-200 text-[10px] font-semibold text-summit-800">
          JD
        </span>
      </div>

      {/* Slicers */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Region: All', 'FY 2026', 'Segment: Enterprise'].map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-0 px-2 py-0.5 text-[10px] text-neutral-600"
          >
            {s}
            <ChevronDown className="h-3 w-3 text-neutral-400" aria-hidden />
          </span>
        ))}
      </div>

      {/* KPIs */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} kpi={k} />
        ))}
      </div>

      {/* Embedded Power BI report */}
      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-0 px-3 py-2">
          <span className="text-xs font-semibold text-neutral-800">Sales Overview</span>
          <PowerBiBadge />
        </div>

        <div className="grid gap-2 p-2 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-neutral-0 p-2.5">
            <div className="text-[10px] font-medium text-neutral-600">Revenue by month</div>
            <div className="mt-2 flex h-20 items-end gap-0.5">
              {cols.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-sage-400 to-summit-500 transition-[height] duration-700 ease-summit"
                  style={{ height: `${c}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-0 p-2.5">
            <div className="text-[10px] font-medium text-neutral-600">Sales by category</div>
            <div className="mt-2">
              <Donut />
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-0 p-2.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-neutral-600">Revenue trend · 30d</span>
              <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-500" /> live
              </span>
            </div>
            <div className="mt-1 text-summit-600">
              <Sparkline data={trend} height={42} />
            </div>
          </div>
        </div>

        {/* Power BI page bar */}
        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-100 px-3 py-1.5">
          <div className="flex gap-1 text-[10px]">
            <span className="rounded bg-neutral-0 px-2 py-0.5 font-medium text-neutral-700 shadow-sm">
              Overview
            </span>
            <span className="px-2 py-0.5 text-neutral-500">Sales</span>
            <span className="hidden px-2 py-0.5 text-neutral-500 sm:inline">Customers</span>
          </div>
          <span className="text-[10px] text-neutral-400">Page 1 of 3</span>
        </div>
      </div>
    </BrowserFrame>
  )
}
