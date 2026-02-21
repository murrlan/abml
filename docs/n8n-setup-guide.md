# n8n Integration Setup Guide

This guide walks you through setting up n8n to handle lead automation for your website.

## Step 1: Install n8n

### Option A: Install globally (recommended for local development)

```bash
npm install -g n8n
```

### Option B: Use Docker

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option C: Use n8n Cloud

Sign up at [n8n.io](https://n8n.io) and use their hosted service.

## Step 2: Start n8n

```bash
n8n start
```

n8n will be available at: **http://localhost:5678**

## Step 3: Access n8n UI

1. Open http://localhost:5678 in your browser
2. If this is your first time, you'll be prompted to create an account
3. Log in to the n8n interface

## Step 4: Create a New Workflow

1. Click **"Workflows"** in the left sidebar
2. Click **"New Workflow"** button
3. You'll see an empty canvas

## Step 5: Add Webhook Trigger

1. Click the **"+"** button to add a node
2. Search for **"Webhook"** and select it
3. Configure the Webhook node:
   - **HTTP Method:** `POST`
   - **Path:** Leave empty (n8n will generate a unique path)
   - **Response Mode:** "Respond When Last Node Finishes"
   - **Response Code:** `200`
4. Click **"Listen for Test Event"** button (this activates the webhook)
5. **Copy the webhook URL** that appears (e.g., `http://localhost:5678/webhook/abc123def456`)
6. **Test the webhook** (see "Testing the Webhook" section below)

## Step 5.5: Test the Webhook (Before Adding More Nodes)

When n8n shows "waiting for you to call the test url", you need to send a request to test it.

**Quick test with curl:**
```bash
curl -X POST "http://localhost:5678/webhook/your-webhook-id" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "lead.created",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "data": {
      "id": "test-123",
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890",
      "message": "Test message"
    }
  }'
```

Replace `your-webhook-id` with the actual ID from n8n.

**Or use the test script:**
1. Add the webhook URL to `.env.local`: `N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-id`
2. Run: `npm run test:notifications`

After sending the test, n8n should receive it and you can see the data flow through your workflow.

## Step 6: Add Code Node to Parse Data

1. Click **"+"** to add another node
2. Search for **"Code"** and select it
3. Connect the Webhook node to the Code node (drag from the dot on the right)
4. In the Code node, paste this JavaScript:

```javascript
// Extract lead data from webhook payload
const webhookData = $input.item.json;

return {
  json: {
    id: webhookData.data?.id || 'unknown',
    name: webhookData.data?.name || 'Unknown',
    email: webhookData.data?.email || 'unknown@example.com',
    phone: webhookData.data?.phone || 'Not provided',
    message: webhookData.data?.message || 'No message',
    timestamp: webhookData.timestamp || new Date().toISOString()
  }
};
```

5. Click **"Execute Node"** to test (you'll need test data first)

## Step 7: Add Discord Notification (Optional)

**Use HTTP Request node** (recommended for webhooks)

Discord webhooks use simple HTTP POST requests, so the HTTP Request node is the best choice. The Discord node in n8n is for the Bot API (requires OAuth/bot setup), not webhooks.

1. Add an **"HTTP Request"** node
2. **Connect from Code node:** Drag from the output dot (right side) of the Code node to the input dot (left side) of the HTTP Request node
3. Configure:
   - **Method:** `POST`
   - **URL:** Your Discord webhook URL (get from Discord server settings → Integrations → Webhooks)
   - **Authentication:** None (webhook URL contains auth token)
   - **Body Content Type:** JSON
   - **Body:**
     ```json
     {
       "content": "🎯 **New Lead Received**\n\n**Name:** {{ $json.name }}\n**Email:** {{ $json.email }}\n**Phone:** {{ $json.phone }}\n**Message:** {{ $json.message }}\n\n*Received at {{ $json.timestamp }}*"
     }
     ```

**Alternative: Using Discord Bot API (if you have a bot)**

If you prefer using the Discord node (requires bot setup):
1. Add **"Discord"** node
2. Configure OAuth credentials
3. Use "Send Message" operation
4. More complex setup but offers more features (embeds, reactions, etc.)

## Step 8: Add SendGrid Email (Optional) - Parallel Execution

**Use SendGrid node** (recommended - easier and more reliable than HTTP Request)

The SendGrid node handles authentication and formatting automatically, making it much simpler than using HTTP Request.

**Important: To run nodes in parallel, connect BOTH nodes from the SAME source node.**

1. Add a **"SendGrid"** node (search for "SendGrid" in the node list)
2. **Connect from Code node (same source):** Drag from the output dot (right side) of the Code node to this SendGrid node
   - You should now have TWO connections coming out of the Code node
   - Discord HTTP Request and SendGrid node should both connect directly to the Code node (not to each other)
3. Configure the SendGrid node:
   - **Resource:** Email
   - **Operation:** Send Email
   - **Authentication:** 
     - Click "Create New Credential" or select existing
     - **Credential Type:** SendGrid API
     - **API Key:** Paste your SendGrid API key (starts with `SG.`)
     - Click "Save"
   - **From Email:** `no-reply@yourdomain.com` (must be verified in SendGrid)
   - **To Email:** `{{ $json.email }}` (uses the lead's email from Code node)
   - **Subject:** `Thanks for contacting us!`
   - **Email Type:** Plain Text (or HTML if you prefer)
   - **Message:**
     ```
     Hi {{ $json.name }},

     Thanks for reaching out! We received your message and will get back to you shortly.

     — The Team
     ```

**Why SendGrid node over HTTP Request?**
- ✅ Simpler setup (no manual JSON formatting)
- ✅ Automatic authentication handling
- ✅ Built-in validation
- ✅ Less error-prone
- ✅ Better error messages

**Alternative: HTTP Request (if you prefer manual control)**
If you need more control or the SendGrid node isn't available, you can use HTTP Request, but it requires careful JSON formatting and header configuration.

## Step 9: Verify Parallel Execution

Your workflow should look like this:

```
Webhook
  ↓
Code (Parse Data)
  ├─→ HTTP Request (Discord)     ← Both run at the same time
  └─→ HTTP Request (SendGrid)    ← Both run at the same time
```

**How to verify they run in parallel:**
1. Both HTTP Request nodes should connect directly from the Code node
2. They should NOT be connected to each other (no chain)
3. When you execute the workflow, check the execution time - both should start simultaneously

**If nodes are running sequentially instead:**
- ❌ Wrong: `Code → Discord → SendGrid` (chain - runs one after another)
- ✅ Correct: `Code → Discord` and `Code → SendGrid` (parallel - both run at once)

## Step 10: (Optional) Add More Automation

After Discord and SendGrid, you can add more automation nodes. Connect them from the Code node to run in parallel:

### Option A: Add to CRM (HubSpot, Pipedrive, Salesforce, etc.)

1. Add your CRM node (e.g., **HubSpot**, **Pipedrive**, **Salesforce**)
2. Connect from Code node (parallel with Discord/SendGrid)
3. Configure authentication (OAuth or API key)
4. Map lead fields:
   - Name → Contact Name
   - Email → Contact Email
   - Phone → Contact Phone
   - Message → Notes/Description

### Option B: Slack Notification

1. Add **Slack** node
2. Connect from Code node (parallel)
3. Configure:
   - **Resource:** Message
   - **Operation:** Post Message
   - **Channel:** `#leads` (or your channel)
   - **Text:** 
     ```
     🎯 New Lead: {{ $json.name }}
     Email: {{ $json.email }}
     Phone: {{ $json.phone }}
     Message: {{ $json.message }}
     ```

### Option C: Google Sheets / Airtable

1. Add **Google Sheets** or **Airtable** node
2. Connect from Code node (parallel)
3. Configure to append lead data to a spreadsheet/database

### Option D: Conditional Logic

Add an **IF** node to route leads based on conditions:
- Different emails for different lead types
- Route high-value leads to different channels
- Filter based on message keywords

## Step 11: (Optional) Add Error Handling

To handle failures gracefully:

1. Add **Error Trigger** node (connects automatically on errors)
2. Connect error handling actions:
   - Send alert email/Slack if workflow fails
   - Log errors to a database
   - Retry failed operations

**Note:** Error handling is optional for now. You can add it later after testing.

## Step 12: Test Your Workflow

Before activating, test your workflow:

1. Click **"Execute Workflow"** button (top right)
2. n8n will use sample data or you can provide test data
3. Check each node:
   - ✅ Green = success
   - ❌ Red = error (check configuration)
4. Review the output of each node to verify data flow

**Test with real data:**
- Use the test script: `npm run test:notifications`
- Or submit a test lead from your website form

## Step 13: Activate the Workflow

1. Click the **"Active"** toggle in the top right corner
2. The workflow is now live and will process incoming webhooks

## Step 14: Update Your Environment Variables

Add the n8n webhook URL to your `.env.local`:

```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-workflow-id
```

Replace `your-workflow-id` with the actual ID from Step 5.

## Step 15: Test the Integration

### Test from command line:

```bash
npm run test:notifications
```

### Test by submitting a form:

1. Start your Next.js dev server: `npm run dev`
2. Go to http://localhost:3000
3. Submit a test lead
4. Check n8n execution history to see if the workflow ran

## Step 16: Check Execution History

1. In n8n, click **"Executions"** in the left sidebar
2. You'll see all workflow executions
3. Click on any execution to see detailed logs
4. Green = success, Red = error

## Troubleshooting

### Webhook not receiving data
- ✅ Ensure workflow is **Active** (toggle in top right)
- ✅ Check the webhook URL matches your `.env.local`
- ✅ Verify n8n is running (`n8n start`)
- ✅ Check n8n execution logs for errors

### Discord/SendGrid not working
- ✅ Verify API keys/credentials are correct in n8n nodes
- ✅ Test each node individually using "Execute Node"
- ✅ Check execution logs for specific error messages

### Workflow not triggering
- ✅ Check that `N8N_WEBHOOK_URL` is set correctly
- ✅ Verify the webhook URL in n8n matches your env variable
- ✅ Check Next.js server logs for webhook errors

## Production Deployment

For production, you'll need to:

1. **Host n8n** on a server or use n8n Cloud
2. **Update webhook URL** to your production n8n instance
3. **Set environment variables** on your hosting platform (Vercel, etc.)
4. **Secure the webhook** (optional): Add authentication headers

## Next Steps

- Add more automation: CRM integration, Slack notifications, etc.
- Set up error notifications if workflows fail
- Add conditional logic (e.g., different emails for different lead types)
- Set up scheduled workflows for lead follow-ups

