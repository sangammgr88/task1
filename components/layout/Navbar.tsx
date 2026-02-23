'use client'

import Link from 'next/link'
import { useCart } from '@/providers/CartContext'
import { useAuth } from '@/providers/AuthContext'
import { ShoppingCart, LogIn, LogOut, Package } from 'lucide-react'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/products" prefetch={false} className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-100">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                FakeStore<span className="text-indigo-600">.</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <Link 
              href="/cart" 
              prefetch={false}
              className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-6 pl-6 border-l border-gray-100">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged in as</span>
                  <span className="text-sm font-black text-gray-900">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                prefetch={false}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
