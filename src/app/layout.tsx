import './globals.css'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Google_Sans_Code, Google_Sans_Flex, Roboto_Slab } from 'next/font/google'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MaterialThemeProvider } from '@/theme/material-theme'
import { ThemeProvider } from 'next-themes'
import { SITE_DESCRIPTION, SITE_NAME, TWITTER_HANDLE } from '@/config/site'

// Keep the development toolbar and its dependencies out of production bundles.
const DevelopmentTools =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('@/components/debug/dev-bar').then(({ DevBar }) => DevBar))
    : () => null

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
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
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
        <a
          href="#main-content"
          className="bg-primary text-on-primary focus-ring-on-primary fixed top-4 left-4 z-100 -translate-y-24 rounded-full px-4 py-2 font-semibold transition-transform focus-visible:translate-y-0 motion-reduce:transition-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MaterialThemeProvider>
            <Header />
            {children}
            <Footer />
            <DevelopmentTools />
          </MaterialThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
