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

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
