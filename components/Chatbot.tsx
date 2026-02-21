'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@/hooks/useChat'

const QUICK_REPLIES = [
  { label: 'Pricing', text: 'What are your prices for a website?' },
  { label: 'Timeline', text: 'How long does a typical project take?' },
  { label: 'Portfolio', text: 'Can I see examples of your work?' },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    messages,
    loading,
    sendMessage,
    showEmailPrompt,
    setShowEmailPrompt,
  } = useChat()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    sendMessage(text)
  }

  const handleQuickReply = (text: string) => {
    setInput(text)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || loading) return
    const lastUser = [...messages].reverse().find((m) => m.role === 'user')
    if (lastUser) {
      sendMessage(lastUser.content, email.trim())
      setEmailSubmitted(true)
      setShowEmailPrompt(false)
      setEmail('')
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Open chat"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700"
      role="dialog"
      aria-label="Chat"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 bg-indigo-600 px-4 py-3 dark:border-zinc-700">
        <h3 className="font-semibold text-white">Chat with us</h3>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded p-1 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Close chat"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-950">
        {messages.length === 0 && (
          <div className="space-y-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
            <p>Hi! Ask about our web design services, pricing, or timeline.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_REPLIES.map(({ label, text }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickReply(text)}
                  className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-zinc-800 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-in fade-in">
            <div className="flex gap-1 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Email capture */}
      {showEmailPrompt && !emailSubmitted && (
        <form
          onSubmit={handleEmailSubmit}
          className="border-t border-zinc-200 bg-gray-50 p-3 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
            Get a personalized quote — enter your email:
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
              required
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      )}

      {/* Input */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
            disabled={loading}
            aria-label="Message"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            aria-label="Send"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
