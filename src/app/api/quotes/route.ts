import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyTokenFromRequest } from '@/lib/auth'
import { sendEmail, newQuoteEmailTemplate } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, serviceType, description, budget } = await request.json()

    // Validación básica
    if (!name || !email || !serviceType || !description) {
      return NextResponse.json({ 
        error: 'Los campos nombre, email, tipo de servicio y descripción son requeridos' 
      }, { status: 400 })
    }

    // Crear la cotización
    const quote = await prisma.quote.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
        serviceType,
        description,
        budget: budget || null,
        status: 'PENDING'
      }
    })

    // Enviar notificación por email
    try {
      const emailTemplate = newQuoteEmailTemplate(quote)
      await sendEmail({
        to: process.env.BUSINESS_EMAIL || 'techfixuruguay@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // No fallar la cotización si el email falla
    }
    
    return NextResponse.json(quote, { status: 201 })

  } catch (error) {
    console.error('Error creating quote:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Esta ruta requiere autenticación de admin
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

    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(quotes)

  } catch (error) {
    console.error('Error getting quotes:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
