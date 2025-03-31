import Navbar from '@/components/Navbar'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camilo Castillo | Software Developer',
  description: 'Personal portfolio of Camilo Castillo, Software Developer specialized in web and mobile development.',
  openGraph: {
    title: 'Camilo Castillo | Software Developer',
    description: 'Personal portfolio of Camilo Castillo, Software Developer specialized in web and mobile development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Camilo Castillo - Software Developer'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0A] text-white`}>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
