import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema de validación para testimonios
const testimonialSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  rating: z.number().min(1).max(5, 'La calificación debe ser entre 1 y 5'),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres'),
  service: z.string().optional(),
  ticketId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos
    const validData = testimonialSchema.parse(body);
    
    // Buscar si existe el cliente
    let client = await prisma.client.findUnique({
      where: { email: validData.email }
    });
    
    // Si no existe, crear el cliente
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: validData.name,
          email: validData.email,
        }
      });
    }
    
    // Verificar si ya existe un testimonio para este ticket/cliente
    let existingTestimonial = null;
    if (validData.ticketId) {
      existingTestimonial = await prisma.testimonial.findFirst({
        where: {
          ticketId: validData.ticketId,
          clientId: client.id
        }
      });
    }
    
    let testimonial;
    
    if (existingTestimonial) {
      // Actualizar testimonio existente
      testimonial = await prisma.testimonial.update({
        where: { id: existingTestimonial.id },
        data: {
          rating: validData.rating,
          comment: validData.comment,
          service: validData.service,
          updatedAt: new Date(),
        }
      });
    } else {
      // Crear nuevo testimonio
      testimonial = await prisma.testimonial.create({
        data: {
          name: validData.name,
          email: validData.email,
          rating: validData.rating,
          comment: validData.comment,
          service: validData.service,
          ticketId: validData.ticketId,
          clientId: client.id,
          approved: true, // Auto-aprobar por ahora, puedes cambiar a false para moderación
          featured: validData.rating >= 4, // Destacar solo calificaciones altas
        }
      });
    }
    
    // Si es una calificación alta (4-5 estrellas), marcar ticket como resuelto
    if (validData.ticketId && validData.rating >= 4) {
      await prisma.ticket.update({
        where: { id: validData.ticketId },
        data: { status: 'RESOLVED' }
      });
    }
    
    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu calificación!',
      testimonial: {
        id: testimonial.id,
        rating: testimonial.rating,
        approved: testimonial.approved
      }
    });
    
  } catch (error) {
    console.error('Error creating testimonial:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datos inválidos',
        errors: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}

// GET: Obtener testimonios aprobados para mostrar en la página
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
        ...(featured && { featured: true })
      },
      orderBy: [
        { featured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      select: {
        id: true,
        name: true,
        rating: true,
        comment: true,
        service: true,
        createdAt: true,
        featured: true
      }
    });
    
    return NextResponse.json({
      success: true,
      testimonials
    });
    
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al obtener testimonios'
    }, { status: 500 });
  }
}
