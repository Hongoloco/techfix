'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  service: string;
}

function RatePageContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticket');
  const clientEmail = searchParams.get('email');
  const clientName = searchParams.get('name');
  
  const [formData, setFormData] = useState<FormData>({
    name: clientName || '',
    email: clientEmail || '',
    rating: 5,
    comment: '',
    service: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ticketId
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || 'Error al enviar calificación');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-cyan-500/20">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">
            ¡Gracias por tu calificación!
          </h1>
          <p className="text-gray-300 mb-6">
            Tu opinión es muy importante para nosotros y nos ayuda a mejorar nuestro servicio.
          </p>
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Califica nuestro servicio
          </h1>
          <p className="text-gray-300">
            Tu opinión nos ayuda a mejorar y brindar un mejor servicio
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="text-center">
            <label className="block text-white font-semibold mb-4">
              ¿Cómo calificarías nuestro servicio?
            </label>
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredStar || formData.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              {formData.rating === 5 && '¡Excelente!'}
              {formData.rating === 4 && 'Muy bueno'}
              {formData.rating === 3 && 'Bueno'}
              {formData.rating === 2 && 'Regular'}
              {formData.rating === 1 && 'Necesita mejorar'}
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Service Type */}
          <div>
            <label htmlFor="service" className="block text-white font-semibold mb-2">
              Tipo de servicio (opcional)
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            >
              <option value="">Seleccionar servicio</option>
              <option value="Reparación de celulares">Reparación de celulares</option>
              <option value="Reparación de laptops">Reparación de laptops</option>
              <option value="Instalación de software">Instalación de software</option>
              <option value="Soporte técnico">Soporte técnico</option>
              <option value="Servicio a domicilio">Servicio a domicilio</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-white font-semibold mb-2">
              Comentario
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              placeholder="Cuéntanos sobre tu experiencia con nuestro servicio..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando...
              </span>
            ) : (
              'Enviar calificación'
            )}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Tu calificación nos ayuda a brindar un mejor servicio a todos nuestros clientes.
        </p>
      </div>
    </div>
  );
}

export default function RatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando...</p>
        </div>
      </div>
    }>
      <RatePageContent />
    </Suspense>
  );
}
