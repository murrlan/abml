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

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
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
      console.error(
        'Error fetching portfolio projects from Supabase:',
        error.message ?? error,
        JSON.stringify(error)
      )
      return []
    }

    if (!data) return []

    return data.map((row: Record<string, unknown>): PortfolioProject => ({
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
    }))
  } catch (err) {
    console.error('Unexpected error fetching portfolio projects:', err)
    return []
  }
}

export async function getPortfolioProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
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
      console.error('Error fetching portfolio project by slug:', error)
      return null
    }

    if (!data) return null

    const row = data as Record<string, unknown>
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
  } catch (err) {
    console.error('Unexpected error fetching portfolio project by slug:', err)
    return null
  }
}
