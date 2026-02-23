'use client'

import { useCart } from '@/providers/CartContext'
import { ShieldCheck, CreditCard, ArrowRight } from 'lucide-react'

export default function CartSummary() {
  const { totalPrice, totalItems, clearCart } = useCart()
  const shipping = 0 // Free shipping for now
  const tax = totalPrice * 0.08 // 8% tax

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
      <h2 className="text-2xl font-black text-gray-900">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-gray-500 font-medium">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500 font-medium">
          <span>Shipping</span>
          <span className="text-green-600 font-bold uppercase text-xs">Free</span>
        </div>
        <div className="flex justify-between text-gray-500 font-medium">
          <span>Estimated Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-100 my-6" />
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold text-gray-900">Order Total</span>
          <span className="text-3xl font-black text-indigo-600">${(totalPrice + tax).toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <button
          onClick={() => {
            alert('Checkout successful!')
            clearCart()
          }}
          className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-gray-200"
        >
          Checkout Now
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-6 text-gray-400 pt-4">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
