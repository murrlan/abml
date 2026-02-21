This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

This project uses environment variables for configuration. Add them to `.env.local` for local development or to your hosting platform's environment variables (e.g., Vercel).

### Required Variables

- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous/public key

### Optional Variables

- `N8N_WEBHOOK_URL` — Your n8n workflow webhook URL (for automation)
- `NEXT_PUBLIC_CALENDLY_URL` — Your Calendly public scheduling page (e.g., `https://calendly.com/your-username/30min`). If set, the frontend will show a "Book time" button.

### Local Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# n8n Automation (optional but recommended)
N8N_WEBHOOK_URL="http://localhost:5678/webhook/your-workflow-id"

# Calendly (optional)
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-username/30min"
```

Or export them in your shell (zsh):

```bash
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
export N8N_WEBHOOK_URL="http://localhost:5678/webhook/your-workflow-id"
export NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-username/30min"

npm run dev
```

**Security note:** Never commit your real API keys to git. If you accidentally expose an API key, rotate/revoke it immediately in the provider's dashboard.

## n8n Automation Setup

This project uses [n8n](https://n8n.io) for workflow automation. Instead of hardcoding Discord webhooks and SendGrid calls in the API, all automation is handled by n8n workflows.

### Benefits

- **Centralized automation:** All workflows in one place
- **Easy to modify:** Change workflows without redeploying code
- **Better error handling:** Built-in retry logic and error notifications
- **Extensible:** Easily add new integrations (CRM, Slack, etc.)

### Setting Up n8n

1. **Install n8n locally:**
   ```bash
   npm install -g n8n
   n8n start
   ```
   Or use Docker:
   ```bash
   docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
   ```

2. **Access n8n UI:** Open http://localhost:5678

3. **Create a Webhook workflow:**
   - Add a **Webhook** node (trigger)
   - Set method to `POST`
   - Copy the webhook URL (e.g., `http://localhost:5678/webhook/abc123`)
   - Set this as your `N8N_WEBHOOK_URL` environment variable

4. **Build your workflow:**
   - Add nodes for Discord notifications, SendGrid emails, CRM updates, etc.
   - See `docs/n8n-workflow-example.md` for a complete example

### Testing n8n Webhook

Test your n8n workflow:

```bash
curl -X POST "$N8N_WEBHOOK_URL" \
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

Or use the test script:

```bash
npm run test:notifications
```
