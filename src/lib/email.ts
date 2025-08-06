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
interface TicketData {
  id: string
  title: string
  priority: string
  category?: string | null
  description: string
  user: {
    name: string
    email: string
  }
}

export function newTicketEmailTemplate(ticketData: TicketData) {
  const subject = `Nuevo Ticket de Soporte - ${ticketData.title}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
        <h1>TechFix Uruguay</h1>
        <h2>Nuevo Ticket de Soporte</h2>
      </div>
      
      <div style="padding: 20px; background-color: #f8fafc;">
        <h3 style="color: #1e40af;">Detalles del Ticket:</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">ID del Ticket:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${ticketData.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Título:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${ticketData.title}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Prioridad:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
              <span style="background-color: ${getPriorityColor(ticketData.priority)}; color: white; padding: 4px 8px; border-radius: 4px;">
                ${ticketData.priority}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Categoría:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${ticketData.category || 'Sin categoría'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Cliente:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${ticketData.user.name} (${ticketData.user.email})</td>
          </tr>
        </table>
        
        <h4 style="color: #1e40af;">Descripción:</h4>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
          ${ticketData.description}
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="http://localhost:3000/admin" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Ver en Panel de Administración
          </a>
        </div>
      </div>
      
      <div style="background-color: #374151; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p>TechFix Uruguay - Soporte Técnico Profesional</p>
        <p>WhatsApp: +59899252808 | Email: techfixuruguay@gmail.com</p>
      </div>
    </div>
  `
  
  const text = `
    Nuevo Ticket de Soporte - TechFix Uruguay
    
    ID: ${ticketData.id}
    Título: ${ticketData.title}
    Prioridad: ${ticketData.priority}
    Categoría: ${ticketData.category || 'Sin categoría'}
    Cliente: ${ticketData.user.name} (${ticketData.user.email})
    
    Descripción:
    ${ticketData.description}
    
    Ver en panel: http://localhost:3000/admin
  `
  
  return { subject, html, text }
}

// Template para nueva cotización
interface QuoteData {
  serviceType: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  description: string
  budget?: string | null
}

export function newQuoteEmailTemplate(quoteData: QuoteData) {
  const subject = `Nueva Solicitud de Cotización - ${quoteData.serviceType}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #059669; color: white; padding: 20px; text-align: center;">
        <h1>TechFix Uruguay</h1>
        <h2>Nueva Solicitud de Cotización</h2>
      </div>
      
      <div style="padding: 20px; background-color: #f0fdf4;">
        <h3 style="color: #065f46;">Detalles de la Cotización:</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Nombre:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Empresa:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.company || 'No especificada'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Teléfono:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.phone || 'No especificado'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Servicio:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.serviceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5; font-weight: bold;">Presupuesto:</td>
            <td style="padding: 10px; border-bottom: 1px solid #d1fae5;">${quoteData.budget || 'No especificado'}</td>
          </tr>
        </table>
        
        <h4 style="color: #065f46;">Descripción del Proyecto:</h4>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #059669;">
          ${quoteData.description}
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="http://localhost:3000/admin" 
             style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Ver en Panel de Administración
          </a>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-radius: 5px;">
          <h4 style="color: #065f46; margin: 0 0 10px 0;">Acciones recomendadas:</h4>
          <ul style="margin: 0; color: #047857;">
            <li>Responder en las próximas 2-4 horas</li>
            <li>Llamar al cliente si el presupuesto es alto</li>
            <li>Enviar WhatsApp de confirmación de recepción</li>
          </ul>
        </div>
      </div>
      
      <div style="background-color: #374151; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p>TechFix Uruguay - Soporte Técnico Profesional</p>
        <p>WhatsApp: +59899252808 | Email: techfixuruguay@gmail.com</p>
      </div>
    </div>
  `
  
  return { subject, html }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'URGENT': return '#dc2626'
    case 'HIGH': return '#ea580c'
    case 'MEDIUM': return '#ca8a04'
    case 'LOW': return '#16a34a'
    default: return '#6b7280'
  }
}
