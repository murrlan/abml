import type { NextConfig } from 'next'
import { CONTACT_ENV_KEYS } from './lib/contact-env'

function assertContactPublicEnvAtBuild(): void {
  if (process.env.SKIP_CONTACT_ENV_CHECK === '1') {
    return
  }

  // Vercel Preview (and `development`) often ship before env is wired; /contact shows ContactEnvAlert until then.
  const vercelEnv = process.env.VERCEL_ENV
  if (process.env.VERCEL === '1' && vercelEnv && vercelEnv !== 'production') {
    return
  }

  const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '').trim()
  const phone = (process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '').trim()
  const missing: string[] = []
  if (!email) missing.push(CONTACT_ENV_KEYS.email)
  if (!phone) missing.push(CONTACT_ENV_KEYS.phone)
  if (missing.length) {
    throw new Error(
      `[next.config] Missing or empty required public contact environment variables: ${missing.join(', ')}. ` +
        `For Vercel Production: Project → Settings → Environment Variables → add both (see .env.example). ` +
        `Locally: .env.local, or SKIP_CONTACT_ENV_CHECK=1 only for experiments.`
    )
  }
}

assertContactPublicEnvAtBuild()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grizzlylawn.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
