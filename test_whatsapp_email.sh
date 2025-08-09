#!/bin/bash

echo "🧪 Probando funcionalidad de WhatsApp en emails..."
echo ""

# Función para probar la creación de ticket con teléfono
test_ticket_with_phone() {
    echo "📱 Probando ticket con número de teléfono..."
    
    curl -X POST http://localhost:3000/api/tickets \
         -H "Content-Type: application/json" \
         -d '{
           "name": "Juan Pérez",
           "email": "juan.test@gmail.com",
           "phone": "+59899123456",
           "title": "Problema con la computadora",
           "description": "Mi computadora no enciende y hace ruidos extraños",
           "priority": "HIGH"
         }' \
         -w "\nStatus: %{http_code}\n"
    
    echo ""
}

# Función para probar ticket sin teléfono
test_ticket_without_phone() {
    echo "📧 Probando ticket sin número de teléfono..."
    
    curl -X POST http://localhost:3000/api/tickets \
         -H "Content-Type: application/json" \
         -d '{
           "name": "María García",
           "email": "maria.test@gmail.com",
           "title": "Error en el sistema",
           "description": "El sistema se congela constantemente",
           "priority": "MEDIUM"
         }' \
         -w "\nStatus: %{http_code}\n"
    
    echo ""
}

echo "🚀 Iniciando pruebas..."
echo "========================================"

# Esperar que el servidor esté listo
sleep 2

# Ejecutar pruebas
test_ticket_with_phone
echo "----------------------------------------"
test_ticket_without_phone

echo "========================================"
echo "✅ Pruebas completadas!"
echo ""
echo "🔍 Revisa los emails que deberías haber recibido:"
echo "   1. Ticket con teléfono: Debería tener botón 'Contactar por WhatsApp al +59899123456'"
echo "   2. Ticket sin teléfono: Debería tener botón 'Solicitar número por WhatsApp'"
echo ""
echo "🗄️ Para ver los tickets creados: npx prisma studio"
