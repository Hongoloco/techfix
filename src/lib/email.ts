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
    'MEDIUM': '#ffa726', 
    'HIGH': '#ff6b35',
    'URGENT': '#ff4757'
  }
  const priorityColor = priorityColors[ticketData.priority] || '#6b7280'
  
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d1b1b 50%, #1a0f0f 75%, #0a0a0a 100%); border-radius: 25px; overflow: hidden; border: 2px solid rgba(255, 107, 53, 0.3);">
      
      <!-- Header con gradiente TechFix -->
      <div style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 30px; text-align: center; position: relative;">
        <div style="display: inline-block; background: rgba(255,255,255,0.15); border-radius: 50%; padding: 15px; margin-bottom: 15px; backdrop-filter: blur(10px);">
          🛠️
        </div>
        <h1 style="margin: 0; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">TechFix Uruguay 🇺🇾</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 600; opacity: 0.95;">NUEVO TICKET DE SOPORTE</h2>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%); pointer-events: none;"></div>
      </div>
      
      <!-- Contenido principal con efecto glass -->
      <div style="padding: 35px; background: linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.85) 100%); backdrop-filter: blur(30px);">
        
        <!-- Badge de ID del ticket -->
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="background: linear-gradient(135deg, #ff6b35 0%, #ff4757 100%); color: white; padding: 8px 20px; border-radius: 20px; font-weight: 700; font-size: 16px; box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);">
            TICKET #${ticketData.id}
          </span>
        </div>
        
        <!-- Información del ticket -->
        <div style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); padding: 25px; border-radius: 20px; margin-bottom: 25px; border: 1px solid rgba(255, 107, 53, 0.2); backdrop-filter: blur(20px);">
          <h3 style="color: #ff6b35; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">📋 Información del Ticket</h3>
          
          <div style="color: #f0f0f0; line-height: 1.8; font-size: 15px;">
            <p style="margin: 8px 0;"><strong style="color: #ffa726;">🆔 ID:</strong> #${ticketData.id}</p>
            <p style="margin: 8px 0;"><strong style="color: #ffa726;">📋 Título:</strong> ${ticketData.title}</p>
            <p style="margin: 8px 0;">
              <strong style="color: #ffa726;">⚠️ Prioridad:</strong> 
              <span style="background: ${priorityColor}; color: white; padding: 6px 15px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase; margin-left: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.3);">
                ${ticketData.priority}
              </span>
            </p>
            <p style="margin: 8px 0;"><strong style="color: #ffa726;">🏷️ Categoría:</strong> ${ticketData.category || 'Sin categoría'}</p>
            <p style="margin: 8px 0;"><strong style="color: #ffa726;">👤 Cliente:</strong> ${ticketData.user.name}</p>
            <p style="margin: 8px 0;">
              <strong style="color: #ffa726;">📧 Email:</strong> 
              <a href="mailto:${ticketData.user.email}" style="color: #ff6b35; text-decoration: none; font-weight: 600;">
                ${ticketData.user.email}
              </a>
            </p>
          </div>
        </div>
        
        <!-- Descripción del problema -->
        <div style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); padding: 25px; border-radius: 20px; margin-bottom: 30px; border: 1px solid rgba(255, 107, 53, 0.2); backdrop-filter: blur(20px);">
          <h3 style="color: #ff6b35; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">📝 Descripción del Problema</h3>
          <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 15px; border-left: 4px solid #ff6b35; color: #f0f0f0; line-height: 1.6;">
            ${ticketData.description.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <!-- Botón principal -->
        <div style="text-align: center; margin: 35px 0;">
          <a href="${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin" 
             style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 25px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;">
            🔧 Ver en Panel de Administración
          </a>
        </div>

        <!-- Acciones rápidas -->
        <div style="background: linear-gradient(135deg, rgba(255, 165, 38, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%); border: 2px solid rgba(255, 165, 38, 0.3); border-radius: 20px; padding: 25px; text-align: center;">
          <h3 style="margin: 0 0 15px 0; color: #ffa726; font-size: 18px; font-weight: 700;">⚡ ACCIONES RÁPIDAS</h3>
          <a href="https://wa.me/59899252808?text=Hola%20${ticketData.user.name}!%20Recibimos%20tu%20ticket" 
             style="background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: white; padding: 15px 25px; text-decoration: none; border-radius: 20px; font-weight: 700; display: inline-block; box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3); margin: 10px;">
            📱 Responder por WhatsApp
          </a>
        </div>
      </div>
      
      <!-- Footer con gradiente -->
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #f0f0f0; padding: 25px; text-align: center; border-top: 1px solid rgba(255, 107, 53, 0.2);">
        <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #ff6b35 0%, #ffa726 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🛠️ TechFix Uruguay 🇺🇾 - Soporte Técnico Profesional</h3>
        <p style="margin: 8px 0; color: #cccccc; font-weight: 500;">📱 WhatsApp: +59899252808 | 📧 Email: techfixuruguay@gmail.com</p>
        <p style="margin: 8px 0; font-size: 14px; color: #999999;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 107, 53, 0.1);">
          <p style="margin: 0; font-size: 12px; color: #666666;">Soluciones rápidas y efectivas para todos tus problemas tecnológicos</p>
        </div>
      </div>
    </div>
  `
  
  const text = `
    🛠️ TECHFIX URUGUAY 🇺🇾 - NUEVO TICKET DE SOPORTE 🛠️
    ══════════════════════════════════════════════════════
    
    🆘 TICKET #${ticketData.id} - ${ticketData.title} [${ticketData.priority}]
    
    📋 INFORMACIÓN DEL TICKET:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🆔 ID: ${ticketData.id}
    📝 Título: ${ticketData.title}
    ⚠️ Prioridad: ${ticketData.priority}
    🏷️ Categoría: ${ticketData.category || 'Sin categoría'}
    👤 Cliente: ${ticketData.user.name}
    📧 Email: ${ticketData.user.email}
    
    📝 DESCRIPCIÓN DEL PROBLEMA:
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ${ticketData.description}
    
    ⚡ ACCIONES RÁPIDAS:
    ━━━━━━━━━━━━━━━━━━━━━
    🔧 Ver en panel: ${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin
    📱 WhatsApp al cliente: https://wa.me/59899252808
    
    ══════════════════════════════════════════════════════
    🛠️ TechFix Uruguay 🇺🇾 - Soporte Técnico Profesional
    📱 WhatsApp: +59899252808 | 📧 techfixuruguay@gmail.com
    🕒 Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay
  `
  
  return { subject, html, text }
}

// Template para nueva cotización
export function newQuoteEmailTemplate(quoteData: any) {
  const subject = `💰 NUEVA COTIZACIÓN - ${quoteData.serviceType} - ${quoteData.name}`
  
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d1b1b 50%, #1a0f0f 75%, #0a0a0a 100%); border-radius: 25px; overflow: hidden; border: 2px solid rgba(255, 107, 53, 0.3);">
      
      <!-- Header con gradiente TechFix -->
      <div style="background: linear-gradient(135deg, #ffa726 0%, #ff7043 100%); color: white; padding: 30px; text-align: center; position: relative;">
        <div style="display: inline-block; background: rgba(255,255,255,0.15); border-radius: 50%; padding: 15px; margin-bottom: 15px; backdrop-filter: blur(10px);">
          💰
        </div>
        <h1 style="margin: 0; font-size: 32px; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">TechFix Uruguay 🇺🇾</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; font-weight: 600; opacity: 0.95;">NUEVA SOLICITUD DE COTIZACIÓN</h2>
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%); pointer-events: none;"></div>
      </div>
      
      <!-- Contenido principal -->
      <div style="padding: 35px; background: linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(45,45,45,0.85) 100%); backdrop-filter: blur(30px);">
        
        <!-- Información de la cotización -->
        <div style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); padding: 25px; border-radius: 20px; margin-bottom: 25px; border: 1px solid rgba(255, 165, 38, 0.2); backdrop-filter: blur(20px);">
          <h3 style="color: #ffa726; margin: 0 0 20px 0; font-size: 20px; font-weight: 700;">💼 Información de la Cotización</h3>
          
          <div style="color: #f0f0f0; line-height: 1.8; font-size: 15px;">
            <p style="margin: 8px 0;"><strong style="color: #ff7043;">🔧 Servicio:</strong> ${quoteData.serviceType}</p>
            <p style="margin: 8px 0;"><strong style="color: #ff7043;">👤 Cliente:</strong> ${quoteData.name}</p>
            <p style="margin: 8px 0;">
              <strong style="color: #ff7043;">📧 Email:</strong> 
              <a href="mailto:${quoteData.email}" style="color: #ffa726; text-decoration: none; font-weight: 600;">
                ${quoteData.email}
              </a>
            </p>
            <p style="margin: 8px 0;"><strong style="color: #ff7043;">📱 Teléfono:</strong> ${quoteData.phone}</p>
            <p style="margin: 8px 0;"><strong style="color: #ff7043;">📅 Fecha:</strong> ${new Date().toLocaleDateString('es-UY')}</p>
          </div>
        </div>
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
