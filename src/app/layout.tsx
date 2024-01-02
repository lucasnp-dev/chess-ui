import { ChildrenType } from '@/@types'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {
  Montserrat as FontSans,
  Libre_Baskerville as FontSerif,
} from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

// Six_Caps, Libre_Baskerville, Libre_Bodoni, Abril_Fatface

// EB_Garamond

import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { ThemeToggle } from '@/components/theme-toggle'
import { Loading } from '@/components/loading'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = FontSerif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Chess',
  description: 'Chess an template project',
}

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative',
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <Providers>
          <NextTopLoader color="#3F93E8" showSpinner={false} />
          {children}
          <ThemeToggle />
          <Loading />
        </Providers>
      </body>
    </html>
  )
}
