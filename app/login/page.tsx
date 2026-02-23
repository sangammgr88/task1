'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/AuthContext'
import { useRouter } from 'next/navigation'
import { LogIn, User, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const { login, isLoading, error: authError } = useAuth()
  const router = useRouter()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('' )
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    
    if (!username || !password) {
      setLocalError('Please enter both username and password')
      return
    }

    try {
      await login(username, password)
      router.push('/products')
    } catch (err) {
      // Error handled by context or catch
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
        </div>

        {(localError || authError) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-semibold animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{localError || authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none font-medium"
                placeholder="mor_2314"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 ml-1">Tip: Use `mor_2314` for testing</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all outline-none font-medium"
                placeholder="83r5^_"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 ml-1">Tip: Use `83r5^_` for testing</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:active:scale-100 mt-4"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
