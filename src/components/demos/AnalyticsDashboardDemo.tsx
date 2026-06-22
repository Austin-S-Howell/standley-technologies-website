import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { useLiveSeries } from '@/hooks/useLiveSeries'
import { BrowserFrame } from './BrowserFrame'
import { Sparkline } from './Sparkline'

const currency = (v: number) => `$${Math.round(v).toLocaleString()}`
const number = (v: number) => Math.round(v).toLocaleString()
const percent = (v: number) => `${v.toFixed(1)}%`

type Kpi = {
  label: string
  target: number
  format: (v: number) => string
  delta: string
  up: boolean
  data: number[]
  accent: string
}

const KPIS: Kpi[] = [
  {
    label: 'Revenue',
    target: 48250,
    format: currency,
    delta: '12.4%',
    up: true,
    data: [30, 36, 33, 40, 44, 42, 48],
    accent: 'text-summit-600',
  },
  {
    label: 'Active users',
    target: 2847,
    format: number,
    delta: '5.1%',
    up: true,
    data: [20, 24, 22, 28, 26, 31, 34],
    accent: 'text-summit-600',
  },
  {
    label: 'Churn',
    target: 1.9,
    format: percent,
    delta: '0.4%',
    up: false,
    data: [3, 2.7, 2.8, 2.4, 2.2, 2.0, 1.9],
    accent: 'text-summit-600',
  },
]

function KpiCard({ kpi }: { kpi: Kpi }) {
  const { ref, value } = useCountUp(kpi.target)
  const good = kpi.label === 'Churn' ? !kpi.up : kpi.up
  const Arrow = kpi.up ? ArrowUpRight : ArrowDownRight
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-0 p-2.5">
      <span className="text-[11px] font-medium text-neutral-500">{kpi.label}</span>
      <div className="mt-1 flex items-end justify-between gap-1.5">
        <span ref={ref} className="font-display text-base font-semibold text-neutral-900">
          {kpi.format(value)}
        </span>
        <div className={cn('w-10 shrink-0', kpi.accent)}>
          <Sparkline data={kpi.data} height={18} area={false} />
        </div>
      </div>
      <span
        className={cn(
          'mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium',
          good ? 'text-success-500' : 'text-error-500',
        )}
      >
        <Arrow className="h-3 w-3" aria-hidden /> {kpi.delta}
      </span>
    </div>
  )
}

const SOURCES = [
  { name: 'Organic search', pct: 52, color: 'text-summit-600', stroke: '#2f6b4f' },
  { name: 'Direct', pct: 31, color: 'text-sage-400', stroke: '#9aa99a' },
  { name: 'Referral', pct: 17, color: 'text-gold-500', stroke: '#caa53d' },
]

function Donut() {
  const C = 2 * Math.PI * 16
  let offset = 0
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-16 w-16 shrink-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="16" fill="none" stroke="#eef1ee" strokeWidth="6" />
        {SOURCES.map((s) => {
          const len = (s.pct / 100) * C
          const dash = `${len} ${C - len}`
          const el = (
            <circle
              key={s.name}
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={s.stroke}
              strokeWidth="6"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <ul className="flex-1 space-y-1">
        {SOURCES.map((s) => (
          <li key={s.name} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-600">
              <span className={cn('h-2 w-2 rounded-full bg-current', s.color)} aria-hidden />
              {s.name}
            </span>
            <span className="font-medium text-neutral-800">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ORDERS = [
  { id: '#1042', name: 'Marcus Reed', amount: '$1,280', status: 'Paid' },
  { id: '#1041', name: 'Lena Park', amount: '$640', status: 'Pending' },
  { id: '#1040', name: 'Devon Ellis', amount: '$2,150', status: 'Paid' },
  { id: '#1039', name: 'Priya Nair', amount: '$390', status: 'Refunded' },
] as const

const STATUS: Record<string, string> = {
  Paid: 'bg-success-50 text-success-500',
  Pending: 'bg-warning-500/10 text-warning-500',
  Refunded: 'bg-neutral-100 text-neutral-500',
}

const NAV = [
  { icon: LayoutDashboard, active: true },
  { icon: BarChart3, active: false },
  { icon: Users, active: false },
  { icon: CreditCard, active: false },
  { icon: Settings, active: false },
]

export function AnalyticsDashboardDemo({ className }: { className?: string }) {
  const revenue = useLiveSeries([42, 45, 43, 48, 46, 52, 49, 55, 53, 58], {
    min: 38,
    max: 64,
    interval: 2000,
  })

  return (
    <BrowserFrame title="app.clientdashboard.io" className={className}>
      <div className="flex gap-3">
        <nav className="flex w-9 shrink-0 flex-col items-center gap-1 rounded-xl bg-summit-950 py-2">
          {NAV.map(({ icon: Icon, active }, i) => (
            <span
              key={i}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg',
                active ? 'bg-summit-700 text-neutral-0' : 'text-sage-400',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-sm font-semibold text-neutral-900">Overview</span>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-500">
                Last 7 days
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-summit-700 text-[10px] font-semibold text-neutral-0">
                AS
              </span>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {KPIS.map((k) => (
              <KpiCard key={k.label} kpi={k} />
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-700">
                  <span className="h-2 w-2 rounded-full bg-summit-600" aria-hidden /> Revenue
                </span>
                <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success-500" aria-hidden />
                  live
                </span>
              </div>
              <div className="mt-2 text-summit-600">
                <Sparkline data={revenue} height={56} />
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-2.5">
              <span className="text-[11px] font-medium text-neutral-700">Traffic sources</span>
              <div className="mt-2">
                <Donut />
              </div>
            </div>
          </div>

          <div className="mt-2.5 rounded-xl border border-neutral-200 p-2.5">
            <span className="text-[11px] font-medium text-neutral-700">Recent orders</span>
            <table className="mt-1.5 w-full text-[11px]">
              <thead>
                <tr className="text-left text-neutral-400">
                  <th className="font-medium">Order</th>
                  <th className="font-medium">Customer</th>
                  <th className="font-medium text-right">Amount</th>
                  <th className="font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-neutral-100">
                    <td className="py-1 font-medium text-neutral-700">{o.id}</td>
                    <td className="py-1 text-neutral-600">{o.name}</td>
                    <td className="py-1 text-right font-medium text-neutral-800">{o.amount}</td>
                    <td className="py-1 text-right">
                      <span
                        className={cn(
                          'inline-block rounded-full px-1.5 py-0.5 font-medium',
                          STATUS[o.status] ?? 'bg-neutral-100 text-neutral-500',
                        )}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
