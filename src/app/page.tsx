import { Ticket, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">TechFix Support</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/services" className="text-gray-600 hover:text-gray-900">Servicios</Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contacto</Link>
              <Link href="/quote" className="text-blue-600 hover:text-blue-700 font-medium">Cotización</Link>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Iniciar Sesión
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ¿Necesitas ayuda técnica?
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Nuestro equipo de soporte técnico está aquí para ayudarte a resolver cualquier problema. 
            Crea un ticket y recibe asistencia profesional.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Crear Ticket
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/faq"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Ver FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow px-6 py-8">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Soporte 24/7</h3>
              </div>
              <p className="mt-2 text-base text-gray-500">
                Nuestro equipo está disponible las 24 horas para resolver tus problemas técnicos.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow px-6 py-8">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Respuesta Rápida</h3>
              </div>
              <p className="mt-2 text-base text-gray-500">
                Tiempo de respuesta promedio de menos de 2 horas en tickets urgentes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow px-6 py-8">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Soluciones Efectivas</h3>
              </div>
              <p className="mt-2 text-base text-gray-500">
                95% de satisfacción del cliente con nuestras soluciones técnicas.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <h3 className="text-lg font-medium text-gray-900 text-center mb-8">
              Estadísticas de Nuestro Servicio
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">2.5k+</p>
                <p className="text-sm text-gray-500">Tickets Resueltos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">&lt; 2h</p>
                <p className="text-sm text-gray-500">Tiempo de Respuesta</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">95%</p>
                <p className="text-sm text-gray-500">Satisfacción del Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Ticket className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">TechFix Support</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 TechFix Support. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
