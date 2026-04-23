import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'M. Sonu& Ms. Dipannita | Wedding Invitation',
  description:
      'You are cordially invited to celebrate the wedding of S. Pravin Bala & L. Preethi - A Royal Indian Wedding Celebration | 20th April 2026',
  icons: {
    icon: '/favicon.ico',
    apple: '/public/placeholder-user.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4D46',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className="bg-[#F8F5F0]">
      <body className="antialiased overflow-x-hidden">
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
      </html>
  )
}
