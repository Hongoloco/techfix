'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Star, ArrowRight, PhoneCall, Mail, MessageSquare } from 'lucide-react'
import { WhatsAppButton, WhatsAppFloatingButton } from '@/components/WhatsApp'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  features: string[]
  category: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await fetch('/api/admin/services?public=true')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
                href="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contacto
              </Link>
              <Link
                href="/quote"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Servicios de Soporte Técnico
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Soluciones tecnológicas profesionales para empresas uruguayas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center"
            >
              Solicitar Cotización
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <WhatsAppButton
              message="¡Hola TechFix Uruguay! Me interesa conocer sus servicios de soporte técnico."
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 flex items-center justify-center"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              WhatsApp Directo
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones tecnológicas integrales para mantener tu negocio funcionando sin interrupciones
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                Próximamente nuevos servicios
              </h3>
              <p className="text-gray-500">
                Estamos preparando una amplia gama de servicios para ti.
              </p>
              <Link
                href="/quote"
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Solicitar Información
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-blue-600">
                        ${service.price}
                      </span>
                      <span className="text-gray-500 ml-2">
                        / {service.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Incluye:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href={`/quote?service=${encodeURIComponent(service.name)}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Solicitar Cotización
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Más Información
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir TechFix?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Experiencia Comprobada
              </h3>
              <p className="text-gray-600">
                Más de 5 años brindando soluciones tecnológicas a empresas de diversos sectores
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Soporte 24/7
              </h3>
              <p className="text-gray-600">
                Disponibilidad completa para emergencias y soporte continuo para tu negocio
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Respuesta Rápida
              </h3>
              <p className="text-gray-600">
                Tiempo de respuesta garantizado según el nivel de prioridad de tu solicitud
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para mejorar tu infraestructura tecnológica?
          </h2>
          <p className="text-xl mb-8">
            Contacta con nuestros expertos y recibe una cotización personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Solicitar Cotización Gratuita
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechFix Uruguay</h3>
              <p className="text-gray-400">
                Soluciones tecnológicas profesionales para empresas uruguayas
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-white">Todos los Servicios</Link></li>
                <li><Link href="/quote" className="hover:text-white">Cotizaciones</Link></li>
                <li><Link href="/contact" className="hover:text-white">Soporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">
                Email: techfixuruguay@gmail.com<br />
                WhatsApp: +59899252808<br />
                📍 Montevideo, Uruguay
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechFix Uruguay. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  )
}
