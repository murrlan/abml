import type { Metadata } from 'next'
import Link from 'next/link'
import ContactLeadForm from '@/components/ContactLeadForm'
import ContactEnvAlert from '@/components/site/ContactEnvAlert'
import { getContactPublicConfig, isContactPublicConfigComplete } from '@/lib/contact-env'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Opal Web Design for a quote — web design and Next.js builds for Missoula-area small businesses. Call, email, or use the form.',
}

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '')
  return digits.startsWith('+') ? `tel:${digits}` : `tel:${digits}`
}

export default function ContactPage() {
  const complete = isContactPublicConfigComplete()
  const { email, phone } = getContactPublicConfig()

  return (
    <div>
      <ContactEnvAlert />
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Contact</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Start a project conversation.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            Share a bit about your business and what you need. We read every message and respond personally.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-16 lg:py-20">
        <aside className="mb-14 border-b border-border pb-14 lg:col-span-4 lg:mb-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Direct</h2>
          {complete ? (
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</p>
                <a
                  className="mt-1 inline-block text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Phone</p>
                <a
                  className="mt-1 inline-block text-foreground underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={telHref(phone)}
                >
                  {phone}
                </a>
              </li>
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Configure <span className="font-mono text-xs">NEXT_PUBLIC_CONTACT_EMAIL</span> and{' '}
              <span className="font-mono text-xs">NEXT_PUBLIC_CONTACT_PHONE</span> to show email and phone links here.
            </p>
          )}
          <p className="mt-10 text-xs leading-relaxed text-muted">
            Prefer browsing first?{' '}
            <Link className="text-accent underline-offset-4 hover:underline" href="/portfolio">
              View portfolio
            </Link>{' '}
            or{' '}
            <Link className="text-accent underline-offset-4 hover:underline" href="/services">
              read how we work
            </Link>
            .
          </p>
        </aside>

        <div className="lg:col-span-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Form</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Fields marked with an asterisk are required. After you submit, you can optionally schedule a follow-up call.
          </p>
          <div className="mt-10 border border-border p-6 sm:p-10">
            <ContactLeadForm />
          </div>
        </div>
      </div>
    </div>
  )
}
