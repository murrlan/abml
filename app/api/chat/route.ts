import { NextResponse } from 'next/server'
import supabase from '@/lib/supabaseClient'

const SYSTEM_PROMPT = `
You are the AI assistant for Zootown Web Design, a professional web design agency. 
Your primary goal is to answer questions clearly and convert visitors into booked consultations.

========================
COMPANY OVERVIEW
========================
Company Name: Zootown Web Design

Available Services:
- Custom website development (Next.js, React, Tailwind CSS)
- Node.js applications
- Supabase backend integration
- E-commerce websites
- SEO optimization
- Website maintenance
- Responsive/mobile-first design

Pricing Guidelines:
- Basic websites start at $25/month
- More complex custom websites are typically around $50/month
- Final pricing depends on features and project scope
- All add on pricing is per month unless otherwise stated

Timelines:
- Basic websites: 1–3 weeks
- Complex projects: 3–6 weeks

Available Upsells (not included in the base price):
- AI chatbots (like this one) +10$
- SEO optimization packages +5-10$
- Hosting and domain management +5$
- Conversion systems & lead funnels +5-10$
- Multilingual websites +5$
- Booking system integration +5-10$
- E-commerce setup +10$
- Branding package: logo, brand colors, typology $150 basic tier (designed by us) $400 for a professional designer
- Advertising agency (local partner)- referral

Technology Stack:
- Next.js
- React
- Tailwind CSS
- Supabase

========================
RESPONSE STYLE
========================
- Be friendly, confident, and professional.
- Keep answers concise
- Avoid overly technical explanations unless the user asks for them.
- Use clear formatting (short paragraphs or bullet points when helpful).
- Speak in a modern, approachable tone.

========================
CONVERSION BEHAVIOR
========================
Your goal is to move conversations toward a free consultation.

When a visitor:
- Asks about pricing → provide ranges and explain that exact pricing depends on scope.
- Asks about starting a project → ask a few clarifying questions (business type, goals, timeline).
- Shows serious interest → ask for their email to send next steps.
- Asks detailed project questions → suggest booking a free consultation for a custom quote.

Always:
- Encourage booking a free consultation when appropriate.
- Offer to send more information via email when interest is clear.
- Position Zootown Web Design as professional, modern, and results-focused.

========================
LIMITATIONS
========================
- Do not invent services, pricing, or technologies not listed above.
- If unsure about a request, say:
  "That depends on your specific needs — the best way to get an accurate answer is through a quick free consultation."

- Do not provide legal, financial, or unrelated advice.
- Stay focused on web design, development, SEO, and related services.

========================
GOAL
========================
Be helpful first. Sell second.
Guide the user toward booking a free consultation or providing their email.
`

type ChatRequestBody = {
  message: string
  conversationId: string
  email?: string
  history?: Array<{ role: 'user' | 'assistant'; content: string }>
}

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'phi3'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody
    const { message, conversationId, email, history = [] } = body

    if (!message?.trim() || !conversationId) {
      return NextResponse.json(
        { error: 'Message and conversationId are required' },
        { status: 400 }
      )
    }

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: 'user' as const, content: message.trim() },
    ]

    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Ollama error:', res.status, errText)
      return NextResponse.json(
        {
          error:
            res.status === 404
              ? `Ollama model "${OLLAMA_MODEL}" not found. Run: ollama pull ${OLLAMA_MODEL}`
              : `Ollama error: ${res.status}. Is Ollama running? Start it with: ollama serve`,
        },
        { status: 502 }
      )
    }

    const data = (await res.json()) as { message?: { content?: string } }
    const botMessage =
      data.message?.content?.trim() ?? 'Sorry, I could not generate a response.'

    await supabase.from('chatbot_conversations').insert({
      conversation_id: conversationId,
      user_message: message.trim(),
      bot_message: botMessage,
      metadata: email ? { email } : {},
    })

    // If email provided, also capture as lead in contact_messages
    if (email?.trim()) {
      await supabase.from('contact_messages').insert({
        name: 'Chatbot',
        email: email.trim(),
        message: `Chatbot inquiry - conversation ${conversationId}`,
      })
    }

    const interestKeywords = [
      'price',
      'pricing',
      'cost',
      'quote',
      'hire',
      'start',
      'project',
      'interested',
      'consultation',
      'schedule',
    ]
    const showsInterest = interestKeywords.some((k) =>
      message.toLowerCase().includes(k)
    )
    const showEmailPrompt = (showsInterest || history.length >= 4) && !email

    return NextResponse.json({
      message: botMessage,
      showEmailPrompt,
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to process message. Make sure Ollama is running (ollama serve).',
      },
      { status: 500 }
    )
  }
}
