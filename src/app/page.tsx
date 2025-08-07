import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Cpu, Smartphone, Wifi, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

export default function Home() {
  return (
    <div className="min-h-screen gradient-animated">
      {/* Header moderno */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
                            <div className="relative">
                <Cpu className="h-8 w-8 text-purple-600" />
                <span className="absolute -top-1 -right-1 flag-wave text-lg">🇺🇾</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">TechFix Uruguay <span className="flag-pulse-patriotic text-xl">🇺🇾</span></h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/contact" className="text-white hover:text-yellow-300 transition-colors font-medium">
                📞 Contacto
              </Link>
              <Link href="/quote" className="text-white hover:text-yellow-300 transition-colors font-medium">
                💰 Cotización
              </Link>
              <Link href="/login" className="btn-modern">
                Iniciar Sesión
              </Link>
            </nav>
            {/* Menú móvil */}
            <div className="md:hidden">
              <Link href="/contact" className="btn-modern text-sm px-4 py-2">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section espectacular */}
      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            <div className="float-animation">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 leading-tight">
                🛠️ <span className="gradient-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text">TechFix</span>
                <br />
                <span className="text-yellow-300 drop-shadow-lg">Uruguay</span> <span className="flag-bounce-uruguay text-6xl sm:text-7xl md:text-9xl">🇺🇾</span>
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
              🚀 <strong>Soporte técnico profesional</strong> en Las Piedras y alrededores
              <br />
              💻 Resolvemos todos tus problemas tecnológicos con <strong>rapidez y eficiencia</strong>
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/contact" className="btn-modern btn-success text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 card-hover">
                🎫 Crear Ticket de Soporte
              </Link>
              <Link href="/quote" className="btn-modern btn-tech text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 card-hover">
                💰 Solicitar Cotización
              </Link>
            </div>

            {/* Redes Sociales */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6">
                📱 ¡Síguenos en nuestras redes sociales!
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.instagram.com/techfix_soporte_tecnico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-readable p-4 flex items-center space-x-3 card-hover group"
                >
                  <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Image 
                      src="/instagram-icon.svg" 
                      alt="Instagram" 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-white/70 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61579259244594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-readable p-4 flex items-center space-x-3 card-hover group"
                >
                  <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Image 
                      src="/facebook-icon.svg" 
                      alt="Facebook" 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">Facebook</p>
                    <p className="text-white/70 text-sm">TechFix Uruguay</p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@techfix_soporte_tecnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-readable p-4 flex items-center space-x-3 card-hover group"
                >
                  <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Image 
                      src="/tiktok-icon.svg" 
                      alt="TikTok" 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">TikTok</p>
                    <p className="text-white/70 text-sm">@techfix_soporte_tecnico</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Stats impresionantes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="glass-card-readable modern-card text-center p-8">
                <div className="text-5xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Respuesta Rápida</h3>
                <p className="text-gray-700 font-medium">WhatsApp inmediato en horario de atención</p>
              </div>
              <div className="glass-card-readable modern-card text-center p-8">
                <div className="text-5xl mb-6">🇺🇾</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Empresa Local</h3>
                <p className="text-gray-700 font-medium">Soporte en español, entendemos tu negocio</p>
              </div>
              <div className="glass-card-readable modern-card text-center p-8">
                <div className="text-5xl mb-6">🆓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Visitas Gratuitas</h3>
                <p className="text-gray-700 font-medium">Sin costo en Las Piedras y alrededores</p>
                <p className="text-gray-600 text-sm mt-2 italic">Si sos de otra zona, consultá costos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Servicios destacados */}
        <div className="bg-white/10 backdrop-blur-lg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              🔧 Nuestros Servicios Principales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Cpu className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💻 Reparación de PC</h3>
                  <p className="text-gray-600">Hardware, software, virus, formateo y optimización</p>
                </div>
              </div>

              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Wifi className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🌐 Redes e Internet</h3>
                  <p className="text-gray-600">WiFi, configuración de red, conexión a internet</p>
                </div>
              </div>

              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📱 Dispositivos Móviles</h3>
                  <p className="text-gray-600">Configuración, apps, problemas de conectividad</p>
                </div>
              </div>

              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🔒 Seguridad</h3>
                  <p className="text-gray-600">Antivirus, protección de datos, backup</p>
                </div>
              </div>

              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">👥 Soporte Empresarial</h3>
                  <p className="text-gray-600">Mantenimiento de sistemas, consultorías IT</p>
                </div>
              </div>

              <div className="modern-card card-hover bg-white">
                <div className="text-center">
                  <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">⚡ Urgencias 24/7</h3>
                  <p className="text-gray-600">Atención prioritaria para problemas críticos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              ¿Listo para resolver tu problema técnico? 🚀
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contactanos ahora y recibe atención personalizada en español
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-modern btn-success text-xl px-10 py-5 pulse-modern">
                📞 Contactar Ahora
              </Link>
              <a 
                href="https://wa.me/59899252808?text=🛠️%20Hola%20TechFix%20Uruguay!%0A%0ANecesito%20ayuda%20técnica.%20¿Pueden%20asistirme?"
                className="btn-modern bg-green-600 hover:bg-green-700 text-xl px-10 py-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp flotante */}
      <WhatsAppFloatingButton />
    </div>
  )
}
