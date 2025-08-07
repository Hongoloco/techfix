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

    // Solo permitir acceso al usuario administrador específico
    if (email !== 'techfixuruguay@gmail.com') {
      return NextResponse.json(
        { error: 'Acceso no autorizado' },
        { status: 401 }
      )
    }

    if (password !== 'Agustin2025') {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Buscar o crear el usuario administrador
    let user = await prisma.user.findUnique({
      where: { email: 'techfixuruguay@gmail.com' }
    })

    if (!user) {
      // Crear el usuario administrador si no existe
      const bcrypt = require('bcryptjs')
      const hashedPassword = await bcrypt.hash('Agustin2025', 10)
      
      user = await prisma.user.create({
        data: {
          name: 'Administrador TechFix',
          email: 'techfixuruguay@gmail.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      })
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
