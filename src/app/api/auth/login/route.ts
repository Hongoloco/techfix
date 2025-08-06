import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar contraseña
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
