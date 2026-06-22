// Single source of editable site content. Non-devs can update copy here.
// Items marked [FILL IN] need real values from the business owner.

export const siteConfig = {
  name: 'Standley Technologies LLC',
  legalName: 'Standley Technologies LLC',
  domain: 'standleytech.com', // [FILL IN] confirm real domain
  url: 'https://standleytech.com', // [FILL IN] confirm real domain
  tagline: 'Engineering that reaches the summit.',
  description:
    'Custom software, modern cloud infrastructure, and reliable managed IT for businesses ready to reach the summit.',

  // Contact — [FILL IN] real values before launch
  email: 'hello@standleytech.com',
  serviceArea: 'Serving the Midwest and remote clients nationwide.',
  responseTime: 'We typically respond within one business day.',

  social: {
    linkedin: '', // [FILL IN]
    github: '', // [FILL IN]
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Demos', to: '/demos' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  services: [
    {
      id: 'software',
      name: 'Custom Software & App Development',
      short: 'Web apps, mobile apps, and bespoke software.',
      promise: 'Software built around your business — not the other way around.',
      whoFor:
        'Teams whose off-the-shelf tools have hit a wall, founders validating a new product, or operations still running on spreadsheets and manual steps.',
      includes: [
        'Web application design & development',
        'Mobile apps (iOS, Android & cross-platform)',
        'API design & third-party integrations',
        'Internal tools, dashboards & automation',
        'Legacy system modernization',
        'Ongoing maintenance & feature work',
      ],
      deliverables: [
        'Production application & full source code',
        'Architecture & technical documentation',
        'CI/CD pipeline & deployment',
        'Handover & team training',
      ],
      tech: ['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'React Native', 'PostgreSQL'],
      outcome:
        'A reliable, maintainable product your team owns outright — shipped iteratively, with no black boxes.',
    },
    {
      id: 'cloud-devops',
      name: 'Cloud Infrastructure & Security',
      short: 'Secure, scalable cloud infrastructure.',
      promise: 'Infrastructure that scales on demand and stays secure under pressure.',
      whoFor:
        'Businesses moving off aging or on-prem systems, fast-growing apps that need to scale, or teams who need their cloud locked down and compliant.',
      includes: [
        'Cloud architecture & migration (AWS, Azure, GCP)',
        'Auto-scaling & high-availability design',
        'Security hardening, WAF & threat protection',
        'Encryption, secrets & identity/access management',
        'Compliance readiness (SOC 2, HIPAA, and more)',
        'Monitoring, backups & disaster recovery',
      ],
      deliverables: [
        'A documented, secure cloud architecture',
        'Auto-scaling, highly-available infrastructure',
        'A hardened security & compliance posture',
        'Monitoring, alerting & disaster-recovery runbooks',
      ],
      tech: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'VPC & WAF', 'TLS / encryption'],
      outcome:
        'Infrastructure that scales automatically, stays secure, and recovers fast — without surprises.',
    },
    {
      id: 'consulting',
      name: 'IT Consulting & Managed Services',
      short: 'Advisory, managed IT, and ongoing support.',
      promise: 'A technology partner that keeps your operation running and growing.',
      whoFor:
        'Small and growing businesses without a full in-house IT team — or leaders who want senior technical guidance without a full-time hire.',
      includes: [
        'Technology strategy & advisory',
        'Managed IT & ongoing support',
        'System administration & maintenance',
        'Vendor & tooling selection',
        'Security best practices & backups',
        'Fractional CTO services',
      ],
      deliverables: [
        'A clear technology roadmap',
        'Managed support with defined SLAs',
        'Documentation & best practices',
        'Regular reviews & reporting',
      ],
      tech: [
        'Microsoft 365',
        'Google Workspace',
        'Endpoint management',
        'Backup & disaster recovery',
        'Network & security',
      ],
      outcome:
        'Fewer fires, clearer decisions, and technology that supports your goals instead of getting in the way.',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Discover',
      body: 'We start by understanding your goals, constraints, and the problem actually worth solving.',
    },
    {
      step: '02',
      title: 'Plan',
      body: 'A clear scope, timeline, and architecture you sign off on before any code is written.',
    },
    {
      step: '03',
      title: 'Build',
      body: 'Iterative delivery with regular check-ins — you see steady progress, not surprises.',
    },
    {
      step: '04',
      title: 'Support',
      body: "We don't disappear at launch. We maintain, monitor, and keep improving.",
    },
  ],

  values: [
    {
      title: 'Reach the summit',
      body: 'We measure success by the height you reach — durable systems that keep paying off.',
    },
    {
      title: 'Honest guidance',
      body: "Straight technical advice, even when the simplest path isn't the biggest invoice.",
    },
    {
      title: 'Built to last',
      body: 'Reliability, security, and maintainability are designed in — not bolted on later.',
    },
  ],

  differentiators: [
    {
      title: 'Senior engineering, start to finish',
      body: 'You work directly with experienced engineers — not a layer of account managers.',
    },
    {
      title: 'One partner, full stack',
      body: 'Software, cloud, and IT under one roof, so nothing falls between vendors.',
    },
    {
      title: 'Plain-English communication',
      body: 'We translate technical decisions into business terms you can actually act on.',
    },
    {
      title: 'Long-term thinking',
      body: "We optimize for what you'll be glad we did in two years, not just at launch.",
    },
  ],

  techStack: [
    { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Go'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Tailwind CSS'] },
    { category: 'Backend & Data', items: ['Node.js', 'PostgreSQL', 'REST & GraphQL APIs'] },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
    },
  ],

  // [FILL IN] Replace with real certifications as they are earned. `status`
  // is 'earned' | 'in-progress'. Honesty matters — don't list what isn't true.
  certifications: [
    { name: 'AWS Certified Solutions Architect', status: 'in-progress' },
    { name: 'Microsoft Certified: Azure Fundamentals', status: 'in-progress' },
    { name: 'HashiCorp Certified: Terraform Associate', status: 'in-progress' },
  ] as { name: string; status: 'earned' | 'in-progress' }[],

  // Capability statements (not fabricated metrics) — safe to show day one.
  stats: [
    { value: '3', label: 'Core service lines' },
    { value: 'AWS · Azure · GCP', label: 'Cloud platforms' },
    { value: '24/7', label: 'Managed monitoring' },
    { value: '100%', label: 'Senior engineering' },
  ],

  faqs: [
    {
      q: 'What services does Standley Technologies LLC offer?',
      a: 'Three core areas: custom software & app development, cloud & DevOps engineering, and IT consulting & managed services — often combined on a single engagement.',
    },
    {
      q: 'Do you work with startups and small businesses?',
      a: 'Yes. Much of our work is with founders and growing teams who need senior engineering without building a large in-house department.',
    },
    {
      q: 'Which cloud platforms do you support?',
      a: "AWS, Azure, and Google Cloud. We'll recommend the right fit for your needs rather than defaulting to one.",
    },
    {
      q: 'Do you offer ongoing support after launch?',
      a: 'Absolutely. Our managed services and maintenance keep your software and infrastructure healthy long after delivery.',
    },
    {
      q: 'How do projects get started?',
      a: 'It begins with a free, no-obligation conversation. We learn what you’re building, then propose a clear scope and next step.',
    },
  ],

  // [FILL IN] Real founder details
  founder: {
    name: '[FILL IN: Founder name]',
    role: 'Founder & Principal Engineer',
    bio: '[FILL IN: A short bio — background, experience, and what drives the work. 2–3 sentences.]',
  },

  // Empty until real client work can be shown. Components render honest
  // empty states / sample templates rather than fabricating results.
  caseStudies: [] as { title: string; summary: string; result: string }[],
  testimonials: [] as { quote: string; author: string; role: string }[],
} as const

export type SiteConfig = typeof siteConfig
export type ServicePillar = (typeof siteConfig.services)[number]
export type ServiceId = ServicePillar['id']
