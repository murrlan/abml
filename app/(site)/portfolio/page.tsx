import type { Metadata } from 'next'
import Link from 'next/link'
import { getPortfolioProjects } from '@/lib/portfolio'
import PortfolioFeaturedSection from '@/components/portfolio/PortfolioFeaturedSection'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected web design and Next.js projects by Opal Web Design — case studies for Missoula-area and Montana small businesses.',
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects()
  const featuredProjects = projects.filter((project) => project.isFeatured)
  const otherProjects = projects.filter((project) => !project.isFeatured)
  const hasProjects = projects.length > 0

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Our work</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Case studies in problem, solution, and results.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Each project here is documented the way we would want to read it as a buyer: what was broken, what we
            shipped, and what changed for the business — without fluff.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        {hasProjects ? (
          <div className="space-y-20 lg:space-y-24">
            <PortfolioFeaturedSection projects={featuredProjects} />
            <PortfolioGrid projects={otherProjects} />
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border border-dashed border-border px-6 py-14 text-center sm:px-10">
            <h2 className="text-xl font-semibold text-foreground">Portfolio coming soon</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We are adding recent client projects here. In the meantime, get in touch and we will share examples that
              match your industry and goals.
            </p>
            <Link
              href="/contact"
              className="btn-primary-solid mt-8 inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Contact
            </Link>
          </div>
        )}

        <RevealOnScroll>
          <div className="mx-auto mt-20 max-w-3xl border border-border px-8 py-12 text-center sm:mt-24 sm:px-12">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Want something similar?</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tell us about your business and timeline. We will respond with honest fit, scope, and next steps.
            </p>
            <Link
              href="/contact"
              className="btn-primary-solid mt-8 inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start a conversation
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
