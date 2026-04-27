import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Opal Web Design</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Web design and modern sites for Missoula-area small businesses that are fast, mobile-first, and built to earn trust.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className="text-foreground underline-offset-4 hover:underline" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-foreground underline-offset-4 hover:underline" href="/portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="text-foreground underline-offset-4 hover:underline" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-foreground underline-offset-4 hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Opal Web Design. Missoula, Montana.</p>
        </div>
      </div>
    </footer>
  )
}
