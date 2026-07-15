'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Calculator, Mail, Phone, Send } from 'lucide-react'
import { useToast } from '@/components/Toast'

const whatsappHref = 'https://wa.me/59899252808?text=Hola%20TechFix%20Uruguay,%20quiero%20armar%20un%20presupuesto'

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
  const [errors, setErrors] = useState<string[]>([])

  const { showToast, ToastComponent } = useToast()
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
    setErrors([])

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        showToast('¡Cotización enviada exitosamente! Te contactaremos pronto.', 'success')
      } else {
        // Manejo específico de errores
        if (response.status === 400 && data.details) {
          // Errores de validación
          const errorMessages = Object.values(data.details).flat() as string[]
          setErrors(errorMessages)
          showToast('Por favor corrige los errores en el formulario', 'error')
        } else if (response.status === 500) {
          showToast('Error del servidor. Por favor intenta más tarde.', 'error')
        } else {
          showToast(data.error || 'Error al enviar la cotización. Por favor intenta nuevamente.', 'error')
        }
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      showToast('Error de conexión. Verifica tu internet e intenta nuevamente.', 'error')
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
      <div className="techfix-premium tf-quote-page">
        <header className="tf-nav">
          <Link href="/" className="tf-logo" aria-label="TechFix Uruguay">
            <span>TechFix</span>
            <i aria-hidden="true">✳︎</i>
          </Link>
          <nav className="tf-nav-links" aria-label="Navegacion principal">
            <Link href="/">Inicio</Link>
            <span>,</span>
            <Link href="/contact">Contacto</Link>
          </nav>
          <a href={whatsappHref} className="tf-nav-cta" target="_blank" rel="noopener noreferrer">
            Consultar soporte
          </a>
        </header>

        <main className="tf-quote-shell">
          <div className="tf-quote-success tf-glass-card">
            <Calculator className="h-10 w-10" />
            <h1>Cotizacion enviada.</h1>
            <p>
              Gracias. Te contactamos para revisar el caso y pasarte una propuesta clara.
            </p>
            <div className="tf-actions">
              <Link href="/" className="tf-main-button">
                Volver al inicio
              </Link>
              <Link href="/contact" className="tf-outline-button">
                Crear ticket
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="techfix-premium tf-quote-page">
      <header className="tf-nav">
        <Link href="/" className="tf-logo" aria-label="TechFix Uruguay">
          <span>TechFix</span>
          <i aria-hidden="true">✳︎</i>
        </Link>
        <nav className="tf-nav-links" aria-label="Navegacion principal">
          <Link href="/">Inicio</Link>
          <span>,</span>
          <Link href="/contact">Contacto</Link>
        </nav>
        <a href={whatsappHref} className="tf-nav-cta" target="_blank" rel="noopener noreferrer">
          Consultar soporte
        </a>
      </header>

      <main className="tf-quote-shell">
        <section className="tf-quote-intro">
          <p className="tf-kicker">Cotizacion</p>
          <h1>Armemos un presupuesto sin vueltas.</h1>
          <p>
            Contame que equipo, red o servicio necesitas resolver. Con esos datos te respondemos con
            una ruta clara y un presupuesto acorde al caso.
          </p>
        </section>

        <div className="tf-quote-layout">
          <div className="tf-quote-form tf-glass-card">
            <h2>
              <Calculator className="h-6 w-6" />
              Datos para cotizar
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
                    placeholder="Ej: Juan Perez"
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

                {/* Mostrar errores de validación */}
                {errors.length > 0 && (
                  <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">Por favor corrige los siguientes errores:</h4>
                    <ul className="text-red-300 text-sm space-y-1">
                      {errors.map((error, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="tf-main-button w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar solicitud
                    </>
                  )}
                </button>
              </form>
          </div>

          <aside className="tf-quote-aside">
            <div className="tf-glass-card">
              <h3>Que pasa despues</h3>
              <ul>
                <li>Cotizacion sin compromiso.</li>
                <li>Respuesta directa por WhatsApp o email.</li>
                <li>Presupuesto claro antes de coordinar.</li>
                <li>Soporte remoto o presencial segun el caso.</li>
              </ul>
            </div>

            <div className="tf-glass-card">
              <h3>Contacto directo</h3>
              <p>
                <Mail className="h-4 w-4" />
                techfixuruguay@gmail.com
              </p>
              <p>
                <Phone className="h-4 w-4" />
                +598 99 252 808
              </p>
              <a href={whatsappHref} className="tf-main-button" target="_blank" rel="noopener noreferrer">
                Consultar soporte
              </a>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Toast notifications */}
      {ToastComponent}
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
