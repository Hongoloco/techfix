import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyTokenFromRequest } from '@/lib/auth'
import { sendEmail, newQuoteEmailTemplate } from '@/lib/email_new'
import { validators, sanitizers, validateFields } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received quote data:', body)
    
    const { name, email, company, phone, serviceType, description, budget } = body

    // Validación mejorada
    const validationResult = validateFields(
      { name, email, phone, serviceType, description },
      {
        name: validators.name,
        email: validators.email,
        phone: validators.phone,
        serviceType: (value) => ({ isValid: !!value, errors: value ? [] : ['Tipo de servicio es requerido'] }),
        description: (value) => ({ isValid: !!value && value.length >= 10, errors: !value ? ['Descripción es requerida'] : value.length < 10 ? ['La descripción debe tener al menos 10 caracteres'] : [] })
      }
    )

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validationResult.errors },
        { status: 400 }
      )
    }

    // Sanitizar datos
    const sanitizedName = sanitizers.text(name)
    const sanitizedEmail = sanitizers.email(email)
    const sanitizedCompany = company ? sanitizers.text(company) : null
    const sanitizedPhone = phone && phone.trim() !== '' ? sanitizers.phone(phone) : null
    const sanitizedServiceType = sanitizers.text(serviceType)
    const sanitizedDescription = sanitizers.text(description)
    const sanitizedBudget = budget ? sanitizers.text(budget) : null

    console.log('📝 DEBUG COTIZACIÓN: DATOS SANITIZADOS');
    console.log('sanitizedName:', sanitizedName);
    console.log('sanitizedEmail:', sanitizedEmail);
    console.log('sanitizedPhone:', sanitizedPhone);

    // Crear la cotización
    const quote = await prisma.quote.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        phone: sanitizedPhone,
        serviceType: sanitizedServiceType,
        description: sanitizedDescription,
        budget: sanitizedBudget,
        status: 'PENDING'
      }
    })

    console.log('✅ Cotización creada:', quote);

    // Enviar notificación por email
    try {
      console.log('📧 Enviando email de cotización...');
      const emailTemplate = newQuoteEmailTemplate(quote)
      const emailResult = await sendEmail({
        to: process.env.BUSINESS_EMAIL || 'techfixuruguay@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      })
      console.log('✅ Email de cotización enviado:', emailResult);
    } catch (emailError) {
      console.error('Error sending quote email notification:', emailError)
      // No fallar la cotización si el email falla
    }
    
    return NextResponse.json({
      message: 'Cotización creada exitosamente',
      quote
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating quote:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
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
