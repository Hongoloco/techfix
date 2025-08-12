// Script para inicializar el usuario administrador principal
require('dotenv').config({ path: '.env.local' })

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function initializeAdminUser() {
  try {
    console.log('🔧 Inicializando usuario administrador principal...')
    
    // Verificar si ya existe el usuario admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'techfixuruguay@gmail.com' }
    })
    
    if (existingAdmin) {
      console.log('✅ El usuario administrador ya existe:')
      console.log(`   📧 Email: ${existingAdmin.email}`)
      console.log(`   👤 Nombre: ${existingAdmin.name}`)
      console.log(`   🔒 Rol: ${existingAdmin.role}`)
      console.log(`   📅 Creado: ${existingAdmin.createdAt}`)
      return
    }
    
    // Crear el usuario administrador principal
    const hashedPassword = await bcrypt.hash('admin123', 10) // Cambiar esta contraseña
    
    const adminUser = await prisma.user.create({
      data: {
        name: 'TechFix Uruguay',
        email: 'techfixuruguay@gmail.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    
    console.log('✅ Usuario administrador creado exitosamente:')
    console.log(`   📧 Email: ${adminUser.email}`)
    console.log(`   👤 Nombre: ${adminUser.name}`)
    console.log(`   🔒 Rol: ${adminUser.role}`)
    console.log(`   🔑 Contraseña temporal: admin123`)
    console.log('')
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después de iniciar sesión')
    
  } catch (error) {
    console.error('❌ Error al inicializar usuario administrador:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  initializeAdminUser()
}

module.exports = { initializeAdminUser }
