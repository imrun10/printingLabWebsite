import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createTheme, MantineProvider } from '@mantine/core';

// NO NEED TO EDIT BELOW THIS LINE
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DLab3D',
  description: 'Website to order 3D prints',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className} >{children}</body>

    </html>
  )
}
