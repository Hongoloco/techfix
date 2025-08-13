import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Smartphone, Wifi } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'
import TestimonialsSection from '@/components/TestimonialsSection'

export default function Home() {
  return (
    <div className="dark-layout">
      {/* Partículas de fondo */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header oscuro moderno */}
      <header className="dark-header">
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
            <nav className="nav-dark hidden md:flex">
              <Link href="/contact" className="nav-link-dark">
                Contacto
              </Link>
              <Link href="/quote" className="nav-link-dark">
                Cotización
              </Link>
              <Link href="/login" className="btn-dark btn-primary-dark">
                Iniciar Sesión
              </Link>
            </nav>
            {/* Menú móvil ultra-compacto */}
            <div className="md:hidden flex items-center gap-1">
              <Link href="/contact" className="btn-dark btn-secondary-dark mobile-header-btn">
                📞
              </Link>
              <Link href="/quote" className="btn-dark btn-yellow-dark mobile-header-btn">
                💰
              </Link>
              <Link href="/login" className="btn-dark btn-primary-dark mobile-header-btn">
                👤
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section oscura moderna */}
      <section className="hero-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="hero-title-dark flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
                <Image 
                  src="/techfix-logo.svg" 
                  alt="TechFix Uruguay Logo" 
                  width={48} 
                  height={48}
                  className="logo-icon-large animate-bounce mx-auto sm:mx-0"
                />
                <span className="animate-pulse text-2xl sm:text-4xl md:text-5xl lg:text-6xl">TechFix Uruguay 🇺🇾</span>
              </h1>
            </div>
            
            <p className="hero-subtitle-dark text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4">
              Soporte técnico profesional en Las Piedras y alrededores.
              <br className="hidden sm:block" />
              <span className="block sm:inline">Resolvemos todos tus problemas tecnológicos con rapidez y eficiencia.</span>
            </p>

            {/* Botones de acción principales mejorados para móvil */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
              <Link href="/contact" className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-xs">
                <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Crear Ticket de Soporte</span>
              </Link>
              <Link href="/quote" className="btn-dark btn-yellow-dark text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-xs">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Solicitar Cotización</span>
              </Link>
            </div>

            {/* Redes Sociales mejoradas para móvil */}
            <div className="mb-16 sm:mb-20 px-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-6 sm:mb-8 text-center">
                Síguenos en nuestras redes sociales
              </h3>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
                <a
                  href="https://www.instagram.com/techfix_soporte_tecnico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card social-card flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 w-full sm:w-auto"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                    <Image 
                      src="/instagram-logo.png" 
                      alt="Instagram" 
                      width={20} 
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6 social-icon"
                    />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-medium text-gray-100 text-sm sm:text-base truncate">Instagram</p>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">@techfix_soporte_tecnico</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61579259244594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card social-card flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 w-full sm:w-auto"
                >
                  <div className="bg-blue-600 rounded-full p-2 sm:p-3 text-white flex-shrink-0">
                    <Image 
                      src="/facebook-logo.png" 
                      alt="Facebook" 
                      width={20} 
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6 social-icon"
                    />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-medium text-gray-100 text-sm sm:text-base truncate">Facebook</p>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">TechFix Uruguay</p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@techfix_soporte_tecnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card social-card flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 w-full sm:w-auto"
                >
                  <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full p-2 sm:p-3 text-white relative overflow-hidden flex-shrink-0">
                    {/* SVG de TikTok optimizado con colores oficiales */}
                    <svg 
                      className="w-5 h-5 sm:w-6 sm:h-6 social-icon" 
                      viewBox="0 0 24 24" 
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.8a6.34 6.34 0 0 0 10.86-4.43V8.56a8.16 8.16 0 0 0 4.77 1.51V6.69z"/>
                    </svg>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-medium text-gray-100 text-sm sm:text-base truncate">TikTok</p>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">@techfix_soporte_tecnico</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales mejoradas para móvil */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="dark-card text-center p-4 sm:p-6">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Respuesta Rápida</h3>
              <p className="text-gray-400 text-sm sm:text-base">WhatsApp inmediato en horario de atención</p>
            </div>
            <div className="dark-card text-center p-4 sm:p-6">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center">🇺🇾</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Empresa Local</h3>
              <p className="text-gray-400 text-sm sm:text-base">Soporte en español, entendemos tu negocio</p>
            </div>
            <div className="dark-card text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center">🏠</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Servicio a Domicilio</h3>
              <p className="text-gray-400 text-sm sm:text-base">Sin costo en Las Piedras y alrededores</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 italic">Si sos de otra zona, consultá costos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados mejorados para móvil */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-100 mb-12 sm:mb-16">
            Nuestros Servicios Principales
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Reparación de PC</h3>
              <p className="text-gray-400 text-sm sm:text-base">Hardware, software, virus, formateo y optimización</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Redes e Internet</h3>
              <p className="text-gray-400 text-sm sm:text-base">WiFi, configuración de red, conexión a internet</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Dispositivos Móviles</h3>
              <p className="text-gray-400 text-sm sm:text-base">Configuración, apps, problemas de conectividad</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Seguridad</h3>
              <p className="text-gray-400 text-sm sm:text-base">Antivirus, protección de datos, backup</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Soporte Empresarial</h3>
              <p className="text-gray-400 text-sm sm:text-base">Mantenimiento de sistemas, consultorías IT</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6 lg:col-span-3 xl:col-span-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Urgencias 24/7</h3>
              <p className="text-gray-400 text-sm sm:text-base">Atención prioritaria para problemas críticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios con Sistema de Estrellas */}
      <TestimonialsSection />

      {/* CTA Final mejorado para móvil */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="dark-card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6">
              ¿Listo para resolver tu problema técnico?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10">
              Contactanos ahora y recibe atención personalizada en español
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
              <Link href="/contact" className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Contactar Ahora</span>
              </Link>
              <a 
                href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
                className="btn-dark btn-success-dark text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer oscuro mejorado para móvil */}
      <footer className="footer-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay" 
                width={28} 
                height={28}
                className="mr-2 sm:mr-3 w-7 h-7 sm:w-8 sm:h-8"
              />
              <span className="font-bold text-white text-base sm:text-lg">TechFix Uruguay</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              © 2024 TechFix Uruguay. Todos los derechos reservados.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Soporte técnico profesional en Las Piedras y alrededores 🇺🇾
            </p>
            <div className="text-xs sm:text-sm text-cyan-400 space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="block sm:inline">📧 techifixuruguay@gmail.com</div>
              <div className="block sm:inline">📱 +598 99 252 808</div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <WhatsAppFloatingButton />
    </div>
  )
}
