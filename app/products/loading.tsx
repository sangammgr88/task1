export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      <div className="flex justify-between items-center mb-10 h-10 w-48 bg-gray-200 rounded-lg"></div>
      
      <div className="h-16 w-full bg-gray-100 rounded-2xl mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="aspect-[4/5] bg-gray-100 rounded-3xl"></div>
        ))}
      </div>
    </div>
  )
}
