# Next Steps After Discord & SendGrid Setup

After you've set up Discord and SendGrid notifications, here's what to do next:

## Immediate Next Steps

### 1. Test Your Workflow ✅

**Before activating:**
- Click **"Execute Workflow"** in n8n
- Verify all nodes run successfully (green checkmarks)
- Check that Discord receives the message
- Check that SendGrid sends the email

**Test from your website:**
```bash
npm run test:notifications
```

Or submit a test lead from your website form.

### 2. Activate the Workflow ✅

1. Click the **"Active"** toggle in n8n (top right)
2. Your workflow is now live!

### 3. Update Environment Variables ✅

Add to your `.env.local`:
```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook/your-workflow-id
```

Restart your Next.js dev server.

### 4. Verify It Works ✅

1. Submit a real lead from your website
2. Check n8n "Executions" tab
3. Verify Discord notification received
4. Verify email sent to lead

## Optional Enhancements

### Add CRM Integration

**Popular Options:**
- **HubSpot** - Free tier available
- **Pipedrive** - Sales-focused
- **Salesforce** - Enterprise
- **Zoho CRM** - Affordable

**How to add:**
1. Add CRM node (e.g., "HubSpot")
2. Connect from Code node (parallel with Discord/SendGrid)
3. Configure OAuth/API credentials
4. Map lead fields to CRM contact fields

**Benefits:**
- Automatic lead capture
- Track lead status
- Sales pipeline management

### Add Slack Notifications

**Setup:**
1. Add **Slack** node
2. Connect from Code node (parallel)
3. Configure OAuth (first time only)
4. Set channel (e.g., `#leads`)
5. Customize message format

**Use cases:**
- Team notifications
- Different channels for different lead types
- Real-time alerts

### Add Database/Spreadsheet Logging

**Google Sheets:**
1. Add **Google Sheets** node
2. Connect from Code node (parallel)
3. Configure OAuth
4. Set spreadsheet and worksheet
5. Map fields to columns

**Airtable:**
1. Add **Airtable** node
2. Connect from Code node (parallel)
3. Configure API key
4. Select base and table
5. Map fields

**Benefits:**
- Backup of all leads
- Easy data analysis
- Export capabilities

### Add Conditional Logic

**Example: Route leads based on message keywords**

1. Add **IF** node after Code node
2. Set condition: `{{ $json.message.includes('urgent') }}`
3. Route to different channels:
   - Urgent leads → Slack #urgent-leads
   - Regular leads → Discord #leads

**Example: Different emails by lead source**

1. Add **IF** node
2. Check lead source or message content
3. Send different email templates

### Add Error Handling

**Basic Error Handling:**
1. Add **Error Trigger** node
2. Connect error actions:
   - Send alert email
   - Log to Slack
   - Save to error log

**Advanced:**
- Retry failed operations
- Fallback notifications
- Error reporting to monitoring service

### Add Lead Scoring

**Simple scoring:**
1. Add **Code** node after parsing
2. Calculate score based on:
   - Message length
   - Keywords
   - Email domain
   - Phone number presence
3. Route high-score leads to priority channel

### Add Follow-up Automation

**Scheduled follow-ups:**
1. Create a second workflow
2. Use **Schedule Trigger** node
3. Query Supabase for leads without follow-up
4. Send follow-up emails
5. Update lead status

## Production Considerations

### 1. Host n8n

**Options:**
- **n8n Cloud** - Easiest (paid)
- **Self-hosted** - Docker on VPS
- **Railway/Render** - Platform-as-a-Service

### 2. Secure Webhooks

Add authentication to your webhook:
1. In n8n webhook node, add **Header Auth**
2. Set secret key
3. Update your Next.js API to send header

### 3. Monitoring

- Set up error alerts
- Monitor execution success rate
- Track lead conversion metrics

### 4. Backup Workflows

- Export workflows as JSON
- Version control in Git
- Document workflow changes

## Common Next Steps Checklist

- [ ] Test workflow with real data
- [ ] Activate workflow
- [ ] Update environment variables
- [ ] Verify notifications work
- [ ] (Optional) Add CRM integration
- [ ] (Optional) Add Slack notifications
- [ ] (Optional) Add error handling
- [ ] (Optional) Set up production n8n instance
- [ ] (Optional) Add webhook authentication
- [ ] (Optional) Set up monitoring

## Quick Wins

**Easiest additions:**
1. **Slack notification** - 5 minutes, immediate value
2. **Google Sheets logging** - 10 minutes, backup all leads
3. **Error handling** - 15 minutes, catch failures

**Most valuable:**
1. **CRM integration** - Track leads properly
2. **Conditional routing** - Prioritize important leads
3. **Follow-up automation** - Never miss a lead

## Need Help?

- Check execution logs in n8n
- Test each node individually
- Review n8n documentation: https://docs.n8n.io
- Check workflow examples: https://n8n.io/workflows/

