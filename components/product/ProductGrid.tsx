'use client'

import { Product, SearchParams } from '@/types'
import { useCart } from '@/providers/CartContext'
import { useAuth } from '@/providers/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface ProductGridProps {
  products: Product[]
  searchParams: SearchParams
}

const ITEMS_PER_PAGE = 8

export default function ProductGrid({ products, searchParams }: ProductGridProps) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  
  const search = searchParams.search?.toLowerCase() || ''
  const category = searchParams.category || 'all'

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search)
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedProducts.map(product => (
        <div 
          key={product.id} 
          className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col"
        >
          <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gray-50 p-8 overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="p-8 object-contain group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold">{product.rating.rate}</span>
            </div>
          </Link>

          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            <Link href={`/products/${product.id}`} className="block mb-2">
              <h2 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {product.title}
              </h2>
            </Link>
            
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (!user) {
                    alert('Please login to add items to cart')
                    return
                  }
                  addToCart(product)
                }}
                className="bg-gray-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                title="Add to Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all font-bold flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white border border-gray-100 text-gray-400 hover:text-indigo-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all font-bold flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
