import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
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

    // Obtener estadísticas del dashboard
    const totalUsers = await prisma.user.count()
    const totalTickets = await prisma.ticket.count()
    const openTickets = await prisma.ticket.count({
      where: { status: 'OPEN' }
    })

    // Simulación de ingresos (aquí puedes integrar con tu sistema de facturación)
    const revenue = 15750 // Ejemplo

    return NextResponse.json({
      totalUsers,
      totalTickets,
      openTickets,
      revenue
    })

  } catch (error) {
    console.error('Error getting admin stats:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
