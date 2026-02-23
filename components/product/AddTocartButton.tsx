'use client'

import { Product } from '@/types'
import { useCart } from '@/providers/CartContext'
import { useAuth } from '@/providers/AuthContext'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  return (
    <button
      onClick={() => {
        if (!user) {
          alert('Please login to add items to cart')
          return
        }
        addToCart(product)
      }}
      className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-gray-200 flex items-center justify-center gap-3"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Shopping Bag
    </button>
  )
}
