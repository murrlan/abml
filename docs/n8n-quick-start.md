# n8n Quick Start Checklist

Follow these steps in order to get n8n integrated with your website.

## ✅ Installation & Setup

- [ ] Install n8n: `npm install -g n8n`
- [ ] Start n8n: `n8n start`
- [ ] Open http://localhost:5678 in browser
- [ ] Create account (first time only)

## ✅ Create Workflow

- [ ] Click "New Workflow"
- [ ] Add "Webhook" node
  - [ ] Set method to `POST`
  - [ ] Click "Listen for Test Event"
  - [ ] **Copy the webhook URL** (save this!)
- [ ] Add "Code" node (to parse data)
  - [ ] Connect from Webhook
  - [ ] Paste parsing code (see full guide)
- [ ] Add automation nodes (Discord, SendGrid, etc.)
- [ ] **Activate workflow** (toggle in top right)

## ✅ Configure Your Website

- [ ] Add `N8N_WEBHOOK_URL` to `.env.local`
- [ ] Restart Next.js dev server
- [ ] Test with: `npm run test:notifications`

## ✅ Verify It Works

- [ ] Submit a test lead from your website
- [ ] Check n8n "Executions" tab
- [ ] Verify notifications were sent (Discord/email)

## 📚 Full Documentation

See `docs/n8n-setup-guide.md` for detailed instructions.

