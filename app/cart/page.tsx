'use client'

import { useCart } from '@/providers/CartContext'
import { useAuth } from '@/providers/AuthContext'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'

export default function CartPage() {
  const { cart, isHydrated } = useCart()
  const { user } = useAuth()

  if (!isHydrated) return null

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-indigo-50 p-8 rounded-3xl mb-6">
          <ShoppingBag className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Your bag is calling...</h1>
        <p className="text-gray-500 max-w-sm mb-10 text-lg">
          Please sign in to view your cart items and complete your purchase.
        </p>
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-3"
        >
          Sign In Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-gray-100 p-8 rounded-3xl mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Empty Bag Syndrome</h1>
        <p className="text-gray-500 max-w-sm mb-10 text-lg">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/products"
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200 flex items-center gap-3"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Your Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
