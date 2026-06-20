import type { Metadata } from 'next'
import '../styles/globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'BEDOUIN WHITE PARTiES',
  description: 'Luxury Arabian-inspired white parties, events, and gallery experiences.',
  other: {
    'apple-mobile-web-app-capable': 'no'
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
