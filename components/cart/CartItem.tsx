'use client'

import { CartItem as CartItemType } from '@/types'
import { useCart } from '@/providers/CartContext'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg hover:shadow-gray-100 transition-all group">
      <Link 
        href={`/products/${item.id}`} 
        prefetch={false}
        className="w-32 h-32 flex-shrink-0 bg-gray-50 p-4 rounded-2xl relative overflow-hidden"
      >
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className="p-4 object-contain group-hover:scale-105 transition-transform"
          sizes="128px"
        />
      </Link>

      <div className="flex-grow text-center sm:text-left">
        <Link href={`/products/${item.id}`} prefetch={false} className="block mb-1">
          <h3 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1 text-lg">
            {item.title}
          </h3>
        </Link>
        <p className="text-indigo-600 font-bold uppercase text-xs tracking-widest mb-4">
          {item.category}
        </p>

        <div className="flex items-center justify-center sm:justify-start gap-4">
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 shadow-sm">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-white hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-white hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Remove from bag"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-right sm:pl-6 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0">
        <p className="text-sm text-gray-400 font-medium mb-1">Total</p>
        <p className="text-2xl font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
