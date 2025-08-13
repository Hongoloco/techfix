#!/bin/bash

# Script para configurar PostgreSQL en Neon.tech para producción
echo "🐘 Configurando PostgreSQL para TechFix en Neon.tech"
echo "================================================"
echo ""

echo "1. Ve a https://neon.tech"
echo "2. Crea una cuenta gratuita o inicia sesión"
echo "3. Crea un nuevo proyecto llamado 'techfix'"
echo "4. Selecciona la región más cercana (preferible: US East)"
echo "5. Copia la connection string que se genera"
echo ""

echo "La connection string debe verse así:"
echo "postgresql://username:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
echo ""

echo "6. En Vercel, ve a tu proyecto TechFix"
echo "7. Ve a Settings > Environment Variables"
echo "8. Edita la variable DATABASE_URL con tu nueva connection string de Neon"
echo ""

echo "Variables que necesitas en Vercel:"
echo "================================="
echo "DATABASE_URL = tu-connection-string-de-neon"
echo "JWT_SECRET = 3048e68ed3ae896d98f4fa8ed8560a4c126ecb142c3d2781ba535b27a1190cd4"
echo "ADMIN_EMAIL = techfixuruguay@gmail.com"
echo "ADMIN_PASSWORD = TechFix2025!Admin"
echo "NODE_ENV = production"
echo ""

echo "Para configurar SMTP (opcional pero recomendado):"
echo "BUSINESS_EMAIL = techfixuruguay@gmail.com"
echo "SMTP_HOST = smtp.gmail.com"
echo "SMTP_PORT = 587"
echo "SMTP_USER = techfixuruguay@gmail.com"
echo "SMTP_PASS = tu-app-password-de-gmail"
echo ""

echo "9. Después de configurar las variables, haz un nuevo deploy:"
echo "   vercel --prod"
echo ""

echo "🔄 Migraciones de base de datos:"
echo "================================"
echo "Una vez configurada la DATABASE_URL, ejecuta:"
echo "1. npx prisma migrate dev --name init"
echo "2. npx prisma db push"
echo "3. node init-admin.js (para crear usuario admin)"
echo ""

echo "✅ Cuando todo esté listo, tu aplicación funcionará en producción"
