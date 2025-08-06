'use client'

import { MessageCircle, Phone, ExternalLink } from 'lucide-react'

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

// Componente de icono de WhatsApp más realista
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.863 3.687"/>
  </svg>
)

export function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WhatsAppButton
        message="🆘 ¡Hola TechFix Uruguay!

Tengo un problema técnico y necesito ayuda urgente.

¿Pueden asistirme por favor?"
        className="bg-green-500 text-white hover:bg-green-600 shadow-xl rounded-full p-4 pulse-animation hover:shadow-2xl transition-all duration-300"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </WhatsAppButton>
      <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce font-bold">
        SOS
      </div>
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
