import Navbar from '@/components/Navbar'
import { LanguageProvider } from '@/i18n/LanguageContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camilo Castillo | Full Stack Developer',
  description: 'Personal portfolio of Camilo Castillo, Full Stack Developer specialized in web and mobile development.',
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
      </body>
    </html>
  )
}
