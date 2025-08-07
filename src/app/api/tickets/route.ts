import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { sendEmail, newTicketEmailTemplate } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
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

    if (!name || !email || !ticketTitle || !ticketDescription) {
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

    // Si no hay usuario autenticado, crear uno temporal o buscar por email
    if (!userId) {
      // Buscar si ya existe un usuario con este email
      let user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        // Crear usuario temporal
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: '', // Password vacío para usuarios temporales
            role: 'USER'
          }
        })
      }
      userId = user.id
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
