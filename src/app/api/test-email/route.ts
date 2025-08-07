import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function GET() {
  try {
    // Probar el envío de un email de prueba
    const result = await sendEmail({
      to: process.env.BUSINESS_EMAIL || 'techfixuruguay@gmail.com',
      subject: '🔧 Prueba de Email - TechFix',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🔧 TechFix Uruguay - Prueba de Email</h2>
          <p>Este es un email de prueba para verificar que la configuración SMTP funciona correctamente.</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          <p>Si recibes este email, la configuración es correcta.</p>
        </div>
      `,
      text: 'TechFix - Prueba de email. Si recibes este mensaje, la configuración funciona correctamente.'
    })
    
    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Email enviado correctamente' : 'Error al enviar email',
      error: result.success ? null : result.error,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Error en el servidor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
