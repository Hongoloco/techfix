'use client'

import { useState, useEffect } from 'react'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'purple'
}

export default function Loading({ 
  message = 'Cargando...', 
  size = 'md',
  color = 'blue' 
}: LoadingProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    purple: 'border-purple-600'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      <p className="text-sm text-gray-600 font-medium">
        {message}{dots}
      </p>
    </div>
  )
}

// Componente de skeleton para mejor UX
export function TicketSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

export function ServiceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  )
}
