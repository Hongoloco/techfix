import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendRatingRequest } from '@/lib/rating';
import { verifyTokenFromRequest } from '@/lib/auth';

async function updateTicketStatus(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const tokenData = verifyTokenFromRequest(request);
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
      select: { role: true }
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'AGENT')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const params = await context.params;
    const ticketId = params.id;
    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        message: 'Estado de ticket invalido'
      }, { status: 400 });
    }

    // Actualizar el ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
      include: {
        client: true,
        user: true
      }
    });

    // Si el ticket se marca como resuelto, enviar solicitud de calificación
    if (status === 'RESOLVED') {
      // Enviar email de forma asíncrona (no bloquear la respuesta)
      sendRatingRequest(ticketId).catch(error => {
        console.error('Error sending rating request:', error);
      });
    }

    return NextResponse.json({
      success: true,
      ticket: updatedTicket,
      message: status === 'RESOLVED' 
        ? 'Ticket resuelto. Se enviará una solicitud de calificación al cliente.'
        : 'Ticket actualizado correctamente.'
    });

  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al actualizar el ticket'
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return updateTicketStatus(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return updateTicketStatus(request, context);
}
