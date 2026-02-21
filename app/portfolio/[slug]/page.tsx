import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPortfolioProjectBySlug } from '@/lib/portfolio'

type Props = {
  params: Promise<{ slug: string }>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              Zootown Web Design
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Portfolio
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to portfolio
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Case study
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-3">
              {project.title}
            </h1>
            {project.clientName && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                for {project.clientName}
              </p>
            )}
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
            {project.category && (
              <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 font-medium text-zinc-700 dark:text-zinc-300">
                {project.category}
              </span>
            )}
            {project.launchDate && (
              <span>Launched {new Date(project.launchDate).toLocaleDateString()}</span>
            )}
            {project.technologies.length > 0 && (
              <span>
                Stack: {project.technologies.join(', ')}
              </span>
            )}
          </div>

          {project.shortDescription && (
            <p className="mb-8 text-lg text-zinc-700 dark:text-zinc-300">
              {project.shortDescription}
            </p>
          )}

          {hasGallery && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Project gallery
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`grid gap-10 ${hasProjectDetails ? 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]' : ''}`}>
            <section className="space-y-8">
              {project.problem && (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    The challenge
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300">{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    Our approach
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300">{project.solution}</p>
                </div>
              )}

              {project.process && (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    Process
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                    {project.process}
                  </p>
                </div>
              )}

              {project.results && (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    Results
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                    {project.results}
                  </p>
                </div>
              )}
            </section>

            {hasProjectDetails && (
              <aside className="space-y-6 lg:pl-6">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                  <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                    Project details
                  </h3>

                  <dl className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                    {project.clientName && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-zinc-500 dark:text-zinc-400">Client</dt>
                        <dd className="text-right">{project.clientName}</dd>
                      </div>
                    )}
                    {project.launchDate && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-zinc-500 dark:text-zinc-400">Launched</dt>
                        <dd className="text-right">
                          {new Date(project.launchDate).toLocaleDateString()}
                        </dd>
                      </div>
                    )}
                    {project.technologies.length > 0 && (
                      <div>
                        <dt className="mb-1 text-zinc-500 dark:text-zinc-400">Stack</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-5 space-y-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-zinc-800 transition-colors"
                      >
                        View live site
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        View code
                      </Link>
                    )}
                  </div>
                </div>

                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  <p className="mb-2">
                    Want results like this for your business?
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    Start a project conversation
                    <svg
                      className="ml-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
