#!/bin/bash

echo "🔍 VERIFICADOR DE VARIABLES DE VERCEL"
echo "===================================="
echo ""

echo "🔄 Obteniendo variables actuales de Vercel..."
vercel env ls

echo ""
echo "🔍 Descargando variables de producción..."
vercel env pull .env.vercel.check

echo ""
echo "📋 Variables encontradas:"
echo "========================"
cat .env.vercel.check

echo ""
echo "🧪 Probando conexión a base de datos..."
if grep -q "postgresql://" .env.vercel.check; then
    echo "✅ DATABASE_URL tiene formato PostgreSQL correcto"
else
    echo "❌ DATABASE_URL NO tiene formato PostgreSQL"
    echo "   Debe empezar con: postgresql://"
fi

echo ""
echo "🎯 Variables críticas que necesitas:"
echo "=================================="
echo "✅ DATABASE_URL = postgresql://..."
echo "✅ JWT_SECRET = (cualquier string)"
echo "✅ ADMIN_EMAIL = techfixuruguay@gmail.com"
echo "✅ ADMIN_PASSWORD = TechFix2025!Admin"
echo "✅ NODE_ENV = production"

echo ""
echo "🚀 Próximo paso:"
echo "==============="
echo "1. Si DATABASE_URL está mal → Corregir en vercel.com"
echo "2. Si está bien → Hacer: vercel --prod"
echo "3. Probar: curl tu-url.vercel.app/api/quotes"

# Limpiar archivo temporal
rm -f .env.vercel.check
