"use server"

import Link from 'next/link'
import { getPortfolioProjects } from '@/lib/portfolio'
import PortfolioFeaturedSection from '@/components/portfolio/PortfolioFeaturedSection'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'

export default async function Portfolio() {
  const projects = await getPortfolioProjects()
  const featuredProjects = projects.filter((project) => project.isFeatured)
  const otherProjects = projects.filter((project) => !project.isFeatured)

  const hasProjects = projects.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
              Zootown Web Design
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/portfolio" className="text-sm font-medium text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1">
                Portfolio
              </Link>
              <Link href="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Our Work
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects. From web applications to automation systems, we deliver solutions that drive results.
          </p>
        </div>

        {/* Featured & grid sections */}
        {hasProjects ? (
          <div className="space-y-16 lg:space-y-20">
            <PortfolioFeaturedSection projects={featuredProjects} />
            <PortfolioGrid projects={otherProjects} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center mt-12">
            <div className="inline-flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 px-6 py-10 sm:px-10 sm:py-12">
              <span className="mb-3 text-3xl">🚀</span>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
                Portfolio coming soon
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
                We&apos;re in the process of adding recent client projects here. In the meantime, get in touch and we&apos;ll happily share examples that are relevant to your industry and goals.
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-20">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with modern web solutions and automation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-white text-zinc-900 px-6 py-3.5 text-sm font-semibold hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

