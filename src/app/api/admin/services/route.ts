import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los servicios
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const publicOnly = url.searchParams.get('public') === 'true'

    let whereClause = {}
    if (publicOnly) {
      whereClause = { active: true }
    } else {
      // Verificar autenticación para vista admin
      const tokenData = verifyTokenFromRequest(request)
      if (!tokenData) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }

      const user = await prisma.user.findUnique({
        where: { id: tokenData.userId }
      })

      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }
    }

    const services = await prisma.service.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })

    // Parsear features JSON para cada servicio
    const servicesWithFeatures = services.map(service => ({
      ...service,
      features: service.features ? JSON.parse(service.features) : []
    }))

    return NextResponse.json(servicesWithFeatures)

  } catch (error) {
    console.error('Error getting services:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST - Crear nuevo servicio
export async function POST(request: NextRequest) {
  try {
    const tokenData = verifyTokenFromRequest(request)
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { name, description, price, duration, features, category, active } = await request.json()

    if (!name || !description || !price || !duration) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        duration,
        features: JSON.stringify(features || []),
        category,
        active: active !== undefined ? active : true
      }
    })

    return NextResponse.json({
      ...service,
      features: JSON.parse(service.features)
    })

  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
