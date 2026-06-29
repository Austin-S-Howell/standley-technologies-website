import { Suspense, type ComponentType } from 'react'
import { InView } from '@/components/InView'
import { DemoSkeleton } from './DemoSkeleton'

/**
 * Viewport-gates and lazy-loads a demo: nothing renders until it scrolls near
 * view, then its (code-split) chunk loads behind a skeleton. Pass a `lazy(...)`
 * component so the JS is fetched on demand rather than with the page chunk.
 */
export function DeferredDemo({ component: Cmp }: { component: ComponentType<{ className?: string }> }) {
  return (
    <InView fallback={<DemoSkeleton />}>
      <Suspense fallback={<DemoSkeleton />}>
        <Cmp />
      </Suspense>
    </InView>
  )
}
