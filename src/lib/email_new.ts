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
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; background: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4);">
      <!-- Header con gradiente cyan como la web -->
      <div style="background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white; padding: 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%); pointer-events: none;"></div>
        <h1 style="margin: 0; font-size: 32px; font-weight: 900; position: relative; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);">🛠️ TechFix Uruguay 🇺🇾</h1>
        <h2 style="margin: 12px 0 0 0; font-size: 20px; font-weight: 600; opacity: 0.95; position: relative;">NUEVO TICKET DE SOPORTE</h2>
      </div>
      
      <!-- Contenido principal con fondo oscuro -->
      <div style="padding: 30px; background: #1F2937; position: relative;">
        <!-- Efectos de fondo como la web -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%); pointer-events: none;"></div>
        
        <!-- Card de información del ticket -->
        <div style="background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(20px); border: 1px solid #374151; border-radius: 16px; padding: 25px; margin-bottom: 20px; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);">
          <h3 style="margin: 0 0 20px 0; color: #22D3EE; font-size: 18px; font-weight: 700; border-bottom: 2px solid #374151; padding-bottom: 10px;">📋 Información del Ticket</h3>
          <div style="display: grid; gap: 12px;">
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #06B6D4;">🆔 ID:</strong> <span style="background: linear-gradient(135deg, #06B6D4, #22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 16px;">#${ticketData.id}</span></p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #06B6D4;">📋 Título:</strong> ${ticketData.title}</p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;">
              <strong style="color: #06B6D4;">⚠️ Prioridad:</strong> 
              <span style="background-color: ${priorityColor}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                ${ticketData.priority}
              </span>
            </p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #06B6D4;">🏷️ Categoría:</strong> ${ticketData.category || 'Sin categoría'}</p>
          </div>
        </div>

        <!-- Card de información del cliente -->
        <div style="background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(20px); border: 1px solid #374151; border-radius: 16px; padding: 25px; margin-bottom: 20px; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);">
          <h3 style="margin: 0 0 20px 0; color: #F59E0B; font-size: 18px; font-weight: 700; border-bottom: 2px solid #374151; padding-bottom: 10px;">👤 Información del Cliente</h3>
          <div style="display: grid; gap: 12px;">
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #F59E0B;">👤 Nombre:</strong> ${ticketData.client?.name || ticketData.user.name}</p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;">
              <strong style="color: #F59E0B;">📧 Email:</strong> 
              <a href="mailto:${ticketData.client?.email || ticketData.user.email}" style="color: #22D3EE; text-decoration: none; font-weight: 600; transition: color 0.3s ease;">
                ${ticketData.client?.email || ticketData.user.email}
              </a>
            </p>
            ${ticketData.client?.phone ? `
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;">
              <strong style="color: #F59E0B;">📱 WhatsApp:</strong> 
              <a href="https://wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}" style="color: #25d366; text-decoration: none; font-weight: 600;">
                ${ticketData.client.phone}
              </a>
            </p>
            ` : ''}
            ${ticketData.client?.company ? `
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #F59E0B;">🏢 Empresa:</strong> ${ticketData.client.company}</p>
            ` : ''}
          </div>
        </div>
        
        <!-- Card de descripción -->
        <div style="background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(20px); border: 1px solid #374151; border-radius: 16px; padding: 25px; margin-bottom: 25px; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);">
          <h3 style="margin: 0 0 15px 0; color: #10B981; font-size: 18px; font-weight: 700;">📝 Descripción del Problema</h3>
          <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-left: 4px solid #06B6D4; border-radius: 12px; padding: 20px; color: #D1D5DB; line-height: 1.7; font-size: 15px;">
            ${ticketData.description.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <!-- Botón del panel de administración -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin" 
             style="display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 15px -3px rgba(6, 182, 212, 0.4); transition: all 0.3s ease; position: relative; overflow: hidden;">
            🔧 VER EN PANEL DE ADMINISTRACIÓN
          </a>
        </div>

        <!-- Card de acciones rápidas -->
        <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 25px; text-align: center; position: relative; backdrop-filter: blur(10px);">
          <h3 style="margin: 0 0 20px 0; color: #F59E0B; font-size: 18px; font-weight: 700;">⚡ ACCIONES RÁPIDAS</h3>
          <div style="display: flex; gap: 15px; justify-content: center; align-items: center; flex-wrap: wrap;">
            ${ticketData.client?.phone ? `
              <a href="https://wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(ticketData.client.name || ticketData.user.name)}!%20Recibimos%20tu%20ticket%20%23${ticketData.id}%20-%20${encodeURIComponent(ticketData.title)}.%20Estamos%20revisando%20tu%20solicitud%20y%20te%20contactaremos%20pronto." 
                 style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%); color: white; padding: 14px 24px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 6px 12px rgba(37, 211, 102, 0.3); transition: all 0.3s ease;">
                📱 WhatsApp al Cliente
              </a>
            ` : `
              <span style="display: inline-block; background: #6B7280; color: white; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; opacity: 0.7;">
                📱 Sin WhatsApp (no hay teléfono)
              </span>
            `}
            <a href="tel:59899252808" 
               style="display: inline-block; background: linear-gradient(135deg, #374151 0%, #4B5563 100%); color: white; padding: 14px 24px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 6px 12px rgba(55, 65, 81, 0.3); border: 1px solid #6B7280;">
              📞 Llamar Oficina
            </a>
          </div>
        </div>
      </div>
      
      <!-- Footer oscuro como la web -->
      <div style="background: #374151; color: #D1D5DB; padding: 25px; text-align: center; border-top: 1px solid #4B5563;">
        <h3 style="margin: 0 0 15px 0; color: #22D3EE; font-size: 18px; font-weight: 800;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 10px; flex-wrap: wrap;">
          <span style="color: #F59E0B; font-weight: 600;">📱 WhatsApp: +59899252808</span>
          <span style="color: #06B6D4; font-weight: 600;">📧 Email: techfixuruguay@gmail.com</span>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #9CA3AF;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
      </div>
    </div>
  `
  
  const text = `
    🆘 NUEVO TICKET #${ticketData.id} - ${ticketData.title} [${ticketData.priority}]
    
    ID: ${ticketData.id}
    Título: ${ticketData.title}
    Prioridad: ${ticketData.priority}
    Categoría: ${ticketData.category || 'Sin categoría'}
    Cliente: ${ticketData.client?.name || ticketData.user.name} (${ticketData.client?.email || ticketData.user.email})
    ${ticketData.client?.phone ? `WhatsApp: ${ticketData.client.phone}` : ''}
    ${ticketData.client?.company ? `Empresa: ${ticketData.client.company}` : ''}
    
    Descripción:
    ${ticketData.description}
    
    Ver en panel: ${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin
    ${ticketData.client?.phone ? `WhatsApp al cliente: https://wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}` : 'Sin WhatsApp disponible'}
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
