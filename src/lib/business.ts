// Utilidades para manejo de horarios de negocio en Uruguay

export function isBusinessOpen(): boolean {
  const now = new Date()
  const uruguayTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Montevideo"}))
  
  const day = uruguayTime.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const hour = uruguayTime.getHours()
  
  // Lunes a Viernes (1-5), de 10:00 a 20:00
  const isWeekday = day >= 1 && day <= 5
  const isBusinessHour = hour >= 10 && hour < 20
  
  return isWeekday && isBusinessHour
}

export function getBusinessStatus(): {
  isOpen: boolean
  message: string
  nextOpenTime?: string
} {
  const isOpen = isBusinessOpen()
  const now = new Date()
  const uruguayTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Montevideo"}))
  
  if (isOpen) {
    const closingTime = new Date(uruguayTime)
    closingTime.setHours(20, 0, 0, 0)
    
    return {
      isOpen: true,
      message: `🟢 Estamos abiertos hasta las 20:00`
    }
  }
  
  // Calcular próxima apertura
  const nextOpen = new Date(uruguayTime)
  const day = uruguayTime.getDay()
  const hour = uruguayTime.getHours()
  
  if (day >= 1 && day <= 5) {
    // Es día de semana
    if (hour < 10) {
      // Antes de abrir hoy
      nextOpen.setHours(10, 0, 0, 0)
    } else {
      // Después de cerrar, abrir mañana
      nextOpen.setDate(nextOpen.getDate() + 1)
      nextOpen.setHours(10, 0, 0, 0)
    }
  } else {
    // Es fin de semana, abrir el lunes
    const daysUntilMonday = day === 0 ? 1 : (8 - day) // Si es domingo (0), 1 día. Si es sábado (6), 2 días
    nextOpen.setDate(nextOpen.getDate() + daysUntilMonday)
    nextOpen.setHours(10, 0, 0, 0)
  }
  
  const nextOpenTime = nextOpen.toLocaleDateString('es-UY', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
  
  return {
    isOpen: false,
    message: `🔴 Estamos cerrados. Abrimos ${nextOpenTime}`,
    nextOpenTime
  }
}

export function formatBusinessHours(): string {
  return "Lunes a Viernes: 10:00 - 20:00"
}

export function getCurrentTimeInUruguay(): string {
  const now = new Date()
  return now.toLocaleString('es-UY', {
    timeZone: 'America/Montevideo',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Mensaje de emergencia cuando está cerrado
export function getAfterHoursMessage(): string {
  return `
🕒 Estamos cerrados en este momento

📅 Horarios de atención:
${formatBusinessHours()}

🚨 Para emergencias urgentes:
Puede enviarnos un WhatsApp y le responderemos a primera hora del próximo día hábil.

💡 También puede:
• Crear un ticket de soporte (será atendido cuando abramos)
• Solicitar una cotización online
• Revisar nuestras preguntas frecuentes

¡Gracias por su comprensión!
  `
}

export interface BusinessInfo {
  name: string
  phone: string
  email: string
  address: string
  freeVisitArea: string
  hours: string
  timezone: string
}

export function getBusinessInfo(): BusinessInfo {
  return {
    name: "TechFix Uruguay",
    phone: "+59899252808",
    email: "techfixuruguay@gmail.com",
    address: "Las Piedras, Uruguay",
    freeVisitArea: "Las Piedras y alrededores",
    hours: "Lunes a Viernes: 10:00 - 20:00",
    timezone: "America/Montevideo"
  }
}
