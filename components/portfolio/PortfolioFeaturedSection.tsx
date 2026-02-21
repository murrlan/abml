import Link from 'next/link'
import type { PortfolioProject } from '@/lib/portfolio'

type Props = {
  projects: PortfolioProject[]
}

export default function PortfolioFeaturedSection({ projects }: Props) {
  if (!projects.length) return null

  return (
    <section className="max-w-5xl mx-auto mb-16 lg:mb-20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
            Featured projects
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A closer look at a few client projects, including the problem, solution, and results.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {project.thumbnailImage && (
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <div className="p-6 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {project.category && (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {project.category}
                  </span>
                )}
                {project.clientName && (
                  <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Client: {project.clientName}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {project.title}
              </h3>

              {project.shortDescription && (
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-4">
                  {project.shortDescription}
                </p>
              )}

              {project.highlights.length > 0 && (
                <ul className="mb-4 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {project.highlights.map((highlight) => (
                    <li key={highlight.id} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span>{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid gap-4 sm:grid-cols-3 mb-5 text-sm text-zinc-700 dark:text-zinc-300">
                {project.problem && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Problem
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4">
                      {project.solution}
                    </p>
                  </div>
                )}
                {project.results && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Results
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4">
                      {project.results}
                    </p>
                  </div>
                )}
              </div>

              {project.technologies.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-3">
                {project.slug && (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    View case study
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
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    View live site
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
