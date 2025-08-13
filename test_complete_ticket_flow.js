#!/usr/bin/env node
// Test completo del flujo de ticket con número de cliente

console.log('🚀 TEST COMPLETO: Flujo de Ticket con Número de Cliente');
console.log('='.repeat(65));
console.log('');

async function testCompleteTicketFlow() {
  try {
    // 1. Simular datos del formulario de contacto
    const formData = {
      name: 'Juan Pérez - Test',
      email: 'test.cliente@gmail.com',
      phone: '+59899123456', // ⚠️ NÚMERO DE PRUEBA
      subject: 'TEST: Problema con computadora',
      message: 'Este es un ticket de prueba para verificar que el número del cliente aparezca en el email.',
      priority: 'high'
    };

    console.log('📋 DATOS DEL FORMULARIO:');
    console.log('------------------------');
    console.log(`👤 Nombre: ${formData.name}`);
    console.log(`📧 Email: ${formData.email}`);
    console.log(`📱 Teléfono: ${formData.phone}`);
    console.log(`📝 Asunto: ${formData.subject}`);
    console.log(`⚠️ Prioridad: ${formData.priority}`);
    console.log('');

    // 2. Hacer la petición a la API
    console.log('📤 ENVIANDO TICKET A LA API...');
    console.log('-------------------------------');
    
    const response = await fetch('http://localhost:3000/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log('❌ ERROR:', errorData);
      return;
    }

    const result = await response.json();
    console.log('✅ TICKET CREADO EXITOSAMENTE');
    console.log(`🆔 ID del ticket: ${result.ticket.id}`);
    console.log(`👤 Cliente ID: ${result.ticket.clientId}`);
    console.log('');

    // 3. Verificar los datos del cliente en la respuesta
    console.log('🔍 VERIFICACIÓN DE DATOS DEL CLIENTE:');
    console.log('-------------------------------------');
    
    if (result.ticket.client) {
      console.log('✅ Cliente incluido en la respuesta');
      console.log(`   📛 Nombre: ${result.ticket.client.name}`);
      console.log(`   📧 Email: ${result.ticket.client.email}`);
      console.log(`   📱 Teléfono: ${result.ticket.client.phone || 'NO ENCONTRADO'}`);
      console.log(`   🏢 Empresa: ${result.ticket.client.company || 'N/A'}`);
      
      // Verificar específicamente el teléfono
      if (result.ticket.client.phone === formData.phone) {
        console.log('');
        console.log('🎉 ¡ÉXITO! El número del cliente se guardó correctamente');
      } else {
        console.log('');
        console.log('❌ PROBLEMA: El número del cliente no coincide');
        console.log(`   Esperado: ${formData.phone}`);
        console.log(`   Recibido: ${result.ticket.client.phone}`);
      }
    } else {
      console.log('❌ Cliente NO incluido en la respuesta');
    }
    
    console.log('');
    console.log('📧 VERIFICACIÓN DEL EMAIL:');
    console.log('---------------------------');
    console.log('✅ El email debería haber sido enviado automáticamente');
    console.log('📬 Revisar bandeja de entrada: techfixuruguay@gmail.com');
    console.log('');
    console.log('🔍 En el email deberías ver:');
    console.log(`   📱 Teléfono del cliente: ${formData.phone}`);
    console.log(`   💬 Botón WhatsApp con URL: https://wa.me/${formData.phone.replace(/[^0-9]/g, '')}`);
    console.log(`   🆔 Número de ticket: #${result.ticket.id}`);
    console.log('');
    console.log('🚨 SI EL NÚMERO NO APARECE EN EL EMAIL:');
    console.log('   1. Verifica que el ticket tenga client.phone en la base de datos');
    console.log('   2. Verifica que el template acceda a ticketData.client.phone');
    console.log('   3. Revisa los logs del servidor para errores en el email');

  } catch (error) {
    console.error('❌ ERROR EN EL TEST:', error.message);
    console.log('');
    console.log('🔧 POSIBLES SOLUCIONES:');
    console.log('   1. Asegúrate de que el servidor esté corriendo (npm run dev)');
    console.log('   2. Verifica la conexión a la base de datos');
    console.log('   3. Revisa las variables de entorno SMTP para email');
  }
}

// Ejecutar el test
testCompleteTicketFlow();
