'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Ticket, ArrowLeft, MapPin } from 'lucide-react'
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
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <Ticket className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Ticket Creado!</h2>
            <p className="text-gray-600">
              Hemos recibido tu solicitud de soporte. Te contactaremos dentro de nuestro horario de atención.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Volver al Inicio
            </Link>
            <WhatsAppButton
              message={`¡Hola TechFix Uruguay! Acabo de crear un ticket: "${formData.title}". ¿Podrían confirmar que lo recibieron?`}
              className="w-full bg-green-500 text-white hover:bg-green-600"
            />
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
                href="/faq"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                FAQ
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Contacto y Soporte
          </h1>
          <p className="text-lg text-gray-600">
            ¿Necesitas ayuda? Estamos aquí para resolver tus problemas técnicos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Crear Ticket de Soporte</h2>
              <p className="mt-2 text-gray-600">
                Describe tu problema y nuestro equipo te ayudará a resolverlo
              </p>
            </div>

            {/* Estado del negocio */}
            <div className="mb-6">
              <BusinessHours />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título del problema *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe brevemente el problema"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Prioridad
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="LOW">Baja</option>
                    <option value="MEDIUM">Media</option>
                    <option value="HIGH">Alta</option>
                    <option value="URGENT">Urgente</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Red">Red/Internet</option>
                    <option value="Email">Email</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción detallada *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe detalladamente el problema, cuándo ocurrió, qué estabas haciendo, mensajes de error, etc."
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enviando...' : 'Crear Ticket'}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">¿Necesitas ayuda inmediata?</p>
                  <WhatsAppButton
                    message="¡Hola TechFix Uruguay! Necesito ayuda técnica urgente."
                    className="bg-green-500 text-white hover:bg-green-600 w-full"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Información de contacto
              </h3>
              <ContactInfo />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Ubicación y cobertura
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ubicación</p>
                    <p className="text-gray-600">Las Piedras, Uruguay</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Visitas técnicas gratuitas</p>
                    <p className="text-gray-600">Las Piedras y alrededores</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🆓 Visitas sin costo</h4>
                  <p className="text-green-700 text-sm">
                    Ofrecemos visitas técnicas gratuitas en Las Piedras y zonas aledañas. 
                    Para otras ubicaciones, consulte sin compromiso.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">🇺🇾 Soporte local en Uruguay</h4>
              <p className="text-blue-700 text-sm">
                Somos una empresa uruguaya especializada en soporte técnico. 
                Entendemos las necesidades locales y ofrecemos atención personalizada en español.
                <br /><br />
                <strong>Consulte sin compromiso</strong> - Estamos aquí para ayudarte a resolver cualquier problema técnico.
              </p>
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
