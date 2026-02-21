'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const CONVERSATION_KEY = 'chatbot_conversation_id'

export type ChatMessage = {
  role: 'user' | 'bot'
  content: string
}

function getOrCreateConversationId(): string {
  if (typeof window === 'undefined') return crypto.randomUUID()
  const existing = localStorage.getItem(CONVERSATION_KEY)
  if (existing) return existing
  const id = crypto.randomUUID()
  localStorage.setItem(CONVERSATION_KEY, id)
  return id
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [showEmailPrompt, setShowEmailPrompt] = useState(false)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  useEffect(() => {
    setConversationId(getOrCreateConversationId())
  }, [])

  const sendMessage = useCallback(
    async (content: string, email?: string) => {
      const cid = conversationId ?? getOrCreateConversationId()
      if (!cid) setConversationId(cid)

      setLoading(true)
      setError(null)
      setMessages((prev) => [...prev, { role: 'user', content }])

      try {
        const history = messagesRef.current
          .filter((m) => m.role === 'user' || m.role === 'bot')
          .map((m) => ({ role: m.role, content: m.content }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            conversationId: cid,
            email,
            history,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error ?? 'Failed to send message')
        }

        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: data.message },
        ])
        if (data.showEmailPrompt) setShowEmailPrompt(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content:
              err instanceof Error ? err.message : 'Sorry, something went wrong.',
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [conversationId]
  )

  return {
    messages,
    loading,
    error,
    sendMessage,
    showEmailPrompt,
    setShowEmailPrompt,
  }
}
