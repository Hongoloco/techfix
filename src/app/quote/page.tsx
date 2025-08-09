'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Send, Calculator, Mail, Phone } from 'lucide-react'

function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    description: ''
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
      <div className="dark-layout min-h-screen">
        {/* Header dark */}
        <header className="dark-header border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="logo-dark">
                <Image 
                  src="/techfix-logo.svg" 
                  alt="TechFix Uruguay" 
                  width={48} 
                  height={48}
                  className="logo-icon"
                />
                <span>TechFix Uruguay 🇺🇾</span>
              </Link>
              <nav className="nav-dark hidden md:flex items-center space-x-6">
                <Link href="/" className="nav-link-dark">
                  Inicio
                </Link>
                <Link href="/contact" className="nav-link-dark">
                  Contacto
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
                  Gracias por solicitar una cotización. Te contactaremos dentro de las próximas 2 horas para brindarte una propuesta personalizada.
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
    <div className="dark-layout min-h-screen">
      {/* Header dark */}
      <header className="dark-header border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="logo-dark">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay" 
                width={48} 
                height={48}
                className="logo-icon"
              />
              <span>TechFix Uruguay 🇺🇾</span>
            </Link>
            <nav className="nav-dark hidden md:flex items-center space-x-6">
              <Link href="/" className="nav-link-dark">
                Inicio
              </Link>
              <Link href="/contact" className="nav-link-dark">
                Contacto
              </Link>
              <Link href="/login" className="btn-dark btn-primary-dark">
                Iniciar Sesión
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="hero-title-dark flex items-center justify-center gap-4">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay Logo" 
                width={64} 
                height={64}
                className="logo-icon-large animate-bounce"
              />
              <span className="animate-pulse">Solicitar Cotización</span>
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Obtén una cotización personalizada para tus necesidades técnicas.
            <br />
            <span className="text-purple-400 font-semibold">Respuesta garantizada en menos de 2 horas.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario de cotización */}
          <div className="lg:col-span-2">
            <div className="form-dark glass-effect">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-purple-400" />
                Información del Proyecto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group-dark">
                    <label htmlFor="name" className="form-label-dark">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input-dark"
                      required
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>

                  <div className="form-group-dark">
                    <label htmlFor="email" className="form-label-dark">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input-dark"
                      required
                      placeholder="Ej: juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group-dark">
                    <label htmlFor="company" className="form-label-dark">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input-dark"
                      placeholder="Ej: Mi Empresa SRL"
                    />
                  </div>

                  <div className="form-group-dark">
                    <label htmlFor="phone" className="form-label-dark">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input-dark"
                      required
                      placeholder="Ej: 099123456"
                    />
                  </div>
                </div>

                <div className="form-group-dark">
                  <label htmlFor="serviceType" className="form-label-dark">
                    Tipo de servicio *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="form-input-dark form-select-dark"
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

                <div className="form-group-dark">
                  <label htmlFor="description" className="form-label-dark">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input-dark form-textarea-dark"
                    rows={5}
                    required
                    placeholder="Describe detalladamente qué necesitas, cuántos equipos, ubicación, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-dark btn-primary-dark w-full"
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
            <div className="card-dark glass-effect">
              <h3 className="text-xl font-bold text-white mb-4 glow-text">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></span>
                  <span>Cotizaciones sin compromiso</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></span>
                  <span>Respuesta en menos de 2 horas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></span>
                  <span>Servicio profesional y transparente</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></span>
                  <span>Servicio a domicilio incluido</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></span>
                  <span>Garantía en todos nuestros trabajos</span>
                </li>
              </ul>
            </div>

            <div className="card-dark glass-effect">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-purple-400" />
                Contacto Directo
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-gray-300">techifixuruguay@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-gray-300">+598 99 252 808</span>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0AQuiero%20solicitar%20una%20cotización.%20¿Pueden%20ayudarme?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark btn-success-dark w-full"
                  >
                    WhatsApp Directo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dark-footer mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay" 
                width={32} 
                height={32}
                className="logo-icon mr-3"
              />
              <span className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TechFix Uruguay
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 TechFix Uruguay. Todos los derechos reservados.
            </p>
            <p className="text-sm mt-2 text-gray-500">
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
      <div className="dark-layout min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner-dark"></div>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  )
}
