"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BookingModal from '@/components/BookingModal'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'idle' | 'success' | 'error' | 'pending'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitting, setSubmitting] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true // optional
    // allow digits, spaces, plus, parentheses, dashes; require 7-20 characters
    const cleaned = phone.replace(/[^0-9+()\-\s]/g, '')
    return /^[0-9+()\-\s]{7,20}$/.test(cleaned)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  useEffect(() => {
    if (statusType === 'success') {
      // Show booking modal after successful submission
      setShowBookingModal(true)
      // Don't auto-hide success message when booking modal is shown
    }
  }, [statusType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    setStatusMessage(null)
    const newErrors: Partial<FormState> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address'
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number'

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      setStatusType('error')
      setStatusMessage('Please fix the highlighted fields')
      return
    }

    setSubmitting(true)
    setStatusType('pending')
    setStatusMessage('Submitting...')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const payload = await res.json()

      if (!res.ok) {
        // If server returned structured field errors, display them inline
        if (payload?.errors && typeof payload.errors === 'object') {
          setErrors(payload.errors)
          setStatusType('error')
          setStatusMessage('Please fix the highlighted fields')
        } else {
          setStatusType('error')
          setStatusMessage(payload?.error || 'Failed to submit')
        }
      } else {
        setStatusType('success')
        setStatusMessage('Thanks — your response was recorded!')
        // Keep form data for booking modal
        setErrors({})
        // Booking modal will be shown via useEffect
      }
    } catch (err) {
      setStatusType('error')
      setStatusMessage('Network error — please try again')
    } finally {
      setSubmitting(false)
    }
  }


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
              <Link href="/" className="text-sm font-medium text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1">
                Home
              </Link>
              <Link href="/portfolio" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
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
            Let's Build Something
            <span className="block text-zinc-600 dark:text-zinc-400 mt-2">Great Together</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Get in touch and let's discuss how we can help transform your business with modern web solutions and automation.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-2">
                Get in Touch
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Status Messages */}
            {statusType === 'success' && statusMessage && (
              <div className="mb-6 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-4 text-green-800 dark:text-green-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">{statusMessage}</p>
              </div>
            )}

            {statusType === 'error' && statusMessage && (
              <div className="mb-6 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4 text-red-800 dark:text-red-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">{statusMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                      errors.name
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 bg-red-50 dark:bg-red-950/20'
                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-500 dark:focus:ring-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                      errors.email
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 bg-red-50 dark:bg-red-950/20'
                        : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-500 dark:focus:ring-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Phone <span className="text-zinc-400 dark:text-zinc-600 text-xs font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.phone
                      ? 'border-red-300 dark:border-red-700 focus:ring-red-500 bg-red-50 dark:bg-red-950/20'
                      : 'border-zinc-300 dark:border-zinc-700 focus:ring-zinc-500 dark:focus:ring-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Message <span className="text-zinc-400 dark:text-zinc-600 text-xs font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-0 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full group relative inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-6 py-3.5 text-sm font-semibold text-white dark:text-zinc-900 transition-all hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${
                    submitting ? 'cursor-wait' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your information is secure and will never be shared.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false)
          // Reset form after closing modal
          setFormData({ name: '', email: '', phone: '', message: '' })
        }}
        leadName={formData.name}
        leadEmail={formData.email}
      />
    </div>
  )
}
