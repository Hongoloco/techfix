import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Verificar variables de entorno (sin mostrar valores sensibles)
    const hasDbUrl = !!process.env.DATABASE_URL
    const hasJwtSecret = !!process.env.JWT_SECRET
    
    // Probar conexión a la base de datos
    let dbConnection = false
    let dbError = null
    
    try {
      await prisma.$connect()
      await prisma.user.count() // Consulta simple para verificar la conexión
      dbConnection = true
      await prisma.$disconnect()
    } catch (dbErr) {
      dbError = dbErr instanceof Error ? dbErr.message : 'Unknown database error'
    }
    
    return NextResponse.json({
      environment: process.env.NODE_ENV,
      hasDbUrl,
      hasJwtSecret,
      dbConnection,
      dbError,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en debug', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
