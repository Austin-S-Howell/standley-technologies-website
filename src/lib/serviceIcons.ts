import { Code2, Cloud, Headset, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServiceId } from './siteConfig'

/**
 * Icon per service pillar. Typed `Record<ServiceId, …>` so adding a pillar without
 * an icon is a compile error (single source for Home + Services).
 */
export const serviceIcons: Record<ServiceId, LucideIcon> = {
  software: Code2,
  'cloud-devops': Cloud,
  consulting: Headset,
  'local-llm': Cpu,
}
