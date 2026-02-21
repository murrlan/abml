#!/usr/bin/env node
/**
 * scripts/test-notifications.js
 *
 * Test script for n8n webhook integration.
 * Sends a test lead payload to your n8n workflow webhook.
 *
 * Usage:
 *   Create a .env.local (or export vars manually):
 *   N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-workflow-id
 *
 *   Then run:
 *   npm run test:notifications
 */

// Try to load .env.local if dotenv is available
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require('dotenv')
  dotenv.config({ path: '.env.local' })
} catch (e) {
  console.warn('Note: dotenv not available — if you want to auto-load .env.local run `npm install` or export env vars manually.')
}

;(async function main() {
  const { N8N_WEBHOOK_URL } = process.env

  if (!N8N_WEBHOOK_URL) {
    console.error('❌ N8N_WEBHOOK_URL not found in environment variables.')
    console.log('\nPlease set N8N_WEBHOOK_URL in your .env.local file or export it:')
    console.log('  export N8N_WEBHOOK_URL="http://localhost:5678/webhook/your-workflow-id"')
    console.log('\nSee README.md for setup instructions.')
    process.exit(2)
  }

  if (!globalThis.fetch) {
    console.error('❌ Global fetch is not available in this Node runtime.')
    console.log('Please use Node 18+ or run with a fetch polyfill.')
    process.exit(1)
  }

  console.log('🧪 Testing n8n webhook workflow...')
  console.log(`📍 Webhook URL: ${N8N_WEBHOOK_URL}\n`)

  const testPayload = {
    event: 'lead.created',
    timestamp: new Date().toISOString(),
    data: {
      id: 'test-' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      message: 'This is a test lead from the test script',
    },
  }

  try {
    console.log('📤 Sending test payload to n8n...')
    console.log('Payload:', JSON.stringify(testPayload, null, 2))
    console.log('')

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    })

    const text = await res.text()
    let responseData

    try {
      responseData = JSON.parse(text)
    } catch {
      responseData = text
    }

    console.log(`📥 Response Status: ${res.status} ${res.statusText}`)
    if (responseData) {
      console.log('📥 Response Body:', JSON.stringify(responseData, null, 2))
    }

    if (res.ok) {
      console.log('\n✅ Success! Check your n8n workflow execution history to verify the workflow ran.')
      console.log('💡 Tip: Make sure your n8n workflow is active and running.')
      process.exit(0)
    } else {
      console.error('\n❌ Webhook returned an error status.')
      console.error('💡 Check your n8n workflow configuration and ensure it\'s active.')
      process.exit(1)
    }
  } catch (err) {
    console.error('\n❌ Failed to send webhook:', err.message)
    console.error('\n💡 Troubleshooting:')
    console.error('  1. Ensure n8n is running (check http://localhost:5678)')
    console.error('  2. Verify the webhook URL is correct')
    console.error('  3. Check that the workflow is active in n8n')
    console.error('  4. Verify network connectivity to n8n instance')
    process.exit(1)
  }
})()
