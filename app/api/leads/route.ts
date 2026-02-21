import { supabase } from '@/lib/supabaseClient'

type LeadBody = {
  name?: string
  email?: string
  phone?: string
  message?: string
}

/**
 * Triggers n8n workflow webhook with lead data.
 * n8n will handle all automation (Discord notifications, emails, CRM updates, etc.)
 */
async function triggerN8nWorkflow(webhookUrl: string | undefined, lead: { name: string; email: string; phone?: string; message?: string; id?: string }) {
  if (!webhookUrl) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping workflow trigger')
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'lead.created',
        timestamp: new Date().toISOString(),
        data: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          message: lead.message || null,
        },
      }),
    })
  } catch (err) {
    // Log but don't fail the request - n8n can retry if needed
    console.error('n8n webhook error', err)
  }
}

export async function POST(request: Request) {
  try {
    const body: LeadBody = await request.json()

    // Basic server-side validation with structured errors returned to client
    const fieldErrors: Record<string, string> = {}
    if (!body.name || !body.name.toString().trim()) fieldErrors.name = 'Name is required'
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) {
      fieldErrors.email = 'Invalid email'
    }
    // Clean phone number before validation (consistent with client-side)
    if (body.phone) {
      const cleaned = String(body.phone).replace(/[^0-9+()\-\s]/g, '')
      if (!/^[0-9+()\-\s]{7,20}$/.test(cleaned)) {
        fieldErrors.phone = 'Invalid phone number'
      }
    }

    if (Object.keys(fieldErrors).length) {
      return new Response(JSON.stringify({ errors: fieldErrors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Clean phone number before storing (consistent with validation)
    const cleanedPhone = body.phone ? String(body.phone).replace(/[^0-9+()\-\s]/g, '') : null

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: String(body.name).trim(),
          email: String(body.email).trim(),
          phone: cleanedPhone || null,
          message: body.message ? String(body.message).trim() : null,
        },
      ])
      .select()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Trigger n8n workflow for automation (non-blocking)
    // n8n will handle: Discord notifications, confirmation emails, CRM updates, etc.
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    
    // Fire-and-forget: trigger n8n workflow asynchronously
    // n8n has built-in retry logic, so failures here won't block the response
    triggerN8nWorkflow(n8nWebhookUrl, {
      id: data?.[0]?.id,
      name: body.name!,
      email: body.email!,
      phone: body.phone,
      message: body.message,
    }).catch((err) => {
      console.error('Failed to trigger n8n workflow', err)
    })

    return new Response(JSON.stringify({ data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const runtime = 'edge'
