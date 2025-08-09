'use client'

import { MessageCircle, Phone, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({ 
  phone = '+59899252808', 
  message = '¡Hola TechFix Uruguay! 👋\n\nMe interesa conocer más sobre sus servicios de soporte técnico.\n\n¿Podrían ayudarme con una consulta?',
  className = '',
  children 
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    // Limpiar el mensaje de caracteres de escape
    const cleanMessage = message.replace(/\\n/g, '\n')
    const encodedMessage = encodeURIComponent(cleanMessage)
    const whatsappUrl = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${className}`}
    >
      {children || (
        <>
          <WhatsAppIcon className="mr-2 h-5 w-5" />
          Contactar por WhatsApp
        </>
      )}
    </button>
  )
}

// Componente de icono de WhatsApp optimizado y moderno
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg 
    className={`${className} transition-all duration-300`}
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 9.98 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z"
      fill="white"
    />
  </svg>
)

export function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WhatsAppButton
        message="¡Hola TechFix Uruguay! 👋

Me interesa conocer más sobre sus servicios de soporte técnico.

¿Podrían ayudarme con una consulta?"
        className="whatsapp-round whatsapp-float"
      >
        <WhatsAppIcon className="h-12 w-12 text-white" />
      </WhatsAppButton>
    </div>
  )
}

interface ContactInfoProps {
  showWhatsApp?: boolean
  showPhone?: boolean
  showEmail?: boolean
  className?: string
}

export function ContactInfo({ 
  showWhatsApp = true, 
  showPhone = true, 
  showEmail = true,
  className = ''
}: ContactInfoProps) {
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+59899252808'
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'techfixuruguay@gmail.com'

  return (
    <div className={`space-y-4 ${className}`}>
      {showPhone && (
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Phone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Teléfono</p>
            <a 
              href={`tel:${businessPhone}`}
              className="text-blue-600 hover:text-blue-700"
            >
              {businessPhone}
            </a>
          </div>
        </div>
      )}

      {showWhatsApp && (
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <WhatsAppIcon className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">WhatsApp</p>
            <WhatsAppButton
              message="¡Hola TechFix Uruguay! 👋

Me interesa conocer más sobre sus servicios de soporte técnico.

¿Podrían ayudarme con una consulta?"
              className="text-green-600 hover:text-green-700 p-0 font-normal"
            >
              <span className="flex items-center">
                {businessPhone}
                <ExternalLink className="ml-1 h-3 w-3" />
              </span>
            </WhatsAppButton>
          </div>
        </div>
      )}

      {showEmail && (
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <a 
              href={`mailto:${businessEmail}`}
              className="text-purple-600 hover:text-purple-700"
            >
              {businessEmail}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook para generar mensajes de WhatsApp personalizados
export function useWhatsAppMessage() {
  const generateTicketMessage = (title: string, priority: string) => {
    return `🔧 *TechFix Uruguay - Nuevo Ticket*

📋 *Título:* ${title}
⚡ *Prioridad:* ${priority}
🕐 *Fecha:* ${new Date().toLocaleDateString('es-UY')}

¡Hola! Acabo de crear un ticket de soporte. ¿Podrían ayudarme?`
  }

  const generateQuoteMessage = (serviceType: string, company?: string) => {
    return `💼 *TechFix Uruguay - Solicitud de Cotización*

🏢 *Empresa:* ${company || 'Particular'}
🛠️ *Servicio:* ${serviceType}
📅 *Fecha:* ${new Date().toLocaleDateString('es-UY')}

¡Hola! Estoy interesado en sus servicios. ¿Podrían enviarme más información?`
  }

  const generateGeneralMessage = () => {
    return `¡Hola TechFix Uruguay! 👋

Me interesa conocer más sobre sus servicios de soporte técnico.

¿Podrían brindarme información?

¡Gracias!`
  }

  return {
    generateTicketMessage,
    generateQuoteMessage,
    generateGeneralMessage
  }
}
