import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { apiRateLimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (!apiRateLimit(request)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { event, properties, timestamp, url, userAgent } = body

    // Validar datos básicos
    if (!event || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log del evento para análisis posterior
    logger.info('Analytics Event', {
      event,
      properties,
      timestamp,
      url,
      userAgent,
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })

    // En producción, aquí enviarías los datos a tu servicio de analytics
    // Por ejemplo: Mixpanel, Amplitude, Google Analytics Measurement Protocol, etc.

    return NextResponse.json({ success: true })

  } catch (error) {
    logger.error('Analytics API Error', error instanceof Error ? error : new Error('Unknown error'))
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
