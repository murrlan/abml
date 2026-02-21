'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

