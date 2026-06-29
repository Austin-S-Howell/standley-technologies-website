/**
 * Contact form options and types. Validation lives in the form itself via
 * react-hook-form's native rules — no schema library needed for five fields.
 */
export const SERVICE_OPTIONS = [
  { value: 'software', label: 'Custom Software & App Development' },
  { value: 'cloud-devops', label: 'Cloud Infrastructure & Security' },
  { value: 'consulting', label: 'IT Consulting & Managed Services' },
  { value: 'local-llm', label: 'Private Local LLM Setup & Integrations' },
  { value: 'other', label: 'Something else' },
] as const

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value']

export interface ContactValues {
  name: string
  email: string
  company?: string
  service: ServiceValue
  message: string
  /** Honeypot — must stay empty. Bots that fill it are dropped on submit. */
  botcheck?: string
}

export function isServiceValue(v: string | null): v is ServiceValue {
  return SERVICE_OPTIONS.some((o) => o.value === v)
}
