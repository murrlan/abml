'use client'

import { useEffect, useState } from 'react'
import BookingModal from '@/components/BookingModal'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactLeadForm() {
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
    if (!phone) return true
    const cleaned = phone.replace(/[^0-9+()\-\s]/g, '')
    return /^[0-9+()\-\s]{7,20}$/.test(cleaned)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  useEffect(() => {
    if (statusType === 'success') {
      setShowBookingModal(true)
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
        setStatusMessage('Thanks. Your response was recorded.')
        setErrors({})
      }
    } catch {
      setStatusType('error')
      setStatusMessage('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldBase =
    'w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

  return (
    <div>
      {statusType === 'success' && statusMessage ? (
        <div className="mb-6 flex gap-3 border border-border bg-background p-4 text-sm text-foreground">
          <span className="text-accent" aria-hidden>
            ✓
          </span>
          <p className="font-medium">{statusMessage}</p>
        </div>
      ) : null}

      {statusType === 'error' && statusMessage ? (
        <div className="mb-6 border border-red-700 bg-red-50 p-4 text-sm text-red-950" role="alert">
          <p className="font-medium">{statusMessage}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Name <span className="text-red-700">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              className={`${fieldBase} ${errors.name ? 'border-red-700 bg-red-50' : ''}`}
              required
            />
            {errors.name ? <p className="mt-1.5 text-sm text-red-800">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Email <span className="text-red-700">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className={`${fieldBase} ${errors.email ? 'border-red-700 bg-red-50' : ''}`}
              required
            />
            {errors.email ? <p className="mt-1.5 text-sm text-red-800">{errors.email}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Phone <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            className={`${fieldBase} ${errors.phone ? 'border-red-700 bg-red-50' : ''}`}
          />
          {errors.phone ? <p className="mt-1.5 text-sm text-red-800">{errors.phone}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Message <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${fieldBase} resize-none`}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary-solid inline-flex min-h-11 w-full items-center justify-center rounded px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Send message'}
          </button>
          <p className="mt-4 text-xs text-muted">Your information is used only to respond to this inquiry.</p>
        </div>
      </form>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false)
          setFormData({ name: '', email: '', phone: '', message: '' })
        }}
        leadName={formData.name}
        leadEmail={formData.email}
      />
    </div>
  )
}
