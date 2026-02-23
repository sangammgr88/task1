'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

interface FiltersProps {
  categories: string[]
}

export default function Filters({ categories }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [sort, setSort] = useState(searchParams.get('sort') || 'asc')

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (search) params.set('search', search)
    else params.delete('search')
    
    if (category !== 'all') params.set('category', category)
    else params.delete('category')
    
    params.set('sort', sort)
    
    router.push(`/products?${params.toString()}`, { scroll: false })
  }, [search, category, sort])

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
      <div className="flex-grow">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Search</label>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full md:w-48">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
        <select
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none capitalize"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-36">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Sort Price</label>
        <select
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Lowest First</option>
          <option value="desc">Highest First</option>
        </select>
      </div>
    </div>
  )
}
