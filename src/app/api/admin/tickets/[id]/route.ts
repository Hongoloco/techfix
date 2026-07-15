import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendRatingRequest } from '@/lib/rating'

const allowedStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const

async function requireTicketAdmin(request: NextRequest) {
  const tokenData = verifyTokenFromRequest(request)
  if (!tokenData) return null

  const user = await prisma.user.findUnique({
    where: { id: tokenData.userId },
    select: { id: true, role: true }
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'AGENT')) return null
  return user
}

async function updateTicketStatus(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireTicketAdmin(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()
    const status = body?.status

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Estado de ticket invalido' },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status },
      include: {
        client: true,
        user: {
          select: {
            name: true,
            email: true
          }
        },
        assignedTo: {
          select: {
            name: true
          }
        }
      }
    })

    if (status === 'RESOLVED') {
      sendRatingRequest(id).catch(error => {
        console.error('Error sending rating request:', error)
      })
    }

    return NextResponse.json({
      success: true,
      ticket,
      message: status === 'CLOSED' ? 'Ticket cerrado correctamente.' : 'Ticket actualizado correctamente.'
    })
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 })
    }

    console.error('Error updating admin ticket:', error)
    return NextResponse.json({ error: 'Error al actualizar el ticket' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return updateTicketStatus(request, context)
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return updateTicketStatus(request, context)
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireTicketAdmin(request)
    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await context.params

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        client: {
          select: {
            name: true,
            email: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 })
    }

    await prisma.$transaction(async tx => {
      await tx.ticketComment.deleteMany({
        where: { ticketId: id }
      })

      await tx.testimonial.updateMany({
        where: { ticketId: id },
        data: { ticketId: null }
      })

      await tx.ticket.delete({
        where: { id }
      })
    })

    return NextResponse.json({
      success: true,
      deletedTicket: ticket,
      message: 'Ticket eliminado correctamente.'
    })
  } catch (error) {
    console.error('Error deleting admin ticket:', error)
    return NextResponse.json({ error: 'Error al borrar el ticket' }, { status: 500 })
  }
}
