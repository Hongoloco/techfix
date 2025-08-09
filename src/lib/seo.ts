import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const defaultSEO = {
  title: 'TechFix Uruguay - Soporte Técnico Profesional',
  description: 'Soporte técnico profesional en Las Piedras y alrededores. Reparación de computadoras, notebooks, smartphones y más. Servicio rápido y confiable.',
  keywords: [
    'soporte técnico',
    'reparación computadoras',
    'las piedras',
    'uruguay',
    'notebook',
    'smartphone',
    'techfix',
    'servicio técnico',
    'informática'
  ],
  image: '/og-image.jpg',
  url: 'https://techfix-uruguay.vercel.app'
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website'
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | TechFix Uruguay` : defaultSEO.title
  const seoDescription = description || defaultSEO.description
  const seoKeywords = [...defaultSEO.keywords, ...keywords]
  const seoImage = image || defaultSEO.image
  const seoUrl = url || defaultSEO.url

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.join(', '),
    authors: [{ name: 'TechFix Uruguay' }],
    creator: 'TechFix Uruguay',
    publisher: 'TechFix Uruguay',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: 'TechFix Uruguay',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      locale: 'es_UY',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'tu-google-verification-code',
    },
    alternates: {
      canonical: seoUrl,
    }
  }
}

// Structured data para servicios
export function generateServiceSchema(service: {
  name: string
  description: string
  price?: string
  area?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'TechFix Uruguay',
      url: 'https://techfix-uruguay.vercel.app',
      logo: 'https://techfix-uruguay.vercel.app/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+598-99-123-456',
        contactType: 'customer service',
        areaServed: 'UY',
        availableLanguage: 'Spanish'
      }
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uruguay'
    },
    ...(service.price && { offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'UYU'
    }})
  }
}

// Schema para organización
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TechFix Uruguay',
  url: 'https://techfix-uruguay.vercel.app',
  logo: 'https://techfix-uruguay.vercel.app/logo.png',
  description: 'Soporte técnico profesional en Las Piedras y alrededores',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'UY',
    addressLocality: 'Las Piedras',
    addressRegion: 'Canelones'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+598-99-123-456',
    contactType: 'customer service',
    areaServed: 'UY',
    availableLanguage: 'Spanish'
  },
  sameAs: [
    'https://www.instagram.com/techfix_soporte_tecnico/',
    'https://www.facebook.com/profile.php?id=61579259244594'
  ]
}
