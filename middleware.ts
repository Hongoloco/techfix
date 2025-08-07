import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Rutas que requieren autenticación
const protectedRoutes = ['/admin', '/dashboard', '/profile']

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/login', '/register', '/contact', '/services', '/quote']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Permitir archivos estáticos y APIs siempre
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Permitir rutas públicas
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Solo verificar autenticación para rutas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const decoded = verifyToken(token)
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
