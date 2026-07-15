import { ArrowRight, CheckCircle2, Clock, MapPin, MessageCircle, Monitor, Phone, Shield, Star, Wifi } from 'lucide-react'
import Link from 'next/link'
import { WhatsAppFloatingButton } from '@/components/WhatsApp'

const whatsappHref = 'https://wa.me/59899252808?text=Hola%20TechFix%20Uruguay,%20necesito%20ayuda%20con%20un%20problema%20t%C3%A9cnico'
const googleHref = 'https://share.google/Meh5sUZmlelWBE24v'

const pills = [
  'PC lenta',
  'WiFi y redes',
  'Soporte remoto',
  'Backups',
]

const services = [
  {
    icon: Monitor,
    title: 'Computadoras y notebooks',
    text: 'Diagnóstico, limpieza, errores de arranque, programas, virus y mejora de rendimiento.',
  },
  {
    icon: Wifi,
    title: 'Internet, WiFi y redes',
    text: 'Routers, cobertura, impresoras en red, configuración y problemas de conexión.',
  },
  {
    icon: Shield,
    title: 'Datos y seguridad',
    text: 'Backups, protección, recuperación posible y orden para no perder información importante.',
  },
]

const steps = [
  ['01', 'Contanos qué pasa', 'Mandás un mensaje con el problema y una foto o captura si ayuda.'],
  ['02', 'Te damos una ruta clara', 'Vemos si conviene remoto, visita, presupuesto o derivación.'],
  ['03', 'Lo resolvemos sin vueltas', 'Coordinamos y te explicamos qué se hizo para que quede claro.'],
]

const googleFacts = [
  { icon: Star, label: 'Google', value: '5.0 estrellas' },
  { icon: Monitor, label: 'Categoria', value: 'Servicio de informatica' },
  { icon: Clock, label: 'Horario', value: 'Lunes a sabado, 9 a 20 h' },
  { icon: Phone, label: 'Telefono', value: '099 252 808' },
]

const reviewHighlights = [
  'Atencion directa por WhatsApp y seguimiento claro.',
  'Soporte para computadoras, redes, datos y configuraciones.',
  'Perfil de Google actualizado con sitio, telefono y horario.',
]

export default function Home() {
  return (
    <main className="techfix-premium">
      <header className="tf-nav">
        <Link href="/" className="tf-logo" aria-label="TechFix Uruguay">
          <img src="/techfix-logo.svg" alt="" aria-hidden="true" />
          <span>TechFix</span>
          <i aria-hidden="true">✳︎</i>
        </Link>

        <nav className="tf-nav-links" aria-label="Navegacion principal">
          <Link href="#servicios">Servicios</Link>
          <span>,</span>
          <Link href="#proceso">Proceso</Link>
          <span>,</span>
          <Link href="/quote">Cotizacion</Link>
          <span>,</span>
          <Link href="/contact">Contacto</Link>
        </nav>

        <a href={whatsappHref} className="tf-nav-cta" target="_blank" rel="noopener noreferrer">
          Escribir ahora
        </a>

        <Link href="/contact" className="tf-mobile-menu" aria-label="Abrir contacto">
          <span />
          <span />
          <span />
        </Link>
      </header>

      <section className="tf-hero">
        <video
          className="tf-hero-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
        <div className="tf-video-overlay" />

        <div className="tf-hero-content">
          <p className="tf-blur-label">
            Soporte tecnico claro
            <br />
            para hogares, negocios y equipos de trabajo
          </p>

          <div className="tf-title-lockup">
            <img src="/techfix-logo.svg" alt="" aria-hidden="true" />
            <h1>Tu tecnologia funcionando, sin vueltas.</h1>
          </div>

          <p className="tf-hero-copy">
            Arreglamos PC lentas, redes, configuraciones, backups y problemas tecnicos comunes con
            atencion directa en Las Piedras y soporte remoto cuando se puede.
          </p>

          <div className="tf-pill-row" aria-label="Servicios frecuentes">
            {pills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>

          <div className="tf-actions">
            <a href={whatsappHref} className="tf-main-button" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Consultar soporte
            </a>
            <Link href="/quote" className="tf-outline-button">
              Armar presupuesto
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="servicios" className="tf-section tf-services">
        <div className="tf-section-heading">
          <p>Servicios</p>
          <h2>Soporte tecnico con estetica simple y respuesta concreta.</h2>
        </div>

        <div className="tf-service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article key={title} className="tf-glass-card">
              <Icon className="h-7 w-7" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tf-google-section">
        <div className="tf-google-copy">
          <p className="tf-kicker">Perfil de Google</p>
          <h2>Datos reales de TechFix, visibles y faciles de comprobar.</h2>
          <p>
            Integramos la ficha de Google con la web: categoria, telefono, horario y acceso directo al
            perfil para que el cliente vea la presencia del negocio antes de consultar.
          </p>
          <a href={googleHref} className="tf-outline-button" target="_blank" rel="noopener noreferrer">
            Ver perfil en Google
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        <div className="tf-google-panel">
          <div className="tf-google-score">
            <span>5.0</span>
            <div>
              <p>Calificacion en Google</p>
              <div aria-label="Cinco estrellas">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-4 w-4" />
                ))}
              </div>
            </div>
          </div>

          <div className="tf-google-facts">
            {googleFacts.map(({ icon: Icon, label, value }) => (
              <article key={label}>
                <Icon className="h-5 w-5" />
                <div>
                  <p>{label}</p>
                  <strong>{value}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="tf-review-list">
            {reviewHighlights.map((text) => (
              <blockquote key={text}>
                <MapPin className="h-4 w-4" />
                <p>{text}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="tf-quote-section">
        <div className="tf-quote-content">
          <p className="tf-kicker">Como trabajamos</p>
          <blockquote>
            "Primero entendemos el problema real. Despues buscamos la solucion mas directa: remoto si
            alcanza, presencial si hace falta, y siempre explicado en claro."
          </blockquote>
          <div className="tf-step-grid">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tf-final-cta">
        <div>
          <CheckCircle2 className="h-8 w-8" />
          <h2>Decime que le pasa a tu equipo y lo vemos.</h2>
          <p>WhatsApp es la forma mas rapida para orientarte y coordinar el siguiente paso.</p>
        </div>
        <a href={whatsappHref} className="tf-main-button" target="_blank" rel="noopener noreferrer">
          Consultar ahora
        </a>
      </section>

      <WhatsAppFloatingButton />
    </main>
  )
}
