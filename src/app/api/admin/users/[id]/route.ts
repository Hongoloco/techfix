import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    // Verificar que el usuario sea admin
    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // No permitir que el admin se elimine a sí mismo
    if (params.id === tokenData.userId) {
      return NextResponse.json({ error: 'No puedes eliminarte a ti mismo' }, { status: 400 })
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
