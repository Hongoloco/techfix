import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' }
      ]
    })

    return NextResponse.json({ faqs })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer, category, order } = await request.json()

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Pregunta y respuesta son requeridas' },
        { status: 400 }
      )
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category: category || null,
        order: order || 0
      }
    })

    return NextResponse.json({
      message: 'FAQ creada exitosamente',
      faq
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
