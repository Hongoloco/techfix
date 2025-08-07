#!/bin/bash

echo "🔄 Iniciando migración a PostgreSQL..."

# Verificar que exista el archivo .env
if [ ! -f .env ]; then
    echo "❌ Error: No se encontró el archivo .env"
    echo "Crea el archivo .env con DATABASE_URL y JWT_SECRET"
    exit 1
fi

# Generar el cliente de Prisma
echo "📦 Generando cliente de Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones..."
npx prisma migrate deploy

# Verificar conexión
echo "✅ Verificando conexión a la base de datos..."
npx prisma db push

echo "🎉 Migración completada exitosamente!"
echo "💡 Ahora puedes ejecutar: npm run dev"
