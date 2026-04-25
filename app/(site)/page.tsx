import type { Metadata } from 'next'
import Link from 'next/link'
import RevealOnScroll from '@/components/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Web design for Missoula small businesses',
  description:
    'Opal Web Design builds fast, mobile-first Next.js websites for Missoula-area small businesses — clear messaging, strong performance, and a straightforward process.',
}

const proofItems = [
  'Missoula-based team',
  'Next.js + Tailwind on every build',
  'Delivered in days not months',
  'Lighthouse 90+ standard',
]

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Missoula, Montana</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Websites that look credible, load fast, and turn visitors into conversations.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Opal Web Design is a small local team building modern marketing sites for Montana businesses. You get
            direct communication, a disciplined build process, and a site that earns trust before the first call.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-primary-solid inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get a free quote
            </Link>
            <Link
              href="/portfolio"
              className="btn-primary inline-flex min-h-11 items-center justify-center rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">What we do</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A focused web partner for owners who do not have time for jargon.
          </h2>
          <div className="mt-14 grid gap-12 border-t border-border pt-14 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Clarity</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Messaging and layout that explain what you do in seconds — especially on a phone — so busy customers
                understand why they should choose you.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Performance</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Lean Next.js implementations with Tailwind CSS. We ship sites that feel snappy because your reputation
                rides on first impressions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Process</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A short, transparent timeline from kickoff to launch. You always know what happens next — see{' '}
                <Link className="text-accent underline-offset-4 hover:underline" href="/services">
                  Services
                </Link>{' '}
                for how we work.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Why teams trust us</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Proof you can verify before you hire.
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((text) => (
              <li
                key={text}
                className="border border-border px-5 py-6 text-sm font-medium leading-snug text-foreground"
              >
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            We let case studies and build quality answer skepticism — see{' '}
            <Link href="/portfolio/grizzly-lawn" className="text-accent underline-offset-4 hover:underline">
              Grizzly Lawn
            </Link>{' '}
            for a full problem / solution / results walkthrough.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col justify-between gap-10 border border-border px-8 py-12 sm:flex-row sm:items-center sm:px-12 sm:py-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Ready when you are.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Tell us about your business and goals. We will respond with next steps — no pressure, no runaround.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary-solid inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded px-8 py-3.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:self-center"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  )
}
