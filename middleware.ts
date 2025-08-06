import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Rutas que requieren autenticación
const protectedRoutes = ['/admin', '/dashboard', '/profile']

// Rutas que requieren rol de admin
const adminRoutes = ['/admin']

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/login', '/register', '/contact', '/services', '/quote']

// Rate limiting simple (en producción usar Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos
  const maxRequests = 100 // máximo 100 requests por ventana

  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  record.count++
  
  if (record.count > maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: maxRequests - record.count }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  const rateLimit = getRateLimit(ip)
  
  if (!rateLimit.allowed) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      }
    })
  }

  // Headers de seguridad
  const response = NextResponse.next()
  
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString())

  // Verificar si la ruta es pública
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/')) {
    return response
  }

  // Verificar autenticación para rutas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Verificar si requiere rol de admin
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        // En este punto necesitaríamos verificar el rol desde la base de datos
        // Por simplicidad, asumimos que el token contiene la info del rol
        // En producción, hacer una consulta a la DB o incluir el rol en el JWT
      }

    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
