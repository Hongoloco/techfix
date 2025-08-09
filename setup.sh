#!/bin/bash

# Script de setup automatizado para TechFix
echo "🚀 Configurando TechFix Uruguay..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instálalo desde https://nodejs.org"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está disponible"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo "✅ npm $(npm -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar archivo .env
if [ ! -f .env ]; then
    echo "⚙️ Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Configura las variables en .env antes de continuar"
fi

# Generar Prisma client
echo "🗄️ Generando cliente de Prisma..."
npx prisma generate

# Verificar base de datos
if [ -n "$DATABASE_URL" ]; then
    echo "🔍 Verificando conexión a la base de datos..."
    npx prisma db push
    echo "🌱 Ejecutando seed de la base de datos..."
    npx prisma db seed
else
    echo "⚠️  DATABASE_URL no configurado en .env"
fi

echo ""
echo "🎉 ¡Setup completado!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Configura las variables en .env"
echo "2. Ejecuta: npm run dev"
echo "3. Abre: http://localhost:3000"
echo ""
echo "📚 Comandos útiles:"
echo "  npm run dev          - Modo desarrollo"
echo "  npm run build        - Compilar para producción"
echo "  npm run start        - Ejecutar en producción"
echo "  npx prisma studio    - Explorar base de datos"
echo ""
