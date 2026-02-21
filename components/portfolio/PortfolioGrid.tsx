import Link from 'next/link'
import type { PortfolioProject } from '@/lib/portfolio'

type Props = {
  projects: PortfolioProject[]
}

export default function PortfolioGrid({ projects }: Props) {
  if (!projects.length) return null

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
            More work
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Additional websites and applications we&apos;ve designed and built for clients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col"
          >
            {project.thumbnailImage && (
              <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <div className="mb-3 flex items-center justify-between gap-3">
                {project.category && (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {project.category}
                  </span>
                )}
                {project.launchDate && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-500">
                    Launched {new Date(project.launchDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-1.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {project.title}
              </h3>

              {project.clientName && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3">
                  for {project.clientName}
                </p>
              )}

              {project.shortDescription && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-4">
                  {project.shortDescription}
                </p>
              )}

              {project.technologies.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
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
                    View site
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
                {project.repoUrl && (
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  >
                    View code
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
