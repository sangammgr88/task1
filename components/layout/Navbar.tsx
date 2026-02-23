'use client'

import Link from 'next/link'
import { useCart } from '@/providers/CartContext'
import { useAuth } from '@/providers/AuthContext'
import { ShoppingCart, LogIn, LogOut, Package } from 'lucide-react'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/products" className="text-xl font-bold text-indigo-600">
              FakeStore
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-indigo-600 transition">
              Products
            </Link>
            
            <Link href="/cart" className="relative text-gray-600 hover:text-indigo-600 transition">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="text-sm bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
