// Downloadable software offered on the /downloads page. Content and links in
// one place, same pattern as siteConfig.

/**
 * The site offers ONE download: Apollo Software Stack, the app that installs,
 * updates and opens every Apollo app (Howell-Technologies-Portal →
 * ApolloStack/). Its release workflow (release-apollo-stack.yml) refreshes
 * the files behind these STABLE names on every release, so the links below
 * never change — no site deploy needed when a new version ships, or when an
 * app is added to the Stack (that's its catalog, published to the same
 * bucket).
 */
const STACK_BUCKET_BASE = 'https://storage.googleapis.com/howelltechwebsite-apollostack-downloads'

/**
 * Soft access gate for the download buttons. A COURTESY GATE, not security:
 * this is a static SPA, so the code and the URLs both ship in the public JS
 * bundle, and the bucket objects themselves stay public (the apps'
 * auto-updaters depend on that). It keeps casual visitors from grabbing the
 * installers and makes the release feel invite-only — real access control
 * would need a backend issuing signed URLs.
 */
export const DOWNLOAD_ACCESS_CODE = 'STANDLEYAPOLLO2026'

/** sessionStorage key remembering an unlocked gate for the rest of the tab session. */
export const DOWNLOAD_UNLOCK_STORAGE_KEY = 'downloads:unlocked'

export type PlatformKey = 'windows' | 'macos' | 'linux'

export interface PlatformDownload {
  key: PlatformKey
  /** Platform name shown on the download button. */
  label: string
  /** Direct download link (stable name — always the latest release). */
  url: string
  /**
   * The platform's update feed: public JSON whose `version` is the currently
   * published release — fetched client-side for a live version number.
   * Purely decorative: if the fetch fails (offline, CORS, CSP) the number is
   * omitted and the download link still works.
   */
  feedUrl: string
  /** One compact line: supported OS versions / hardware. */
  summary: string
}

export const stackDownload = {
  name: 'Apollo Software Stack',
  /** The big shimmering word on the card; the rest of the name sits beneath it. */
  wordmark: 'Apollo',
  subtitle: 'Software Stack',
  tagline: 'Every Apollo app, one download',
  /** Used in the page's SoftwareApplication JSON-LD, not rendered on screen. */
  description:
    'Apollo Software Stack installs, updates and opens every Apollo app — Apollo, Apollo Host, Apollo Connect, Apollo Dock and Apollo for VS Code — keeps earlier versions a click away, and shows where Apollo’s web apps live.',
  /** What's inside, as chips. The Stack's catalog is the real list. */
  apps: ['Apollo', 'Apollo Host', 'Apollo Connect', 'Apollo Dock', 'VS Code extension', 'ApolloHub'],
  platforms: [
    {
      key: 'windows',
      label: 'Windows',
      url: `${STACK_BUCKET_BASE}/windows/ApolloStack-Setup.exe`,
      feedUrl: `${STACK_BUCKET_BASE}/windows/latest.json`,
      summary: 'Windows 10 & 11 · 64-bit',
    },
    {
      key: 'macos',
      label: 'Mac',
      url: `${STACK_BUCKET_BASE}/mac/ApolloStack.dmg`,
      feedUrl: `${STACK_BUCKET_BASE}/mac/latest.json`,
      summary: 'macOS 12+ · Intel & Apple Silicon',
    },
    {
      key: 'linux',
      label: 'Linux',
      url: `${STACK_BUCKET_BASE}/linux/apollo-stack_amd64.deb`,
      feedUrl: `${STACK_BUCKET_BASE}/linux/latest.json`,
      summary: 'Ubuntu 22.04+ & Debian 12+ · 64-bit .deb',
    },
  ] as readonly PlatformDownload[],
} as const
