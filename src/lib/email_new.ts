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
    // Verificar si hay configuración SMTP
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('⚠️ SMTP no configurado. Email simulado:', {
        to: options.to,
        subject: options.subject,
        preview: options.text?.substring(0, 100) + '...'
      })
      return { success: true, messageId: 'simulated-' + Date.now() }
    }

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
  // ⚠️ DEBUG: Verificar datos del cliente
  console.log('='.repeat(50));
  console.log('🔍 DEBUG EMAIL TEMPLATE:');
  console.log('ticketData.id:', ticketData.id);
  console.log('ticketData.client existe:', !!ticketData.client);
  if (ticketData.client) {
    console.log('ticketData.client.name:', ticketData.client.name);
    console.log('ticketData.client.email:', ticketData.client.email);
    console.log('ticketData.client.phone:', ticketData.client.phone);
  } else {
    console.log('❌ ticketData.client es null/undefined');
  }
  console.log('='.repeat(50));
  
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

        <!-- Card de acciones rápidas con WhatsApp más prominente -->
        <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 25px; text-align: center; position: relative; backdrop-filter: blur(10px);">
          <h3 style="margin: 0 0 25px 0; color: #F59E0B; font-size: 20px; font-weight: 800;">⚡ ACCIONES RÁPIDAS</h3>
          
          <!-- Botón principal de WhatsApp MÁS GRANDE Y VISIBLE -->
          ${ticketData.client?.phone ? `
          <div style="margin-bottom: 25px;">
            <a href="https://wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(ticketData.client.name || ticketData.user.name)}!%20Recibimos%20tu%20ticket%20%23${ticketData.id}%20-%20${encodeURIComponent(ticketData.title)}.%20Estamos%20revisando%20tu%20solicitud%20y%20te%20contactaremos%20pronto." 
               style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%); color: white; padding: 25px 50px; text-decoration: none; border-radius: 20px; font-weight: 900; font-size: 22px; box-shadow: 0 15px 30px rgba(37, 211, 102, 0.6); transition: all 0.3s ease; border: 4px solid rgba(255, 255, 255, 0.4); min-width: 350px; position: relative; overflow: hidden; text-transform: uppercase; letter-spacing: 1px; transform: scale(1); animation: pulse 2s infinite;">
              <span style="font-size: 32px; margin-right: 18px; vertical-align: middle; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));">📱</span>
              <span style="vertical-align: middle; text-shadow: 0 3px 6px rgba(0,0,0,0.4);">WhatsApp Directo</span>
            </a>
          </div>
          <div style="background: rgba(16, 185, 129, 0.15); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 14px; padding: 15px 25px; margin: 20px auto; max-width: 380px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);">
            <p style="margin: 0; color: #10B981; font-size: 16px; font-weight: 700;">
              💬 Contacto directo con ${ticketData.client.name || ticketData.user.name}
            </p>
            <p style="margin: 6px 0 0 0; color: #6EE7B7; font-size: 14px; font-weight: 600;">
              📞 ${ticketData.client.phone}
            </p>
          </div>
          ` : `
          <div style="margin-bottom: 25px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%); color: white; padding: 25px 50px; border-radius: 20px; font-weight: 900; font-size: 22px; opacity: 0.7; min-width: 350px; border: 4px solid rgba(255, 255, 255, 0.1); text-transform: uppercase; letter-spacing: 1px;">
              <span style="font-size: 32px; margin-right: 18px; vertical-align: middle;">📱</span>
              <span style="vertical-align: middle;">Sin WhatsApp</span>
            </div>
          </div>
          <div style="background: rgba(156, 163, 175, 0.15); border: 2px solid rgba(156, 163, 175, 0.4); border-radius: 14px; padding: 15px 25px; margin: 20px auto; max-width: 380px;">
            <p style="margin: 0; color: #9CA3AF; font-size: 16px; font-weight: 700;">
              ⚠️ No hay teléfono disponible
            </p>
            <p style="margin: 6px 0 0 0; color: #6B7280; font-size: 14px;">
              El cliente no proporcionó número de WhatsApp
            </p>
          </div>
          `}
          
          <!-- Botones secundarios responsive -->
          <div style="display: flex; gap: 15px; justify-content: center; align-items: center; flex-wrap: wrap; margin-top: 25px;">
            <a href="tel:59899252808" 
               style="display: inline-block; background: linear-gradient(135deg, #374151 0%, #4B5563 100%); color: white; padding: 16px 28px; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(55, 65, 81, 0.5); border: 2px solid #6B7280; transition: all 0.3s ease; min-width: 180px; text-align: center;">
              <span style="font-size: 18px; margin-right: 10px;">📞</span>Llamar Oficina
            </a>
            <a href="mailto:techfixuruguay@gmail.com?subject=Ticket%20%23${ticketData.id}%20-%20${encodeURIComponent(ticketData.title)}" 
               style="display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white; padding: 16px 28px; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(6, 182, 212, 0.5); transition: all 0.3s ease; min-width: 180px; text-align: center;">
              <span style="font-size: 18px; margin-right: 10px;">📧</span>Email Directo
            </a>
          </div>
          
          <!-- Mensaje para móvil -->
          <div style="margin-top: 25px; padding: 18px; background: rgba(6, 182, 212, 0.08); border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 14px;">
            <p style="margin: 0; color: #22D3EE; font-size: 15px; font-weight: 700; text-align: center;">
              📱 Optimizado para móvil y desktop - Los botones se adaptan automáticamente
            </p>
          </div>
        </div>
      </div>
      
      <!-- Footer oscuro como la web -->
      <div style="background: #374151; color: #D1D5DB; padding: 25px; text-align: center; border-top: 1px solid #4B5563;">
        <h3 style="margin: 0 0 15px 0; color: #22D3EE; font-size: 18px; font-weight: 800;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 10px; flex-wrap: wrap;">
          <span style="color: #F59E0B; font-weight: 600;">🏢 Oficina: +59899252808</span>
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

// Template para email de resolución con solicitud de calificación
export function ticketResolvedEmailTemplate(ticketData: any) {
  const subject = `✅ TICKET RESUELTO #${ticketData.id} - ${ticketData.title} - ¡Califica nuestro servicio!`
  
  const clientName = ticketData.client?.name || ticketData.user?.name || 'Cliente';
  const clientEmail = ticketData.client?.email || ticketData.user?.email || '';
  const ratingUrl = `${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/rate?ticket=${ticketData.id}&email=${encodeURIComponent(clientEmail)}&name=${encodeURIComponent(clientName)}`;
  
  const html = `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; background: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4);">
      <!-- Header con gradiente cyan como la web -->
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%); pointer-events: none;"></div>
        <h1 style="margin: 0; font-size: 32px; font-weight: 900; position: relative; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);">🛠️ TechFix Uruguay 🇺🇾</h1>
        <h2 style="margin: 12px 0 0 0; font-size: 20px; font-weight: 600; opacity: 0.95; position: relative;">✅ TICKET RESUELTO</h2>
      </div>
      
      <!-- Contenido principal con fondo oscuro -->
      <div style="padding: 30px; background: #1F2937; position: relative;">
        <!-- Efectos de fondo como la web -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%); pointer-events: none;"></div>
        
        <!-- Mensaje de resolución -->
        <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 16px; padding: 25px; margin-bottom: 25px; text-align: center; position: relative;">
          <div style="font-size: 64px; margin-bottom: 15px;">🎉</div>
          <h3 style="margin: 0 0 15px 0; color: #10B981; font-size: 24px; font-weight: 800;">¡Hola ${clientName}!</h3>
          <p style="margin: 0; color: #D1F2EB; font-size: 18px; font-weight: 600; line-height: 1.6;">
            Tu ticket <strong style="color: #6EE7B7;">#${ticketData.id}</strong> ha sido resuelto exitosamente.
          </p>
        </div>
        
        <!-- Card de información del ticket -->
        <div style="background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(20px); border: 1px solid #374151; border-radius: 16px; padding: 25px; margin-bottom: 30px; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);">
          <h3 style="margin: 0 0 20px 0; color: #22D3EE; font-size: 18px; font-weight: 700; border-bottom: 2px solid #374151; padding-bottom: 10px;">📋 Resumen del Ticket</h3>
          <div style="display: grid; gap: 12px;">
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #06B6D4;">🆔 ID:</strong> <span style="background: linear-gradient(135deg, #06B6D4, #22D3EE); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 16px;">#${ticketData.id}</span></p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;"><strong style="color: #06B6D4;">📋 Título:</strong> ${ticketData.title}</p>
            <p style="margin: 0; color: #F9FAFB; font-size: 15px; line-height: 1.6;">
              <strong style="color: #06B6D4;">✅ Estado:</strong> 
              <span style="background-color: #10B981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                RESUELTO
              </span>
            </p>
          </div>
        </div>
        
        <!-- Llamada a la acción principal: Calificación -->
        <div style="background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%); border-radius: 20px; padding: 40px; text-align: center; margin: 30px 0; position: relative; overflow: hidden; border: 3px solid rgba(255, 255, 255, 0.2);">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 60%); pointer-events: none;"></div>
          <div style="position: relative;">
            <div style="font-size: 48px; margin-bottom: 20px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">⭐</div>
            <h3 style="margin: 0 0 20px 0; color: white; font-size: 26px; font-weight: 900; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              ¡Califica nuestro servicio!
            </h3>
            <p style="margin: 0 0 30px 0; color: rgba(255, 255, 255, 0.9); font-size: 18px; font-weight: 600; line-height: 1.6;">
              Tu opinión es muy importante para nosotros.<br>
              ¿Cómo fue tu experiencia con TechFix?
            </p>
            <a href="${ratingUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; padding: 20px 40px; text-decoration: none; border-radius: 15px; font-weight: 900; font-size: 20px; box-shadow: 0 12px 24px rgba(239, 68, 68, 0.4); transition: all 0.3s ease; border: 3px solid rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              <span style="font-size: 24px; margin-right: 12px; vertical-align: middle;">⭐</span>
              <span style="vertical-align: middle;">CALIFICAR AHORA</span>
            </a>
            <p style="margin: 20px 0 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; font-weight: 500;">
              Solo te tomará 2 minutos y nos ayuda muchísimo
            </p>
          </div>
        </div>
        
        <!-- Contacto directo -->
        <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 25px; text-align: center; position: relative; backdrop-filter: blur(10px); margin-bottom: 25px;">
          <h3 style="margin: 0 0 20px 0; color: #F59E0B; font-size: 18px; font-weight: 800;">💬 ¿Necesitas algo más?</h3>
          <div style="display: flex; gap: 15px; justify-content: center; align-items: center; flex-wrap: wrap;">
            <a href="https://wa.me/59899252808?text=Hola%20TechFix!%20Mi%20ticket%20%23${ticketData.id}%20fue%20resuelto.%20Tengo%20una%20consulta..." 
               style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4); transition: all 0.3s ease; min-width: 160px; text-align: center;">
              <span style="font-size: 18px; margin-right: 8px;">📱</span>WhatsApp
            </a>
            <a href="mailto:techfixuruguay@gmail.com?subject=Consulta%20sobre%20ticket%20%23${ticketData.id}" 
               style="display: inline-block; background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); color: white; padding: 15px 25px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4); transition: all 0.3s ease; min-width: 160px; text-align: center;">
              <span style="font-size: 18px; margin-right: 8px;">📧</span>Email
            </a>
          </div>
        </div>
        
        <!-- Mensaje de agradecimiento -->
        <div style="background: rgba(17, 24, 39, 0.8); border: 1px solid #374151; border-radius: 16px; padding: 25px; text-align: center; position: relative;">
          <p style="margin: 0; color: #D1D5DB; font-size: 16px; line-height: 1.7;">
            <strong style="color: #22D3EE;">¡Gracias por confiar en TechFix Uruguay!</strong><br>
            Esperamos haber superado tus expectativas y estar aquí para ayudarte cuando nos necesites.
          </p>
        </div>
      </div>
      
      <!-- Footer oscuro como la web -->
      <div style="background: #374151; color: #D1D5DB; padding: 25px; text-align: center; border-top: 1px solid #4B5563;">
        <h3 style="margin: 0 0 15px 0; color: #22D3EE; font-size: 18px; font-weight: 800;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 10px; flex-wrap: wrap;">
          <span style="color: #F59E0B; font-weight: 600;">🏢 Oficina: +59899252808</span>
          <span style="color: #06B6D4; font-weight: 600;">📧 Email: techfixuruguay@gmail.com</span>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #9CA3AF;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
      </div>
    </div>
  `
  
  const text = `
    ✅ TICKET RESUELTO #${ticketData.id} - ${ticketData.title}
    
    ¡Hola ${clientName}!
    
    Tu ticket #${ticketData.id} ha sido resuelto exitosamente.
    
    ¡Califica nuestro servicio!
    Tu opinión es muy importante para nosotros.
    ${ratingUrl}
    
    ¿Necesitas algo más?
    WhatsApp: https://wa.me/59899252808
    Email: techfixuruguay@gmail.com
    
    ¡Gracias por confiar en TechFix Uruguay!
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
          <p><strong>👤 Cliente:</strong> ${quoteData.name}</p>
          <p><strong>📧 Email:</strong> ${quoteData.email}</p>
          <p><strong>🏢 Empresa:</strong> ${quoteData.company || 'No especificada'}</p>
          <p><strong>📱 Teléfono:</strong> ${quoteData.phone || 'No proporcionado'}</p>
          <p><strong>🔧 Tipo de Servicio:</strong> ${quoteData.serviceType}</p>
          <p><strong>💰 Presupuesto:</strong> ${quoteData.budget || 'No especificado'}</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3>📝 Descripción:</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb;">
            ${quoteData.description.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin" 
             style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            💼 VER EN PANEL DE ADMINISTRACIÓN
          </a>
        </div>
      </div>
      
      <div style="background-color: #374151; color: white; padding: 20px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">🛠️ TechFix Uruguay - Soporte Técnico Profesional</h3>
        <p style="margin: 5px 0;">🏢 Oficina: +59899252808 | 📧 Email: techfixuruguay@gmail.com</p>
        <p style="margin: 5px 0; font-size: 12px;">🕒 Horario: Lunes a Viernes 10:00 - 20:00 | 📍 Las Piedras, Uruguay</p>
      </div>
    </div>
  `
  
  const text = `
    💰 NUEVA COTIZACIÓN - ${quoteData.serviceType} - ${quoteData.name}
    
    Cliente: ${quoteData.name} (${quoteData.email})
    Empresa: ${quoteData.company || 'No especificada'}
    Teléfono: ${quoteData.phone || 'No proporcionado'}
    Tipo de Servicio: ${quoteData.serviceType}
    Presupuesto: ${quoteData.budget || 'No especificado'}
    
    Descripción:
    ${quoteData.description}
    
    Ver en panel: ${process.env.SITE_URL || 'https://techfix-pi.vercel.app'}/admin
  `
  
  return { subject, html, text }
}
