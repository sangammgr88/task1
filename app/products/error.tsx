'use client'

import { useEffect } from 'react'
import { RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 p-12 rounded-[40px] border border-red-100 max-w-xl shadow-2xl shadow-red-100/50">
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Something went wrong!</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          We encountered an unexpected error while fetching the products. 
          Please try again or head back to the home page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <Home className="w-5 h-5" />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
