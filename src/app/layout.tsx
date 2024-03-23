import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { BlobBackground } from '@/components/blob-background'
import { Header } from '@/components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground">
        <BlobBackground />
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
