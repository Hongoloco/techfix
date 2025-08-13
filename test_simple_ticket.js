// Test simple para crear ticket con número de cliente
const testData = {
  name: 'Juan Pérez - Test Debug',
  email: 'test.debug@gmail.com',
  phone: '+59899123456',
  subject: 'TEST DEBUG: Verificar número cliente',
  message: 'Ticket de prueba para verificar que el número del cliente aparezca en el email.',
  priority: 'high'
};

console.log('🧪 CREANDO TICKET DE PRUEBA...');
console.log('Datos:', JSON.stringify(testData, null, 2));

fetch('http://localhost:3000/api/tickets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
  console.log('✅ RESPUESTA:', data);
  if (data.ticket) {
    console.log('🔍 CLIENTE:', data.ticket.client);
    console.log('📱 TELÉFONO:', data.ticket.client?.phone);
  }
})
.catch(err => console.error('❌ ERROR:', err));
