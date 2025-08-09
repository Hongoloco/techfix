'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Send, Cpu, Calculator, Mail, Phone } from 'lucide-react'

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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="professional-layout">
        {/* Header profesional */}
        <header className="professional-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="logo-professional">
                <Cpu className="h-8 w-8" />
                TechFix Uruguay 🇺🇾
              </Link>
              <nav className="nav-professional hidden md:flex">
                <Link href="/" className="nav-link">
                  Inicio
                </Link>
                <Link href="/contact" className="nav-link">
                  Contacto
                </Link>
                <Link href="/services" className="nav-link">
                  Servicios
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="professional-card max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Cotización Enviada!
                </h1>
                <p className="text-lg text-gray-600">
                  Gracias por solicitar una cotización. Te contactaremos dentro de las próximas 2 horas para brindarte un presupuesto personalizado.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link href="/" className="btn-professional btn-primary w-full">
                  Volver al Inicio
                </Link>
                <Link href="/contact" className="btn-professional btn-secondary w-full">
                  Crear Ticket de Soporte
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="professional-layout">
      {/* Header profesional */}
      <header className="professional-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="logo-professional">
              <Cpu className="h-8 w-8" />
              TechFix Uruguay 🇺🇾
            </Link>
            <nav className="nav-professional hidden md:flex">
              <Link href="/" className="nav-link">
                Inicio
              </Link>
              <Link href="/contact" className="nav-link">
                Contacto
              </Link>
              <Link href="/services" className="nav-link">
                Servicios
              </Link>
              <Link href="/login" className="btn-professional btn-primary">
                Iniciar Sesión
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Solicitar Cotización
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Obtén un presupuesto personalizado para tus necesidades técnicas.
            <br />
            Respuesta garantizada en menos de 2 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario de cotización */}
          <div className="lg:col-span-2">
            <div className="form-professional">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Información del Proyecto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Ej: juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Ej: Mi Empresa SRL"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      required
                      placeholder="Ej: 099123456"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="serviceType" className="form-label">
                    Tipo de servicio *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="form-input form-select"
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="reparacion-pc">Reparación de PC/Laptop</option>
                    <option value="redes">Configuración de Redes</option>
                    <option value="soporte-empresarial">Soporte Empresarial</option>
                    <option value="seguridad">Seguridad Informática</option>
                    <option value="mantenimiento">Mantenimiento Preventivo</option>
                    <option value="consultoria">Consultoría IT</option>
                    <option value="otro">Otro (especificar en descripción)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    rows={5}
                    required
                    placeholder="Describe detalladamente qué necesitas, cuántos equipos, ubicación, etc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget" className="form-label">
                    Presupuesto estimado (opcional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">No tengo presupuesto definido</option>
                    <option value="500-2000">$500 - $2,000</option>
                    <option value="2000-5000">$2,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">Más de $10,000</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-professional btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Solicitar Cotización
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-8">
            <div className="professional-card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Presupuestos sin compromiso</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Respuesta en menos de 2 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Precios competitivos y transparentes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Servicio a domicilio incluido</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Garantía en todos nuestros trabajos</span>
                </li>
              </ul>
            </div>

            <div className="professional-card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Contacto Directo
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-gray-600">techifixuruguay@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-gray-600">+598 99 252 808</span>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0AQuiero%20solicitar%20una%20cotización.%20¿Pueden%20ayudarme?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-professional btn-success w-full"
                  >
                    WhatsApp Directo
                  </a>
                </div>
              </div>
            </div>

            <div className="professional-card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Servicios Populares
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reparación PC</span>
                  <span className="font-medium">Desde $500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Configuración Red</span>
                  <span className="font-medium">Desde $800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mantenimiento</span>
                  <span className="font-medium">Desde $300</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultoría</span>
                  <span className="font-medium">$1200/hora</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Precios orientativos. Cotización final según el caso específico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 mr-2" />
              <span className="font-bold text-white">TechFix Uruguay</span>
            </div>
            <p className="text-sm">
              © 2024 TechFix Uruguay. Todos los derechos reservados.
            </p>
            <p className="text-sm mt-2">
              Soporte técnico profesional en Las Piedras y alrededores 🇺🇾
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="professional-layout">
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner"></div>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  )
}
