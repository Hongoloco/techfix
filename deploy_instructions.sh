#!/bin/bash

echo "🚀 Configurando TechFix para Deploy en Vercel..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 PASOS PARA DEPLOY EXITOSO:${NC}"
echo ""

echo -e "${YELLOW}1. 🗄️ CONFIGURAR BASE DE DATOS POSTGRESQL${NC}"
echo "   Ve a: https://neon.tech"
echo "   - Crea cuenta gratuita"
echo "   - Nuevo proyecto: 'techfix'"
echo "   - Copia la URL de conexión"
echo ""

echo -e "${YELLOW}2. ⚙️ VARIABLES DE ENTORNO PARA VERCEL${NC}"
echo "   En el dashboard de Vercel, configura:"
echo ""
echo "   DATABASE_URL='postgresql://user:pass@host:5432/db'"
echo "   JWT_SECRET='3048e68ed3ae896d98f4fa8ed8560a4c126ecb142c3d2781ba535b27a1190cd4'"
echo "   ADMIN_EMAIL='techfixuruguay@gmail.com'"
echo "   ADMIN_PASSWORD='TechFix2025!Admin'"
echo "   NODE_ENV='production'"
echo ""

echo -e "${YELLOW}3. 🚀 DEPLOY DESDE GITHUB${NC}"
echo "   - Ve a: https://vercel.com/new"
echo "   - Importa: Hongoloco/techfix"
echo "   - Configura variables de entorno"
echo "   - Deploy!"
echo ""

echo -e "${GREEN}✅ REPO ACTUALIZADO Y LISTO PARA DEPLOY${NC}"
echo ""

echo -e "${BLUE}🔗 ENLACES ÚTILES:${NC}"
echo "   📊 GitHub: https://github.com/Hongoloco/techfix"
echo "   🌐 Vercel: https://vercel.com/new"
echo "   🗄️ Neon DB: https://neon.tech"
echo ""

echo -e "${GREEN}🎯 ¡Tu app estará lista en 5 minutos!${NC}"
