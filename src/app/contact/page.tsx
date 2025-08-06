'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, MapPin, Clock, Mail, Phone, Zap } from 'lucide-react'
import { BusinessHours } from '@/components/BusinessHours'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

export default function ContactPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

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
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
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
    <div className="min-h-screen gradient-animated">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-lg rounded-full p-3 mr-3 float-animation shadow-lg border border-white/30">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Contacto - TechFix Uruguay</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-yellow-300 transition-colors font-medium">
                🏠 Inicio
              </Link>
              <Link href="/services" className="text-white hover:text-yellow-300 transition-colors font-medium">
                🔧 Servicios
              </Link>
              <Link href="/quote" className="text-white hover:text-yellow-300 transition-colors font-medium">
                💰 Cotización
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            📞 ¡Contactanos Ahora!
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            🚀 Estamos aquí para resolver todos tus problemas técnicos
            <br />
            <strong>Soporte profesional en Las Piedras y alrededores</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="glass-card-readable p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              🎫 Crear Ticket de Soporte
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 backdrop-blur-lg border border-green-500/30 rounded-lg">
                <p className="text-green-300 font-medium">
                  ✅ ¡Ticket creado exitosamente! Te contactaremos pronto.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-lg">
                <p className="text-red-300 font-medium">
                  ❌ Error al enviar el ticket. Intenta de nuevo o contáctanos por WhatsApp.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    👤 Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre y apellido"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    📱 Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="modern-input"
                    placeholder="099 123 456"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  📧 Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="modern-input"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    📋 Asunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="modern-input"
                    placeholder="Problema con mi computadora"
                  />
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                    🚨 Prioridad
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="modern-input"
                  >
                    <option value="low">🟢 Baja - No es urgente</option>
                    <option value="normal">🟡 Normal - En los próximos días</option>
                    <option value="high">🟠 Alta - Lo antes posible</option>
                    <option value="urgent">🔴 Urgente - ¡Necesito ayuda YA!</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  💬 Describe tu problema *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="modern-input resize-none"
                  placeholder="Describe con detalle el problema que estás experimentando. Incluye cualquier mensaje de error que hayas visto..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern btn-success w-full text-lg py-4 pulse-modern"
              >
                {isSubmitting ? (
                  <>⏳ Enviando...</>
                ) : (
                  <>
                    <Send className="inline w-5 h-5 mr-2" />
                    🚀 Enviar Ticket de Soporte
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            {/* WhatsApp destacado */}
            <div className="glass-effect modern-card text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ¡Contáctanos por WhatsApp!
              </h3>
              <p className="text-white/80 mb-6">
                Respuesta inmediata en horario de atención
              </p>
              <a
                href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
                className="btn-modern bg-green-600 hover:bg-green-700 text-xl px-8 py-4 card-hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                📱 +598 99 252 808
              </a>
            </div>

            {/* Información de contacto */}
            <div className="glass-effect modern-card">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                📞 Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 rounded-lg p-3 mr-4">
                    <Mail className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/80">techfixuruguay@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-500/20 rounded-lg p-3 mr-4">
                    <Phone className="h-6 w-6 text-green-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp / Teléfono</p>
                    <p className="text-white/80">+598 99 252 808</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-500/20 rounded-lg p-3 mr-4">
                    <MapPin className="h-6 w-6 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Área de Servicio</p>
                    <p className="text-white/80">Las Piedras y alrededores</p>
                    <p className="text-sm text-white/60">🚗 Visitas gratuitas en la zona</p>
                    <p className="text-xs text-white/50 italic">Otras zonas: consultá costos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="glass-effect modern-card">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                🕐 Horarios de Atención
              </h3>
              <BusinessHours />
            </div>

            {/* Garantía de servicio */}
            <div className="glass-effect modern-card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Garantía de Respuesta
              </h3>
              <p className="text-white/80">
                📋 Confirmación de recepción inmediata
                <br />
                ⏱️ Respuesta inicial en menos de 2 horas
                <br />
                🏆 95% de satisfacción del cliente
              </p>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFloatingButton />
    </div>
  )
}
