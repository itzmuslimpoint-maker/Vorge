import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VoiceForge AI — Calling Intelligence Platform',
  description: 'AI-Powered Outbound Calling Agent with Human-Like Voice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#060810] text-[#e8edf5] min-h-screen">
        {children}
      </body>
    </html>
  )
}
