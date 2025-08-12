import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'

// GET - Obtener un cliente específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que es admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        tickets: {
          orderBy: { createdAt: 'desc' }
        },
        quotes: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error al obtener cliente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que es admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    const { name, email, phone, company, address, notes } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
    }

    // Verificar que el email no esté en uso por otro cliente
    const emailInUse = await prisma.client.findFirst({
      where: {
        email,
        NOT: { id }
      }
    })

    if (emailInUse) {
      return NextResponse.json(
        { error: 'Ya existe otro cliente con este email' },
        { status: 400 }
      )
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        company,
        address,
        notes
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error al actualizar cliente:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que es admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
    }

    // Verificar que el cliente existe y obtener información sobre datos relacionados
    const existingClient = await prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            tickets: true,
            quotes: true,
            testimonials: true
          }
        }
      }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
    }

    const clientName = existingClient.name
    const clientEmail = existingClient.email
    
    console.log(`Attempting to delete client: ${clientName} (${clientEmail})`)
    console.log(`Related data: ${existingClient._count.tickets} tickets, ${existingClient._count.quotes} quotes, ${existingClient._count.testimonials} testimonials`)

    try {
      // Usar una transacción para eliminar todo de forma segura
      const result = await prisma.$transaction(async (tx) => {
        // 1. Eliminar comentarios de tickets relacionados
        const ticketsWithComments = await tx.ticket.findMany({
          where: { clientId: id },
          select: { id: true }
        })
        
        if (ticketsWithComments.length > 0) {
          await tx.ticketComment.deleteMany({
            where: {
              ticketId: {
                in: ticketsWithComments.map(t => t.id)
              }
            }
          })
        }

        // 2. Eliminar testimonios relacionados
        await tx.testimonial.deleteMany({
          where: { clientId: id }
        })

        // 3. Eliminar tickets relacionados
        await tx.ticket.deleteMany({
          where: { clientId: id }
        })

        // 4. Eliminar cotizaciones relacionadas
        await tx.quote.deleteMany({
          where: { clientId: id }
        })

        // 5. Finalmente eliminar el cliente
        const deletedClient = await tx.client.delete({
          where: { id }
        })

        return {
          deletedClient,
          deletedData: {
            tickets: existingClient._count.tickets,
            quotes: existingClient._count.quotes,
            testimonials: existingClient._count.testimonials
          }
        }
      })

      console.log(`Client deleted successfully: ${clientName} (${clientEmail})`)
      console.log(`Deleted related data: ${result.deletedData.tickets} tickets, ${result.deletedData.quotes} quotes, ${result.deletedData.testimonials} testimonials`)

      return NextResponse.json({ 
        message: 'Cliente eliminado exitosamente',
        deletedClient: {
          id: result.deletedClient.id,
          name: result.deletedClient.name,
          email: result.deletedClient.email
        },
        deletedRelatedData: result.deletedData
      })

    } catch (prismaError: any) {
      console.error('Prisma error when deleting client:', prismaError)
      
      return NextResponse.json(
        { 
          error: 'Error en la base de datos al eliminar el cliente',
          details: prismaError.message || 'Error desconocido en la transacción'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
