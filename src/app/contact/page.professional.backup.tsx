'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, MapPin, Clock, Mail, Phone, Zap, AlertTriangle, Cpu } from 'lucide-react'
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
        phone: formData.phone ? sanitizers.phone(formData.phone) : '',
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
        
        // Track successful form submission
        track('contact_form_submit', {
          success: true,
          priority: sanitizedData.priority
        })
      } else {
        setSubmitStatus('error')
        setErrors(data.details || [data.error || 'Error al enviar el formulario'])
        
        // Track failed form submission
        track('contact_form_submit', {
          success: false,
          error: data.error
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrors(['Error de conexión. Por favor, intenta de nuevo.'])
      
      // Track connection error
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
              <Link href="/services" className="nav-link">
                Servicios
              </Link>
              <Link href="/quote" className="nav-link">
                Cotización
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
            Contactanos Ahora
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para resolver todos tus problemas técnicos.
            <br />
            Soporte profesional en Las Piedras y alrededores
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="form-professional">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Crear Ticket de Soporte
            </h2>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <p>
                  ✅ ¡Ticket creado exitosamente! Te contactaremos pronto.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="alert alert-error">
                <p>
                  ❌ Error al enviar el ticket. Intenta de nuevo o contáctanos por WhatsApp.
                </p>
              </div>
            )}
            
            {errors.length > 0 && (
              <div className="alert alert-warning">
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Ej: juan@gmail.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ej: 099123456"
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority" className="form-label">
                  Prioridad
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgente</option>
                  <option value="critical">Crítico</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Asunto del problema *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Ej: Mi PC no enciende"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Descripción del problema *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  rows={5}
                  required
                  placeholder="Describe tu problema técnico con el mayor detalle posible..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-professional btn-primary w-full"
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
          <div className="space-y-8">
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
                    href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
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
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Zona de Cobertura
              </h3>
              <div className="space-y-2 text-gray-600">
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

            <div className="professional-card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Horarios de Atención
              </h3>
              <BusinessHours />
            </div>

            <div className="professional-card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Tiempo de Respuesta
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Normal:</span>
                  <span className="font-medium">1-2 horas</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgente:</span>
                  <span className="font-medium text-orange-600">30 minutos</span>
                </div>
                <div className="flex justify-between">
                  <span>Crítico:</span>
                  <span className="font-medium text-red-600">Inmediato</span>
                </div>
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

      {/* WhatsApp flotante */}
      <WhatsAppFloatingButton />
    </div>
  )
}
