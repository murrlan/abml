# Testing Your n8n Webhook

When n8n shows "waiting for you to call the test url", you need to send a request to that webhook URL.

## Quick Test Methods

### Method 1: Use the Test Script (Easiest)

1. **Copy the webhook URL** from n8n (shown in the Webhook node)
2. **Add it to your `.env.local`**:
   ```bash
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-actual-webhook-id
   ```
   Replace `your-actual-webhook-id` with the ID from n8n

3. **Run the test script**:
   ```bash
   npm run test:notifications
   ```

### Method 2: Use curl (Quick Test)

1. **Copy the webhook URL** from n8n
2. **Run this command** (replace with your actual URL):

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

### Method 3: Test from Your Website

1. Make sure your `.env.local` has the webhook URL:
   ```bash
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-webhook-id
   ```

2. Start your Next.js server:
   ```bash
   npm run dev
   ```

3. Go to http://localhost:3000
4. Submit a test lead from the form
5. Check n8n - it should receive the webhook!

## What Happens Next

After sending the test request:

1. **n8n will receive the webhook** - The "waiting" message will disappear
2. **Your workflow will execute** - You'll see data flow through your nodes
3. **Check the results**:
   - Green checkmarks = success
   - Red X = error (check configuration)

## Troubleshooting

### "Connection refused" or "Cannot connect"
- ✅ Make sure n8n is running: `n8n start`
- ✅ Check the webhook URL is correct
- ✅ Verify n8n is accessible at http://localhost:5678

### "404 Not Found"
- ✅ Check the webhook URL matches exactly
- ✅ Make sure you clicked "Listen for Test Event"
- ✅ Verify the workflow is active

### Webhook received but workflow doesn't run
- ✅ Check that all nodes are connected properly
- ✅ Verify the Code node is parsing data correctly
- ✅ Check execution logs in n8n

## After Testing

Once the test works:
1. **Deactivate "Listen for Test Event"** (click the button again)
2. **Activate your workflow** (toggle in top right)
3. **Update your `.env.local`** with the webhook URL
4. **Test from your website form**

