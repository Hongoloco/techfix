import { NextRequest, NextResponse } from 'next/server'

// Rate limiting en memoria (en producción usar Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
}

export function createRateLimit(options: RateLimitOptions) {
  return (request: NextRequest): boolean => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
    const now = Date.now()
    
    // Limpiar entradas expiradas
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key)
      }
    }
    
    const current = rateLimit.get(ip)
    
    if (!current) {
      rateLimit.set(ip, {
        count: 1,
        resetTime: now + options.windowMs
      })
      return true
    }
    
    if (now > current.resetTime) {
      rateLimit.set(ip, {
        count: 1,
        resetTime: now + options.windowMs
      })
      return true
    }
    
    if (current.count >= options.maxRequests) {
      return false
    }
    
    current.count++
    return true
  }
}

// Configuraciones predefinidas
export const authRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 5 // 5 intentos de login por IP
})

export const apiRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 100 // 100 requests por IP
})

export const ticketRateLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 5 // 5 tickets por minuto
})
