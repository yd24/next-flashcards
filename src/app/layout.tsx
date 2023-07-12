import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Flashcards',
  description: 'A simple flashcards app made with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto flex flex-col justify-between min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
