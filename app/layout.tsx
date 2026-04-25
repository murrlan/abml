import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import DeferredChatbot from '@/components/DeferredChatbot'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://opalwebdesignmt.com'),
  title: {
    default: 'Opal Web Design | Web design in Missoula, MT',
    template: '%s | Opal Web Design',
  },
  description:
    'Opal Web Design builds fast, mobile-first websites for Missoula-area small businesses — Next.js, Tailwind CSS, and a clear process from quote to launch.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        {children}
        <DeferredChatbot />
      </body>
    </html>
  )
}
