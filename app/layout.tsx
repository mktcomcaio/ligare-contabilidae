import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ligare - Sistema de Propostas e Ordens de Serviço',
  description: 'Sistema gerador de proposta e ordem de serviço',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

