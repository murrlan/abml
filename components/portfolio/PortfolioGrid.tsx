import Link from 'next/link'
import type { PortfolioProject } from '@/lib/portfolio'

type Props = {
  projects: PortfolioProject[]
}

export default function PortfolioGrid({ projects }: Props) {
  if (!projects.length) return null

  return (
    <section>
      <div className="mb-10 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">More work</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Additional projects</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          More sites and applications we have designed and shipped for clients.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col border border-border bg-background transition-colors hover:border-muted"
          >
            {project.thumbnailImage ? (
              <div className="relative flex h-44 w-full items-center justify-center border-b border-border bg-muted/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnailImage}
                  alt={`${project.title} project preview`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                {project.category ? (
                  <span className="border border-border px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted">
                    {project.category}
                  </span>
                ) : null}
                {project.launchDate ? (
                  <span className="text-xs text-muted">Launched {new Date(project.launchDate).toLocaleDateString()}</span>
                ) : null}
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{project.title}</h3>

              {project.clientName ? (
                <p className="mt-1 text-xs text-muted">for {project.clientName}</p>
              ) : null}

              {project.shortDescription ? (
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{project.shortDescription}</p>
              ) : null}

              {project.technologies.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="border border-border px-2 py-1 text-[11px] text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                {project.slug ? (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="nav-link text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Case study
                  </Link>
                ) : null}
                {project.liveUrl ? (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-sm font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Live site
                  </Link>
                ) : null}
                {project.repoUrl ? (
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-muted underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Code
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
