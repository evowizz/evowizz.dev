import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { BlobBackground } from '@/components/blob-background'
import { Header } from '@/components/header'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground transition-colors duration-300 ease-slow-in">
        <ThemeProvider>
          <BlobBackground />
          <div className="min-h-dvh">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
