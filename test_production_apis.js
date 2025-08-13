// Test para verificar APIs en producción
const testProductionAPIs = async () => {
  const baseUrl = 'https://techfix-c7ymqqn42-ales-projects-36689881.vercel.app';
  
  console.log('🧪 Probando APIs en producción...\n');

  // Test 1: API de cotizaciones
  console.log('Test 1: API de cotizaciones...');
  try {
    const response1 = await fetch(`${baseUrl}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Usuario Prod',
        email: 'test@example.com',
        phone: '+59899123456',
        company: 'Test Company',
        serviceType: 'Reparación de PC/Laptop',
        description: 'Prueba de cotización en producción'
      })
    });
    
    const data1 = await response1.json();
    console.log(`Status: ${response1.status}`);
    console.log('Response:', JSON.stringify(data1, null, 2));
  } catch (error) {
    console.error('Error en test de cotizaciones:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: API de tickets
  console.log('Test 2: API de tickets...');
  try {
    const response2 = await fetch(`${baseUrl}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Usuario Ticket',
        email: 'test@example.com',
        phone: '+59899123456',
        subject: 'Problema de prueba en producción',
        message: 'Este es un ticket de prueba para verificar errores en producción',
        priority: 'normal'
      })
    });
    
    const data2 = await response2.json();
    console.log(`Status: ${response2.status}`);
    console.log('Response:', JSON.stringify(data2, null, 2));
  } catch (error) {
    console.error('Error en test de tickets:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: API de tickets con datos inválidos
  console.log('Test 3: API de tickets con datos inválidos...');
  try {
    const response3 = await fetch(`${baseUrl}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'email-mal-formateado',
        phone: '123',
        subject: '',
        message: 'muy corto'
      })
    });
    
    const data3 = await response3.json();
    console.log(`Status: ${response3.status}`);
    console.log('Response:', JSON.stringify(data3, null, 2));
  } catch (error) {
    console.error('Error en test de validación:', error);
  }
};

// Ejecutar las pruebas
testProductionAPIs();
