import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPortfolioProjectBySlug, type PortfolioProject } from '@/lib/portfolio'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getPortfolioProjectBySlug(slug)
  if (!project) return { title: 'Project' }
  return {
    title: project.title,
    description: project.shortDescription || `Case study: ${project.title} by Opal Web Design.`,
  }
}

function isTestimonialContent(
  t: PortfolioProject['testimonial']
): t is { quote: string; attribution: string; role?: string } {
  return (
    !!t &&
    typeof t === 'object' &&
    'quote' in t &&
    typeof (t as { quote: unknown }).quote === 'string' &&
    (t as { quote: string }).quote.trim().length > 0
  )
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getPortfolioProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const galleryImages = project.galleryImages ?? []
  const allImages =
    project.thumbnailImage && !galleryImages.includes(project.thumbnailImage)
      ? [project.thumbnailImage, ...galleryImages]
      : galleryImages.length > 0
        ? galleryImages
        : project.thumbnailImage
          ? [project.thumbnailImage]
          : []
  const hasGallery = allImages.length > 0
  const hasProjectDetails = !!(
    project.clientName ||
    project.launchDate ||
    (project.technologies && project.technologies.length > 0) ||
    project.liveUrl ||
    project.repoUrl
  )

  const lh = project.lighthouseSnapshot

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/portfolio"
            className="nav-link inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>←</span> Back to portfolio
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-muted">Case study</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          {project.clientName ? (
            <p className="mt-3 text-sm text-muted">for {project.clientName}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted">
            {project.category ? (
              <span className="border border-border px-2.5 py-1 font-medium uppercase tracking-wider text-foreground">
                {project.category}
              </span>
            ) : null}
            {project.launchDate ? <span>Launched {new Date(project.launchDate).toLocaleDateString()}</span> : null}
            {project.technologies.length > 0 ? (
              <span>Stack: {project.technologies.join(', ')}</span>
            ) : null}
          </div>
          {project.shortDescription ? (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{project.shortDescription}</p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {hasGallery ? (
          <div className="mb-16 border-b border-border pb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Gallery</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative aspect-video overflow-hidden border border-border bg-muted/10"
                >
                  <Image
                    src={src}
                    alt={`${project.title} site screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={`grid gap-12 ${hasProjectDetails ? 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]' : ''}`}>
          <div className="space-y-14">
            {project.problem ? (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Problem</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{project.problem}</p>
              </section>
            ) : null}

            {project.solution ? (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Solution</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{project.solution}</p>
              </section>
            ) : null}

            {project.results ? (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Results</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  {project.results.split(/\n\n+/).map((block, i) => (
                    <p key={i}>{block.trim()}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {lh ? (
              <section className="border border-border p-6 sm:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Lighthouse snapshot</h2>
                <p className="mt-2 text-sm text-muted">
                  Automated mobile run on{' '}
                  <a
                    href={lh.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {lh.url}
                  </a>{' '}
                  — {lh.auditedAt}. Scores are a single point in time; real-world results vary.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:max-w-md">
                  <div className="border border-border p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Performance</dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{lh.performanceScore}</dd>
                  </div>
                  <div className="border border-border p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Accessibility</dt>
                    <dd className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{lh.accessibilityScore}</dd>
                  </div>
                </dl>
              </section>
            ) : null}

            {isTestimonialContent(project.testimonial) ? (
              <section className="border-l-2 border-accent pl-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Client voice</h2>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                  <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-muted">
                    — {project.testimonial.attribution}
                    {project.testimonial.role ? `, ${project.testimonial.role}` : ''}
                  </footer>
                </blockquote>
              </section>
            ) : null}

            {project.process ? (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Process</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted">{project.process}</p>
              </section>
            ) : null}
          </div>

          {hasProjectDetails ? (
            <aside className="space-y-8 lg:pl-4">
              <div className="border border-border p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Project details</h3>
                <dl className="mt-6 space-y-4 text-sm text-muted">
                  {project.clientName ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Client</dt>
                      <dd className="text-right text-foreground">{project.clientName}</dd>
                    </div>
                  ) : null}
                  {project.launchDate ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Launched</dt>
                      <dd className="text-right text-foreground">
                        {new Date(project.launchDate).toLocaleDateString()}
                      </dd>
                    </div>
                  ) : null}
                  {project.technologies.length > 0 ? (
                    <div>
                      <dt className="text-muted">Stack</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="border border-border px-2 py-1 text-xs text-foreground">
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-8 space-y-3">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-solid flex min-h-11 w-full items-center justify-center rounded px-4 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      View live site
                    </Link>
                  ) : null}
                  {project.repoUrl ? (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 w-full items-center justify-center rounded border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      View code
                    </Link>
                  ) : null}
                </div>
              </div>

              <p className="text-sm text-muted">
                Want results like this for your business?{' '}
                <Link href="/contact" className="font-medium text-accent underline-offset-4 hover:underline">
                  Start a project conversation
                </Link>
              </p>
            </aside>
          ) : (
            <div className="border-t border-border pt-10 lg:col-span-2">
              <p className="text-sm text-muted">
                <Link href="/contact" className="font-medium text-accent underline-offset-4 hover:underline">
                  Contact us
                </Link>{' '}
                about a similar build.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
