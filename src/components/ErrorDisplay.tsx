'use client'

import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ErrorBoundaryProps {
  error?: Error
  reset?: () => void
  statusCode?: number
  message?: string
}

export function ErrorDisplay({ 
  error, 
  reset, 
  statusCode = 500, 
  message 
}: ErrorBoundaryProps) {
  const router = useRouter()

  const getErrorMessage = () => {
    if (message) return message
    
    switch (statusCode) {
      case 404:
        return 'La página que buscas no existe'
      case 403:
        return 'No tienes permisos para acceder a esta página'
      case 401:
        return 'Necesitas iniciar sesión para continuar'
      case 500:
        return 'Ocurrió un error interno del servidor'
      default:
        return error?.message || 'Ocurrió un error inesperado'
    }
  }

  const getErrorTitle = () => {
    switch (statusCode) {
      case 404:
        return 'Página no encontrada'
      case 403:
        return 'Acceso denegado'
      case 401:
        return 'No autorizado'
      case 500:
        return 'Error del servidor'
      default:
        return 'Error'
    }
  }

  return (
    <div className="min-h-screen gradient-animated flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <AlertTriangle className="w-16 h-16 text-red-500" />
            <span className="absolute -top-2 -right-2 text-2xl">🔧</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {getErrorTitle()}
          </h1>
          <p className="text-white/80 text-lg mb-4">
            {getErrorMessage()}
          </p>
          <p className="text-white/60 text-sm">
            Si el problema persiste, contacta a nuestro soporte técnico.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="btn-modern flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          {reset && (
            <button
              onClick={reset}
              className="btn-modern btn-tech flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>
          )}

          <Link
            href="/"
            className="btn-modern btn-success flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/contact"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ¿Necesitas ayuda? Contáctanos
          </Link>
        </div>
      </div>
    </div>
  )
}

// Componente para errores específicos
export function NotFoundError() {
  return <ErrorDisplay statusCode={404} />
}

export function UnauthorizedError() {
  return <ErrorDisplay statusCode={401} />
}

export function ForbiddenError() {
  return <ErrorDisplay statusCode={403} />
}

export function ServerError() {
  return <ErrorDisplay statusCode={500} />
}
