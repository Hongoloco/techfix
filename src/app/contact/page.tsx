'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Ticket, ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'
import { WhatsAppButton, ContactInfo, WhatsAppFloatingButton } from '@/components/WhatsApp'
import { BusinessHours, AfterHoursModal, useBusinessHours } from '@/components/BusinessHours'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    priority: 'MEDIUM',
    category: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { showModal, handleCloseModal } = useBusinessHours()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error al enviar el ticket. Por favor intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el ticket. Por favor intenta nuevamente.')
    }

    setIsLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Ticket Creado Exitosamente! ✅</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold mb-2">
                Tu solicitud ha sido enviada a: <strong>techfixuruguay@gmail.com</strong>
              </p>
              <p className="text-green-700 text-sm">
                Título: "{formData.title}"
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">⏰ ¿Qué sigue ahora?</h3>
              <ul className="text-left text-blue-800 text-sm space-y-2">
                <li>• Recibirás una confirmación por email</li>
                <li>• Te contactaremos en horario de atención (10:00 - 20:00)</li>
                <li>• Para urgencias, contáctanos por WhatsApp</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <WhatsAppButton
              message={`🆘 ¡Hola TechFix Uruguay!\n\nAcabo de crear un ticket: "${formData.title}"\n\n¿Es posible una consulta rápida por WhatsApp?`}
              className="w-full bg-green-500 text-white hover:bg-green-600 py-3 mb-4"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp - URGENTE
            </WhatsAppButton>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Volver al Inicio
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Crear Otro Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                TechFix Uruguay
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Servicios
              </Link>
              <Link
                href="/quote"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Cotización
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛠️ Contacto y Soporte Técnico
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes un problema técnico? Estamos aquí para ayudarte. Elige la opción que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Opciones de contacto principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* WhatsApp - Contacto inmediato */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white text-center transform hover:scale-105 transition-transform">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">💬 WhatsApp</h3>
            <p className="text-green-100 mb-2">+59899252808</p>
            <p className="text-sm text-green-100 mb-6">Respuesta inmediata en horario de atención</p>
            <WhatsAppButton 
              className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3"
              message="🛠️ ¡Hola TechFix Uruguay!\n\nNecesito ayuda con un problema técnico.\n\n¿Pueden asistirme?"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chatear Ahora
            </WhatsAppButton>
            <div className="mt-3 text-xs text-green-100">
              ⏰ Lun-Vie: 10:00-20:00
            </div>
          </div>

          {/* Ticket de Soporte */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center transform hover:scale-105 transition-transform">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">🎫 Crear Ticket</h3>
            <p className="text-blue-100 mb-2">Soporte estructurado</p>
            <p className="text-sm text-blue-100 mb-6">Describe tu problema con detalles y te ayudaremos</p>
            <button 
              onClick={() => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition-colors"
            >
              <Ticket className="w-5 h-5 mr-2 inline" />
              Crear Ticket
            </button>
            <div className="mt-3 text-xs text-blue-100">
              📧 Respuesta en 24-48 horas
            </div>
          </div>

          {/* Email directo */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center transform hover:scale-105 transition-transform">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">📧 Email Directo</h3>
            <p className="text-purple-100 mb-2">techfixuruguay@gmail.com</p>
            <p className="text-sm text-purple-100 mb-6">Para consultas generales y presupuestos</p>
            <a 
              href="mailto:techfixuruguay@gmail.com?subject=Consulta Técnica - TechFix Uruguay"
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition-colors inline-block"
            >
              <Mail className="w-5 h-5 mr-2 inline" />
              Enviar Email
            </a>
            <div className="mt-3 text-xs text-purple-100">
              📝 Respuesta en 24-48 horas
            </div>
          </div>
        </div>

        {/* Información de empresa */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg p-8 mb-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <h4 className="font-bold mb-2">📍 Ubicación</h4>
              <p className="text-gray-300">Las Piedras, Uruguay</p>
              <p className="text-sm text-gray-400 mt-1">Visitas técnicas gratuitas en la zona</p>
            </div>
            <div>
              <Clock className="h-8 w-8 mx-auto mb-3 text-green-400" />
              <h4 className="font-bold mb-2">🕒 Horarios</h4>
              <p className="text-gray-300">Lunes a Viernes</p>
              <p className="text-sm text-gray-400 mt-1">10:00 - 20:00</p>
            </div>
            <div>
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <h4 className="font-bold mb-2">🇺🇾 Empresa Local</h4>
              <p className="text-gray-300">Soporte en español</p>
              <p className="text-sm text-gray-400 mt-1">Atención personalizada uruguaya</p>
            </div>
          </div>
        </div>

        {/* Formulario de ticket de soporte */}
        <div id="ticket-form" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">🎫 Crear Ticket de Soporte</h2>
              <p className="text-blue-100">
                Completa el formulario con los detalles de tu problema técnico
              </p>
            </div>

            <div className="p-8">
              {/* Estado del negocio */}
              <div className="mb-8">
                <BusinessHours />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información personal */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Información de Contacto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles del problema */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                    Detalles del Problema
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Título del problema *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: La computadora se cuelga al iniciar"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                          Prioridad *
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="LOW">🟢 Baja - No es urgente</option>
                          <option value="MEDIUM">🟡 Media - Problema moderado</option>
                          <option value="HIGH">🟠 Alta - Necesito ayuda pronto</option>
                          <option value="URGENT">🔴 Urgente - No puedo trabajar</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                          Categoría
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Seleccionar categoría</option>
                          <option value="Hardware">🔧 Hardware (PC, impresora, etc.)</option>
                          <option value="Software">💻 Software (programas, sistema)</option>
                          <option value="Red">🌐 Red/Internet (WiFi, conexión)</option>
                          <option value="Email">📧 Email (Outlook, Gmail, etc.)</option>
                          <option value="Seguridad">🔒 Seguridad (virus, antivirus)</option>
                          <option value="Otro">❓ Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción detallada del problema *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe lo más detalladamente posible:
• ¿Qué estabas haciendo cuando ocurrió?
• ¿Qué mensaje de error aparece?
• ¿Cuándo comenzó el problema?
• ¿Has probado algo para solucionarlo?"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Ticket className="w-5 h-5 mr-2" />
                          Crear Ticket de Soporte
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-3">¿Necesitas ayuda inmediata?</p>
                      <WhatsAppButton
                        message="🆘 ¡Hola TechFix Uruguay!\n\nTengo un problema técnico urgente y necesito ayuda inmediata.\n\n¿Pueden asistirme por favor?"
                        className="w-full bg-green-500 text-white hover:bg-green-600 py-3 font-semibold"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        💬 Contactar por WhatsApp - URGENTE
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ventajas del servicio */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🏆 ¿Por qué elegir TechFix Uruguay?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">🆓 Visitas técnicas gratuitas</h4>
                    <p className="text-gray-600 text-sm">En Las Piedras y alrededores, sin costo adicional</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">🇺🇾 Atención local en español</h4>
                    <p className="text-gray-600 text-sm">Empresa uruguaya con entendimiento local</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">⚡ Respuesta rápida</h4>
                    <p className="text-gray-600 text-sm">WhatsApp inmediato, emails en 24-48 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">🔧 Soporte integral</h4>
                    <p className="text-gray-600 text-sm">Hardware, software, redes y más</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de contacto resumida */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                📞 Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">WhatsApp</h4>
                  <p className="text-gray-600 mb-3">+59899252808</p>
                  <WhatsAppButton 
                    className="bg-green-500 text-white hover:bg-green-600 px-6 py-2"
                    message="¡Hola TechFix Uruguay! 👋\n\nMe interesa conocer más sobre sus servicios.\n\n¿Podrían ayudarme?"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chatear ahora
                  </WhatsAppButton>
                </div>

                <div className="border-t pt-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Email</h4>
                    <a 
                      href="mailto:techfixuruguay@gmail.com"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      techfixuruguay@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-gray-600" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Horarios</h4>
                    <p className="text-gray-600">Lunes a Viernes</p>
                    <p className="text-gray-600">10:00 - 20:00</p>
                    <p className="text-sm text-gray-500 mt-2">Las Piedras, Uruguay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de horarios */}
      <AfterHoursModal isOpen={showModal} onClose={handleCloseModal} />

      {/* Botón flotante de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  )
}
