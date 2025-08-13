'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
  show: boolean
}

export function Toast({ message, type, duration = 5000, onClose, show }: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  if (!show) return null

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-green-200 bg-green-50`
      case 'error':
        return `${baseStyles} border-red-200 bg-red-50`
      case 'warning':
        return `${baseStyles} border-yellow-200 bg-yellow-50`
      case 'info':
        return `${baseStyles} border-blue-200 bg-blue-50`
      default:
        return baseStyles
    }
  }

  const getIcon = () => {
    const iconClass = "w-5 h-5"
    
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-600`} />
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-600`} />
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-600`} />
      case 'info':
        return <Info className={`${iconClass} text-blue-600`} />
      default:
        return <Info className={`${iconClass} text-gray-600`} />
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'warning':
        return 'text-yellow-800'
      case 'info':
        return 'text-blue-800'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className={`inline-flex ${getTextColor()} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
            onClick={onClose}
          >
            <span className="sr-only">Cerrar</span>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook para usar toasts
export function useToast() {
  const [toast, setToast] = useState<{
    message: string
    type: ToastType
    show: boolean
  } | null>(null)

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type, show: true })
  }

  const hideToast = () => {
    setToast(prev => prev ? { ...prev, show: false } : null)
  }

  const ToastComponent = toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      show={toast.show}
      onClose={hideToast}
    />
  ) : null

  return {
    showToast,
    hideToast,
    ToastComponent
  }
}
