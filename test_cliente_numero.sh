#!/bin/bash

echo "🧪 TESTING: Verificar número de cliente en email"
echo "=============================================="
echo

# Crear un ticket de prueba con número específico
echo "📱 Creando ticket con número de cliente: +59891234567"
echo

# Simular datos del ticket
cat > /tmp/test_ticket_data.json << 'EOF'
{
  "id": "test123",
  "title": "Problema con laptop",
  "description": "Mi laptop no enciende",
  "priority": "ALTA",
  "category": "Hardware",
  "client": {
    "name": "Juan Pérez",
    "email": "juan.perez@email.com",
    "phone": "+59891234567",
    "company": "Empresa Test"
  },
  "user": {
    "name": "Juan Pérez",
    "email": "juan.perez@email.com"
  }
}
EOF

echo "✅ Datos del ticket creados"
echo "📧 Cliente: Juan Pérez"
echo "📱 Teléfono cliente: +59891234567"
echo "🏢 Tu número de negocio: +59899252808"
echo
echo "❗ Verificar que en el email aparezca:"
echo "   1. Botón WhatsApp al cliente: +59891234567"
echo "   2. En footer tu número de negocio: +59899252808"
echo
echo "🔍 Revisa el archivo email_new.ts línea 184"
