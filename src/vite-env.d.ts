/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_HCAPTCHA_SITEKEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
