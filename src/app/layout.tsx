import './globals.css'
import { Google_Sans_Code, Google_Sans_Flex, Noto_Serif, Roboto_Serif } from 'next/font/google'
import { Header } from '@/components/header'
import { MaterialThemeProvider } from '@/components/material-theme-context'
import { DebugPanel } from '@/components/debug'
import { ThemeProvider } from 'next-themes'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  variable: '--font-google-sans-flex',
  axes: ['wdth', 'GRAD', 'slnt'],
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
      <body className="bg-surface-container text-on-surface motion-effects-default transition-colors">
        <ThemeProvider>
          <MaterialThemeProvider>
            <div className="overlay-noise fixed inset-0 -z-50" />
            <div className="min-h-svh">
              <Header />
              {children}
            </div>
            <DebugPanel />
          </MaterialThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
