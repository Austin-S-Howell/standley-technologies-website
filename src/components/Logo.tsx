import logoMark from '@/assets/logo/circle-mark-512.webp'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/siteConfig'

interface LogoProps {
  className?: string
  alt?: string
}

/**
 * The Standley Technologies summit mark. Swap the import for an SVG variant once
 * one is vectorized for crisper rendering.
 */
export function Logo({ className, alt = 'Standley Technologies LLC summit mark logo' }: LogoProps) {
  return (
    <img src={logoMark} alt={alt} width={512} height={512} className={className} decoding="async" />
  )
}

/** Mark + wordmark lockup for the header/footer. `tone` adapts text to the background. */
export function LogoWordmark({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Logo className="h-9 w-9" alt="" />
      <span
        className={cn(
          'whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg',
          tone === 'light' ? 'text-neutral-50' : 'text-neutral-900',
        )}
      >
        {siteConfig.name}
      </span>
    </span>
  )
}
