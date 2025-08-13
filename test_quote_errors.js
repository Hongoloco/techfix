// Test para el sistema de cotizaciones mejorado
const testQuoteErrors = async () => {
  console.log('🧪 Probando sistema de errores de cotizaciones...\n');

  // Test 1: Datos vacíos (errores de validación)
  console.log('Test 1: Enviando datos vacíos...');
  try {
    const response1 = await fetch('http://localhost:3000/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'email-mal-formateado',
        phone: '123',
        serviceType: '',
        description: 'muy corto'
      })
    });
    
    const data1 = await response1.json();
    console.log(`Status: ${response1.status}`);
    console.log('Response:', JSON.stringify(data1, null, 2));
  } catch (error) {
    console.error('Error en test 1:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Datos válidos (debe funcionar)
  console.log('Test 2: Enviando datos válidos...');
  try {
    const response2 = await fetch('http://localhost:3000/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Juan Pérez Test',
        email: 'test@example.com',
        phone: '+59899123456',
        company: 'Empresa Test',
        serviceType: 'Reparación de computadoras',
        description: 'Necesito reparar una laptop que no enciende. El equipo es una Dell Inspiron de 2019.'
      })
    });
    
    const data2 = await response2.json();
    console.log(`Status: ${response2.status}`);
    console.log('Response:', JSON.stringify(data2, null, 2));
  } catch (error) {
    console.error('Error en test 2:', error);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Email inválido específico
  console.log('Test 3: Email inválido específico...');
  try {
    const response3 = await fetch('http://localhost:3000/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Usuario Test',
        email: 'email@incompleto',
        phone: '+59899123456',
        serviceType: 'Consultoría IT',
        description: 'Este es un test con email mal formateado para ver el error específico'
      })
    });
    
    const data3 = await response3.json();
    console.log(`Status: ${response3.status}`);
    console.log('Response:', JSON.stringify(data3, null, 2));
  } catch (error) {
    console.error('Error en test 3:', error);
  }
};

// Ejecutar las pruebas
testQuoteErrors();
