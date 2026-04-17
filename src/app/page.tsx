import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Smartphone, Wifi, MapPin, MonitorSmartphone, Wrench } from 'lucide-react'
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
              Soporte técnico en Las Piedras y alrededores.
              <br className="hidden sm:block" />
              <span className="block sm:inline">Te ayudamos con PCs, WiFi, configuración, redes y problemas técnicos con atención rápida, clara y por coordinación.</span>
            </p>

            {/* Botones de acción principales mejorados para móvil */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
              <a href="https://wa.me/59899252808?text=Hola%20TechFix%20Uruguay,%20quiero%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer" className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-xs">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Escribir por WhatsApp</span>
              </a>
              <Link href="/contact" className="btn-dark btn-yellow-dark text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-xs">
                <Ticket className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Enviar consulta</span>
              </Link>
            </div>

            {/* Google Maps */}
            <div className="mb-16 sm:mb-20 px-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-6 sm:mb-8 text-center">
                Encontranos en Google
              </h3>
              <div className="flex justify-center max-w-4xl mx-auto">
                <a
                  href="https://www.google.com/maps/place/Techfix/@-34.7265213,-56.2162785,7146m/data=!3m1!1e3!4m8!3m7!1s0xa2403487bcb0c1d7:0x6ff56ec394549e75!8m2!3d-34.7265213!4d-56.2162785!9m1!1b1!16s%2Fg%2F11xtz1ysbb?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-card social-card flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 w-full max-w-xl"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 sm:p-4 text-white flex-shrink-0">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 social-icon" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-medium text-gray-100 text-sm sm:text-base truncate">Google Maps</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Ver ficha y ubicación de TechFix</p>
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Atención cercana</h3>
              <p className="text-gray-400 text-sm sm:text-base">Soporte en español, claro y sin tecnicismos innecesarios</p>
            </div>
            <div className="dark-card text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center">📍</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Por coordinación</h3>
              <p className="text-gray-400 text-sm sm:text-base">Soporte remoto y asistencia presencial según el caso</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 italic">Las Piedras y alrededores</p>
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
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Reparación y optimización de PC</h3>
              <p className="text-gray-400 text-sm sm:text-base">Limpieza de virus, formateo, programas, lentitud y mejora de rendimiento</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Redes e Internet</h3>
              <p className="text-gray-400 text-sm sm:text-base">Problemas de WiFi, routers, impresoras en red y conexión a internet</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Soporte remoto</h3>
              <p className="text-gray-400 text-sm sm:text-base">Configuración, cuentas, errores comunes, accesos y asistencia técnica a distancia</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Seguridad y backups</h3>
              <p className="text-gray-400 text-sm sm:text-base">Antivirus, protección de datos y respaldo de información importante</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Consultoría IT</h3>
              <p className="text-gray-400 text-sm sm:text-base">Ayuda para elegir equipos, ordenar sistemas y resolver necesidades técnicas reales</p>
            </div>

            <div className="dark-card text-center p-4 sm:p-6 lg:col-span-3 xl:col-span-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-3 sm:mb-4">Desarrollo web</h3>
              <p className="text-gray-400 text-sm sm:text-base">Webs, formularios y soluciones digitales simples para negocios y profesionales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios con Sistema de Estrellas */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Opiniones reales en Google
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Preferimos mostrarte reseñas reales en Google antes que llenar la web con opiniones inventadas. Ahí podés ver la ficha, ubicación y valoraciones reales.
            </p>
          </div>

          <div className="max-w-4xl mx-auto dark-card p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">TechFix en Google Maps</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Podés entrar a nuestra ficha de Google para ver ubicación, presencia online y dejar tu opinión cuando trabajemos juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <a
                href="https://www.google.com/maps/place/Techfix/@-34.7265213,-56.2162785,7146m/data=!3m1!1e3!4m8!3m7!1s0xa2403487bcb0c1d7:0x6ff56ec394549e75!8m2!3d-34.7265213!4d-56.2162785!9m1!1b1!16s%2Fg%2F11xtz1ysbb?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto"
              >
                <span>Ver opiniones en Google</span>
              </a>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJdV6UlMNu9W8R"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark btn-success-dark text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto"
              >
                <span>Dejar una reseña</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gray-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Preguntas frecuentes</h2>
            <p className="text-gray-300 text-sm sm:text-base">Lo que suelen preguntar antes de escribir.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              ['¿Atienden solo en Las Piedras?', 'Trabajamos principalmente en Las Piedras y alrededores. También podemos evaluar casos remotos o coordinar según zona.'],
              ['¿Tienen local físico?', 'No atendemos con mostrador al público. La atención es por coordinación, remoto o presencial según el caso.'],
              ['¿Puedo consultar por WhatsApp?', 'Sí. Es la forma más rápida para contarnos el problema y orientarte sobre qué conviene hacer.'],
              ['¿Hacen soporte remoto?', 'Sí. Muchos problemas de configuración, cuentas, accesos o programas se pueden resolver sin visita.']
            ].map(([title, text]) => (
              <div key={title} className="dark-card p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final mejorado para móvil */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="dark-card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6">
              ¿Listo para resolver tu problema técnico?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10">
              Escribinos por WhatsApp o mandanos tu consulta y coordinamos una solución.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
              <Link href="/contact" className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Enviar consulta</span>
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
              Soporte técnico en Las Piedras y alrededores 🇺🇾
            </p>
            <div className="text-xs sm:text-sm text-cyan-400 space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="block sm:inline">📧 techfixuruguay@gmail.com</div>
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
