import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Smartphone, Wifi } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

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
            {/* Menú móvil */}
            <div className="md:hidden">
              <Link href="/contact" className="btn-dark btn-secondary-dark text-sm">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section oscura moderna */}
      <section className="hero-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="hero-title-dark">
                TechFix Uruguay 🇺🇾
              </h1>
            </div>
            
            <p className="hero-subtitle-dark">
              Soporte técnico profesional en Las Piedras y alrededores.
              <br />
              Resolvemos todos tus problemas tecnológicos con rapidez y eficiencia.
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/contact" className="btn-dark btn-primary-dark text-lg px-8 py-4">
                <Ticket className="w-6 h-6" />
                Crear Ticket de Soporte
              </Link>
              <Link href="/quote" className="btn-dark btn-secondary-dark text-lg px-8 py-4">
                <MessageCircle className="w-6 h-6" />
                Solicitar Cotización
              </Link>
            </div>

            {/* Redes Sociales */}
            <div className="mb-20">
              <h3 className="text-xl font-semibold text-gray-300 mb-8">
                Síguenos en nuestras redes sociales
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://www.instagram.com/techfix_soporte_tecnico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card flex items-center space-x-4 p-4"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 text-white">
                    <Image 
                      src="/instagram-icon.svg" 
                      alt="Instagram" 
                      width={24} 
                      height={24}
                      className="w-6 h-6 filter invert"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-100">Instagram</p>
                    <p className="text-gray-400 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61579259244594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card flex items-center space-x-4 p-4"
                >
                  <div className="bg-blue-600 rounded-full p-3 text-white">
                    <Image 
                      src="/facebook-icon.svg" 
                      alt="Facebook" 
                      width={24} 
                      height={24}
                      className="w-6 h-6 filter invert"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-100">Facebook</p>
                    <p className="text-gray-400 text-sm">TechFix Uruguay</p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@techfix_soporte_tecnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card flex items-center space-x-4 p-4"
                >
                  <div className="bg-black rounded-full p-3 text-white">
                    <Image 
                      src="/tiktok-icon.svg" 
                      alt="TikTok" 
                      width={24} 
                      height={24}
                      className="w-6 h-6 filter invert"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-100">TikTok</p>
                    <p className="text-gray-400 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="dark-card text-center">
              <div className="text-5xl mb-6 text-center">⚡</div>
              <h3 className="text-xl font-bold text-gray-100 mb-4">Respuesta Rápida</h3>
              <p className="text-gray-400">WhatsApp inmediato en horario de atención</p>
            </div>
            <div className="dark-card text-center">
              <div className="text-5xl mb-6 text-center">🇺🇾</div>
              <h3 className="text-xl font-bold text-gray-100 mb-4">Empresa Local</h3>
              <p className="text-gray-400">Soporte en español, entendemos tu negocio</p>
            </div>
            <div className="dark-card text-center">
              <div className="text-5xl mb-6 text-center">🏠</div>
              <h3 className="text-xl font-bold text-gray-100 mb-4">Servicio a Domicilio</h3>
              <p className="text-gray-400">Sin costo en Las Piedras y alrededores</p>
              <p className="text-gray-500 text-sm mt-2 italic">Si sos de otra zona, consultá costos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-100 mb-16">
            Nuestros Servicios Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Reparación de PC</h3>
              <p className="text-gray-400">Hardware, software, virus, formateo y optimización</p>
            </div>

            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Wifi className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Redes e Internet</h3>
              <p className="text-gray-400">WiFi, configuración de red, conexión a internet</p>
            </div>

            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Dispositivos Móviles</h3>
              <p className="text-gray-400">Configuración, apps, problemas de conectividad</p>
            </div>

            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Seguridad</h3>
              <p className="text-gray-400">Antivirus, protección de datos, backup</p>
            </div>

            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Soporte Empresarial</h3>
              <p className="text-gray-400">Mantenimiento de sistemas, consultorías IT</p>
            </div>

            <div className="dark-card text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">Urgencias 24/7</h3>
              <p className="text-gray-400">Atención prioritaria para problemas críticos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="dark-card">
            <h2 className="text-4xl font-bold text-gray-100 mb-6">
              ¿Listo para resolver tu problema técnico?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Contactanos ahora y recibe atención personalizada en español
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="btn-dark btn-primary-dark text-lg px-10 py-5">
                <MessageCircle className="w-6 h-6" />
                Contactar Ahora
              </Link>
              <a 
                href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
                className="btn-dark btn-success-dark text-lg px-10 py-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer oscuro */}
      <footer className="footer-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Image 
                src="/techfix-logo.svg" 
                alt="TechFix Uruguay" 
                width={32} 
                height={32}
                className="mr-3"
              />
              <span className="font-bold text-white text-lg">TechFix Uruguay</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 TechFix Uruguay. Todos los derechos reservados.
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Soporte técnico profesional en Las Piedras y alrededores 🇺🇾
            </p>
            <p className="text-sm mt-2 text-cyan-400">
              📧 techifixuruguay@gmail.com | 📱 +598 99 252 808
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <WhatsAppFloatingButton />
    </div>
  )
}
