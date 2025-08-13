#!/usr/bin/env node
// Test específico para debugear el número de cliente en emails

console.log('🔍 DEBUG: NÚMERO DE CLIENTE EN EMAIL DE TICKETS');
console.log('='.repeat(60));
console.log('');

// Simular los datos que llegan al template de email
const ticketDataCON_TELEFONO = {
  id: 'TK001',
  title: 'Problema con laptop',
  description: 'Mi laptop no enciende y necesito ayuda urgente',
  priority: 'HIGH',
  category: 'Hardware',
  status: 'OPEN',
  client: {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    phone: '+59891234567',
    company: 'Empresa ABC'
  },
  user: {
    id: 2,
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    role: 'CUSTOMER'
  }
};

const ticketDataSIN_TELEFONO = {
  id: 'TK002',
  title: 'Error en sistema',
  description: 'Tengo un error en mi computadora que no puedo resolver',
  priority: 'MEDIUM',
  category: 'Software',
  status: 'OPEN',
  client: {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@gmail.com',
    phone: null, // ⚠️ SIN TELÉFONO
    company: null
  },
  user: {
    id: 3,
    name: 'María García',
    email: 'maria.garcia@gmail.com',
    role: 'CUSTOMER'
  }
};

console.log('📋 CASOS DE PRUEBA:');
console.log('-------------------');
console.log('1️⃣ TICKET CON TELÉFONO:');
console.log(`   👤 Cliente: ${ticketDataCON_TELEFONO.client.name}`);
console.log(`   📱 Teléfono: ${ticketDataCON_TELEFONO.client.phone}`);
console.log(`   📧 Email: ${ticketDataCON_TELEFONO.client.email}`);
console.log('');
console.log('2️⃣ TICKET SIN TELÉFONO:');
console.log(`   👤 Cliente: ${ticketDataSIN_TELEFONO.client.name}`);
console.log(`   📱 Teléfono: ${ticketDataSIN_TELEFONO.client.phone || 'NO PROPORCIONADO'}`);
console.log(`   📧 Email: ${ticketDataSIN_TELEFONO.client.email}`);
console.log('');

// Función simplificada del template para testing
function testEmailTemplate(ticketData) {
  const hasPhone = ticketData.client?.phone;
  const clientName = ticketData.client?.name || ticketData.user.name;
  const clientPhone = ticketData.client?.phone;
  
  console.log(`🧪 TESTING TICKET #${ticketData.id}:`);
  console.log(`   ✅ ticketData.client existe: ${!!ticketData.client}`);
  console.log(`   ✅ ticketData.client.phone existe: ${!!hasPhone}`);
  console.log(`   ✅ Valor del teléfono: "${clientPhone}"`);
  console.log('');
  
  // Verificaciones específicas
  if (hasPhone) {
    console.log('   📱 LÓGICA CON TELÉFONO:');
    console.log(`     - Se muestra: ${clientPhone}`);
    console.log(`     - URL WhatsApp: https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}`);
    console.log(`     - Botón habilitado: ✅ SÍ`);
    console.log('');
  } else {
    console.log('   📵 LÓGICA SIN TELÉFONO:');
    console.log(`     - Se muestra: "No proporcionado"`);
    console.log(`     - Botón WhatsApp: ❌ Deshabilitado`);
    console.log(`     - Mensaje alternativo: Solicitar por WhatsApp`);
    console.log('');
  }
  
  return {
    hasPhone,
    clientName,
    clientPhone,
    whatsappUrl: hasPhone ? `https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}` : null
  };
}

console.log('🧪 EJECUTANDO TESTS:');
console.log('====================');
console.log('');

// Test 1: Con teléfono
console.log('1️⃣ TICKET CON TELÉFONO:');
testEmailTemplate(ticketDataCON_TELEFONO);

// Test 2: Sin teléfono
console.log('2️⃣ TICKET SIN TELÉFONO:');
testEmailTemplate(ticketDataSIN_TELEFONO);

console.log('🔍 PUNTOS A VERIFICAR EN EL EMAIL REAL:');
console.log('=======================================');
console.log('1. ¿Aparece el número del cliente en la sección "Información del Cliente"?');
console.log('2. ¿El botón de WhatsApp tiene el número correcto del cliente?');
console.log('3. ¿Si no hay teléfono, se muestra "Sin WhatsApp" correctamente?');
console.log('4. ¿Tu número de negocio aparece solo en el footer como "Oficina"?');
console.log('');
console.log('📧 PARA VERIFICAR: Crear un ticket desde /contact con tu número de teléfono');
console.log('   y revisar el email que llegue a techfixuruguay@gmail.com');
console.log('');
console.log('🚨 SI EL PROBLEMA PERSISTE:');
console.log('   1. Verifica que el formulario envíe el campo "phone"');
console.log('   2. Verifica que la API guarde el teléfono en la base de datos');
console.log('   3. Verifica que el include traiga el client.phone');
console.log('   4. Verifica que el template acceda a ticketData.client.phone');
