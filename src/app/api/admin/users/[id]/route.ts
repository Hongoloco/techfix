import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Actualizar rol de usuario
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const tokenData = verifyTokenFromRequest(request)
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const adminUser = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { role, name, email, password } = await request.json()
    const userId = params.id

    // Verificar que el usuario a actualizar existe
    const userToUpdate = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userToUpdate) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // No permitir que el admin se quite a sí mismo los permisos de admin
    if (userId === tokenData.userId && role !== 'ADMIN') {
      return NextResponse.json({ 
        error: 'No puedes cambiar tu propio rol de administrador' 
      }, { status: 400 })
    }

    // Preparar datos para actualizar
    const updateData: any = {}
    
    if (role && ['USER', 'AGENT', 'ADMIN'].includes(role)) {
      updateData.role = role
    }
    
    if (name) {
      updateData.name = name
    }
    
    if (email) {
      // Verificar que el email no esté en uso por otro usuario
      const existingUser = await prisma.user.findUnique({
        where: { 
          email,
          NOT: { id: userId }
        }
      })
      
      if (existingUser) {
        return NextResponse.json({ error: 'El email ya está en uso' }, { status: 400 })
      }
      
      updateData.email = email
    }
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const tokenData = verifyTokenFromRequest(request)
    if (!tokenData) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que el usuario sea admin
    const adminUser = await prisma.user.findUnique({
      where: { id: tokenData.userId }
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = params.id

    // Verificar que el usuario a eliminar existe
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userToDelete) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Si se está intentando eliminar un admin, verificar que no sea el último
    if (userToDelete.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      })
      
      if (adminCount <= 1) {
        return NextResponse.json({ 
          error: 'No se puede eliminar el último administrador del sistema' 
        }, { status: 400 })
      }
    }

    // No permitir eliminar el usuario administrador principal
    if (userToDelete.email === 'techfixuruguay@gmail.com') {
      return NextResponse.json({ 
        error: 'No se puede eliminar el usuario administrador principal' 
      }, { status: 400 })
    }

    // Verificar y manejar todas las relaciones antes de eliminar
    console.log('Checking user relationships for user:', userId)

    try {
      // Usar una transacción para asegurar consistencia
      await prisma.$transaction(async (tx) => {
        // 1. Eliminar comentarios del usuario
        const deletedComments = await tx.ticketComment.deleteMany({
          where: { userId: userId }
        })
        console.log(`Deleted ${deletedComments.count} comments`)

        // 2. Eliminar blog posts del usuario
        const deletedBlogPosts = await tx.blogPost.deleteMany({
          where: { authorId: userId }
        })
        console.log(`Deleted ${deletedBlogPosts.count} blog posts`)

        // 3. Desasignar tickets asignados al usuario
        const updatedAssignedTickets = await tx.ticket.updateMany({
          where: { assignedToId: userId },
          data: { assignedToId: null }
        })
        console.log(`Unassigned ${updatedAssignedTickets.count} tickets`)

        // 4. Eliminar tickets creados por el usuario
        const deletedTickets = await tx.ticket.deleteMany({
          where: { userId: userId }
        })
        console.log(`Deleted ${deletedTickets.count} tickets created by user`)

        // 5. Finalmente, eliminar el usuario
        await tx.user.delete({
          where: { id: userId }
        })
        console.log('User deleted successfully')
      })
    } catch (transactionError) {
      console.error('Transaction failed:', transactionError)
      throw transactionError
    }

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' })

  } catch (error) {
    console.error('Error deleting user:', error)
    
    // Proporcionar más detalles del error
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      // Si el error es de restricción de clave foránea
      if (error.message.includes('FOREIGN KEY constraint failed')) {
        return NextResponse.json({ 
          error: 'No se puede eliminar el usuario porque tiene registros asociados' 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
