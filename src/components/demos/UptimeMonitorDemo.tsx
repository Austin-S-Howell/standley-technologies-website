import { Activity, Server, Database, Globe, KeyRound, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { useLiveSeries } from '@/hooks/useLiveSeries'
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref'
import { BrowserFrame } from './BrowserFrame'
import { Sparkline } from './Sparkline'

type Status = 'ok' | 'degraded'
const services: {
  label: string
  icon: LucideIcon
  status: Status
  latency: number
  uptime: string
  seed: number[]
}[] = [
  { label: 'API Gateway', icon: Server, status: 'ok', latency: 128, uptime: '99.99', seed: [120, 132, 118, 140, 126, 134] },
  { label: 'PostgreSQL', icon: Database, status: 'ok', latency: 42, uptime: '100.0', seed: [38, 45, 40, 48, 41, 44] },
  { label: 'Edge CDN', icon: Globe, status: 'degraded', latency: 318, uptime: '99.71', seed: [180, 260, 220, 340, 300, 318] },
  { label: 'Auth / SSO', icon: KeyRound, status: 'ok', latency: 89, uptime: '99.98', seed: [82, 90, 78, 96, 85, 91] },
  { label: 'Job Workers', icon: Cpu, status: 'ok', latency: 64, uptime: '99.97', seed: [58, 70, 62, 74, 60, 66] },
]

const events: { text: string; rel: string; tone: 'info' | 'success' | 'warning' }[] = [
  { text: 'Auto-scaled API +2 instances', rel: '2m ago', tone: 'info' },
  { text: 'Deploy v4.18.2 completed', rel: '14m ago', tone: 'success' },
  { text: 'CDN latency spike — investigating', rel: '31m ago', tone: 'warning' },
]

function Gauge({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-neutral-500">{label}</span>
        <span className="font-medium text-neutral-800">{Math.round(value)}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
        <div
          className={cn('h-full rounded-full transition-[width] duration-700 ease-summit', accent)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function UptimeMonitorDemo({ className }: { className?: string }) {
  const reduced = useReducedMotionPref()
  const latency = useLiveSeries([120, 140, 110, 160, 130, 150, 125, 145, 135, 128, 138, 124], {
    min: 95,
    max: 210,
    interval: 1500,
  })
  const reqs = useLiveSeries([41, 44, 39, 47, 43, 46, 42, 48, 45, 43], { min: 30, max: 60, interval: 2000 })
  const cpu = useLiveSeries([34], { min: 22, max: 71, interval: 1900 })
  const memory = useLiveSeries([57], { min: 44, max: 80, interval: 2300 })
  const disk = useLiveSeries([62], { min: 58, max: 74, interval: 2700 })
  const uptime = useCountUp(99.98)
  const rpm = useCountUp(2847)

  const current = Math.round(latency[latency.length - 1] ?? 128)
  const cpuVal = cpu[cpu.length - 1] ?? 34
  const memVal = memory[memory.length - 1] ?? 57
  const diskVal = disk[disk.length - 1] ?? 62

  return (
    <BrowserFrame title="status · monitoring" className={className}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">System status</span>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span ref={uptime.ref} className="font-display text-3xl font-semibold leading-none text-neutral-900">
              {uptime.value.toFixed(2)}
            </span>
            <span className="font-display text-lg font-semibold text-neutral-900">%</span>
            <span className="ml-1 text-[11px] text-neutral-500">uptime · 90d</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-medium text-success-500">
          <span className={cn('h-1.5 w-1.5 rounded-full bg-success-500', !reduced && 'animate-pulse')} />
          All systems operational
        </span>
      </div>

      <div className="mt-2 flex gap-1">
        {(['1h', '24h', '7d'] as const).map((r) => (
          <span
            key={r}
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium',
              r === '24h' ? 'bg-summit-700 text-neutral-0' : 'bg-neutral-100 text-neutral-500',
            )}
          >
            {r}
          </span>
        ))}
      </div>

      {/* Top metrics */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Requests/min</div>
          <span ref={rpm.ref} className="font-display text-base font-semibold text-neutral-900">
            {Math.round(rpm.value).toLocaleString()}
          </span>
          <div className="mt-0.5 text-summit-600">
            <Sparkline data={reqs} height={16} />
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Error rate</div>
          <span className="font-display text-base font-semibold text-success-500">0.02%</span>
          <div className="mt-0.5 text-[10px] text-neutral-400">within SLO</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">p95 latency</div>
          <span className="font-display text-base font-semibold text-neutral-900">{current}</span>
          <span className="text-[11px] text-neutral-500"> ms</span>
        </div>
      </div>

      {/* Services */}
      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200">
        {services.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              'flex items-center gap-2 px-2.5 py-2',
              i > 0 && 'border-t border-neutral-100',
            )}
          >
            <s.icon className="h-3.5 w-3.5 shrink-0 text-summit-600" aria-hidden />
            <span className="w-20 shrink-0 truncate text-[11px] font-medium text-neutral-700">{s.label}</span>
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-medium',
                s.status === 'ok' ? 'text-success-500' : 'text-warning-500',
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  s.status === 'ok' ? 'bg-success-500' : 'bg-warning-500',
                  s.status === 'degraded' && !reduced && 'animate-pulse',
                )}
              />
              {s.status === 'ok' ? 'Operational' : 'Degraded'}
            </span>
            <div className="ml-auto hidden h-4 w-12 text-neutral-300 sm:block">
              <Sparkline data={s.seed} height={16} area={false} />
            </div>
            <span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-neutral-500">{s.latency}ms</span>
            <span className="w-10 shrink-0 text-right text-[10px] tabular-nums font-medium text-neutral-700">{s.uptime}%</span>
          </div>
        ))}
      </div>

      {/* Main live chart */}
      <div className="mt-3 rounded-xl border border-neutral-200 p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-700">
            <Activity className="h-3.5 w-3.5 text-summit-600" aria-hidden /> Response time (p95)
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <span className={cn('h-1.5 w-1.5 rounded-full bg-gold-500', !reduced && 'animate-ping')} />
            {current} ms
          </span>
        </div>
        <div className="mt-2 text-gold-500">
          <Sparkline data={latency} height={56} />
        </div>
      </div>

      {/* Resources */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        <Gauge label="CPU" value={cpuVal} accent="bg-summit-500" />
        <Gauge label="Memory" value={memVal} accent="bg-summit-700" />
        <Gauge label="Disk" value={diskVal} accent="bg-gold-500" />
      </div>

      {/* Recent events */}
      <div className="mt-3 rounded-xl bg-neutral-50 p-2.5">
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">Recent events</div>
        <ul className="space-y-1.5">
          {events.map((e) => (
            <li key={e.text} className="flex items-center gap-2 text-[11px]">
              <span
                className={cn(
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  e.tone === 'info' && 'bg-info-500',
                  e.tone === 'success' && 'bg-success-500',
                  e.tone === 'warning' && 'bg-warning-500',
                )}
              />
              <span className="truncate text-neutral-700">{e.text}</span>
              <span className="ml-auto shrink-0 tabular-nums text-neutral-400">{e.rel}</span>
            </li>
          ))}
        </ul>
      </div>
    </BrowserFrame>
  )
}
