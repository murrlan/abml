import type { Metadata } from 'next'
import Link from 'next/link'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Services & process',
  description:
    'What Opal Web Design offers, how projects run from kickoff to launch, and what Missoula small businesses can expect when they work with us.',
}

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Modern sites for local businesses that are scoped, fast, and built to convert.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Most projects are marketing sites and landing experiences: clear story, services, proof, and a strong
            contact path. We use Next.js and Tailwind CSS so your site stays fast and maintainable.
          </p>
        </div>
      </section>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">What you get</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Core deliverables</h2>
          <ul className="mt-10 max-w-3xl space-y-4 border-t border-border pt-10 text-sm leading-relaxed text-muted">
            <li className="flex gap-3">
              <span className="font-mono text-accent" aria-hidden>
                -
              </span>
              <span>Discovery call to align on audience, offers, and the action you want visitors to take.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent" aria-hidden>
                -
              </span>
              <span>Information architecture and copy structure with mobile layout first.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent" aria-hidden>
                -
              </span>
              <span>Custom UI in Tailwind CSS, implemented in Next.js with performance and accessibility in mind.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent" aria-hidden>
                -
              </span>
              <span>Launch support: DNS and hosting handoff, basic analytics hookup guidance, and a short punch list window after go-live.</span>
            </li>
          </ul>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">How it works</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Process</h2>
          <ol className="mt-12 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Align',
                body: 'Goals, timeline, and content responsibilities. You know what we need from you and when.',
              },
              {
                step: '02',
                title: 'Design & build',
                body: 'Layout and components come together quickly. You see progress in staging, not surprises at the end.',
              },
              {
                step: '03',
                title: 'Review',
                body: 'Focused revision rounds on copy and visuals so the site matches how you talk to customers.',
              },
              {
                step: '04',
                title: 'Launch',
                body: 'Go-live checklist, redirects if needed, and handoff so you are not dependent on us for every small edit.',
              },
            ].map(({ step, title, body }) => (
              <li key={step}>
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent">{step}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Timeline</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">What to expect</h2>
          <div className="mt-10 max-w-3xl border-t border-border pt-10 text-sm leading-relaxed text-muted">
            <p>
              Many marketing sites move from kickoff to launch in <strong className="font-medium text-foreground">days to a few weeks</strong>, not months, depending on content readiness, number of pages, and integrations. We will give you a written timeline after we understand scope.
            </p>
            <p className="mt-6">
              After you submit the contact form, we follow up with questions and a proposal outline. If it is a fit, we schedule a call and lock dates. No hidden phases. See our{' '}
              <Link href="/portfolio/grizzly-lawn" className="text-accent underline-offset-4 hover:underline">
                Grizzly Lawn case study
              </Link>{' '}
              for how we talk about outcomes without inventing numbers.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="border border-border px-8 py-12 sm:px-12">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Pricing</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              We quote after a short scope conversation because every business has different page count, content, and
              integrations. Contact us with your goals and we will respond with a clear range and what it includes.
            </p>
            <Link
              href="/contact"
              className="btn-primary-solid mt-8 inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  )
}
