import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              Zootown Web Design
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1"
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A small team combining technical skill with marketing and business strategy.
          </p>
        </div>

        {/* Company overview / mission */}
        <section className="max-w-3xl mx-auto mb-20 lg:mb-28">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-8 sm:p-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-4">
              Our mission
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
              We build websites that are fast, functional, and built with modern technology — at competitive prices. Our focus is helping local businesses get online and reach their audience.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We&apos;re a mix of high school and college students. We stay current on tools and tech, and take client work seriously.
            </p>
          </div>
        </section>

        {/* Team section */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white text-center mb-4">
            Meet the team
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Technical and marketing expertise, working together.
          </p>

          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
            {/* Murray Lane */}
            <article className="flex flex-col sm:flex-row lg:flex-col gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 flex justify-center sm:justify-start lg:justify-center">
                <img
                  src="/team/murray-lane.png"
                  alt="Murray Lane"
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
                  Murray Lane
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm uppercase tracking-wide mb-3">
                  Chief Technical Officer
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                  Murray has 5 years of programming experience and focuses on modern web technologies and rapid prototyping. He&apos;s a student at Hellgate High School and handles the technical side of our projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    React / Next.js
                  </span>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Rapid prototyping
                  </span>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Supabase
                  </span>
                </div>
              </div>
            </article>

            {/* Asher Barnes */}
            <article className="flex flex-col sm:flex-row lg:flex-col gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 flex justify-center sm:justify-start lg:justify-center">
                <img
                  src="/team/asher-barnes.jpeg"
                  alt="Asher Barnes"
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
                  Asher Barnes
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm uppercase tracking-wide mb-3">
                  Chief Marketing / Financial Officer
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                  Asher has experience in social media marketing and 2 years of programming. He&apos;s a student at the University of Montana and handles marketing, outreach, and business strategy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Social media marketing
                  </span>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Programming
                  </span>
                  <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Business strategy
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto mt-20 lg:mt-28">
          <div className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to work together?
            </h2>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              We take every project seriously. Competitive pricing and direct communication.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-white text-zinc-900 px-6 py-3.5 text-sm font-semibold hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl"
            >
              Get in touch
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
