import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyUser() {
  try {
    const admin = await prisma.user.findUnique({
      where: { email: 'techfix@gmail.com' }
    })
    
    if (admin) {
      console.log('✅ Usuario admin encontrado:')
      console.log(`📧 Email: ${admin.email}`)
      console.log(`👤 Nombre: ${admin.name}`)
      console.log(`🔐 Rol: ${admin.role}`)
      console.log(`📅 Creado: ${admin.createdAt}`)
    } else {
      console.log('❌ Usuario admin no encontrado')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyUser()
