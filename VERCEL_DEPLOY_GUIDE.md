# 🚀 Guía de Deploy a Vercel - TechFix Uruguay

## 📋 Pre-requisitos

Antes de hacer el deploy, necesitas configurar estos servicios:

### 1. 🗄️ Base de Datos PostgreSQL (Neon.tech - GRATIS)

1. Ve a https://neon.tech
2. Crea una cuenta gratuita  
3. Crea un nuevo proyecto llamado "techfix"
4. Copia la URL de conexión (algo como: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/techfixdb`)

### 2. 📧 Email SMTP (Gmail)

1. Ve a https://myaccount.google.com/apppasswords
2. Genera una contraseña de aplicación para "TechFix"
3. Guarda la contraseña generada

## ⚙️ Variables de Entorno para Vercel

Configura estas variables en el dashboard de Vercel:

```bash
# Base de datos (OBLIGATORIO)
DATABASE_URL="postgresql://user:pass@host/db"

# Autenticación (OBLIGATORIO) 
JWT_SECRET="tu-jwt-super-secreto-de-32-caracteres-minimo"

# Admin inicial (OBLIGATORIO)
ADMIN_EMAIL="techfixuruguay@gmail.com"
ADMIN_PASSWORD="TechFix2025!Secure"

# Email (OPCIONAL pero recomendado)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587" 
EMAIL_SECURE="false"
EMAIL_USER="techfixuruguay@gmail.com"
EMAIL_PASS="tu-password-de-aplicacion-gmail"

# Business
BUSINESS_EMAIL="techfixuruguay@gmail.com"
SITE_URL="https://tu-dominio.vercel.app"

# Configuración
NODE_ENV="production"
```

## 🚀 Pasos para Deploy

### 1. Configurar Base de Datos

```bash
# Con la URL de Neon.tech configurada, ejecutar:
npx prisma db push
npx prisma db seed
```

### 2. Deploy Manual (Método seguro)

```bash
# Hacer deploy paso a paso:
vercel --prod

# O usar el dashboard de Vercel:
# 1. Ir a vercel.com/dashboard
# 2. Importar desde GitHub  
# 3. Configurar variables de entorno
# 4. Deploy
```

## 🔧 Troubleshooting

### Error de Build:
- Verifica que todas las variables obligatorias estén configuradas
- Revisa que DATABASE_URL sea válida
- Asegúrate que JWT_SECRET tenga al menos 32 caracteres

### Error de Base de Datos:
- Verifica la conexión a PostgreSQL
- Ejecuta las migraciones con `prisma db push`
- Pobla datos iniciales con `prisma db seed`

## ✅ Verificación Post-Deploy

1. **Página principal**: https://tu-dominio.vercel.app
2. **Login admin**: https://tu-dominio.vercel.app/login
3. **API health**: https://tu-dominio.vercel.app/api/debug

## 🎯 URLs Finales

Una vez deployado tendrás:
- **Producción**: https://techfix-xxx.vercel.app
- **Dashboard**: https://vercel.com/tu-usuario/techfix
- **Analytics**: Panel de Vercel + tu GA (si configuraste)

¡Tu app estará lista para recibir clientes reales! 🚀
