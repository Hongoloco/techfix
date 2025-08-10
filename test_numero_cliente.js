// Test para verificar que el número del cliente aparece correctamente en el email
const { newTicketEmailTemplate } = require('./src/lib/email_new.ts');

const ticketData = {
  id: 'TEST123',
  title: 'Problema con laptop',
  description: 'Mi laptop no enciende, necesito ayuda urgente',
  priority: 'ALTA',
  category: 'Hardware',
  client: {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+59891234567',
    company: 'Empresa Test'
  },
  user: {
    name: 'Juan Pérez',
    email: 'juan.perez@email.com'
  }
};

console.log('🧪 TESTING: Número de cliente en email de ticket');
console.log('================================================');
console.log('');
console.log('📋 Datos del ticket:');
console.log(`   👤 Cliente: ${ticketData.client.name}`);
console.log(`   📱 Teléfono cliente: ${ticketData.client.phone}`);
console.log(`   📧 Email cliente: ${ticketData.client.email}`);
console.log('');

try {
  const template = newTicketEmailTemplate(ticketData);
  
  // Verificar que el número del cliente aparezca en el template
  const hasClientPhone = template.html.includes(ticketData.client.phone);
  const hasClientWhatsAppButton = template.html.includes(`wa.me/${ticketData.client.phone.replace(/[^0-9]/g, '')}`);
  const hasOfficialBusinessNumber = template.html.includes('🏢 Oficina: +59899252808');
  
  console.log('✅ VERIFICACIONES:');
  console.log(`   📱 Número del cliente aparece: ${hasClientPhone ? '✅ SÍ' : '❌ NO'}`);
  console.log(`   💬 Botón WhatsApp al cliente: ${hasClientWhatsAppButton ? '✅ SÍ' : '❌ NO'}`);
  console.log(`   🏢 Tu número como "Oficina": ${hasOfficialBusinessNumber ? '✅ SÍ' : '❌ NO'}`);
  console.log('');
  
  if (hasClientPhone && hasClientWhatsAppButton && hasOfficialBusinessNumber) {
    console.log('🎉 ¡CORRECTO! El template está funcionando bien:');
    console.log('   - Muestra el número del cliente para contacto directo');
    console.log('   - Tu número aparece claramente como "Oficina"');
    console.log('   - No hay confusión entre números');
  } else {
    console.log('❌ HAY PROBLEMAS en el template');
    if (!hasClientPhone) console.log('   - No aparece el número del cliente');
    if (!hasClientWhatsAppButton) console.log('   - No hay botón WhatsApp al cliente');
    if (!hasOfficialBusinessNumber) console.log('   - Tu número no está clarificado como "Oficina"');
  }
  
  console.log('');
  console.log('📧 TEXTO PLANO del email:');
  console.log(template.text.substring(0, 500) + '...');
  
} catch (error) {
  console.error('❌ Error al generar template:', error);
}
