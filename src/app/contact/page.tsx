'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, MapPin, Clock, Mail, Phone, Zap, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { BusinessHours } from '@/components/BusinessHours'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'
import { LoadingSpinner, ButtonLoading } from '@/components/LoadingSpinner'
import { validators, sanitizers } from '@/lib/validation'
import { useAnalytics } from '@/lib/analytics'

export default function ContactPage() {
  const { track } = useAnalytics()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  const validateForm = () => {
    const validationErrors: string[] = []
    
    const nameValidation = validators.name(formData.name)
    if (!nameValidation.isValid) {
      validationErrors.push(...nameValidation.errors)
    }
    
    const emailValidation = validators.email(formData.email)
    if (!emailValidation.isValid) {
      validationErrors.push(...emailValidation.errors)
    }
    
    if (formData.phone) {
      const phoneValidation = validators.phone(formData.phone)
      if (!phoneValidation.isValid) {
        validationErrors.push(...phoneValidation.errors)
      }
    }
    
    const subjectValidation = validators.ticketTitle(formData.subject)
    if (!subjectValidation.isValid) {
      validationErrors.push(...subjectValidation.errors)
    }
    
    const messageValidation = validators.ticketDescription(formData.message)
    if (!messageValidation.isValid) {
      validationErrors.push(...messageValidation.errors)
    }
    
    setErrors(validationErrors)
    return validationErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const sanitizedData = {
        name: sanitizers.name(formData.name),
        email: sanitizers.email(formData.email),
        phone: formData.phone ? sanitizers.phone(formData.phone) : null,
        subject: sanitizers.ticketTitle(formData.subject),
        message: sanitizers.ticketDescription(formData.message),
        priority: formData.priority
      }
      
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          priority: 'normal'
        })
        
        track('contact_form_submit', {
          success: true,
          priority: sanitizedData.priority
        })
      } else {
        setSubmitStatus('error')
        setErrors(data.details || [data.error || 'Error al enviar el formulario'])
        
        track('contact_form_submit', {
          success: false,
          error: data.error
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrors(['Error de conexión. Por favor, intenta de nuevo.'])
      
      track('contact_form_submit', {
        success: false,
        error: 'connection_error'
      })
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

  return (
    <div className="techfix-premium tf-quote-page">
      <header className="tf-nav">
        <Link href="/" className="tf-logo" aria-label="TechFix Uruguay">
          <img src="/techfix-logo.svg" alt="" aria-hidden="true" />
          <span>TechFix</span>
          <i aria-hidden="true">✳︎</i>
        </Link>
        <nav className="tf-nav-links" aria-label="Navegacion principal">
          <Link href="/">Inicio</Link>
          <span>,</span>
          <Link href="/quote">Cotizacion</Link>
          <span>,</span>
          <Link href="/contact">Contacto</Link>
        </nav>
        <a
          href="https://wa.me/59899252808?text=Hola%20TechFix%20Uruguay,%20necesito%20ayuda%20tecnica"
          className="tf-nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escribir ahora
        </a>
      </header>

      <main className="tf-quote-shell">
        {/* Hero Section */}
        <div className="tf-quote-intro">
          <p className="tf-kicker">Contacto</p>
          <h1>Contanos que esta fallando.</h1>
          <p>Creas un ticket o nos escribis por WhatsApp. Te respondemos con el siguiente paso claro.</p>
        </div>

        <div className="tf-quote-layout">
          {/* Formulario de contacto */}
          <div className="tf-quote-form tf-glass-card">
            <h2>
              Crear Ticket de Soporte
            </h2>
            
            {submitStatus === 'success' && (
              <div className="alert-dark alert-success-dark">
                <p>
                  ✅ ¡Ticket creado exitosamente! Te contactaremos pronto.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="alert-dark alert-error-dark">
                <p>
                  ❌ Error al enviar el ticket. Intenta de nuevo o contáctanos por WhatsApp.
                </p>
              </div>
            )}
            
            {errors.length > 0 && (
              <div className="alert-dark alert-warning-dark">
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Ej: juan@gmail.com"
                />
              </div>

              <div className="form-group-dark">
                <label htmlFor="phone" className="form-label-dark">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input-dark"
                  placeholder="Ej: 099123456"
                />
              </div>

              <div className="form-group-dark">
                <label htmlFor="priority" className="form-label-dark">
                  Prioridad
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input-dark form-select-dark"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgente</option>
                  <option value="critical">Crítico</option>
                </select>
              </div>

              <div className="form-group-dark">
                <label htmlFor="subject" className="form-label-dark">
                  Asunto del problema *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input-dark"
                  required
                  placeholder="Ej: Mi PC no enciende"
                />
              </div>

              <div className="form-group-dark">
                <label htmlFor="message" className="form-label-dark">
                  Descripción del problema *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input-dark form-textarea-dark"
                  rows={5}
                  required
                  placeholder="Describe tu problema técnico con el mayor detalle posible..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-dark btn-primary-dark w-full"
              >
                {isSubmitting ? (
                  <ButtonLoading loading={true}>
                    Enviando...
                  </ButtonLoading>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Ticket
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="tf-quote-aside">
            <div className="tf-glass-card">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-cyan-400" />
                Contacto Directo
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">techfixuruguay@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">+598 99 252 808</span>
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark btn-success-dark w-full"
                  >
                    WhatsApp Directo
                  </a>
                </div>
              </div>
            </div>

            <div className="tf-glass-card">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                Zona de Cobertura
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Principal:</strong> Las Piedras</p>
                <p><strong>También atendemos:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Progreso</li>
                  <li>Canelones</li>
                  <li>Montevideo (consultar costo)</li>
                  <li>Otras zonas (consultar disponibilidad)</li>
                </ul>
              </div>
            </div>

            <div className="tf-glass-card">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                Horarios de Atención
              </h3>
              <BusinessHours />
            </div>

            <div className="tf-glass-card">
              <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-cyan-400" />
                Tiempo de Respuesta
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Normal:</span>
                  <span className="font-medium text-cyan-400">1-2 horas</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgente:</span>
                  <span className="font-medium text-orange-400">30 minutos</span>
                </div>
                <div className="flex justify-between">
                  <span>Crítico:</span>
                  <span className="font-medium text-red-400">Inmediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer oscuro */}
      <footer className="footer-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay" 
                width={32} 
                height={32}
                className="mr-3"
              />
              <span className="font-bold text-white">TechFix Uruguay</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 TechFix Uruguay. Todos los derechos reservados.
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Soporte técnico profesional en Las Piedras y alrededores 🇺🇾
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <WhatsAppFloatingButton />
    </div>
  )
}
