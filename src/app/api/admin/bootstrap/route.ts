import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-bootstrap-secret')
    const expected = process.env.ADMIN_BOOTSTRAP_SECRET
    const fallback = process.env.ADMIN_PASSWORD

    if ((expected && secret !== expected) || (!expected && fallback && secret !== fallback)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!expected && !fallback) {
      return NextResponse.json({ error: 'Falta configurar secreto de bootstrap en Vercel' }, { status: 500 })
    }

    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        password: hashed,
        role: 'ADMIN',
        name: name || 'TechFix Uruguay'
      },
      create: {
        email: email.toLowerCase(),
        password: hashed,
        role: 'ADMIN',
        name: name || 'TechFix Uruguay'
      }
    })

    return NextResponse.json({
      ok: true,
      message: 'Administrador creado/actualizado',
      user: { id: user.id, email: user.email, role: user.role }
    })
  } catch (error) {
    console.error('Bootstrap admin error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
