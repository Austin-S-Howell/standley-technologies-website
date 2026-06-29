import { useEffect, useState } from 'react'
import { Lock, ShieldCheck, Database, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { useLiveSeries } from '@/hooks/useLiveSeries'
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref'
import { BrowserFrame } from './BrowserFrame'
import { Sparkline } from './Sparkline'

const PROMPT = 'Summarize our Q3 refund policy for the support team.'
const ANSWER =
  'Refunds are honored within 30 days for unused services. Per the Q3 update, prorated subscriptions get partial refunds, and approvals over $1,000 route to a manager. Full details are in the internal runbook.'

const SOURCES: { name: string; icon: LucideIcon }[] = [
  { name: 'refund-policy-q3.pdf', icon: FileText },
  { name: 'support-runbook.md', icon: FileText },
  { name: 'billing-rules.yaml', icon: Database },
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

export function LocalLlmDemo({ className }: { className?: string }) {
  const reduced = useReducedMotionPref()
  const tokens = useLiveSeries([42, 48, 45, 52, 49, 55, 51, 58, 54, 60], {
    min: 38,
    max: 72,
    interval: 1400,
  })
  const gpu = useLiveSeries([61], { min: 48, max: 92, interval: 1700 })
  const tps = useCountUp(58)

  // Stream the assistant answer in character-by-character, hold, then replay —
  // gives the panel a "live" feel. Frozen to the full answer under reduced-motion.
  const [chars, setChars] = useState(0)
  useEffect(() => {
    if (reduced) {
      setChars(ANSWER.length)
      return
    }
    setChars(0)
    let tick = 0
    const total = ANSWER.length
    const hold = 36
    const id = setInterval(() => {
      tick += 1
      if (tick > total + hold) tick = 0
      setChars(Math.min(tick, total))
    }, 26)
    return () => clearInterval(id)
  }, [reduced])

  const streaming = chars < ANSWER.length
  const gpuVal = gpu[gpu.length - 1] ?? 61

  return (
    <BrowserFrame title="ai.internal · private-llm" className={className}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            Private LLM
          </span>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-display text-base font-semibold leading-none text-neutral-900">
              Llama 3.1 · 70B
            </span>
            <span className="rounded-md bg-summit-700 px-1.5 py-0.5 text-[10px] font-medium text-neutral-0">
              on-prem
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-medium text-success-700">
          <Lock className="h-3 w-3" aria-hidden />
          Data stays on your network
        </span>
      </div>

      {/* Top metrics */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Tokens/sec</div>
          <span ref={tps.ref} className="font-display text-base font-semibold text-neutral-900">
            {Math.round(tps.value)}
          </span>
          <div className="mt-0.5 text-summit-600">
            <Sparkline data={tokens} height={16} />
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">External calls</div>
          <span className="font-display text-base font-semibold text-success-700">0</span>
          <div className="mt-0.5 text-[10px] text-neutral-400">100% local</div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-0 px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">Context</div>
          <span className="font-display text-base font-semibold text-neutral-900">128k</span>
          <span className="text-[11px] text-neutral-500"> tokens</span>
        </div>
      </div>

      {/* Chat transcript */}
      <div className="mt-3 space-y-2 rounded-xl border border-neutral-200 p-3">
        <div className="flex justify-end">
          <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-summit-700 px-3 py-1.5 text-[11px] text-neutral-0">
            {PROMPT}
          </span>
        </div>
        <div className="flex justify-start">
          <span className="max-w-[88%] rounded-2xl rounded-bl-sm bg-neutral-100 px-3 py-1.5 text-[11px] leading-relaxed text-neutral-700">
            {ANSWER.slice(0, chars)}
            {streaming && !reduced && (
              <span className="ml-0.5 inline-block h-3 w-1 animate-pulse rounded-sm bg-summit-600 align-middle" />
            )}
          </span>
        </div>

        {/* RAG sources */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-neutral-500">
            <Database className="h-3 w-3 text-summit-600" aria-hidden /> Retrieved from
          </span>
          {SOURCES.map((s) => (
            <span
              key={s.name}
              className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-600"
            >
              <s.icon className="h-2.5 w-2.5 text-neutral-400" aria-hidden />
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Gauge label="GPU utilization" value={gpuVal} accent="bg-summit-500" />
        <Gauge label="VRAM" value={78} accent="bg-gold-500" />
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-neutral-50 p-2.5 text-[11px]">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-summit-600" aria-hidden />
        <span className="text-neutral-600">
          Running on your own hardware — no prompts or documents leave your network.
        </span>
      </div>
    </BrowserFrame>
  )
}
