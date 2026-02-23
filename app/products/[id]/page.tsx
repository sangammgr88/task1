import { apiFetch } from '@/services/api.service'
import { Product } from '@/types'
import { Star, ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from '@/components/product/AddTocartButton'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  return apiFetch<Product>(`/products/${id}`)
}

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  return {
    title: product.title,
    description: product.description.substring(0, 160),
    openGraph: {
      images: [product.image],
    }
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<Props['params']> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-indigo-600 hover:underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/products" 
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Section */}
        <div className="bg-white rounded-3xl p-12 border border-gray-100 flex items-center justify-center sticky top-24 h-fit aspect-square shadow-sm relative overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="p-12 object-contain hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-yellow-700">{product.rating.rate}</span>
              </div>
              <span className="text-gray-400 text-sm">{product.rating.count} Customer Reviews</span>
            </div>
          </div>

          <div className="mb-10 pt-6 border-t border-gray-100">
            <span className="text-5xl font-black text-gray-900 leading-none">
              ${product.price}
            </span>
            <p className="mt-4 text-gray-500 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mb-10 pb-10 border-b border-gray-100">
            <AddToCartButton product={product} />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50 group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                <Truck className="w-6 h-6 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50 group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                <RotateCcw className="w-6 h-6 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Free Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50 group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100">
                <ShieldCheck className="w-6 h-6 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Highlights
            </h3>
            <ul className="grid grid-cols-1 gap-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Authentic Brand Guaranteed
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Premium Quality Materials
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Exclusive Collection 2024
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
