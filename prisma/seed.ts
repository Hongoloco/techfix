import { PrismaClient, Priority, TicketStatus, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Poblando la base de datos con datos iniciales...')

  // Crear usuarios de prueba
  const adminPassword = await bcrypt.hash('admin123', 12)
  const agentPassword = await bcrypt.hash('agent123', 12)
  const userPassword = await bcrypt.hash('user123', 12)

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@techfix.com' },
    update: {},
    create: {
      email: 'admin@techfix.com',
      name: 'Administrador TechFix',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Agent
  const agent = await prisma.user.upsert({
    where: { email: 'agent@techfix.com' },
    update: {},
    create: {
      email: 'agent@techfix.com',
      name: 'Agente de Soporte',
      password: agentPassword,
      role: 'AGENT'
    }
  })

  // User
  const user = await prisma.user.upsert({
    where: { email: 'user@techfix.com' },
    update: {},
    create: {
      email: 'user@techfix.com',
      name: 'Usuario de Prueba',
      password: userPassword,
      role: 'USER'
    }
  })

  // Crear servicios de ejemplo
  const services = [
    {
      name: 'Soporte Técnico Básico',
      description: 'Soporte técnico general para resolver problemas comunes de hardware y software.',
      price: 299.99,
      duration: 'mes',
      features: JSON.stringify([
        'Soporte por email y teléfono',
        'Resolución de problemas básicos',
        'Actualizaciones de software',
        'Limpieza de virus',
        'Configuración básica de equipos'
      ]),
      category: 'Soporte',
      active: true
    },
    {
      name: 'Mantenimiento Preventivo',
      description: 'Mantenimiento regular de equipos para prevenir fallos y optimizar rendimiento.',
      price: 199.99,
      duration: 'mes',
      features: JSON.stringify([
        'Limpieza física de equipos',
        'Actualizaciones de seguridad',
        'Optimización del sistema',
        'Respaldo de datos',
        'Informe mensual de estado'
      ]),
      category: 'Mantenimiento',
      active: true
    },
    {
      name: 'Consultoría en TI',
      description: 'Asesoría especializada para mejorar la infraestructura tecnológica de tu empresa.',
      price: 150.00,
      duration: 'hora',
      features: JSON.stringify([
        'Análisis de infraestructura actual',
        'Recomendaciones de mejora',
        'Planificación de proyectos',
        'Evaluación de seguridad',
        'Propuesta de soluciones'
      ]),
      category: 'Consultoría',
      active: true
    }
  ]

  for (const serviceData of services) {
    await prisma.service.create({
      data: serviceData
    })
  }  // Crear algunos tickets de prueba
  const tickets = [
    {
      title: 'Problema con la impresora de la oficina',
      description: 'La impresora HP LaserJet no está imprimiendo documentos. Aparece un error de papel atascado pero no veo ningún papel atascado.',
      priority: Priority.HIGH,
      category: 'Hardware',
      userId: user.id,
      status: TicketStatus.OPEN
    },
    {
      title: 'No puedo acceder a mi correo electrónico',
      description: 'Desde ayer no puedo enviar ni recibir correos. Mi cliente Outlook muestra un error de conexión.',
      priority: Priority.URGENT,
      category: 'Email',
      userId: user.id,
      status: TicketStatus.IN_PROGRESS,
      assignedToId: agent.id
    },
    {
      title: 'Solicitud de software nuevo',
      description: 'Necesito instalar Adobe Photoshop para mi trabajo de diseño gráfico.',
      priority: Priority.MEDIUM,
      category: 'Software',
      userId: user.id,
      status: TicketStatus.RESOLVED,
      assignedToId: agent.id
    }
  ]

  for (const ticketData of tickets) {
    const ticket = await prisma.ticket.create({
      data: ticketData
    })

    // Agregar algunos comentarios a los tickets
    if (ticket.status === 'IN_PROGRESS' || ticket.status === 'RESOLVED') {
      await prisma.ticketComment.create({
        data: {
          content: 'Gracias por reportar este problema. Estoy investigando y te contactaré pronto con una solución.',
          ticketId: ticket.id,
          userId: agent.id
        }
      })

      if (ticket.status === 'RESOLVED') {
        await prisma.ticketComment.create({
          data: {
            content: 'El software ha sido instalado correctamente en tu estación de trabajo. Por favor confirma que todo funciona bien.',
            ticketId: ticket.id,
            userId: agent.id
          }
        })
      }
    }
  }

  console.log('✅ Base de datos poblada exitosamente!')
  console.log('\n👤 Usuarios creados:')
  console.log('📧 Admin: admin@techfix.com / admin123')
  console.log('📧 Agent: agent@techfix.com / agent123')
  console.log('📧 User: user@techfix.com / user123')
  console.log('\n📋 Tickets y FAQs creados exitosamente!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
