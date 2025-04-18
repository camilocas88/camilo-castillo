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
  metadataBase: new URL('https://camilo-castillo.vercel.app'),
  openGraph: {
    title: 'Camilo Castillo | Software Developer',
    description: 'Personal portfolio of Camilo Castillo, Software Developer specialized in web and mobile development.',
    url: 'https://camilo-castillo.vercel.app',
    siteName: 'Camilo Castillo Portfolio',
    images: [
      {
        url: '/images/logo-camilodev.png',
        width: 192,
        height: 192,
        alt: 'Camilo Castillo - Software Developer Portfolio',
        type: 'image/png'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Camilo Castillo | Software Developer',
    description: 'Personal portfolio of Camilo Castillo, Software Developer specialized in web and mobile development.',
    creator: '@camilocas88',
    images: ['/images/logo-camilodev.png'],
  },
  icons: {
    icon: [
      { url: '/images/logo-camilodev.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo-camilodev.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/images/logo-camilodev.png',
    apple: '/images/logo-camilodev.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/logo-camilodev.png',
    },
  },
  alternates: {
    canonical: 'https://camilo-castillo.vercel.app',
  },
  authors: [{ name: 'Camilo Castillo', url: 'https://camilo-castillo.vercel.app' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
    other: {
      me: ['mailto:camilocas88@gmail.com'],
    },
  },
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
