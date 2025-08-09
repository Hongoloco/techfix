import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Cpu, Smartphone, Wifi, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

export default function Home() {
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
              <Link href="/services" className="nav-link">
                Servicios
              </Link>
              <Link href="/contact" className="nav-link">
                Contacto
              </Link>
              <Link href="/quote" className="nav-link">
                Cotización
              </Link>
              <Link href="/login" className="btn-professional btn-primary">
                Iniciar Sesión
              </Link>
            </nav>
            {/* Menú móvil */}
            <div className="md:hidden">
              <Link href="/contact" className="btn-professional btn-secondary text-sm">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section profesional */}
      <section className="hero-professional">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="hero-title">
                TechFix Uruguay 🇺🇾
              </h1>
            </div>
            
            <p className="hero-subtitle">
              Soporte técnico profesional en Las Piedras y alrededores.
              <br />
              Resolvemos todos tus problemas tecnológicos con rapidez y eficiencia.
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/contact" className="btn-professional btn-primary">
                <Ticket className="w-5 h-5" />
                Crear Ticket de Soporte
              </Link>
              <Link href="/quote" className="btn-professional btn-secondary">
                <MessageCircle className="w-5 h-5" />
                Solicitar Cotización
              </Link>
            </div>

            {/* Redes Sociales */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Síguenos en nuestras redes sociales
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.instagram.com/techfix_soporte_tecnico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="professional-card flex items-center space-x-3"
                >
                  <div className="bg-blue-600 rounded-full p-3 text-white">
                    <Image 
                      src="/instagram-logo.png" 
                      alt="Instagram" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Instagram</p>
                    <p className="text-gray-600 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61579259244594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="professional-card flex items-center space-x-3"
                >
                  <div className="bg-blue-800 rounded-full p-3 text-white">
                    <Image 
                      src="/facebook-logo.png" 
                      alt="Facebook" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Facebook</p>
                    <p className="text-gray-600 text-sm">TechFix Uruguay</p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@techfix_soporte_tecnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="professional-card flex items-center space-x-3"
                >
                  <div className="bg-black rounded-full p-3 text-white">
                    <Image 
                      src="/tiktok-logo.png" 
                      alt="TikTok" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">TikTok</p>
                    <p className="text-gray-600 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="professional-card text-center">
              <div className="text-4xl mb-4 text-center">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Respuesta Rápida</h3>
              <p className="text-gray-600">WhatsApp inmediato en horario de atención</p>
            </div>
            <div className="professional-card text-center">
              <div className="text-4xl mb-4 text-center">🇺🇾</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Empresa Local</h3>
              <p className="text-gray-600">Soporte en español, entendemos tu negocio</p>
            </div>
            <div className="professional-card text-center">
              <div className="text-4xl mb-4 text-center">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Servicio a Domicilio</h3>
              <p className="text-gray-600">Sin costo en Las Piedras y alrededores</p>
              <p className="text-gray-500 text-sm mt-2 italic">Si sos de otra zona, consultá costos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Nuestros Servicios Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="professional-card text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Reparación de PC</h3>
              <p className="text-gray-600">Hardware, software, virus, formateo y optimización</p>
            </div>

            <div className="professional-card text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Redes e Internet</h3>
              <p className="text-gray-600">WiFi, configuración de red, conexión a internet</p>
            </div>

            <div className="professional-card text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Dispositivos Móviles</h3>
              <p className="text-gray-600">Configuración, apps, problemas de conectividad</p>
            </div>

            <div className="professional-card text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Seguridad</h3>
              <p className="text-gray-600">Antivirus, protección de datos, backup</p>
            </div>

            <div className="professional-card text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Soporte Empresarial</h3>
              <p className="text-gray-600">Mantenimiento de sistemas, consultorías IT</p>
            </div>

            <div className="professional-card text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Urgencias 24/7</h3>
              <p className="text-gray-600">Atención prioritaria para problemas críticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para resolver tu problema técnico?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contactanos ahora y recibe atención personalizada en español
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-professional btn-primary text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              Contactar Ahora
            </Link>
            <a 
              href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
              className="btn-professional btn-success text-lg px-8 py-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
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
