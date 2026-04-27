import supabase from './supabaseClient'

export type PortfolioHighlight = {
  id: string
  text: string
}

/** When `null`, the case study omits the testimonial block until a real quote exists. */
export type PortfolioTestimonial = {
  quote: string
  attribution: string
  role?: string
} | null

export type PortfolioLighthouseSnapshot = {
  /** ISO date of the audit */
  auditedAt: string
  /** URL that was tested */
  url: string
  /** Lighthouse overall category scores 0–100 (single run; conditions vary). */
  performanceScore: number
  accessibilityScore: number
}

export type PortfolioProject = {
  id: string
  slug: string
  title: string
  shortDescription: string
  clientName?: string | null
  liveUrl?: string | null
  repoUrl?: string | null
  category?: string | null
  isFeatured: boolean
  launchDate?: string | null
  problem?: string | null
  solution?: string | null
  results?: string | null
  process?: string | null
  highlights: PortfolioHighlight[]
  technologies: string[]
  thumbnailImage?: string | null
  galleryImages?: string[] | null
  hasPlaceholderScreenshots?: boolean
  testimonial?: PortfolioTestimonial
  lighthouseSnapshot?: PortfolioLighthouseSnapshot | null
}

const TABLE_NAME = 'portfolio_projects'

/** One automated Lighthouse run (mobile), grizzlylawn.com. Scores vary by network and device. */
const GRIZZLY_LIGHTHOUSE: PortfolioLighthouseSnapshot = {
  auditedAt: '2026-04-25',
  url: 'https://grizzlylawn.com/',
  performanceScore: 76,
  accessibilityScore: 96,
}

const WILLYS_LIGHTHOUSE: PortfolioLighthouseSnapshot = {
  auditedAt: '2026-04-27',
  url: 'https://willysauto406.com/',
  performanceScore: 66,
  accessibilityScore: 93,
}

const GRIZZLY_RESULTS = `Grizzly Lawn went from no dedicated marketing site to a fully launched, mobile-first Next.js experience built to turn local search traffic into quote requests. The project shipped quickly with clear service pages, trust-forward copy, and conversion-focused calls to action.

We do not publish client business metrics without permission. Qualitatively, the site gives the business a credible first impression, explains the offer fast on a phone, and removes friction from getting in touch.

Lighthouse snapshot (automated mobile run, ${GRIZZLY_LIGHTHOUSE.auditedAt}): Performance ${GRIZZLY_LIGHTHOUSE.performanceScore}, Accessibility ${GRIZZLY_LIGHTHOUSE.accessibilityScore}. Real-world scores change with content, hosting, and third-party scripts. This snapshot documents one measured point in time on the live URL.`

const WILLYS_RESULTS = `Willy's Auto went from zero online presence to a fully launched, mobile-first site optimized for local search. Missoula drivers can now find the shop online, verify hours and services, and reach the team quickly.

Lighthouse snapshot as of ${WILLYS_LIGHTHOUSE.auditedAt} (automated mobile run): Performance ${WILLYS_LIGHTHOUSE.performanceScore}, Accessibility ${WILLYS_LIGHTHOUSE.accessibilityScore}. Real-world scores can vary over time based on content, hosting, and third-party scripts.`

const LOCAL_PORTFOLIO_FALLBACK: PortfolioProject[] = [
  {
    id: 'local-grizzly-lawn',
    slug: 'grizzly-lawn',
    title: 'Grizzly Lawn',
    shortDescription:
      'A modern lawn care website built to convert local search traffic into quote requests.',
    clientName: 'Grizzly Lawn',
    liveUrl: 'https://grizzlylawn.com',
    repoUrl: null,
    category: 'Local service website',
    isFeatured: true,
    launchDate: null,
    problem: `Grizzly Lawn needed more than a social page: a professional home on the web that explained services clearly, built trust with Missoula-area homeowners, and made requesting a quote feel easy on a phone.`,
    solution: `We designed and built a lean marketing site in Next.js and Tailwind CSS with fast loads, strong typography hierarchy, service-focused pages, and CTAs placed where intent is highest. Everything is structured for local relevance and long-term maintainability.`,
    results: GRIZZLY_RESULTS,
    process: null,
    highlights: [
      { id: 'grizzly-highlight-1', text: 'Mobile-first layout and clear CTAs' },
      { id: 'grizzly-highlight-2', text: 'Structured for local discovery and quote requests' },
    ],
    technologies: ['Next.js', 'Tailwind CSS'],
    thumbnailImage: null,
    galleryImages: null,
    testimonial: null,
    lighthouseSnapshot: GRIZZLY_LIGHTHOUSE,
  },
  {
    id: 'local-willys-auto',
    slug: 'willys-auto',
    title: "Willy's Auto",
    shortDescription:
      'A mobile-first website for a long running Missoula auto repair shop. Built to convert local search traffic into calls.',
    clientName: "Willy's Auto",
    liveUrl: 'https://willysauto406.com',
    repoUrl: null,
    category: 'Auto repair',
    isFeatured: true,
    launchDate: '2026-04-23',
    problem:
      "Established local auto shop with 20+ years in business but no web presence. Customers couldn't find them online, verify hours, or confirm services before calling.",
    solution:
      "Built a mobile-first website that clearly presents services, establishes trust through the shop's history, and makes it easy for Missoula drivers to contact or find them.",
    results: WILLYS_RESULTS,
    process: null,
    highlights: [
      { id: 'willys-highlight-1', text: 'Zero to fully launched in days' },
      { id: 'willys-highlight-2', text: 'Built for local search in Missoula MT' },
    ],
    technologies: ['Next.js', 'Tailwind CSS'],
    thumbnailImage: null,
    galleryImages: null,
    hasPlaceholderScreenshots: true,
    testimonial: null,
    lighthouseSnapshot: WILLYS_LIGHTHOUSE,
  },
]

const KNOWN_LIVE_URLS: Array<{ match: (p: Pick<PortfolioProject, 'slug' | 'title' | 'clientName'>) => boolean; url: string }> =
  [
    {
      match: (p) =>
        (p.slug ?? '').toLowerCase().includes('willy') ||
        (p.title ?? '').toLowerCase().includes('willy') ||
        (p.clientName ?? '').toLowerCase().includes('willy'),
      url: 'https://willysauto406.com',
    },
    {
      match: (p) =>
        (p.slug ?? '').toLowerCase().includes('grizzly') ||
        (p.title ?? '').toLowerCase().includes('grizzly') ||
        (p.clientName ?? '').toLowerCase().includes('grizzly'),
      url: 'https://grizzlylawn.com',
    },
  ]

function withFallbackLiveUrl(project: PortfolioProject): PortfolioProject {
  if (project.liveUrl) return project
  const match = KNOWN_LIVE_URLS.find((rule) =>
    rule.match({
      slug: project.slug,
      title: project.title,
      clientName: project.clientName,
    })
  )
  return match ? { ...project, liveUrl: match.url } : project
}

function mapRow(row: Record<string, unknown>): PortfolioProject {
  return {
    id: String(row.id),
    slug: row.slug as string,
    title: row.title as string,
    shortDescription: (row.short_description as string) ?? '',
    clientName: (row.client_name as string | null) ?? null,
    liveUrl: (row.live_url as string | null) ?? null,
    repoUrl: (row.repo_url as string | null) ?? null,
    category: (row.category as string | null) ?? null,
    isFeatured: Boolean(row.is_featured),
    launchDate: (row.launch_date as string | null) ?? null,
    problem: (row.problem as string | null) ?? null,
    solution: (row.solution as string | null) ?? null,
    results: (row.results as string | null) ?? null,
    process: (row.process as string | null) ?? null,
    highlights: Array.isArray(row.highlights)
      ? (row.highlights as unknown[]).map((text: unknown, index: number) => ({
          id: `${row.slug ?? row.id}-highlight-${index}`,
          text: String(text),
        }))
      : [],
    technologies: Array.isArray(row.technologies)
      ? (row.technologies as unknown[]).map((tech: unknown) => String(tech))
      : [],
    thumbnailImage: (row.thumbnail_image as string | null) ?? null,
    galleryImages: Array.isArray(row.gallery_images)
      ? (row.gallery_images as unknown[]).map((src: unknown) => String(src))
      : null,
  }
}

/** Editorial defaults for the Grizzly case study (CMS may omit these fields). */
function withGrizzlyCaseStudyDefaults(project: PortfolioProject): PortfolioProject {
  if (project.slug !== 'grizzly-lawn') return project
  return {
    ...project,
    testimonial: project.testimonial ?? null,
    lighthouseSnapshot: project.lighthouseSnapshot ?? GRIZZLY_LIGHTHOUSE,
    problem: project.problem ?? LOCAL_PORTFOLIO_FALLBACK[0]!.problem ?? null,
    solution: project.solution ?? LOCAL_PORTFOLIO_FALLBACK[0]!.solution ?? null,
    results: project.results ?? GRIZZLY_RESULTS,
  }
}

function finalizeProject(project: PortfolioProject): PortfolioProject {
  return withGrizzlyCaseStudyDefaults(withFallbackLiveUrl(project))
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!supabase) return LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject)

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(
        [
          'id',
          'slug',
          'title',
          'short_description',
          'client_name',
          'live_url',
          'repo_url',
          'category',
          'is_featured',
          'launch_date',
          'problem',
          'solution',
          'results',
          'process',
          'highlights',
          'technologies',
          'thumbnail_image',
          'gallery_images',
        ].join(', ')
      )
      .order('is_featured', { ascending: false })
      .order('launch_date', { ascending: false, nullsFirst: false })

    if (error) {
      return LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject)
    }

    if (!data || !Array.isArray(data)) {
      return LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject)
    }

    const rows = data as unknown as Record<string, unknown>[]

    return rows.map((row) => finalizeProject(mapRow(row)))
  } catch (err) {
    console.error('Unexpected error fetching portfolio projects:', err)
    return LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject)
  }
}

export async function getPortfolioProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  if (!supabase) {
    const p = LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject).find((x) => x.slug === slug)
    return p ?? null
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(
        [
          'id',
          'slug',
          'title',
          'short_description',
          'client_name',
          'live_url',
          'repo_url',
          'category',
          'is_featured',
          'launch_date',
          'problem',
          'solution',
          'results',
          'process',
          'highlights',
          'technologies',
          'thumbnail_image',
          'gallery_images',
        ].join(', ')
      )
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      const p = LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject).find((x) => x.slug === slug)
      return p ?? null
    }

    if (!data) {
      const p = LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject).find((x) => x.slug === slug)
      return p ?? null
    }

    const row = data as unknown as Record<string, unknown>
    return finalizeProject(mapRow(row))
  } catch (err) {
    console.error('Unexpected error fetching portfolio project by slug:', err)
    const p = LOCAL_PORTFOLIO_FALLBACK.map(finalizeProject).find((x) => x.slug === slug)
    return p ?? null
  }
}
