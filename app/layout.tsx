import type { Metadata } from 'next'
import './globals.css'
import { ClientWrapper } from '@/components/ClientWrapper'

export const metadata: Metadata = {
  title: 'CherryOS MackLook Simulator',
  description: 'A MackLook simulator with CherryOS interface',
  generator: 'CherryOS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}
