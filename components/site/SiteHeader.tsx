'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image src="/opal.png" alt="Opal Web Design logo" width={28} height={28} className="h-7 w-7" priority />
          Opal Web Design
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-sm font-medium text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              data-active={isActive(pathname, href) ? 'true' : 'false'}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-4 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1" aria-label="Main mobile">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded px-3 py-3 text-sm font-medium text-foreground hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-current={isActive(pathname, href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
