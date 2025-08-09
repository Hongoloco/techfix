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

// Componente de icono de WhatsApp oficial usando PNG
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <Image
    src="/whatsapp-logo.png"
    alt="WhatsApp"
    width={24}
    height={24}
    className={className}
  />
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
        <WhatsAppIcon className="h-8 w-8 text-white" />
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
