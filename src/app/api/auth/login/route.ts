import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, verifyPassword } from '@/lib/auth'
import { authRateLimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (!authRateLimit(request)) {
      return NextResponse.json(
        { error: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      )
    }

    const { email, password } = await request.json()

    // Validación de entrada
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar contraseña usando bcrypt
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Generar token
    const token = generateToken(user.id, user.email)

    // Preparar datos del usuario (sin contraseña)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: userData
    })

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
