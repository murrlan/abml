"use client"

import { useState, useEffect } from 'react'

type MeetingType = 'phone' | 'zoom' | 'in-person' | null

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  leadName: string
  leadEmail: string
}

export default function BookingModal({ isOpen, onClose, leadName, leadEmail }: BookingModalProps) {
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType>(null)
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null)
  const [calendlyReady, setCalendlyReady] = useState(false)
  const [loadingCalendly, setLoadingCalendly] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Load Calendly script
      const loadCalendlyScript = async () => {
        if (typeof window === 'undefined') return
        
        // Check if already loaded
        if ((window as any).Calendly) {
          setCalendlyReady(true)
          return
        }

        // Check if script already exists
        const existing = document.querySelector(`script[src="https://assets.calendly.com/assets/external/widget.js"]`)
        if (existing) {
          // Wait for it to load
          const checkCalendly = setInterval(() => {
            if ((window as any).Calendly) {
              setCalendlyReady(true)
              clearInterval(checkCalendly)
            }
          }, 100)
          return () => clearInterval(checkCalendly)
        }

        setLoadingCalendly(true)
        return new Promise<void>((resolve, reject) => {
          const src = 'https://assets.calendly.com/assets/external/widget.js'
          const s = document.createElement('script')
          s.src = src
          s.async = true
          s.onload = () => {
            // Give it a moment to initialize
            setTimeout(() => {
              setCalendlyReady(true)
              setLoadingCalendly(false)
              resolve()
            }, 100)
          }
          s.onerror = (e) => {
            setLoadingCalendly(false)
            console.error('Failed to load Calendly script', e)
            reject(e)
          }
          document.head.appendChild(s)
        })
      }

      loadCalendlyScript().catch((err) => {
        console.error('Calendly script loading error:', err)
        setLoadingCalendly(false)
      })
    }
  }, [isOpen])

  // Calendly URLs for each meeting type
  const calendlyUrls = {
    'phone': 'https://calendly.com/murr-lane/30min',
    'zoom': 'https://calendly.com/murr-lane/30-minute-meeting',
    'in-person': 'https://calendly.com/murr-lane/30-minute-meeting-1',
  }

  const meetingTypes = [
    {
      id: 'phone' as const,
      name: 'Phone Call',
      icon: '📞',
      description: 'Quick call to discuss your needs',
    },
    {
      id: 'zoom' as const,
      name: 'Zoom Meeting',
      icon: '💻',
      description: 'Video conference with screen sharing',
    },
    {
      id: 'in-person' as const,
      name: 'In-Person Meeting',
      icon: '🤝',
      description: 'Meet locally if you\'re in the area',
    },
  ]

  const handleMeetingTypeSelect = (type: MeetingType) => {
    setSelectedMeetingType(type)
    if (type && calendlyUrls[type]) {
      setCalendlyUrl(calendlyUrls[type])
      console.log('Calendly URL set to:', calendlyUrls[type], 'for meeting type:', type)
    } else {
      console.error('No Calendly URL configured for meeting type:', type)
    }
  }

  const openCalendly = () => {
    if (!calendlyUrl) {
      console.error('Calendly URL not set')
      return
    }

    // Build URL with prefill parameters for better UX
    const url = new URL(calendlyUrl)
    if (leadName) {
      url.searchParams.set('name', leadName)
    }
    if (leadEmail) {
      url.searchParams.set('email', leadEmail)
    }
    const calendlyUrlWithPrefill = url.toString()

    // Open Calendly in new window
    window.open(calendlyUrlWithPrefill, '_blank', 'noopener,noreferrer')
    
    // Reset to meeting type selection menu instead of closing modal
    setSelectedMeetingType(null)
    setCalendlyUrl(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Great! Let's Schedule a Consultation
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Choose your preferred meeting type and we'll show you available timeslots.
            </p>
          </div>

          {/* Meeting Type Selection */}
          {!selectedMeetingType && (
            <div className="space-y-3 mb-6">
              {meetingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleMeetingTypeSelect(type.id)}
                  className="w-full text-left p-4 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{type.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                        {type.name}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                        {type.description}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Calendly Integration */}
          {selectedMeetingType && calendlyUrl && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">
                    {meetingTypes.find((t) => t.id === selectedMeetingType)?.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {meetingTypes.find((t) => t.id === selectedMeetingType)?.name}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Select a time that works for you
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={openCalendly}
                className="w-full inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-6 py-3.5 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Available Times
              </button>

              <button
                onClick={() => setSelectedMeetingType(null)}
                className="w-full text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                ← Choose a different meeting type
              </button>
            </div>
          )}

          {selectedMeetingType && !calendlyUrl && (
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Calendly URL not configured for this meeting type. Please contact us directly to schedule a meeting.
              </p>
            </div>
          )}

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === 'development' && selectedMeetingType && (
            <div className="mt-4 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <p>Debug Info:</p>
              <p>Calendly URL: {calendlyUrl || 'Not set'}</p>
              <p>Calendly Ready: {calendlyReady ? 'Yes' : 'No'}</p>
              <p>Loading: {loadingCalendly ? 'Yes' : 'No'}</p>
              <p>Calendly Object: {(window as any).Calendly ? 'Available' : 'Not available'}</p>
            </div>
          )}

          {/* Skip option */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <button
              onClick={onClose}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

