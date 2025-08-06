import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// Template para nuevo ticket
export function newTicketEmailTemplate(ticketData: any) {
  const subject = `🆘 NUEVO TICKET #${ticketData.id} - ${ticketData.title} [${ticketData.priority}]`
  
  const priorityColors: { [key: string]: string } = {
    'LOW': '#22c55e',
    'MEDIUM': '#f59e0b', 
    'HIGH': '#ef4444',
    'URGENT': '#dc2626'
  }
  const priorityColor = priorityColors[ticketData.priority] || '#6b7280'
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; border: 2px solid #2563eb;">
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 25px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🛠️ TechFix Uruguay</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 20px;">NUEVO TICKET DE SOPORTE</h2>
      </div>
      
      <div style="padding: 30px; background-color: #f8fafc;">
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <h3>Información del Ticket</h3>
          <p><strong>🆔 ID:</strong> #${ticketData.id}</p>
          <p><strong>📋 Título:</strong> ${ticketData.title}</p>
          <p><strong>⚠️ Prioridad:</strong> 
            <span style="background-color: ${priorityColor}; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold;">
              ${ticketData.priority}
            </span>
          </p>
          <p><strong>🏷️ Categoría:</strong> ${ticketData.category || 'Sin categoría'}</p>
          <p><strong>👤 Cliente:</strong> ${ticketData.user.name}</p>
          <p><strong>📧 Email:</strong> 
            <a href="mailto:${ticketData.user.email}" style="color: #2563eb;">
              ${ticketData.user.email}
            </a>
          </p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3>📝 Descripción del Problema:</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb;">
            ${ticketData.description.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000/admin" 
             style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            🔧 VER EN PANEL DE ADMINISTRACIÓN
          </a>
        </div>

        <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #92400e;">⚡ ACCIONES RÁPIDAS</h3>
          <p style="margin: 10px 0;">
            <a href="https://wa.me/59899252808?text=Hola%20${ticketData.user.name}!%20Recibimos%20tu%20ticket" 
               style="background-color: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              📱 Responder por WhatsApp
            </a>
          </p>
        </div>
      </div>
      
      <div style="background-color: #374151; color: white; padding: 20px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <p style="margin: 5px 0;">📱 WhatsApp: +59899252808 | 📧 Email: techfixuruguay@gmail.com</p>
        <p style="margin: 5px 0; font-size: 12px;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
      </div>
    </div>
  `
  
  const text = `
    🆘 NUEVO TICKET #${ticketData.id} - ${ticketData.title} [${ticketData.priority}]
    
    ID: ${ticketData.id}
    Título: ${ticketData.title}
    Prioridad: ${ticketData.priority}
    Categoría: ${ticketData.category || 'Sin categoría'}
    Cliente: ${ticketData.user.name} (${ticketData.user.email})
    
    Descripción:
    ${ticketData.description}
    
    Ver en panel: http://localhost:3000/admin
    WhatsApp al cliente: https://wa.me/59899252808
  `
  
  return { subject, html, text }
}

// Template para nueva cotización
export function newQuoteEmailTemplate(quoteData: any) {
  const subject = `💰 NUEVA COTIZACIÓN - ${quoteData.serviceType} - ${quoteData.name}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #2563eb;">
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 25px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🛠️ TechFix Uruguay</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 20px;">NUEVA SOLICITUD DE COTIZACIÓN</h2>
      </div>
      
      <div style="padding: 30px; background-color: #f8fafc;">
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3>Información de la Cotización</h3>
          <p><strong>🔧 Servicio:</strong> ${quoteData.serviceType}</p>
          <p><strong>👤 Cliente:</strong> ${quoteData.name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${quoteData.email}" style="color: #2563eb;">${quoteData.email}</a></p>
          <p><strong>📱 Teléfono:</strong> ${quoteData.phone}</p>
          <p><strong>📅 Fecha de contacto:</strong> ${new Date().toLocaleDateString('es-UY')}</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3>📝 Descripción del Servicio:</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb;">
            ${quoteData.description.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #92400e;">⚡ ACCIONES RÁPIDAS</h3>
          <p style="margin: 10px 0;">
            <a href="https://wa.me/59899252808?text=Hola%20${quoteData.name}!%20Recibimos%20tu%20solicitud%20de%20cotización" 
               style="background-color: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              📱 Responder por WhatsApp
            </a>
          </p>
        </div>
      </div>
      
      <div style="background-color: #374151; color: white; padding: 20px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <p style="margin: 5px 0;">📱 WhatsApp: +59899252808 | 📧 Email: techfixuruguay@gmail.com</p>
        <p style="margin: 5px 0; font-size: 12px;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
      </div>
    </div>
  `
  
  const text = `
    💰 NUEVA COTIZACIÓN - ${quoteData.serviceType}
    
    Cliente: ${quoteData.name}
    Email: ${quoteData.email}
    Teléfono: ${quoteData.phone}
    Servicio: ${quoteData.serviceType}
    
    Descripción:
    ${quoteData.description}
    
    WhatsApp al cliente: https://wa.me/59899252808
  `
  
  return { subject, html, text }
}
