import './globals.css'
import { CartProvider } from '@/providers/CartContext'
import { AuthProvider } from '@/providers/AuthContext'
import Navbar from '@/components/layout/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'FakeStore | Premium E-commerce Dashboard',
    template: '%s | FakeStore'
  },
  description: 'Experience the next generation of e-commerce dashboarding with Fake Store API.',
  keywords: ['e-commerce', 'nextjs', 'dashboard', 'react', 'typescript'],
  authors: [{ name: 'FakeStore Team' }],
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
                &copy; 2024 E-commerce Dashboard. All rights reserved.
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
