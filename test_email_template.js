// Función simplificada del template para testing
function newTicketEmailTemplate(ticketData) {
  const clientPhone = ticketData.client && ticketData.client.phone ? ticketData.client.phone.replace(/[^\d]/g, '') : null
  const clientName = ticketData.client ? ticketData.client.name : ticketData.user.name
  
  // Generar URL de WhatsApp
  let whatsappUrl
  let whatsappText
  
  if (clientPhone) {
    whatsappUrl = `https://wa.me/${clientPhone}?text=Hola%20${encodeURIComponent(clientName)}!%20Recibimos%20tu%20ticket%20%23${ticketData.id}%20sobre%20%22${encodeURIComponent(ticketData.title)}%22.%20%C2%BFPodr%C3%ADamos%20hablar%20para%20ayudarte%20mejor%3F`
    whatsappText = `📱 Contactar por WhatsApp al ${ticketData.client.phone}`
  } else {
    whatsappUrl = `https://wa.me/59899252808?text=Hola%20${encodeURIComponent(clientName)}!%20Recibimos%20tu%20ticket%20%23${ticketData.id}%20sobre%20%22${encodeURIComponent(ticketData.title)}%22.%20%C2%BFPodr%C3%ADas%20proporcionarnos%20tu%20n%C3%BAmero%20de%20tel%C3%A9fono%3F`
    whatsappText = "📱 Solicitar número por WhatsApp"
  }
  
  return {
    whatsappUrl,
    whatsappText,
    hasPhone: !!clientPhone
  }
}

// Simular datos de ticket con teléfono
const ticketWithPhone = {
  id: 123,
  title: "Problema con computadora",
  description: "Mi computadora no enciende y hace ruidos extraños al intentar prenderla. Necesito ayuda urgente.",
  priority: "HIGH",
  category: "Hardware",
  user: {
    name: "Juan Pérez",
    email: "juan.perez@gmail.com"
  },
  client: {
    id: 1,
    name: "Juan Pérez", 
    email: "juan.perez@gmail.com",
    phone: "+59899123456",
    company: null
  }
}

// Simular datos de ticket sin teléfono
const ticketWithoutPhone = {
  id: 124,
  title: "Error en sistema operativo",
  description: "El sistema se congela constantemente y aparecen pantallas azules",
  priority: "MEDIUM",
  category: "Software",
  user: {
    name: "María García",
    email: "maria.garcia@gmail.com"
  },
  client: {
    id: 2,
    name: "María García",
    email: "maria.garcia@gmail.com", 
    phone: null,
    company: null
  }
}

console.log("🧪 TESTING EMAIL TEMPLATES WITH WHATSAPP FUNCTIONALITY")
console.log("=" .repeat(60))

console.log("\n📱 1. TICKET CON TELÉFONO:")
console.log("-" .repeat(30))
const templateWithPhone = newTicketEmailTemplate(ticketWithPhone)
console.log("✅ Tiene teléfono:", templateWithPhone.hasPhone)
console.log("� URL WhatsApp:", templateWithPhone.whatsappUrl)
console.log("📝 Texto botón:", templateWithPhone.whatsappText)

console.log("\n📧 2. TICKET SIN TELÉFONO:")
console.log("-" .repeat(30))
const templateWithoutPhone = newTicketEmailTemplate(ticketWithoutPhone)
console.log("❌ Tiene teléfono:", templateWithoutPhone.hasPhone)
console.log("� URL WhatsApp:", templateWithoutPhone.whatsappUrl)
console.log("📝 Texto botón:", templateWithoutPhone.whatsappText)

console.log("\n✅ Test completado!")
console.log("🔍 Verifica que los enlaces de WhatsApp sean diferentes:")
console.log("   - Con teléfono: debe ir al número del cliente")
console.log("   - Sin teléfono: debe ir a tu número de negocio")
