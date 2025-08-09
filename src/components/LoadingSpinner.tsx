'use client'

import { Cpu, Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  variant?: 'default' | 'tech' | 'minimal'
}

export function LoadingSpinner({ 
  size = 'md', 
  message = 'Cargando...', 
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-600`} />
      </div>
    )
  }

  if (variant === 'tech') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Cpu className={`${sizeClasses[size]} text-purple-600 animate-pulse`} />
          <div className="absolute -top-1 -right-1 flag-wave text-lg">🇺🇾</div>
        </div>
        {message && (
          <p className="text-white/80 text-sm font-medium">{message}</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      {message && (
        <div className="text-center">
          <p className="text-white font-medium mb-1">{message}</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  )
}

// Loading para páginas completas
export function PageLoading() {
  return (
    <div className="min-h-screen gradient-animated flex items-center justify-center">
      <LoadingSpinner size="lg" message="Cargando TechFix..." variant="tech" />
    </div>
  )
}

// Loading para botones
export function ButtonLoading({ children, loading, ...props }: { 
  children: React.ReactNode
  loading: boolean
  [key: string]: any 
}) {
  return (
    <button disabled={loading} {...props}>
      <div className="flex items-center justify-center space-x-2">
        {loading && <LoadingSpinner size="sm" variant="minimal" />}
        <span>{children}</span>
      </div>
    </button>
  )
}
