import { CONTACT_ENV_KEYS, getMissingContactEnvKeys } from '@/lib/contact-env'

export default function ContactEnvAlert() {
  const missing = getMissingContactEnvKeys()
  if (missing.length === 0) return null

  return (
    <div
      role="alert"
      className="border-b-2 border-red-700 bg-red-50 px-4 py-5 text-red-950 sm:px-6"
    >
      <p className="text-sm font-semibold">Contact details are not configured</p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed">
        This build should not ship without public contact environment variables. Missing or empty:{' '}
        <code className="rounded bg-red-100 px-1 py-0.5 font-mono text-xs">{missing.join(', ')}</code>.
        Set them for production, or use <code className="font-mono text-xs">SKIP_CONTACT_ENV_CHECK=1</code> only for
        local development. See <code className="font-mono text-xs">.env.example</code>.
      </p>
      <ul className="mt-3 list-inside list-disc text-sm">
        <li>
          <code className="font-mono text-xs">{CONTACT_ENV_KEYS.email}</code>
        </li>
        <li>
          <code className="font-mono text-xs">{CONTACT_ENV_KEYS.phone}</code>
        </li>
      </ul>
    </div>
  )
}
