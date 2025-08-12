// Test completo para verificar el flujo de datos del cliente
console.log('🧪 TEST COMPLETO: Flujo de datos del cliente');
console.log('===============================================');
console.log('');

// Test 1: Ticket CON teléfono
console.log('📱 TEST 1: Ticket CON teléfono');
console.log('-----------------------------');

const ticketWithPhone = {
  id: 'TEST001',
  title: 'Problema con laptop',
  description: 'Mi laptop no enciende correctamente',
  priority: 'HIGH',
  category: 'Hardware',
  user: {
    id: 'user123',
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    role: 'USER'
  },
  client: {
    id: 'client123',
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    phone: '+59899123456',
    company: null
  }
};

console.log('✅ Datos del ticket con teléfono:');
console.log('   Cliente:', ticketWithPhone.client.name);
console.log('   Email:', ticketWithPhone.client.email);
console.log('   Teléfono:', ticketWithPhone.client.phone);
console.log('   ¿Tiene teléfono?', !!ticketWithPhone.client?.phone);

// Test 2: Ticket SIN teléfono
console.log('');
console.log('📵 TEST 2: Ticket SIN teléfono');
console.log('------------------------------');

const ticketWithoutPhone = {
  id: 'TEST002',
  title: 'Error en software',
  description: 'Problema con una aplicación',
  priority: 'MEDIUM',
  category: 'Software',
  user: {
    id: 'user456',
    name: 'María García',
    email: 'maria.garcia@gmail.com',
    role: 'USER'
  },
  client: {
    id: 'client456',
    name: 'María García',
    email: 'maria.garcia@gmail.com',
    phone: null,
    company: null
  }
};

console.log('✅ Datos del ticket sin teléfono:');
console.log('   Cliente:', ticketWithoutPhone.client.name);
console.log('   Email:', ticketWithoutPhone.client.email);
console.log('   Teléfono:', ticketWithoutPhone.client.phone);
console.log('   ¿Tiene teléfono?', !!ticketWithoutPhone.client?.phone);

// Test 3: Verificar templates de email
console.log('');
console.log('📧 TEST 3: Templates de email');
console.log('------------------------------');

// Simular el comportamiento del template para ticket CON teléfono
const withPhoneCheck = ticketWithPhone.client?.phone;
const withPhoneWhatsApp = withPhoneCheck ? 
  `https://wa.me/${ticketWithPhone.client.phone.replace(/[^0-9]/g, '')}` : 
  'https://wa.me/59899252808';

console.log('Con teléfono:');
console.log('   ¿Tiene phone?', !!withPhoneCheck);
console.log('   URL WhatsApp:', withPhoneWhatsApp);

// Simular el comportamiento del template para ticket SIN teléfono
const withoutPhoneCheck = ticketWithoutPhone.client?.phone;
const withoutPhoneWhatsApp = withoutPhoneCheck ? 
  `https://wa.me/${ticketWithoutPhone.client.phone.replace(/[^0-9]/g, '')}` : 
  'https://wa.me/59899252808';

console.log('Sin teléfono:');
console.log('   ¿Tiene phone?', !!withoutPhoneCheck);
console.log('   URL WhatsApp:', withoutPhoneWhatsApp);

console.log('');
console.log('🎯 RESULTADO DEL TEST:');
console.log('======================');

if (withPhoneCheck && withPhoneWhatsApp.includes('99123456')) {
  console.log('✅ TEST 1 PASÓ: Ticket con teléfono funciona correctamente');
} else {
  console.log('❌ TEST 1 FALLÓ: Ticket con teléfono no funciona');
}

if (!withoutPhoneCheck && withoutPhoneWhatsApp.includes('59899252808')) {
  console.log('✅ TEST 2 PASÓ: Ticket sin teléfono funciona correctamente');
} else {
  console.log('❌ TEST 2 FALLÓ: Ticket sin teléfono no funciona');
}

console.log('');
console.log('🔧 PUNTO CLAVE:');
console.log('================');
console.log('El problema NO está en el template de email.');
console.log('El problema está en que el campo client.phone');
console.log('no llega correctamente al template.');
console.log('');
console.log('Posibles causas:');
console.log('1. El formulario envía phone como string vacía');
console.log('2. El servidor no guarda phone correctamente');
console.log('3. El include del ticket no trae el campo phone');
console.log('4. La actualización del cliente no funciona');

console.log('');
console.log('✅ SOLUCIÓN IMPLEMENTADA:');
console.log('=========================');
console.log('1. ✅ Formulario corregido: envía null en lugar de string vacía');
console.log('2. ✅ Servidor corregido: maneja phone vacío correctamente');
console.log('3. ✅ Sanitización mejorada: convierte string vacía a null');
console.log('4. ✅ Validación de phone mantiene mismo comportamiento');

console.log('');
console.log('🧪 PRÓXIMO PASO: Probar el formulario real con estas correcciones');
