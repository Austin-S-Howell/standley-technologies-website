import { z } from 'zod'

export const SERVICE_OPTIONS = [
  { value: 'software', label: 'Custom Software & App Development' },
  { value: 'cloud-devops', label: 'Cloud Infrastructure & Security' },
  { value: 'consulting', label: 'IT Consulting & Managed Services' },
  { value: 'local-llm', label: 'Private Local LLM Setup & Integrations' },
  { value: 'other', label: 'Something else' },
] as const

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email so we can reply'),
  company: z.string().optional(),
  service: z.enum(['software', 'cloud-devops', 'consulting', 'local-llm', 'other']),
  message: z.string().min(10, 'Tell us a bit more (at least 10 characters)'),
  // Honeypot — must stay empty. Bots that fill it fail validation silently.
  botcheck: z.string().max(0).optional(),
})

export type ContactValues = z.infer<typeof contactSchema>
export type ServiceValue = ContactValues['service']

export function isServiceValue(v: string | null): v is ServiceValue {
  return (
    v === 'software' ||
    v === 'cloud-devops' ||
    v === 'consulting' ||
    v === 'local-llm' ||
    v === 'other'
  )
}
