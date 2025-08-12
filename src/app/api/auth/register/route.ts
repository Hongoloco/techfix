import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Registro deshabilitado - solo se permite el usuario administrador principal
    return NextResponse.json(
      { error: 'El registro de nuevos usuarios está deshabilitado. Solo se permite el usuario administrador.' },
      { status: 403 }
    )

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
