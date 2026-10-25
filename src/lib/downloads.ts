// Downloadable software offered on the /downloads page. Content and links in
// one place, same pattern as siteConfig.

/**
 * Apollo's installers live in a public Cloud Storage bucket. The release
 * workflow (Howell-Technologies-Portal → release-apollo-desktop.yml) refreshes
 * the files behind these STABLE names on every release, so the links below
 * never change — no site deploy needed when a new version ships.
 *
 * The bucket name and its `enoch-desktop/` path are the auto-update feed's
 * identity (every installed copy polls that exact address), which is why the
 * path doesn't carry the product's name. Only the file names are branding.
 */
const APOLLO_BUCKET_BASE = 'https://storage.googleapis.com/howell-enoch-downloads/enoch-desktop'

/**
 * Soft access gate for the download buttons. A COURTESY GATE, not security:
 * this is a static SPA, so the code and the URLs both ship in the public JS
 * bundle, and the bucket objects themselves stay public (the app's
 * auto-updater depends on that). It keeps casual visitors from grabbing the
 * installers and makes the release feel invite-only — real access control
 * would need a backend issuing signed URLs.
 */
export const DOWNLOAD_ACCESS_CODE = 'STANDLEYAPOLLO2026'

/** sessionStorage key remembering an unlocked gate for the rest of the tab session. */
export const DOWNLOAD_UNLOCK_STORAGE_KEY = 'downloads:unlocked'

export type PlatformKey = 'windows' | 'macos'

export interface PlatformDownload {
  key: PlatformKey
  /** Platform name shown on the download button. */
  label: string
  /** Direct download link (stable name — always the latest release). */
  url: string
  /**
   * The platform's auto-update manifest. Public YAML whose `version:` line is
   * the currently published release — fetched client-side for a live version
   * number. Purely decorative: if the fetch fails (offline, CORS, CSP) the
   * number is omitted and the download link still works.
   */
  feedUrl: string
  /** One compact line: supported OS versions / hardware. */
  summary: string
}

export const apolloDownload = {
  name: 'Apollo',
  /** Apollo's real product tagline (enoch-web brand.ts). */
  tagline: 'Your intelligent workspace',
  /** Used in the page's SoftwareApplication JSON-LD, not rendered on screen. */
  description:
    'Apollo is an AI workspace for your desktop — local AI, security first. Your data, your control.',
  /**
   * Windows 10+ and macOS 11+ come from the Electron 37 runtime the app ships
   * on; the single universal .dmg (Intel + Apple Silicon) comes from the
   * packaging config. Revisit if the desktop app majorly upgrades Electron.
   */
  platforms: [
    {
      key: 'windows',
      label: 'Windows',
      url: `${APOLLO_BUCKET_BASE}/Apollo-Setup.exe`,
      feedUrl: `${APOLLO_BUCKET_BASE}/latest.yml`,
      summary: 'Windows 10 & 11 · 64-bit',
    },
    {
      key: 'macos',
      label: 'Mac',
      url: `${APOLLO_BUCKET_BASE}/Apollo.dmg`,
      feedUrl: `${APOLLO_BUCKET_BASE}/latest-mac.yml`,
      summary: 'macOS 11+ · Intel & Apple Silicon',
    },
  ] as readonly PlatformDownload[],
} as const
