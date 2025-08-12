import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { sendEmail, newTicketEmailTemplate } from '@/lib/email_new'
import { ticketRateLimit } from '@/lib/rateLimit'
import { validators, sanitizers, validateFields } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (!ticketRateLimit(request)) {
      return NextResponse.json(
        { error: 'Demasiados tickets enviados. Intenta de nuevo en un minuto.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    console.log('Received ticket data:', body)
    
    // Soportar tanto el formato nuevo como el antiguo
    const { 
      name, 
      email, 
      phone,
      title, 
      subject,
      description, 
      message,
      priority, 
      category 
    } = body

    const ticketTitle = title || subject
    const ticketDescription = description || message

    // Validación de campos
    const validationResult = validateFields(
      { title: ticketTitle, description: ticketDescription, name, email, phone },
      {
        title: validators.ticketTitle,
        description: validators.ticketDescription,
        name: validators.name,
        email: validators.email,
        phone: validators.phone
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
    const sanitizedTitle = sanitizers.text(ticketTitle)
    const sanitizedDescription = sanitizers.text(ticketDescription)
    const sanitizedPhone = phone && phone.trim() !== '' ? sanitizers.phone(phone) : null

    if (!sanitizedName || !sanitizedEmail || !sanitizedTitle || !sanitizedDescription) {
      return NextResponse.json(
        { error: 'Nombre, email, asunto y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el usuario está autenticado
    const token = getTokenFromRequest(request)
    let userId = null

    if (token) {
      const decoded = verifyToken(token)
      if (decoded) {
        userId = decoded.userId
      }
    }

    // Si no hay usuario autenticado, usar el usuario administrador principal
    if (!userId) {
      // Buscar el usuario administrador principal (techfixuruguay@gmail.com)
      let user = await prisma.user.findUnique({
        where: { email: 'techfixuruguay@gmail.com' }
      })

      if (!user) {
        // Si no existe, crearlo como admin principal
        user = await prisma.user.create({
          data: {
            name: 'TechFix Uruguay',
            email: 'techfixuruguay@gmail.com',
            password: '', // Se puede configurar después
            role: 'ADMIN'
          }
        })
      }
      userId = user.id
    }

    // Buscar o crear cliente con los datos del ticket
    let client = await prisma.client.findUnique({
      where: { email }
    })

    if (!client) {
      // Crear nuevo cliente con los datos del formulario
      client = await prisma.client.create({
        data: {
          name,
          email,
          phone: sanitizedPhone,
          company: null, // Se puede agregar al formulario después
          address: null, // Se puede agregar al formulario después
          notes: `Cliente creado automáticamente desde ticket: ${ticketTitle}`
        }
      })
    } else {
      // Actualizar información del cliente si es necesario
      if (sanitizedPhone && !client.phone) {
        await prisma.client.update({
          where: { id: client.id },
          data: { phone: sanitizedPhone }
        })
      }
    }

    // Convertir prioridad del formulario al formato de la DB
    let dbPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' = 'MEDIUM'
    switch (priority) {
      case 'low':
        dbPriority = 'LOW'
        break
      case 'normal':
        dbPriority = 'MEDIUM'
        break
      case 'high':
        dbPriority = 'HIGH'
        break
      case 'urgent':
        dbPriority = 'URGENT'
        break
    }

    // Crear el ticket
    const ticket = await prisma.ticket.create({
      data: {
        title: ticketTitle,
        description: ticketDescription,
        priority: dbPriority,
        category: category || null,
        userId,
        clientId: client.id, // Asociar con el cliente
        status: 'OPEN'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true
          }
        }
      }
    })

    // Enviar notificación por email
    try {
      const emailTemplate = newTicketEmailTemplate(ticket)
      await sendEmail({
        to: process.env.BUSINESS_EMAIL || 'techfixuruguay@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // No fallar el ticket si el email falla
    }

    return NextResponse.json({
      message: 'Ticket creado exitosamente',
      ticket
    }, { status: 201 })

  } catch (error) {
    console.error('Error al crear ticket:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticación requerido' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    // Buscar usuario para verificar rol
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    let tickets

    // Si es ADMIN o AGENT, mostrar todos los tickets
    if (user.role === 'ADMIN' || user.role === 'AGENT') {
      tickets = await prisma.ticket.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      // Si es USER, solo mostrar sus tickets
      tickets = await prisma.ticket.findMany({
        where: { userId: user.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  role: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    return NextResponse.json({ tickets })

  } catch (error) {
    console.error('Error al obtener tickets:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
