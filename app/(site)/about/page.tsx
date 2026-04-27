import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the Opal Web Design team, Murray Lane and Asher Barnes, and learn how we approach web projects for Missoula small businesses.',
}

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">About</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A small team, serious about client outcomes.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            We are young, and we know that can raise questions for owners who have been burned by flaky vendors. So we
            default to proof: fast sites, clear process, and work you can inspect before you commit.
          </p>
        </div>
      </section>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Mission</h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            We build websites that are fast, functional, and easy to maintain at pricing that makes sense for local
            businesses. Our focus is helping Missoula-area companies look as credible online as they are in person.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            We combine current tooling with direct communication: you work with the people doing the work, not layers
            of account managers. If you want references and examples relevant to your industry, ask. We will point you
            to specifics, not adjectives.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Team</h2>
          <p className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Technical depth and go-to-market sense, in one partnership.
          </p>
          <div className="mt-14 grid gap-12 border-t border-border pt-14 lg:grid-cols-2 lg:gap-16">
            <article className="flex flex-col gap-6 sm:flex-row lg:flex-col lg:gap-8">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded border border-border sm:mx-0">
                <Image
                  src="/team/murray-lane.png"
                  alt="Portrait of Murray Lane, Chief Technical Officer at Opal Web Design"
                  width={160}
                  height={160}
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Murray Lane</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Chief Technical Officer</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Murray focuses on modern web technologies and rapid prototyping, including React and Next.js, and
                  shipping
                  performant interfaces. He is a student at Hellgate High School and leads the technical delivery on
                  projects.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Murray Lane skills">
                  {['React / Next.js', 'Rapid prototyping', 'Supabase'].map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="flex flex-col gap-6 sm:flex-row lg:flex-col lg:gap-8">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded border border-border">
                <Image
                  src="/team/asher-barnes.jpeg"
                  alt="Portrait of Asher Barnes, Chief Marketing and Financial Officer at Opal Web Design"
                  width={160}
                  height={160}
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Asher Barnes</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Chief Marketing / Financial Officer
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Asher brings social media marketing experience and a business lens to each engagement. He is a student
                  at the University of Montana and handles outreach, positioning, and keeping projects aligned with
                  what actually moves the needle for clients.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Asher Barnes skills">
                  {['Social media marketing', 'Programming', 'Business strategy'].map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="border border-border px-8 py-12 text-center sm:px-12 sm:py-14">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Next step</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
              If you want a site that loads fast, reads clearly on a phone, and supports your sales process, send a
              note. We will tell you honestly if we are the right fit.
            </p>
            <Link
              href="/contact"
              className="btn-primary-solid mt-8 inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get a free quote
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  )
}
