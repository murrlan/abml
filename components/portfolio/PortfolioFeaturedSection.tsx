import Link from 'next/link'
import type { PortfolioProject } from '@/lib/portfolio'

type Props = {
  projects: PortfolioProject[]
}

export default function PortfolioFeaturedSection({ projects }: Props) {
  if (!projects.length) return null

  return (
    <section>
      <div className="mb-10 border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Featured</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Deep dives</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Problem, solution, and results — the way we document real client work.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col border border-border bg-background transition-colors hover:border-muted"
          >
            {project.thumbnailImage ? (
              <div className="relative flex h-48 w-full items-center justify-center border-b border-border bg-muted/5 sm:h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnailImage}
                  alt={`${project.title} project preview`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : null}

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {project.category ? (
                  <span className="border border-border px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted">
                    {project.category}
                  </span>
                ) : null}
                {project.clientName ? (
                  <span className="border border-border px-2 py-1 text-xs text-muted">Client: {project.clientName}</span>
                ) : null}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{project.title}</h3>

              {project.shortDescription ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.shortDescription}</p>
              ) : null}

              {project.highlights.length > 0 ? (
                <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-muted">
                  {project.highlights.map((highlight) => (
                    <li key={highlight.id} className="flex gap-2">
                      <span className="font-mono text-accent" aria-hidden>
                        —
                      </span>
                      <span>{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                {project.problem ? (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Problem</h4>
                    <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">{project.problem}</p>
                  </div>
                ) : null}
                {project.solution ? (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Solution</h4>
                    <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">{project.solution}</p>
                  </div>
                ) : null}
                {project.results ? (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Results</h4>
                    <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted">{project.results}</p>
                  </div>
                ) : null}
              </div>

              {project.technologies.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="border border-border px-2 py-1 text-xs text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-4 pt-8">
                {project.slug ? (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="nav-link text-sm font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View case study
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
