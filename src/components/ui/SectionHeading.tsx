import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <div className={cn(align === 'center' && 'flex justify-center')}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-neutral-600">{description}</p>}
    </div>
  )
}
