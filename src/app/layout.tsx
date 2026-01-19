import './globals.css'

import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex, Noto_Serif } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MaterialThemeProvider } from '@/components/material-theme-context'
import { DebugPanel } from '@/components/debug'
import { ThemeProvider } from 'next-themes'

const metadataBaseUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://evowizz.dev'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
}

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  variable: '--font-google-sans-flex',
  axes: ['wdth', 'GRAD', 'slnt', 'ROND'],
})

const googleSansCode = Google_Sans_Code({
  subsets: ['latin-ext'],
  variable: '--font-google-sans-code',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${googleSansFlex.variable} ${googleSansCode.variable} ${notoSerif.variable}`}
    >
      <body className="text-on-surface motion-effects-default bg-background transition-colors">
        <ThemeProvider>
          <MaterialThemeProvider>
            <Header />
            <div className="relative overflow-hidden rounded-b-4xl pt-24 bg-inherit">{children}</div>

            {/* Footer overlaps behind the rounded-b-4xl container above */}
            <Footer className="-z-10 -mt-8 h-32 pt-8" />
            {process.env.NODE_ENV === 'development' && <DebugPanel />}
          </MaterialThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
