// Test script para probar eliminación de clientes
const testClientDeletion = async () => {
  console.log('🧪 Iniciando prueba de eliminación de clientes...')

  try {
    // 1. Obtener token del localStorage (simular autenticación)
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('❌ No hay token de autenticación')
      return
    }

    console.log('✅ Token encontrado')

    // 2. Crear cliente de prueba
    console.log('📝 Creando cliente de prueba...')
    const createResponse = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Cliente Prueba Eliminación',
        email: `test-delete-${Date.now()}@example.com`,
        phone: '+598 99 999 999',
        company: 'Empresa de Prueba',
        address: 'Dirección de prueba 123',
        notes: 'Cliente creado automáticamente para probar eliminación'
      })
    })

    if (!createResponse.ok) {
      throw new Error(`Error al crear cliente: ${createResponse.status} ${createResponse.statusText}`)
    }

    const createdClient = await createResponse.json()
    console.log('✅ Cliente creado:', createdClient.name, '(ID:', createdClient.id, ')')

    // 3. Eliminar cliente
    console.log('🗑️ Eliminando cliente...')
    const deleteResponse = await fetch(`/api/admin/clients/${createdClient.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json()
      throw new Error(`Error al eliminar cliente: ${deleteResponse.status} - ${errorData.error || deleteResponse.statusText}`)
    }

    const deleteResult = await deleteResponse.json()
    console.log('✅ Cliente eliminado exitosamente:', deleteResult.message)
    
    if (deleteResult.deletedRelatedData) {
      console.log('📊 Datos relacionados eliminados:', deleteResult.deletedRelatedData)
    }

    // 4. Verificar que el cliente ya no existe
    console.log('🔍 Verificando eliminación...')
    const checkResponse = await fetch(`/api/admin/clients/${createdClient.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (checkResponse.status === 404) {
      console.log('✅ Verificación exitosa: el cliente ya no existe')
    } else {
      console.log('⚠️ El cliente aún existe después de la eliminación')
    }

    console.log('🎉 Prueba de eliminación completada exitosamente')

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Ejecutar la prueba
console.log('Ejecuta: testClientDeletion() para probar la eliminación de clientes')

// Auto-ejecutar si estamos en el contexto correcto
if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
  // testClientDeletion()
}
