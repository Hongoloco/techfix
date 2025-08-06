import { Ticket, MessageCircle, Clock, CheckCircle, Zap, Shield, Users, Cpu, Smartphone, Wifi } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Carga dinámica de componentes no críticos
const WhatsAppFloatingButton = dynamic(() => import('@/components/WhatsApp').then(mod => ({ default: mod.WhatsAppFloatingButton })), {
  ssr: false,
  loading: () => null
})

export const metadata: Metadata = {
  title: 'TechFix Uruguay - Soporte Técnico Profesional',
  description: 'Servicios de soporte técnico profesional en Las Piedras, Uruguay. Reparación de PC, redes, urgencias 24/7. Contacto directo por WhatsApp.',
  keywords: ['soporte técnico', 'reparación PC', 'uruguay', 'las piedras', 'tecnología'],
  openGraph: {
    title: 'TechFix Uruguay - Soporte Técnico Profesional',
    description: 'Servicios de soporte técnico profesional en Las Piedras, Uruguay',
    type: 'website',
    locale: 'es_UY',
  },
  alternates: {
    canonical: 'https://techfix.uy'
  }
}

// Componente optimizado para las tarjetas de servicio
function ServiceCard({ icon: Icon, title, description, delay = 0 }: {
  icon: any
  title: string
  description: string
  delay?: number
}) {
  return (
    <div 
      className="modern-card card-hover bg-white"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-center">
        <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

// Componente optimizado para las estadísticas
function StatCard({ icon, title, description, delay = 0 }: {
  icon: string
  title: string
  description: string
  delay?: number
}) {
  return (
    <div 
      className="glass-effect modern-card card-hover text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl mb-4" role="img" aria-label={title}>{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <div className="min-h-screen gradient-animated">
        {/* Header optimizado */}
        <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-3 float-animation shadow-lg">
                  <Cpu className="h-8 w-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">TechFix Uruguay</h1>
              </div>
              <nav className="hidden md:flex space-x-6" role="navigation">
                <Link href="/services" className="text-white hover:text-yellow-300 transition-colors font-medium">
                  🔧 Servicios
                </Link>
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
              {/* Menú móvil simplificado */}
              <div className="md:hidden">
                <Link href="/contact" className="btn-modern text-sm px-4 py-2">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section optimizado */}
        <main className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center relative z-10">
              <div className="float-animation">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 leading-tight">
                  🛠️ <span className="gradient-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text">TechFix</span>
                  <br />
                  <span className="text-yellow-300 drop-shadow-lg">Uruguay</span>
                </h1>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                🚀 <strong>Soporte técnico profesional</strong> en Las Piedras y alrededores
                <br />
                💻 Resolvemos todos tus problemas tecnológicos con <strong>rapidez y eficiencia</strong>
              </p>

              {/* Botones de acción principales */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link 
                  href="/contact" 
                  className="btn-modern btn-success text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 card-hover"
                  aria-label="Crear ticket de soporte técnico"
                >
                  🎫 Crear Ticket de Soporte
                </Link>
                <Link 
                  href="/quote" 
                  className="btn-modern btn-tech text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 card-hover"
                  aria-label="Solicitar cotización de servicio"
                >
                  💰 Solicitar Cotización
                </Link>
              </div>

              {/* Stats optimizadas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <StatCard 
                  icon="⚡" 
                  title="Respuesta Rápida" 
                  description="WhatsApp inmediato en horario de atención"
                  delay={100}
                />
                <StatCard 
                  icon="🇺🇾" 
                  title="100% Nacional" 
                  description="Empresa uruguaya, atención en español"
                  delay={200}
                />
                <StatCard 
                  icon="🛡️" 
                  title="Garantía Total" 
                  description="Respaldamos nuestro trabajo profesional"
                  delay={300}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Servicios principales optimizados */}
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-16">
              💼 Nuestros Servicios Especializados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={Cpu} 
                title="💻 Reparación de PC" 
                description="Hardware, software, virus, formateo y optimización"
                delay={100}
              />
              <ServiceCard 
                icon={Wifi} 
                title="🌐 Redes y Conectividad" 
                description="Configuración WiFi, routers, conexiones empresariales"
                delay={200}
              />
              <ServiceCard 
                icon={Smartphone} 
                title="📱 Dispositivos Móviles" 
                description="Tablets, smartphones, configuración y sincronización"
                delay={300}
              />
              <ServiceCard 
                icon={Shield} 
                title="🔒 Seguridad Digital" 
                description="Antivirus, respaldos, protección de datos"
                delay={400}
              />
              <ServiceCard 
                icon={Users} 
                title="🏢 Soporte Empresarial" 
                description="Mantenimiento preventivo, consultoría en TI"
                delay={500}
              />
              <ServiceCard 
                icon={Zap} 
                title="⚡ Urgencias 24/7" 
                description="Atención prioritaria para problemas críticos"
                delay={600}
              />
            </div>
          </div>
        </section>

        {/* CTA Final optimizado */}
        <section className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-20">
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
                aria-label="Contactar por WhatsApp"
              >
                💬 WhatsApp Directo
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Componente de WhatsApp cargado dinámicamente */}
      <WhatsAppFloatingButton />
    </>
  )
}
