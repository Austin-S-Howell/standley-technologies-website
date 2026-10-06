// Content for the /apollo product page — copy, film chapters and media paths in
// one place, the same pattern as siteConfig / downloads.
//
// Everything here follows the Apollo launch film scene by scene, so keep claims
// to what the film shows. Apollo isn't released yet: the page is informational,
// carries a "Coming soon" message, and deliberately has no download links.

import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BadgeCheck,
  BellRing,
  BookOpen,
  Bot,
  Brain,
  CalendarClock,
  ChartColumn,
  CircleDot,
  CirclePlus,
  CodeXml,
  Cpu,
  Eye,
  FileChartColumn,
  FileDiff,
  FolderOpen,
  Globe,
  Laptop,
  Layers,
  LayoutTemplate,
  ListPlus,
  MessageCircleQuestion,
  MessagesSquare,
  MonitorPlay,
  MousePointer2,
  MousePointerClick,
  Network,
  Palette,
  Plug,
  Radio,
  Search,
  Shirt,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareCode,
  SquareTerminal,
  Table2,
  UserCog,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react'

const MEDIA = '/media/apollo'

/**
 * The launch film. Encoded for the web from the 437 MB master (H.264, no audio
 * track — it's a silent motion-graphics piece), with keyframes forced on every
 * chapter start so chapter jumps land instantly. Phones get the 720p cut.
 */
export const apolloFilm = {
  title: 'Apollo — the launch film',
  description:
    'A three-and-a-half-minute tour of Apollo: ask anything, design, code, a council of bots, teamwork, admin controls and automation.',
  src: `${MEDIA}/apollo-launch-1080p.mp4`,
  srcSmall: `${MEDIA}/apollo-launch-720p.mp4`,
  poster: `${MEDIA}/apollo-launch-poster.webp`,
  /** 1200×630 social card (the film's end card). */
  shareImage: `${MEDIA}/apollo-og.jpg`,
  /** Seconds. 3:30. */
  duration: 210,
  uploadDate: '2026-10-06',
} as const

/** Film timestamp as m:ss (e.g. 95 → "1:35"). */
export const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export interface FilmChapter {
  label: string
  /** Film timestamp (seconds) where the chapter begins. */
  start: number
}

/** The chapter strip under the film. Starts match the film's own chapter cards. */
export const filmChapters: readonly FilmChapter[] = [
  { label: 'Intro', start: 0 },
  { label: 'Ask', start: 15.5 },
  { label: 'Design', start: 40.5 },
  { label: 'Code', start: 64.5 },
  { label: 'Bots', start: 96.5 },
  { label: 'Together', start: 114 },
  { label: 'Admin', start: 131.5 },
  { label: 'Automate', start: 155 },
  { label: 'Everywhere', start: 185 },
]

export interface ApolloFeature {
  icon: LucideIcon
  title: string
  body: string
}

export interface ApolloChapter {
  id: string
  label: string
  icon: LucideIcon
  /** Headline; `accent` is appended in the film's blue → violet gradient. */
  headline: string
  accent?: string
  summary: string
  features: readonly ApolloFeature[]
  /** Where this chapter starts in the film. */
  filmStart: number
  /** A short muted loop of the chapter's key scene, cut from the film. */
  clip: { src: string; poster: string; alt: string }
}

const clip = (name: string, alt: string) => ({
  src: `${MEDIA}/clips/${name}.mp4`,
  poster: `${MEDIA}/clips/${name}.webp`,
  alt,
})

export const apolloChapters: readonly ApolloChapter[] = [
  {
    id: 'ask',
    label: 'Ask',
    icon: Sparkles,
    headline: 'Ask',
    accent: 'anything.',
    summary:
      'Start with a question or a goal. Apollo thinks it through, searches the web, and comes back with something you can use — not a page of links.',
    filmStart: 15.5,
    clip: clip(
      'ask',
      'Apollo researching product launch timing on the web, then filling in a launch-plan table with tasks, owners, due dates and status.',
    ),
    features: [
      {
        icon: Cpu,
        title: 'On the model you choose',
        body: 'Use your company’s model or connect your own account — picked right in the chat box.',
      },
      {
        icon: Search,
        title: 'It does the research',
        body: 'Apollo searches the web, compares what it finds, and hands back findings with the sources linked — ready to save as a PDF.',
      },
      {
        icon: Table2,
        title: 'Tables that type themselves',
        body: 'Ask for a plan and watch a live table fill in: tasks, owners, due dates and status.',
      },
      {
        icon: Brain,
        title: 'Remember this chat',
        body: 'Auto Remember keeps what matters for your next conversation — and Apollo forgets it when you ask.',
      },
      {
        icon: ListPlus,
        title: 'Queue what’s next',
        body: 'Line up your next prompts while Apollo is still working on the last one.',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: Palette,
    headline: 'What should we',
    accent: 'create?',
    summary:
      'Pick a starting point, describe what you want, and watch Apollo build it in front of you — then refine it one click at a time.',
    filmStart: 40.5,
    clip: clip(
      'design',
      'Apollo building a marketing landing page live, then changing just the headline after the user clicks it.',
    ),
    features: [
      {
        icon: LayoutTemplate,
        title: 'Start from a template',
        body: 'Landing pages, mobile app designs, slides, documents, wireframes, animations, UI mockups, résumés, 3D objects, HTML emails and financial reports.',
      },
      {
        icon: Eye,
        title: 'Watch it build',
        body: 'Your design takes shape live, with a preview and the code a click apart.',
      },
      {
        icon: MousePointerClick,
        title: 'Change just this part',
        body: 'Click any part of a design and say what to change. Everything else stays exactly as it was.',
      },
      {
        icon: Layers,
        title: 'Whole design systems',
        body: 'Foundations, components, layouts and patterns, built as one system — and it keeps building after you leave the page.',
      },
      {
        icon: ChartColumn,
        title: 'Charts. Pictures. Documents.',
        body: 'Make charts and images too, and export documents to Word or PDF.',
      },
    ],
  },
  {
    id: 'code',
    label: 'Code',
    icon: CodeXml,
    headline: 'It edits your code. Then',
    accent: 'runs the tests.',
    summary:
      'Give Apollo a task and a project. It reads the code, makes the change, runs the tests and shows you the result running — every step in plain view.',
    filmStart: 64.5,
    clip: clip(
      'code',
      'Apollo adding an export button: it reads the reports page, edits it, runs the tests, then shows the updated page running.',
    ),
    features: [
      {
        icon: FileDiff,
        title: 'Every step, in plain view',
        body: 'Files read, searches made, lines changed and tests run — all shown inline as Apollo works.',
      },
      {
        icon: MonitorPlay,
        title: 'Watch it run',
        body: 'See the app running with the change in place before you call it done.',
      },
      {
        icon: SquareTerminal,
        title: 'Its own place to build',
        body: 'Apollo works on its own copy of your project and asks before running a command — run it, skip it, or stop asking for that one.',
      },
      {
        icon: Network,
        title: 'Build. Review. Fix.',
        body: 'Bigger jobs are split across agents working in parallel, then reviewed and fixed before they’re finished.',
      },
      {
        icon: SquareCode,
        title: 'Right inside your editor',
        body: 'The same Apollo works in VS Code, so you can hand off a task without leaving your editor.',
      },
    ],
  },
  {
    id: 'bots',
    label: 'Bots',
    icon: Bot,
    headline: 'Eight specialists.',
    accent: 'One press.',
    summary:
      'Call a council of specialist bots — planning, UI, UX, back end, validation, security, bug hunting, and a judge with the final say — and let them work the problem together.',
    filmStart: 96.5,
    clip: clip(
      'bots',
      'Apollo’s council of eight specialist bots, one bot being dressed up, and the council reviewing a plan until every bot agrees.',
    ),
    features: [
      {
        icon: Users,
        title: 'A council on call',
        body: 'Run all eight specialists at once, or start from a quick-start lineup.',
      },
      {
        icon: BadgeCheck,
        title: 'Finished when they all agree',
        body: 'Each bot reviews the work and approves it or asks for changes. It isn’t done until they all sign off.',
      },
      {
        icon: CirclePlus,
        title: 'Make your own',
        body: 'Add new bots for the jobs your team does most.',
      },
      {
        icon: Shirt,
        title: 'Dress them up',
        body: 'Give every bot its own look — hats, props and all.',
      },
    ],
  },
  {
    id: 'together',
    label: 'Together',
    icon: Users,
    headline: 'One project.',
    accent: 'One team.',
    summary:
      'Shared projects, team conversations and live sessions — with Apollo working alongside everyone.',
    filmStart: 114,
    clip: clip(
      'together',
      'A shared client-portal project, a team channel where Apollo summarizes what was agreed, and a live coding session teammates can watch.',
    ),
    features: [
      {
        icon: FolderOpen,
        title: 'Shared projects',
        body: 'Pages, documents and data tables live together in one project, with a live lobby that shows who’s there.',
      },
      {
        icon: MessagesSquare,
        title: 'Apollo’s in the conversation',
        body: 'Team channels and direct messages with Apollo built in. Ask it what you just agreed and it answers in the thread.',
      },
      {
        icon: Radio,
        title: 'Share it live',
        body: 'Teammates can watch a session as it happens and suggest the next step — you choose whether to use it.',
      },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: SlidersHorizontal,
    headline: 'Who sees',
    accent: 'what.',
    summary:
      'One admin console for people, spending, service health, company knowledge, models and integrations.',
    filmStart: 131.5,
    clip: clip(
      'admin',
      'The Apollo admin console: adding a person and choosing what they can use, setting monthly spending caps, and live status for every service.',
    ),
    features: [
      {
        icon: UserCog,
        title: 'People and permissions',
        body: 'Add people and choose exactly which parts of Apollo each one can use — Code, Design, Admin and more.',
      },
      {
        icon: Wallet,
        title: 'Set spending caps',
        body: 'See usage person by person and set a monthly cap for each.',
      },
      {
        icon: Activity,
        title: 'Every service, in view',
        body: 'Live status for chat models, pictures, dictation, voice, the browser agent and live channels.',
      },
      {
        icon: BookOpen,
        title: 'Hand it your documents',
        body: 'Drop in handbooks, price lists and policies, and every chat in the company can answer from them.',
      },
      {
        icon: Plug,
        title: 'Models and integrations',
        body: 'Name the models your company uses, add new ones, and switch integrations on for everyone.',
      },
    ],
  },
  {
    id: 'automate',
    label: 'Automate',
    icon: Workflow,
    headline: 'It can use your',
    accent: 'computer.',
    summary:
      'Hand Apollo the routine work. It can operate your computer while you watch, learn a task once, run on a schedule, and check with you before it acts.',
    filmStart: 155,
    clip: clip(
      'automate',
      'Asking Apollo to check on the launch every morning at 7 and message the results, which then arrive on a phone.',
    ),
    features: [
      {
        icon: MousePointer2,
        title: 'You see every move',
        body: 'Apollo can click, type and work through apps on your computer — in plain sight.',
      },
      {
        icon: CircleDot,
        title: 'Teach it once',
        body: 'Show it a task one time. Apollo records the steps and learns how it’s done.',
      },
      {
        icon: CalendarClock,
        title: 'Just say when',
        body: '“Every morning at 7, check on the launch and message me” becomes a scheduled task.',
      },
      {
        icon: BellRing,
        title: 'Wake up to answers',
        body: 'Results arrive on your phone, ready when you are.',
      },
      {
        icon: FileChartColumn,
        title: 'Reports that fill themselves',
        body: 'Recurring reports pull in the latest numbers — like key figures from QuickBooks — on their own.',
      },
      {
        icon: MessageCircleQuestion,
        title: 'It keeps watch. It asks first.',
        body: 'Agents keep an eye on things like your inbox and ask before they act. Reply from your phone and they carry on.',
      },
    ],
  },
]

/** The film's integration hub, clockwise from the top. */
export const apolloIntegrations = ['GitHub', 'QuickBooks', 'Gmail', 'Outlook · Power BI'] as const

export const apolloPlatforms: readonly { label: string; icon: LucideIcon }[] = [
  { label: 'Web', icon: Globe },
  { label: 'Windows & Mac', icon: Laptop },
  { label: 'Phone', icon: Smartphone },
  { label: 'VS Code', icon: SquareCode },
]
