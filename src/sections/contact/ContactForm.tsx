import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Send, ChevronDown, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'
import {
  contactSchema,
  isServiceValue,
  SERVICE_OPTIONS,
  type ContactValues,
} from '@/lib/contactSchema'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { buttonClasses } from '@/components/ui/Button'

export function ContactForm() {
  const [params] = useSearchParams()
  const preset = isServiceValue(params.get('service')) ? params.get('service')! : 'software'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: preset as ContactValues['service'],
      message: '',
      botcheck: '',
    },
  })

  // Submits straight to our inbox via Web3Forms (no backend, no mail app needed).
  const onSubmit = async (data: ContactValues) => {
    if (data.botcheck) return // honeypot tripped
    setStatus('submitting')
    const label = SERVICE_OPTIONS.find((o) => o.value === data.service)?.label ?? 'General'
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.web3formsAccessKey,
          subject: `New inquiry from ${data.name} — ${label}`,
          from_name: `${siteConfig.name} website`,
          replyto: data.email,
          name: data.name,
          email: data.email,
          ...(data.company ? { company: data.company } : {}),
          service: label,
          message: data.message,
        }),
      })
      const json = (await res.json()) as { success?: boolean }
      if (json.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-5 rounded-2xl border border-success-500/30 bg-gradient-to-b from-success-50 to-neutral-0 p-8 text-center shadow-card sm:p-10"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/15 ring-8 ring-success-500/5">
          <CheckCircle2 className="h-9 w-9 text-success-500" aria-hidden />
        </span>

        <div>
          <h2 className="font-display text-2xl font-semibold text-neutral-900">Message sent!</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-600">
            Thanks for reaching out — your message is on its way to our inbox. We typically reply
            within 1–3 business days.
          </p>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-sm">
          <span className="text-neutral-500">Prefer to reach us directly?</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-summit-700 underline-offset-2 hover:underline"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:+1${siteConfig.phone.replace(/\D/g, '')}`}
              className="font-medium text-summit-700 underline-offset-2 hover:underline"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            reset()
            setStatus('idle')
          }}
          className={cn(buttonClasses('secondary', 'sm'), 'mt-1')}
        >
          Write another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — hidden from users and assistive tech */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register('botcheck')}
      />

      <Input
        id="name"
        label="Name"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input id="company" label="Company (optional)" autoComplete="organization" {...register('company')} />

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-neutral-700">
          What can we help with?
        </label>
        <div className="relative">
          <select
            id="service"
            className="h-11 w-full appearance-none rounded-xl border border-neutral-300 bg-neutral-0 px-3.5 pr-10 text-sm text-neutral-900 focus-visible:border-sage-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40"
            {...register('service')}
          >
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            aria-hidden
          />
        </div>
      </div>

      <Textarea
        id="message"
        label="Project details"
        rows={5}
        placeholder="A few sentences about what you’re trying to build or solve."
        error={errors.message?.message}
        {...register('message')}
      />

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-error-500/40 bg-error-500/10 p-3 text-sm text-neutral-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-500" aria-hidden />
          <span>
            Something went wrong sending your message. Please try again, or email us directly at{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-summit-700 underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            .
          </span>
        </div>
      )}

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            buttonClasses('primary', 'lg'),
            'w-full sm:w-auto sm:min-w-56',
            status === 'submitting' && 'pointer-events-none opacity-70',
          )}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden /> Send message
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-neutral-500">
        Sent straight to our inbox — we’ll reply within 1–3 business days.
      </p>
    </form>
  )
}
