// Test simple del template de email
const fs = require('fs');

// Simulamos el template manualmente para testing
function createTestEmailTemplate(ticketData) {
  const subject = `🆘 NUEVO TICKET #${ticketData.id} - ${ticketData.title} [${ticketData.priority}]`;
  
  const whatsappUrl = ticketData.client?.phone 
    ? `https://wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(ticketData.client.name)}!%20Recibimos%20tu%20ticket%20%23${ticketData.id}%20-%20${encodeURIComponent(ticketData.title)}.%20Estamos%20revisando%20tu%20solicitud%20y%20te%20contactaremos%20pronto.`
    : null;
  
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Ticket - TechFix Uruguay</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background: linear-gradient(135deg, #111827 0%, #1F2937 100%); color: #F9FAFB; line-height: 1.6;">
  
  <div style="max-width: 600px; margin: 0 auto; background: #111827; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); border: 1px solid #374151;">
    
    <!-- Header con gradiente -->
    <div style="background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%); padding: 30px; text-align: center; position: relative; overflow: hidden;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: white; text-shadow: 0 4px 8px rgba(0,0,0,0.3); letter-spacing: 1px;">
        🛠️ TECHFIX URUGUAY
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9); font-weight: 600;">
        NUEVO TICKET DE SOPORTE
      </p>
    </div>

    <!-- Contenido principal -->
    <div style="padding: 40px 30px; background: linear-gradient(180deg, #1F2937 0%, #111827 100%);">
      
      <!-- Información del ticket -->
      <div style="background: rgba(55, 65, 81, 0.6); border-radius: 12px; padding: 25px; margin-bottom: 30px; border: 1px solid rgba(107, 114, 128, 0.3); backdrop-filter: blur(10px);">
        <h2 style="margin: 0 0 20px 0; color: #F59E0B; font-size: 22px; font-weight: 700; display: flex; align-items: center;">
          🎫 DETALLES DEL TICKET
        </h2>
        
        <div style="display: grid; gap: 12px;">
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #06B6D4;">🆔 ID:</strong> 
            <span style="background: linear-gradient(135deg, #06B6D4, #22D3EE); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; font-size: 18px;">#${ticketData.id}</span>
          </p>
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #06B6D4;">📋 Título:</strong> 
            <span style="color: #F9FAFB; font-weight: 600;">${ticketData.title}</span>
          </p>
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #F59E0B;">⚡ Prioridad:</strong> 
            <span style="color: #EF4444; font-weight: 700; text-transform: uppercase;">${ticketData.priority}</span>
          </p>
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #F59E0B;">👤 Cliente:</strong> 
            <span style="color: #F9FAFB; font-weight: 600;">${ticketData.client?.name || ticketData.user.name}</span>
          </p>
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #F59E0B;">📧 Email:</strong> 
            <span style="color: #22D3EE;">${ticketData.client?.email || ticketData.user.email}</span>
          </p>
          ${ticketData.client?.phone ? `
          <p style="margin: 0; font-size: 16px; border-bottom: 1px solid rgba(107, 114, 128, 0.2); padding-bottom: 8px;">
            <strong style="color: #F59E0B;">📱 WhatsApp:</strong> 
            <span style="color: #25D366; font-weight: 600;">${ticketData.client.phone}</span>
          </p>
          ` : ''}
          ${ticketData.client?.company ? `
          <p style="margin: 0; font-size: 16px;">
            <strong style="color: #F59E0B;">🏢 Empresa:</strong> 
            <span style="color: #F9FAFB; font-weight: 600;">${ticketData.client.company}</span>
          </p>
          ` : ''}
        </div>
      </div>

      <!-- Descripción del problema -->
      <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #F59E0B; font-size: 18px; font-weight: 700;">📝 DESCRIPCIÓN DEL PROBLEMA</h3>
        <div style="background: rgba(17, 24, 39, 0.7); padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B;">
          <p style="margin: 0; color: #D1D5DB; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${ticketData.description}</p>
        </div>
      </div>

      <!-- Card de acciones rápidas con WhatsApp -->
      <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 25px; text-align: center; position: relative; backdrop-filter: blur(10px);">
        <h3 style="margin: 0 0 25px 0; color: #F59E0B; font-size: 20px; font-weight: 800;">⚡ ACCIONES RÁPIDAS</h3>
        
        <!-- Botón principal de WhatsApp -->
        ${ticketData.client?.phone ? `
        <div style="margin-bottom: 25px;">
          <a href="${whatsappUrl}" 
             style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #20ba5a 100%); color: white; padding: 25px 50px; text-decoration: none; border-radius: 20px; font-weight: 900; font-size: 22px; box-shadow: 0 15px 30px rgba(37, 211, 102, 0.6); border: 4px solid rgba(255, 255, 255, 0.4); min-width: 350px; text-transform: uppercase; letter-spacing: 1px;">
            <span style="font-size: 32px; margin-right: 18px; vertical-align: middle;">📱</span>
            <span style="vertical-align: middle; text-shadow: 0 3px 6px rgba(0,0,0,0.4);">WhatsApp Directo</span>
          </a>
        </div>
        <div style="background: rgba(16, 185, 129, 0.15); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 14px; padding: 15px 25px; margin: 20px auto; max-width: 380px;">
          <p style="margin: 0; color: #10B981; font-size: 16px; font-weight: 700;">
            💬 Contacto directo con ${ticketData.client.name}
          </p>
          <p style="margin: 6px 0 0 0; color: #6EE7B7; font-size: 14px; font-weight: 600;">
            📞 ${ticketData.client.phone}
          </p>
        </div>
        ` : `
        <div style="margin-bottom: 25px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%); color: white; padding: 25px 50px; border-radius: 20px; font-weight: 900; font-size: 22px; opacity: 0.7; min-width: 350px; border: 4px solid rgba(255, 255, 255, 0.1);">
            <span style="font-size: 32px; margin-right: 18px; vertical-align: middle;">📱</span>
            <span style="vertical-align: middle;">Sin WhatsApp</span>
          </div>
        </div>
        `}
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #374151; padding: 25px; text-align: center; border-top: 1px solid #4B5563;">
      <p style="margin: 0 0 10px 0; color: #9CA3AF; font-size: 14px;">
        Este es un mensaje automático del sistema TechFix Uruguay
      </p>
      <p style="margin: 5px 0;">📱 WhatsApp: +59899252808 | 📧 Email: techfixuruguay@gmail.com</p>
      <p style="margin: 10px 0 0 0; color: #6B7280; font-size: 12px;">
        © 2025 TechFix Uruguay - Soporte Técnico Profesional
      </p>
    </div>
  </div>
</body>
</html>`;

  return { subject, html };
}

// Datos de prueba
const sampleTicketData = {
  id: 123,
  title: "Problema con computadora no enciende",
  description: "Mi computadora no enciende desde ayer, probé varios cables pero no funciona. Necesito ayuda urgente para trabajo.",
  priority: "HIGH",
  status: "OPEN",
  category: "HARDWARE",
  createdAt: new Date(),
  user: {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    role: "USER"
  },
  client: {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    phone: "+59899123456",
    company: "Empresa Test S.A."
  }
}

console.log('🧪 Generando template de email...');

try {
  const emailTemplate = createTestEmailTemplate(sampleTicketData);
  
  console.log('✅ Template generado exitosamente!');
  console.log('📧 Asunto:', emailTemplate.subject);
  console.log('📱 ¿Tiene WhatsApp?', sampleTicketData.client.phone ? 'SÍ' : 'NO');
  console.log('🔗 URL WhatsApp:', `https://wa.me/${sampleTicketData.client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(sampleTicketData.client.name)}!%20Recibimos%20tu%20ticket%20%23${sampleTicketData.id}%20-%20${encodeURIComponent(sampleTicketData.title)}.%20Estamos%20revisando%20tu%20solicitud%20y%20te%20contactaremos%20pronto.`);
  
  // Guardar el HTML para preview
  fs.writeFileSync('email_test_preview.html', emailTemplate.html);
  console.log('💾 Email guardado en: email_test_preview.html');
  
} catch (error) {
  console.error('❌ Error generando template:', error);
}
