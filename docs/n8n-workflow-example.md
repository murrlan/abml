# n8n Workflow Example: Lead Automation

This document shows how to set up an n8n workflow to handle lead notifications and automation.

## Workflow Overview

When a lead is submitted, the Next.js API sends a webhook to n8n with the lead data. The n8n workflow then:

1. Sends a Discord notification
2. Sends a confirmation email via SendGrid
3. (Optional) Adds lead to CRM
4. (Optional) Sends Slack notification

## Step-by-Step Setup

### 1. Create Webhook Trigger

1. In n8n, create a new workflow
2. Add a **Webhook** node
3. Configure:
   - **HTTP Method:** `POST`
   - **Path:** Leave default or set a custom path
   - **Response Mode:** "Respond When Last Node Finishes"
4. Click "Listen for Test Event" and submit a test lead from your website
5. Copy the webhook URL (e.g., `http://localhost:5678/webhook/abc123`)
6. Set this as `N8N_WEBHOOK_URL` in your `.env.local`

### 2. Parse Incoming Data

Add a **Code** node to extract the lead data:

```javascript
// Extract lead data from webhook payload
const webhookData = $input.item.json;

return {
  json: {
    id: webhookData.data?.id,
    name: webhookData.data?.name,
    email: webhookData.data?.email,
    phone: webhookData.data?.phone || 'Not provided',
    message: webhookData.data?.message || 'No message',
    timestamp: webhookData.timestamp
  }
};
```

### 3. Send Discord Notification

**Recommended: HTTP Request node** (for webhooks)

Use the HTTP Request node for Discord webhooks. The Discord node is for the Bot API, which requires OAuth setup.

1. Add a **HTTP Request** node
2. **Connect from Code node:** Drag from Code node's output to HTTP Request node's input
3. Configure:
   - **Method:** `POST`
   - **URL:** Your Discord webhook URL (from Discord server settings)
   - **Authentication:** None (webhook URL contains auth token)
   - **Body Content Type:** JSON
   - **Body:**
     ```json
     {
       "content": "🎯 **New Lead Received**\n\n**Name:** {{ $json.name }}\n**Email:** {{ $json.email }}\n**Phone:** {{ $json.phone }}\n**Message:** {{ $json.message }}\n\n*Received at {{ $json.timestamp }}*"
     }
     ```

**Why HTTP Request over Discord node?**
- ✅ Simpler setup (just paste webhook URL)
- ✅ No OAuth/bot configuration needed
- ✅ Perfect for simple notifications
- ✅ Works immediately with Discord webhook URLs

### 4. Send Confirmation Email (SendGrid) - Parallel Execution

**Recommended: Use SendGrid node** (much easier than HTTP Request)

**To run in parallel:** Connect BOTH nodes from the SAME Code node (not one after the other).

1. Add a **SendGrid** node (search for "SendGrid" in nodes)
2. **Connect from Code node (same source):** Drag from Code node's output to SendGrid node
   - You should have TWO connections from the Code node
   - Discord HTTP Request and SendGrid node connect directly to Code (parallel, not sequential)
3. Configure SendGrid node:
   - **Resource:** Email
   - **Operation:** Send Email
   - **Authentication:** 
     - Create new credential or select existing
     - **Credential Type:** SendGrid API
     - **API Key:** Your SendGrid API key (starts with `SG.`)
   - **From Email:** `no-reply@yourdomain.com` (must be verified in SendGrid)
   - **To Email:** `{{ $json.email }}`
   - **Subject:** `Thanks for contacting us!`
   - **Email Type:** Plain Text
   - **Message:**
     ```
     Hi {{ $json.name }},

     Thanks for reaching out! We received your message and will get back to you shortly.

     — The Team
     ```

**Why SendGrid node?**
- ✅ Much simpler than HTTP Request
- ✅ Automatic authentication
- ✅ Built-in validation
- ✅ Better error handling

**Alternative: HTTP Request (if SendGrid node unavailable)**
If you must use HTTP Request, ensure proper JSON formatting and Bearer token in Authorization header.

### 5. (Optional) Add to CRM

If you use a CRM like HubSpot, Pipedrive, or Salesforce:

1. Add the appropriate CRM node (e.g., **HubSpot** node)
2. Configure authentication
3. Map the lead fields:
   - Name → Contact Name
   - Email → Contact Email
   - Phone → Contact Phone
   - Message → Notes/Description

### 6. (Optional) Send Slack Notification

1. Add a **Slack** node
2. Configure:
   - **Resource:** Message
   - **Operation:** Post Message
   - **Channel:** `#leads` (or your channel)
   - **Text:** 
     ```
     🎯 New Lead: {{ $json.name }}
     Email: {{ $json.email }}
     Phone: {{ $json.phone }}
     ```

### 7. Error Handling

Add error handling:

1. Add an **IF** node after each action node
2. Check if the previous node succeeded
3. If failed, add a **Slack** or **Email** node to notify you of failures

### 8. Activate Workflow

1. Click "Active" toggle in the top right
2. Your workflow is now live and will process incoming webhooks

## Workflow Structure

```
Webhook (Trigger)
  ↓
Code (Parse Data)
  ├─→ HTTP Request (Discord)          ← All run in parallel
  ├─→ HTTP Request (SendGrid Email)   ← All run in parallel
  ├─→ HubSpot (Add to CRM) [Optional]  ← All run in parallel
  └─→ Slack (Notification) [Optional] ← All run in parallel
```

**Key Point:** All nodes connect directly from the Code node. They are NOT chained together.

**Visual Guide:**
- ✅ **Parallel (Correct):** Code node has multiple output connections
- ❌ **Sequential (Wrong):** Code → Node1 → Node2 → Node3 (chain)

**Note:** n8n automatically runs nodes in parallel when they're connected from the same source. No "Split" or "Merge" nodes needed for basic parallel execution.

## Testing

1. **Test in n8n:** Use "Execute Workflow" button with sample data
2. **Test from website:** Submit a test lead from your form
3. **Check logs:** View execution history in n8n to debug issues

## Production Considerations

- **n8n Hosting:** For production, host n8n on a server or use n8n Cloud
- **Webhook URL:** Update `N8N_WEBHOOK_URL` to your production n8n instance
- **Security:** Consider adding webhook authentication (API key in headers)
- **Monitoring:** Set up alerts for failed workflow executions
- **Rate Limiting:** Configure rate limits if needed

## Advanced: Webhook Authentication

To secure your webhook, add authentication:

1. In your n8n webhook node, add **Header Auth**
2. Set a secret key (e.g., `X-Webhook-Key`)
3. In your Next.js API route, add the header:
   ```typescript
   await fetch(webhookUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X-Webhook-Key': process.env.N8N_WEBHOOK_SECRET,
     },
     body: JSON.stringify(payload),
   })
   ```

## Troubleshooting

- **Webhook not triggering:** Check that the workflow is active and the URL is correct
- **Discord not receiving:** Verify webhook URL and message format
- **SendGrid failing:** Check API key and sender verification
- **Timeout errors:** Increase timeout in HTTP Request nodes for slow APIs

