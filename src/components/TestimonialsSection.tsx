'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  createdAt: string;
  featured: boolean;
}

function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 transition-all duration-300 ${
            star <= rating 
              ? 'text-yellow-400 fill-current animate-pulse' 
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-UY', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`
      bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
      transition-all duration-500 hover:bg-gray-800/90 hover:border-cyan-500/30
      hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:scale-[1.02]
      relative overflow-hidden group cursor-pointer
      ${isActive ? 'ring-2 ring-cyan-500/50 shadow-xl shadow-cyan-500/20' : ''}
    `}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
              {testimonial.name}
            </h4>
            {testimonial.service && (
              <p className="text-cyan-400 text-sm font-semibold">
                {testimonial.service}
              </p>
            )}
          </div>
          <StarRating rating={testimonial.rating} />
        </div>
        
        <blockquote className="text-gray-300 text-lg leading-relaxed mb-4 relative">
          <span className="text-cyan-400 text-4xl absolute -top-2 -left-1 font-serif">"</span>
          <span className="ml-6">{testimonial.comment}</span>
          <span className="text-cyan-400 text-4xl absolute -bottom-4 right-2 font-serif">"</span>
        </blockquote>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
          <span className="text-gray-500 text-sm">
            {formatDate(testimonial.createdAt)}
          </span>
          <div className="flex items-center gap-2">
            {testimonial.featured && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Destacado
              </span>
            )}
            <span className="text-green-400 text-sm font-semibold">
              ✓ Verificado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const defaultTestimonials: Testimonial[] = [
    {
      id: 'default-1',
      name: 'María González',
      rating: 5,
      comment: 'Excelente servicio de reparación de mi iPhone. Muy profesional y rápido.',
      service: 'Reparación de iPhone',
      createdAt: '2024-12-15T10:00:00Z',
      featured: true
    },
    {
      id: 'default-2', 
      name: 'Carlos Rodríguez',
      rating: 5,
      comment: 'Servicio a domicilio impecable. Solucionaron el problema en el acto.',
      service: 'Servicio a domicilio',
      createdAt: '2024-12-10T14:30:00Z',
      featured: true
    },
    {
      id: 'default-3',
      name: 'Ana Martínez', 
      rating: 5,
      comment: 'Reparación de laptop gaming. Quedó como nueva y precio muy justo.',
      service: 'Reparación de laptop',
      createdAt: '2024-12-08T16:45:00Z',
      featured: false
    }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?featured=true&limit=20');
        const data = await response.json();
        
        if (data.success && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error('Error loading testimonials:', err);
        setTestimonials(defaultTestimonials);
        setError('Cargando testimonios de ejemplo');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length 
    : 5;
  
  const totalReviews = testimonials.length;

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-800 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              ⭐ Opiniones de Clientes ⭐
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {testimonials.length > 0 && testimonials[0].id.startsWith('default') 
              ? 'Conoce las experiencias de nuestros clientes satisfechos'
              : 'Testimonios reales de clientes que confiaron en TechFix Uruguay'
            }
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-2xl font-bold text-yellow-400 ml-2">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Calificación promedio</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{totalReviews}</div>
              <p className="text-gray-400 text-sm">
                {testimonials[0]?.id.startsWith('default') ? 'Ejemplos' : 'Reseñas reales'}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center mb-8">
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 inline-block">
              <span className="text-yellow-300 text-sm">{error}</span>
            </div>
          </div>
        )}

        {testimonials.length > 0 && (
          <>
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                />
              ))}
            </div>

            <div className="md:hidden relative mb-12">
              <TestimonialCard
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
              
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ver testimonio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Has usado nuestros servicios?
            </h3>
            <p className="text-gray-300 mb-6">
              Tu opinión es muy importante para nosotros y ayuda a otros clientes a confiar en TechFix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Solicitar Servicio
              </a>
              <a
                href="https://wa.me/59899252808?text=Hola%20TechFix!%20Quiero%20dejar%20una%20reseña%20de%20su%20servicio"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Dejar Reseña
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
