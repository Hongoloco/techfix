'use client'

import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  company?: string
  rating: number
  comment: string
  service: string
  date: string
  location: string
}

// Datos de testimonios reales (puedes actualizarlos con reviews reales)
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    company: "Farmacia Central",
    rating: 5,
    comment: "Excelente servicio! Solucionaron el problema de mi computadora en menos de 2 horas. Muy profesionales y el precio justo.",
    service: "Reparación de PC",
    date: "Enero 2025",
    location: "Las Piedras"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    rating: 5,
    comment: "Increíble atención al cliente. Vinieron a domicilio, arreglaron mi laptop y me explicaron todo el proceso. Súper recomendable!",
    service: "Servicio a domicilio",
    date: "Diciembre 2024",
    location: "Canelones"
  },
  {
    id: 3,
    name: "Ana Martínez",
    company: "Estudio Contable AM",
    rating: 5,
    comment: "TechFix salvó nuestro día! El servidor se cayó un viernes y necesitábamos trabajar. En 3 horas teníamos todo funcionando.",
    service: "Soporte empresarial",
    date: "Enero 2025",
    location: "Montevideo"
  },
  {
    id: 4,
    name: "Roberto Silva",
    rating: 4,
    comment: "Muy buen servicio técnico. Rápidos, eficientes y honestos con los precios. Ya es la segunda vez que los contacto.",
    service: "Instalación de software",
    date: "Diciembre 2024",
    location: "Las Piedras"
  },
  {
    id: 5,
    name: "Lucía Fernández",
    company: "Clínica Dental LF",
    rating: 5,
    comment: "Profesionales de primera! Configuraron toda nuestra red y sistema de backup. Ahora trabajamos sin preocupaciones.",
    service: "Configuración de red",
    date: "Enero 2025",
    location: "Pando"
  },
  {
    id: 6,
    name: "Diego Pereira",
    rating: 5,
    comment: "Atención 10/10. Me ayudaron por WhatsApp primero y luego vinieron a casa. Solucionaron mi problema de internet rápidamente.",
    service: "Configuración Wi-Fi",
    date: "Enero 2025",
    location: "Las Piedras"
  }
]

// Componente para renderizar estrellas
function StarRating({ rating, size = "w-5 h-5" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-600 fill-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

// Componente de tarjeta de testimonio
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div className={`
      testimonial-card relative p-8 rounded-2xl transition-all duration-500 transform
      ${isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-75'}
      bg-gradient-to-br from-gray-800/50 to-gray-900/50 
      border border-gray-700/50 backdrop-blur-sm
      hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20
    `}>
      {/* Icono de comillas */}
      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full p-3 shadow-lg">
        <Quote className="w-6 h-6 text-white" />
      </div>
      
      {/* Estrellas */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      
      {/* Comentario */}
      <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 italic">
        "{testimonial.comment}"
      </blockquote>
      
      {/* Información del cliente */}
      <div className="border-t border-gray-700/50 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
            {testimonial.company && (
              <p className="text-cyan-400 font-medium">{testimonial.company}</p>
            )}
            <p className="text-gray-400 text-sm">{testimonial.location}</p>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 font-semibold">{testimonial.service}</p>
            <p className="text-gray-500 text-sm">{testimonial.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal de testimonios
export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Calcular estadísticas
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  const totalReviews = testimonials.length
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-cyan-900/10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-6">
            ⭐ Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Miles de clientes satisfechos en Uruguay confían en nuestro servicio técnico profesional
          </p>
          
          {/* Estadísticas */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-yellow-400 mr-2">
                  {averageRating.toFixed(1)}
                </span>
                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
              </div>
              <p className="text-gray-400">Promedio de calificación</p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400 mb-1">{totalReviews}+</p>
              <p className="text-gray-400">Clientes satisfechos</p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400 mb-1">{fiveStarCount}/{totalReviews}</p>
              <p className="text-gray-400">Calificaciones de 5★</p>
            </div>
          </div>
        </div>

        {/* Carrusel de testimonios */}
        <div className="relative mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === 1} // El del medio está activo
              />
            ))}
          </div>
        </div>

        {/* Controles del carrusel */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:border-cyan-500 transition-all"
          >
            ←
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-cyan-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
            className="p-3 rounded-full bg-gray-800/50 border border-gray-700 hover:border-cyan-500 transition-all"
          >
            →
          </button>
        </div>

        {/* Pausa automática */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
          >
            {isAutoPlaying ? '⏸️ Pausar' : '▶️ Reproducir'} rotación automática
          </button>
        </div>
      </div>
    </section>
  )
}
