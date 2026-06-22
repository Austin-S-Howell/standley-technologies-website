import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Send, ChevronDown } from 'lucide-react'
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

/** Build a mailto: link that opens the visitor's email app with the message pre-filled. */
function buildMailto(data: ContactValues): string {
  const label = SERVICE_OPTIONS.find((o) => o.value === data.service)?.label ?? 'General'
  const subject = `New inquiry — ${label}`
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${label}`,
    '',
    data.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm() {
  const [params] = useSearchParams()
  const preset = isServiceValue(params.get('service')) ? params.get('service')! : 'software'
  const [sent, setSent] = useState(false)

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
      consent: false,
      botcheck: '',
    },
  })

  const onSubmit = (data: ContactValues) => {
    if (data.botcheck) return // honeypot tripped
    // Opens the default mail app (works on Windows, macOS, iOS, Android)
    window.location.href = buildMailto(data)
    setSent(true)
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-3 rounded-2xl border border-success-500/40 bg-success-50 p-6"
      >
        <CheckCircle2 className="h-7 w-7 text-success-500" aria-hidden />
        <h2 className="text-lg font-semibold text-neutral-900">Your email is ready to send</h2>
        <p className="text-sm text-neutral-600">
          We’ve opened your email app with the message pre-filled — just hit send. If nothing
          opened, email us directly at{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-summit-700 underline underline-offset-2"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            reset()
            setSent(false)
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

      <label className="flex items-start gap-2.5 text-sm text-neutral-600">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-summit-700 focus-visible:ring-gold-500"
          {...register('consent')}
        />
        I agree to be contacted about my inquiry.
      </label>

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          className={cn(buttonClasses('primary', 'lg'), 'w-full sm:w-auto sm:min-w-56')}
        >
          <Send className="h-4 w-4" aria-hidden /> Send message
        </button>
      </div>

      <p className="text-center text-xs text-neutral-500">
        Opens your email app with the details filled in — no account needed.
      </p>
    </form>
  )
}
