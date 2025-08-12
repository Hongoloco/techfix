// Test para debugear los datos del cliente que se envían
const testFormData = {
  name: "Juan Pérez Test",
  email: "juan.test@email.com", 
  phone: "+59899123456",
  subject: "Problema con mi laptop",
  message: "Mi laptop no enciende y hace ruidos extraños",
  priority: "urgent"
};

console.log('🔍 DEBUGGING DATOS DEL CLIENTE');
console.log('==============================');
console.log('');

console.log('📤 DATOS QUE SE ENVÍAN AL SERVIDOR:');
console.log('-----------------------------------');
console.log('Nombre:', testFormData.name);
console.log('Email:', testFormData.email);
console.log('Teléfono:', testFormData.phone);
console.log('Asunto:', testFormData.subject);
console.log('Mensaje:', testFormData.message);
console.log('Prioridad:', testFormData.priority);
console.log('');

// Simular el proceso del servidor
console.log('🔄 PROCESO EN EL SERVIDOR:');
console.log('-------------------------');

// 1. Los datos llegan al API
console.log('1. ✅ Los datos llegan a /api/tickets');
console.log('   body =', JSON.stringify(testFormData, null, 2));

// 2. Se procesan los campos
const { name, email, phone, subject: title, message: description, priority } = testFormData;
console.log('');
console.log('2. ✅ Se extraen los campos:');
console.log('   name =', name);
console.log('   email =', email);
console.log('   phone =', phone);
console.log('   title =', title);
console.log('   description =', description);
console.log('   priority =', priority);

// 3. Se busca/crea el cliente
console.log('');
console.log('3. ✅ Se busca o crea el cliente:');
console.log('   - Se busca cliente con email:', email);
console.log('   - Si no existe, se crea con:');
console.log('     * name:', name);
console.log('     * email:', email);
console.log('     * phone:', phone);

// 4. Se crea el ticket
console.log('');
console.log('4. ✅ Se crea el ticket asociado al cliente');
console.log('   - clientId: [ID del cliente]');
console.log('   - userId: [ID del usuario]');

// 5. Se genera el email
console.log('');
console.log('5. ✅ Se genera el email con datos del ticket que incluye:');
console.log('   - ticket.client.name:', name);
console.log('   - ticket.client.email:', email);
console.log('   - ticket.client.phone:', phone);

console.log('');
console.log('🎯 PUNTOS A VERIFICAR:');
console.log('======================');
console.log('✅ 1. Los datos se envían correctamente desde el formulario');
console.log('✅ 2. El API procesa name, email, phone correctamente');
console.log('✅ 3. Se crea/actualiza el cliente con phone');
console.log('✅ 4. El ticket se asocia al cliente (clientId)');
console.log('✅ 5. El email usa ticket.client.phone en lugar de solo phone');

console.log('');
console.log('⚠️  POSIBLES PROBLEMAS:');
console.log('======================');
console.log('❓ 1. ¿El campo phone se está enviando vacío desde el formulario?');
console.log('❓ 2. ¿La validación está rechazando el teléfono?');
console.log('❓ 3. ¿El cliente se está creando sin phone?');
console.log('❓ 4. ¿El include no está trayendo el campo phone del cliente?');
console.log('❓ 5. ¿El template de email no está accediendo a ticket.client.phone?');

console.log('');
console.log('🔧 PARA DEBUGEAR:');
console.log('=================');
console.log('1. Agregar console.log en /api/tickets/route.ts después de const { name, email, phone } = body');
console.log('2. Agregar console.log antes de crear el cliente');
console.log('3. Agregar console.log del ticket creado con client incluido');
console.log('4. Verificar que el template reciba ticket.client.phone');
