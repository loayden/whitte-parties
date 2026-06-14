import type { Metadata } from 'next'
import '../styles/globals.css'
import PageTransition from '@/components/motion/PageTransition'

export const metadata: Metadata = {
  title: 'BEDOUIN WHITE PARTiES',
  description: 'Luxury Arabian-inspired white parties, events, and gallery experiences.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
