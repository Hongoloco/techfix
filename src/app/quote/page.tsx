'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Send } from 'lucide-react'

function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    description: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const service = searchParams.get('service')
    if (service) {
      setFormData(prev => ({ ...prev, serviceType: service }))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error al enviar la cotización. Por favor intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Error al enviar la cotización. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Cotización Enviada!
            </h2>
            <p className="text-gray-600">
              Hemos recibido tu solicitud de cotización. Nuestro equipo te contactará en las próximas 24 horas.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              href="/services"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Otros Servicios
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-animated">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-white hover:text-yellow-300 transition-colors mr-4">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-white">Solicitar Cotización</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-yellow-300 transition-colors font-medium">
                🏠 Inicio
              </Link>
              <Link href="/services" className="text-white hover:text-yellow-300 transition-colors font-medium">
                🔧 Servicios
              </Link>
              <Link href="/contact" className="text-white hover:text-yellow-300 transition-colors font-medium">
                📞 Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Servicios
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Solicitar Cotización
          </h1>
          <p className="text-lg text-gray-600">
            Completa el formulario y nuestro equipo te contactará con una propuesta personalizada
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de servicio *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un servicio</option>
                <option value="Soporte Técnico General">Soporte Técnico General</option>
                <option value="Mantenimiento de Redes">Mantenimiento de Redes</option>
                <option value="Consultoría en TI">Consultoría en TI</option>
                <option value="Seguridad Informática">Seguridad Informática</option>
                <option value="Migración de Datos">Migración de Datos</option>
                <option value="Respaldo y Recuperación">Respaldo y Recuperación</option>
                <option value="Desarrollo de Software">Desarrollo de Software</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del proyecto *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe detalladamente qué necesitas, el alcance del proyecto, requisitos específicos, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Presupuesto estimado
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un rango</option>
                <option value="Menos de $1,000">Menos de $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="Más de $25,000">Más de $25,000</option>
                <option value="Por definir">Por definir</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                ¿Qué sucede después?
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Revisaremos tu solicitud en menos de 24 horas</li>
                <li>• Te contactaremos para discutir los detalles</li>
                <li>• Prepararemos una propuesta personalizada</li>
                <li>• Programaremos una reunión si es necesario</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </>
                )}
              </button>
              <Link
                href="/contact"
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                ¿Prefieres llamarnos?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <QuoteForm />
    </Suspense>
  )
}
