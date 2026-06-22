import { useEffect, useState } from 'react'
import {
  Users,
  Shield,
  Network,
  Database,
  ShieldCheck,
  TrendingUp,
  Check,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref'
import { useLiveSeries } from '@/hooks/useLiveSeries'
import { BrowserFrame } from './BrowserFrame'
import { Sparkline } from './Sparkline'

const MAX_INSTANCES = 7

const securityChecks = [
  'WAF & DDoS protection active',
  'TLS 1.3 — encrypted in transit',
  'AES-256 — encrypted at rest',
  'MFA enforced · least-privilege IAM',
  'Automated, encrypted backups',
]

const badges = ['SOC 2', 'ISO 27001', 'TLS 1.3', 'AES-256']

function Node({ icon: Icon, label, accent }: { icon: LucideIcon; label: string; accent?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border',
          accent
            ? 'border-gold-300 bg-gold-50 text-gold-700'
            : 'border-neutral-200 bg-neutral-50 text-summit-600',
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="whitespace-nowrap text-[9px] text-neutral-500">{label}</span>
    </div>
  )
}

function Connector() {
  return <span className="h-px w-3 shrink-0 bg-neutral-300 sm:w-5" aria-hidden />
}

function Cluster({ instances }: { instances: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="flex h-9 items-center gap-0.5 rounded-lg border border-summit-600/30 bg-sage-50 px-1.5">
        {Array.from({ length: MAX_INSTANCES }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-5 w-1.5 rounded-sm transition-colors duration-500',
              i < instances ? 'bg-summit-600' : 'bg-neutral-200',
            )}
          />
        ))}
      </div>
      <span className="whitespace-nowrap text-[9px] text-neutral-500">Auto-scale ×{instances}</span>
    </div>
  )
}

export function CloudInfraDemo({ className }: { className?: string }) {
  const reduced = useReducedMotionPref()
  const load = useLiveSeries([46], { min: 28, max: 94, interval: 2200 })
  const reqs = useLiveSeries([3.2, 3.6, 3.1, 4.0, 3.8, 4.3, 3.9, 4.1], {
    min: 2.6,
    max: 5.6,
    interval: 1800,
  })
  const [threats, setThreats] = useState(12483)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setThreats((t) => t + Math.floor(Math.random() * 5)), 2000)
    return () => clearInterval(id)
  }, [reduced])

  const loadVal = load[load.length - 1] ?? 46
  const reqVal = reqs[reqs.length - 1] ?? 4
  const instances = Math.min(MAX_INSTANCES, 3 + Math.round((loadVal / 100) * 4))
  const scaling = !reduced && loadVal > 78

  return (
    <BrowserFrame title="cloud · infrastructure" className={className}>
      {/* Architecture topology */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-0 p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-neutral-700">Architecture · production</span>
          <span className="inline-flex items-center gap-1 font-medium text-success-500">
            <span className={cn('h-1.5 w-1.5 rounded-full bg-success-500', !reduced && 'animate-pulse')} />
            healthy · multi-AZ
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-1 overflow-x-auto">
          <Node icon={Users} label="Users" />
          <Connector />
          <Node icon={Shield} label="WAF" accent />
          <Connector />
          <Node icon={Network} label="Load bal." />
          <Connector />
          <Cluster instances={instances} />
          <Connector />
          <Node icon={Database} label="DB · replica" />
        </div>
      </div>

      {/* Security + Scalability */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Security */}
        <div className="rounded-xl border border-neutral-200 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
              <ShieldCheck className="h-4 w-4 text-summit-600" aria-hidden /> Security
            </span>
            <span className="rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-medium text-success-500">
              Protected
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-2xl font-semibold text-neutral-900">
              {threats.toLocaleString()}
            </span>
            <span className="text-[11px] text-neutral-500">threats blocked · 24h</span>
          </div>
          <ul className="mt-2 space-y-1">
            {securityChecks.map((s) => (
              <li key={s} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                <Check className="h-3 w-3 shrink-0 text-success-500" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded bg-sage-50 px-1.5 py-0.5 text-[10px] font-medium text-summit-700"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Scalability */}
        <div className="rounded-xl border border-neutral-200 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
              <TrendingUp className="h-4 w-4 text-summit-600" aria-hidden /> Scalability
            </span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium',
                scaling ? 'bg-gold-50 text-gold-700' : 'bg-success-50 text-success-500',
              )}
            >
              {scaling ? 'Scaling up…' : 'Stable'}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-2xl font-semibold text-neutral-900">{instances}</span>
            <span className="text-[11px] text-neutral-500">active instances · auto-scaling</span>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-neutral-500">Load</span>
              <span className="font-medium text-neutral-800">{Math.round(loadVal)}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className={cn(
                  'h-full rounded-full transition-[width] duration-700 ease-summit',
                  loadVal > 80 ? 'bg-gold-500' : 'bg-summit-500',
                )}
                style={{ width: `${loadVal}%` }}
              />
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-neutral-500">Requests/sec</div>
              <span className="font-display text-base font-semibold text-neutral-900">
                {reqVal.toFixed(1)}k
              </span>
            </div>
            <div className="w-20 text-summit-600">
              <Sparkline data={reqs} height={22} />
            </div>
          </div>

          <div className="mt-2.5 text-[10px] text-neutral-500">
            3 availability zones · 99.99% SLA
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
