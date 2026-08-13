import './globals.css'

import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex, Roboto_Slab } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MaterialThemeProvider } from '@/theme/material-theme'
import { DevBar } from '@/components/debug/dev-bar'
import { ThemeProvider } from 'next-themes'
import { SITE_DESCRIPTION, SITE_NAME, TWITTER_HANDLE } from '@/config/site'

const metadataBaseUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://evowizz.dev'
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: '/' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: `/api/og?text=${encodeURIComponent(SITE_NAME)}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    images: [{ url: `/api/og?text=${encodeURIComponent(SITE_NAME)}` }],
  },
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

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: 'variable',
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
      data-devbar-visible={process.env.NODE_ENV === 'development' ? '' : undefined}
      className={`${googleSansFlex.variable} ${googleSansCode.variable} ${robotoSlab.variable}`}
    >
      <body className="text-on-surface motion-effects-default bg-surface flex min-h-dvh flex-col transition-colors">
        <ThemeProvider>
          <MaterialThemeProvider>
            <Header />
            {children}
            <Footer />
            {process.env.NODE_ENV === 'development' && <DevBar />}
          </MaterialThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
