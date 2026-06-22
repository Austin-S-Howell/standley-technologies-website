import { useState } from 'react'
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import { buttonClasses } from '@/components/ui/Button'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

/**
 * A self-contained date + time picker. The chosen slot is converted to text and
 * appended into a mailto: message — no third-party scheduler needed.
 */
export function BookingRequest() {
  const today = startOfDay(new Date())
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const y = view.getFullYear()
  const m = view.getMonth()
  const firstWeekday = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const canPrev = y > today.getFullYear() || (y === today.getFullYear() && m > today.getMonth())

  const isDisabled = (day: number) => {
    const d = new Date(y, m, day)
    const dow = d.getDay()
    return d < today || dow === 0 || dow === 6 // past dates + weekends
  }

  const dateLabel = date
    ? date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const ready = Boolean(date && time)

  const mailtoHref = () => {
    if (!date || !time) return undefined
    const subject = `Call request — ${dateLabel} at ${time}`
    const body = [
      `I’d like to book a call with ${siteConfig.legalName}.`,
      '',
      `Preferred time: ${dateLabel} at ${time} (Central Time)`,
      note ? '' : null,
      note ? `Note: ${note}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join('\n')
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-0 p-5 shadow-card sm:p-6">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-neutral-900">
          {view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setView(new Date(y, m - 1, 1))}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-sage-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setView(new Date(y, m + 1, 1))}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-sage-100"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-neutral-400">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />
          const d = new Date(y, m, day)
          const disabled = isDisabled(day)
          const selected = date !== null && sameDay(d, date)
          const isToday = sameDay(d, today)
          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => {
                setDate(d)
                setTime(null)
              }}
              className={cn(
                'flex h-9 items-center justify-center rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
                disabled && 'cursor-not-allowed text-neutral-300',
                !disabled && !selected && 'text-neutral-700 hover:bg-sage-100',
                selected && 'bg-summit-700 font-semibold text-neutral-0',
                isToday && !selected && 'ring-1 ring-gold-400',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      <div className="mt-5">
        <p className="text-sm font-medium text-neutral-700">
          {date ? 'Pick a time' : 'Select a date first'}{' '}
          <span className="text-xs font-normal text-neutral-400">· Central Time</span>
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              disabled={!date}
              onClick={() => setTime(t)}
              className={cn(
                'rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
                !date && 'cursor-not-allowed border-neutral-200 text-neutral-300',
                date && time === t && 'border-summit-700 bg-summit-700 text-neutral-0',
                date &&
                  time !== t &&
                  'border-neutral-200 text-neutral-700 hover:border-sage-400 hover:bg-sage-50',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Optional note */}
      <div className="mt-5">
        <label htmlFor="booking-note" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Anything we should know? <span className="text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="booking-note"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What you’d like to discuss…"
          className="w-full rounded-xl border border-neutral-300 bg-neutral-0 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:border-sage-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
        />
      </div>

      {/* Summary + submit */}
      <div className="mt-5 border-t border-neutral-200 pt-5">
        {ready ? (
          <p className="text-sm text-neutral-600">
            Requesting <span className="font-medium text-neutral-900">{dateLabel}</span> at{' '}
            <span className="font-medium text-neutral-900">{time}</span> (Central Time).
          </p>
        ) : (
          <p className="text-sm text-neutral-500">Choose a date and time to continue.</p>
        )}
        <a
          href={mailtoHref()}
          aria-disabled={!ready}
          className={cn(
            buttonClasses('primary', 'lg'),
            'mt-4 w-full sm:w-auto',
            !ready && 'pointer-events-none opacity-50',
          )}
        >
          <Mail className="h-4 w-4" aria-hidden /> Email my request
        </a>
        <p className="mt-2 text-xs text-neutral-500">
          Opens your email app with the time filled in — we’ll confirm by reply.
        </p>
      </div>
    </div>
  )
}
