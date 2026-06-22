import { ChevronDown } from 'lucide-react'

/** Accessible FAQ accordion built on native <details>/<summary>. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-0">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500 [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="px-5 pb-5 text-sm text-neutral-600">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
