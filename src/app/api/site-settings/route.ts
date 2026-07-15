import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getSiteSettings, saveSiteSettings } from '@/lib/siteSettings'

async function requireAdmin(request: NextRequest) {
  const tokenData = verifyTokenFromRequest(request)
  if (!tokenData) return false

  const user = await prisma.user.findUnique({ where: { id: tokenData.userId } })
  return user?.role === 'ADMIN'
}

export async function GET() {
  const settings = await getSiteSettings()
  return NextResponse.json(settings)
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await requireAdmin(request))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const settings = await saveSiteSettings(body)
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error saving site settings:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
