import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const tokenData = verifyTokenFromRequest(request)
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { active } = await request.json()

    const service = await prisma.service.update({
      where: { id: params.id },
      data: { active }
    })

    return NextResponse.json({
      ...service,
      features: JSON.parse(service.features)
    })

  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const tokenData = verifyTokenFromRequest(request)
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await prisma.service.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Servicio eliminado exitosamente' })

  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
