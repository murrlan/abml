/**
 * Public contact details shown on /contact and validated at build time (see next.config.ts).
 */
export const CONTACT_ENV_KEYS = {
  email: 'NEXT_PUBLIC_CONTACT_EMAIL',
  phone: 'NEXT_PUBLIC_CONTACT_PHONE',
} as const

export type ContactPublicConfig = {
  email: string
  phone: string
}

function trimOrEmpty(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** Runtime values for mailto/tel (may be empty if build was skipped — contact page should guard). */
export function getContactPublicConfig(): ContactPublicConfig {
  return {
    email: trimOrEmpty(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: trimOrEmpty(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  }
}

export function getMissingContactEnvKeys(): string[] {
  const { email, phone } = getContactPublicConfig()
  const missing: string[] = []
  if (!email) missing.push(CONTACT_ENV_KEYS.email)
  if (!phone) missing.push(CONTACT_ENV_KEYS.phone)
  return missing
}

export function isContactPublicConfigComplete(): boolean {
  return getMissingContactEnvKeys().length === 0
}
