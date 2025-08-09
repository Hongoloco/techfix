import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendRatingRequest } from '@/lib/rating';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const ticketId = params.id;
    const body = await request.json();
    const { status } = body;

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
