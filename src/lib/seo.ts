import { siteConfig } from './siteConfig'

export interface PageMeta {
  title: string
  description: string
  path: string
  /** Site-relative social card (1200×630) replacing the default og-image. */
  image?: string
  imageAlt?: string
}

export function fullTitle(title: string): string {
  return `${title} — ${siteConfig.legalName}`
}

export function canonical(path: string): string {
  return `${siteConfig.url}${path === '/' ? '/' : path}`
}

/** Per-page SEO copy. Titles get the brand suffix via <Seo>. */
export const pageMeta = {
  home: {
    title: 'Custom Software, Cloud & IT Consulting',
    description: siteConfig.description,
    path: '/',
  },
  services: {
    title: 'Services',
    description:
      'Custom software & app development, secure & scalable cloud infrastructure, IT consulting & managed services, and private local-LLM setup & integrations — delivered with engineering rigor.',
    path: '/services',
  },
  about: {
    title: 'About',
    description: `About ${siteConfig.legalName} — our mission, values, and approach to building reliable technology.`,
    path: '/about',
  },
  contact: {
    title: 'Contact',
    description: `Start a project with ${siteConfig.legalName}. Tell us what you're building and we'll be in touch.`,
    path: '/contact',
  },
  demos: {
    title: 'Demos',
    description: `Interactive examples of the software, cloud, and monitoring work ${siteConfig.legalName} builds.`,
    path: '/demos',
  },
  apollo: {
    title: 'Apollo: Your Intelligent Workspace',
    description:
      'Apollo is an AI workspace that researches, designs, writes and tests code, and automates routine work — on the model you choose. Coming soon. Watch the launch film.',
    path: '/apollo',
    image: '/media/apollo/apollo-og.jpg',
    imageAlt: 'Apollo — Your Data, Your AI, Your Assistant.',
  },
  downloads: {
    title: 'Download Apollo',
    description:
      'Download Apollo — your intelligent workspace — for Windows 10/11 and macOS 11+.',
    path: '/downloads',
  },
} as const satisfies Record<string, PageMeta>
