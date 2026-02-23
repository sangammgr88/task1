import { apiFetch } from '@/services/api.service'
import { Product, SortOrder } from '@/types'
import ProductGrid from '@/components/product/ProductGrid'
import Filters from '@/components/product/Filters'
import { Suspense } from 'react'

interface Props {
  searchParams: {
    sort?: SortOrder
    category?: string
    search?: string
  }
}

async function getProducts(sort: SortOrder = 'asc') {
  return apiFetch<Product[]>(`/products?sort=${sort}`)
}

async function getCategories() {
  return apiFetch<string[]>('/products/categories')
}

export default async function ProductsPage({ searchParams }: Props) {
  const sort = searchParams.sort || 'asc';

  let data: { products: Product[], categories: string[] } | null = null;
  let error: string | null = null;

  try {
    const [products, categories] = await Promise.all([
      getProducts(sort),
      getCategories()
    ]);
    data = { products, categories };
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch';
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-red-50 p-8 rounded-2xl max-w-md border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re having trouble loading the products. Please try again later.
          </p>
          <p className="text-sm text-red-500 italic">Error: {error}</p>
        </div>
      </div>
    )
  }

  const { products, categories } = data;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Discover our Products
        </h1>
        <p className="text-gray-500">
          {products.length} items found
        </p>
      </div>

      <Filters categories={categories} />
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
          ))}
        </div>
      }>
        <ProductGrid 
          products={products} 
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  )
}