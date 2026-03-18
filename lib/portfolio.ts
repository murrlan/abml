import supabase from './supabaseClient'

export type PortfolioHighlight = {
  id: string
  text: string
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
}

const TABLE_NAME = 'portfolio_projects'

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
    problem:
      'The business needed a fast, professional web presence that clearly explained services and made it easy to request a quote.',
    solution:
      'A clean, mobile-first marketing site with clear service pages, strong calls-to-action, and performance-focused implementation.',
    results: null,
    process: null,
    highlights: [
      { id: 'grizzly-highlight-1', text: 'Mobile-first layout and clear CTAs' },
      { id: 'grizzly-highlight-2', text: 'Designed for local SEO + trust signals' },
    ],
    technologies: ['Next.js', 'Tailwind CSS'],
    thumbnailImage: null,
    galleryImages: null,
  },
]

const KNOWN_LIVE_URLS: Array<{ match: (p: Pick<PortfolioProject, 'slug' | 'title' | 'clientName'>) => boolean; url: string }> =
  [
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

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!supabase) return LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl)

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
      // In local/dev environments Supabase may not be reachable; fall back silently.
      return LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl)
    }

    if (!data) return LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl)

    return data.map((row: Record<string, unknown>): PortfolioProject =>
      withFallbackLiveUrl({
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
      })
    )
  } catch (err) {
    console.error('Unexpected error fetching portfolio projects:', err)
    return LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl)
  }
}

export async function getPortfolioProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  if (!supabase) {
    return (
      LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl).find(
        (p) => p.slug === slug
      ) ?? null
    )
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
      return (
        LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl).find(
          (p) => p.slug === slug
        ) ?? null
      )
    }

    if (!data) {
      return (
        LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl).find(
          (p) => p.slug === slug
        ) ?? null
      )
    }

    const row = data as Record<string, unknown>
    return withFallbackLiveUrl({
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
    })
  } catch (err) {
    console.error('Unexpected error fetching portfolio project by slug:', err)
    return (
      LOCAL_PORTFOLIO_FALLBACK.map(withFallbackLiveUrl).find(
        (p) => p.slug === slug
      ) ?? null
    )
  }
}
