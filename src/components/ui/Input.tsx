import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className, ...props },
  ref,
) {
  const errorId = error && id ? `${id}-error` : undefined
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'h-11 w-full rounded-xl border bg-neutral-0 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
          error ? 'border-error-500' : 'border-neutral-300 focus-visible:border-sage-500',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-error-500">
          {error}
        </p>
      )}
    </div>
  )
})
