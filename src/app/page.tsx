import { MessageCircle, Clock, Shield, CheckCircle2, Wifi, Monitor, HardDrive, Settings, MapPin, Wrench, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

const whatsappHref = 'https://wa.me/59899252808?text=Hola%20TechFix%20Uruguay,%20necesito%20ayuda%20con%20un%20problema%20t%C3%A9cnico'
const googleMapsHref = 'https://www.google.com/maps/place/Techfix/@-34.7265213,-56.2162785,7146m/data=!3m1!1e3!4m8!3m7!1s0xa2403487bcb0c1d7:0x6ff56ec394549e75!8m2!3d-34.7265213!4d-56.2162785!9m1!1b1!16s%2Fg%2F11xtz1ysbb?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D'
const googleReviewHref = 'https://search.google.com/local/writereview?placeid=ChIJdV6UlMNu9W8R'

const trustPoints = [
  'Respuesta en horario de atención',
  'Soporte remoto y presencial',
  'Atención clara, sin vueltas'
]

const highlights = [
  {
    icon: Clock,
    title: 'Respuesta rápida',
    text: 'WhatsApp directo para orientarte rápido y decirte qué conviene hacer.'
  },
  {
    icon: MapPin,
    title: 'Las Piedras y alrededores',
    text: 'Atendemos por coordinación en zona y también resolvemos muchos casos de forma remota.'
  },
  {
    icon: Shield,
    title: 'Soporte confiable',
    text: 'Te explicamos claro, cuidamos tus datos y buscamos la solución más útil, no la más complicada.'
  }
]

const problemCards = [
  {
    icon: Monitor,
    title: 'Tu PC está lenta o falla',
    text: 'Formateo, limpieza, programas, errores de arranque, virus y mejora de rendimiento.'
  },
  {
    icon: Wifi,
    title: 'No anda el WiFi o la red',
    text: 'Problemas con internet, routers, impresoras en red, cobertura y configuración.'
  },
  {
    icon: Settings,
    title: 'Necesitás ayuda remota',
    text: 'Cuentas, accesos, configuración, programas y errores comunes sin esperar una visita.'
  },
  {
    icon: HardDrive,
    title: 'Querés cuidar tu información',
    text: 'Backups, protección de datos, antivirus y orden para no perder archivos importantes.'
  },
  {
    icon: Wrench,
    title: 'Tenés un problema puntual',
    text: 'Diagnóstico claro para decirte rápido si conviene remoto, visita o derivación.'
  },
  {
    icon: CheckCircle2,
    title: 'También hacemos web simple',
    text: 'Páginas, formularios y soluciones digitales concretas para negocios y profesionales.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Nos escribís',
    text: 'Contanos qué pasa por WhatsApp o por el formulario.'
  },
  {
    number: '02',
    title: 'Te orientamos',
    text: 'Vemos si se resuelve remoto, si conviene visita o si hace falta presupuesto.'
  },
  {
    number: '03',
    title: 'Lo resolvemos',
    text: 'Coordinamos la solución más directa para que vuelvas a trabajar tranquilo.'
  }
]

const faqs = [
  ['¿Atienden solo en Las Piedras?', 'Trabajamos principalmente en Las Piedras y alrededores. También evaluamos casos remotos o coordinamos según zona.'],
  ['¿Hacen soporte remoto?', 'Sí. Muchos problemas de configuración, cuentas, programas y accesos se resuelven sin visita.'],
  ['¿Puedo consultar por WhatsApp?', 'Sí. Es la forma más rápida de contarnos el problema y orientarte sin vueltas.'],
  ['¿Tienen local físico?', 'No atendemos con mostrador al público. La atención es por coordinación, remoto o presencial según el caso.']
]

export default function Home() {
  return (
    <div className="dark-layout">
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
              <Link href="/services" className="nav-link-dark">
                Servicios
              </Link>
              <Link href="/contact" className="nav-link-dark">
                Contacto
              </Link>
              <Link href="/quote" className="btn-dark btn-yellow-dark">
                Cotización
              </Link>
            </nav>
            <div className="md:hidden flex items-center gap-2">
              <Link href="/contact" className="btn-dark btn-secondary-dark mobile-header-btn">
                📞
              </Link>
              <Link href="/quote" className="btn-dark btn-yellow-dark mobile-header-btn">
                💰
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="grid lg:grid-cols-[minmax(0,700px)_380px] justify-center gap-8 lg:gap-10 items-center">
            <div className="w-full max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs sm:text-sm text-cyan-300 mb-5">
                <CheckCircle2 className="w-4 h-4" />
                Soporte técnico en Las Piedras y alrededores
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                Arreglamos tu <span className="text-cyan-400">PC, WiFi y problemas técnicos</span> sin complicarte.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6">
                Te ayudamos con computadoras lentas, redes, configuraciones, errores comunes, backups y soporte remoto o presencial.
                Atención clara, rápida y por coordinación.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-2 text-xs sm:text-sm text-gray-200"
                  >
                    {point}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark btn-primary-dark text-base sm:text-lg px-6 py-4 w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Escribir por WhatsApp</span>
                </a>
                <Link href="/quote" className="btn-dark btn-yellow-dark text-base sm:text-lg px-6 py-4 w-full sm:w-auto">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Pedir presupuesto</span>
                </Link>
              </div>

              <p className="text-sm text-gray-400">
                También podés escribir a <span className="text-cyan-400">techfixuruguay@gmail.com</span> o coordinar por <span className="text-cyan-400">+598 99 252 808</span>.
              </p>
            </div>

            <div className="dark-card p-6 sm:p-8 w-full max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 text-black">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Reseñas reales en Google</p>
                  <p className="text-gray-400 text-sm">Ubicación, presencia online y opiniones verificables.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold mb-1">Lo que más valoran</p>
                  <p className="text-gray-300 text-sm">Rapidez para responder, explicación clara y atención cercana.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white font-semibold mb-1">Cobertura</p>
                  <p className="text-gray-300 text-sm">Las Piedras, Progreso, Canelones y casos remotos según necesidad.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={googleMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark btn-secondary-dark w-full justify-center"
                >
                  Ver ficha en Google Maps
                </a>
                <a
                  href={googleReviewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark btn-success-dark w-full justify-center"
                >
                  Dejar una reseña
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="dark-card p-6 text-center">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
                <p className="text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Problemas que resolvemos seguido</h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
              En vez de marearte con tecnicismos, te ayudamos según el problema real que tenés hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {problemCards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="dark-card p-6">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl w-14 h-14 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-gray-900/70 to-gray-900/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Cómo trabajamos</h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
              Un proceso simple para resolver rápido, sin vueltas ni pasos innecesarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((step) => (
              <div key={step.number} className="dark-card p-6 sm:p-7">
                <p className="text-cyan-400 font-black text-sm tracking-[0.25em] mb-3">{step.number}</p>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gray-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Preguntas frecuentes</h2>
            <p className="text-gray-300 text-sm sm:text-base">Lo que suelen preguntar antes de escribir.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map(([title, text]) => (
              <div key={title} className="dark-card p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="dark-card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4 sm:mb-6">
              ¿Querés resolverlo hoy?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10">
              Escribinos por WhatsApp o mandanos tu consulta y te orientamos con la forma más práctica de resolverlo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-xl mx-auto">
              <a
                href={whatsappHref}
                className="btn-dark btn-primary-dark text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>WhatsApp directo</span>
              </a>
              <Link href="/contact" className="btn-dark btn-secondary-dark text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto">
                <span>Enviar consulta</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-xs sm:text-sm text-gray-400 mb-2">© 2024 TechFix Uruguay. Todos los derechos reservados.</p>
            <p className="text-xs sm:text-sm text-gray-400 mb-2">Soporte técnico en Las Piedras y alrededores 🇺🇾</p>
            <div className="text-xs sm:text-sm text-cyan-400 space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="block sm:inline">📧 techfixuruguay@gmail.com</div>
              <div className="block sm:inline">📱 +598 99 252 808</div>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloatingButton />
    </div>
  )
}
