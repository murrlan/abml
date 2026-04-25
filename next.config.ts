import type { NextConfig } from 'next'
import { CONTACT_ENV_KEYS } from './lib/contact-env'

function assertContactPublicEnvAtBuild(): void {
  if (process.env.SKIP_CONTACT_ENV_CHECK === '1') {
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
        `Set them in .env.local (see .env.example) or set SKIP_CONTACT_ENV_CHECK=1 only for local experiments.`
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
