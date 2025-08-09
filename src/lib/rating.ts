import { prisma } from '@/lib/prisma';
import { sendEmail, ticketResolvedEmailTemplate } from '@/lib/email_new';

export async function sendRatingRequest(ticketId: string) {
  try {
    // Obtener datos del ticket con cliente
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        client: true,
        user: true
      }
    });

    if (!ticket) {
      console.error('Ticket not found:', ticketId);
      return { success: false, error: 'Ticket not found' };
    }

    const clientEmail = ticket.client?.email || ticket.user.email;
    
    if (!clientEmail) {
      console.error('No email found for ticket:', ticketId);
      return { success: false, error: 'No email found' };
    }

    // Generar template de email
    const emailTemplate = ticketResolvedEmailTemplate(ticket);

    // Enviar email
    const result = await sendEmail({
      to: clientEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    if (result.success) {
      console.log(`Rating request sent for ticket ${ticketId} to ${clientEmail}`);
      return { success: true, messageId: result.messageId };
    } else {
      console.error('Failed to send rating request:', result.error);
      return { success: false, error: result.error };
    }

  } catch (error) {
    console.error('Error sending rating request:', error);
    return { success: false, error };
  }
}

// Función para enviar automáticamente cuando un ticket se resuelve
export async function autoSendRatingRequest(ticketId: string) {
  // Esperar 5 minutos antes de enviar la solicitud de calificación
  setTimeout(async () => {
    try {
      await sendRatingRequest(ticketId);
    } catch (error) {
      console.error('Error in auto rating request:', error);
    }
  }, 5 * 60 * 1000); // 5 minutos
}
