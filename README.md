# TechFix - Sistema de Gestión de Tickets

Sistema de gestión de tickets y clientes para servicios técnicos mejorado con las mejores prácticas de desarrollo.

## 🚀 Características

- ✅ Sistema de autenticación seguro
- ✅ Gestión de tickets con validación avanzada
- ✅ Gestión de clientes
- ✅ Panel de administración optimizado
- ✅ Formulario de contacto con validación
- ✅ Integración con WhatsApp
- ✅ Rate limiting para APIs
- ✅ Logging estructurado
- ✅ SEO optimizado
- ✅ PWA (Progressive Web App)
- ✅ Caché inteligente
- ✅ Manejo de errores mejorado
- ✅ Analytics integrado
- ✅ Validación de datos robusta

## 🔧 Mejoras Implementadas

### Seguridad
- ❌ **ELIMINADO**: Credenciales hardcodeadas
- ✅ **AÑADIDO**: Autenticación basada en base de datos
- ✅ **AÑADIDO**: Rate limiting en APIs críticas
- ✅ **AÑADIDO**: Validación y sanitización de inputs
- ✅ **AÑADIDO**: Headers de seguridad

### Performance
- ✅ **AÑADIDO**: Sistema de caché del servidor
- ✅ **AÑADIDO**: Optimización de consultas DB
- ✅ **AÑADIDO**: Lazy loading de componentes
- ✅ **AÑADIDO**: Service Worker para caché

### UX/UI
- ✅ **AÑADIDO**: Loading states mejorados
- ✅ **AÑADIDO**: Manejo de errores user-friendly
- ✅ **AÑADIDO**: Validación en tiempo real
- ✅ **AÑADIDO**: PWA capabilities

### Monitoring
- ✅ **AÑADIDO**: Logging estructurado
- ✅ **AÑADIDO**: Analytics tracking
- ✅ **AÑADIDO**: Error monitoring
- ✅ **AÑADIDO**: Performance monitoring

### SEO
- ✅ **AÑADIDO**: Meta tags optimizados
- ✅ **AÑADIDO**: Schema.org structured data
- ✅ **AÑADIDO**: Sitemap.xml automático
- ✅ **AÑADIDO**: Robots.txt optimizado

## 📋 Requisitos

- Node.js 18 o superior
- PostgreSQL (recomendado: Neon.tech gratuito)

## ⚙️ Setup Rápido

### Opción 1: Setup Automático (Recomendado)
```bash
git clone [tu-repo]
cd techfix
chmod +x setup.sh
./setup.sh
```

### Opción 2: Setup Manual

#### 1. Clonar el repositorio
```bash
git clone [tu-repo]
cd techfix
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar variables de entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita las variables necesarias
nano .env
```

**Variables importantes:**
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (genera una segura)
- `ADMIN_EMAIL`: Email del administrador
- `ADMIN_PASSWORD`: Contraseña del administrador (segura)

#### 4. Configurar base de datos PostgreSQL

##### Opción A: Neon.tech (Recomendado - Gratuito)
1. Ve a [neon.tech](https://neon.tech) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia la URL de conexión a `DATABASE_URL` en .env

##### Opción B: PostgreSQL local
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
```

#### 5. Inicializar base de datos
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

#### 6. Ejecutar en desarrollo
```bash
npm run dev
```

## 📱 PWA Installation

La aplicación está configurada como PWA. Los usuarios pueden:
1. Visitar la web en mobile
2. Elegir "Añadir a pantalla de inicio"
3. Usar como app nativa

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Base de datos
npx prisma studio      # Explorar DB
npx prisma generate    # Regenerar cliente
npx prisma db push     # Aplicar cambios schema
npx prisma db seed     # Poblar datos iniciales

# Linting
npm run lint
npm run lint:fix
```

## 📊 Monitoring y Analytics

### Variables de entorno opcionales para monitoring:
```bash
# Google Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Sentry (Error tracking)
SENTRY_DSN="https://xxxxx.ingest.sentry.io/xxxxx"

# Otras herramientas
HOTJAR_ID="1234567"
CLARITY_PROJECT_ID="xxxxxxxxx"
```
cp .env.example .env

# Edita .env con tus datos:
DATABASE_URL="postgresql://usuario:password@host:5432/database?sslmode=require"
JWT_SECRET="tu_clave_secreta_super_segura_aqui"
```

### 5. Migrar la base de datos
```bash
# Opción A: Script automático
./migrate-to-postgres.sh

# Opción B: Manual
npx prisma generate
npx prisma migrate deploy
npx prisma db push
```

### 6. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔐 Acceso de Administrador

- **Email:** techfixuruguay@gmail.com
- **Contraseña:** Agustin2025

## 🚀 Deploy en Vercel

### 1. Configurar variables de entorno en Vercel
```bash
# Agregar variables en Vercel Dashboard:
DATABASE_URL=tu_postgresql_url
JWT_SECRET=tu_clave_secreta
```

### 2. Deploy
```bash
vercel --prod
```

O conecta tu repositorio GitHub con Vercel para deploys automáticos.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/           # Panel de administración
│   ├── api/             # API Routes
│   ├── contact/         # Página de contacto
│   ├── login/           # Página de login
│   └── services/        # Página de servicios
├── components/          # Componentes React
├── hooks/              # Custom hooks
└── lib/                # Utilidades y configuración
```

## 🛠️ Tecnologías

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Base de datos:** PostgreSQL
- **Autenticación:** JWT, bcryptjs
- **Deploy:** Vercel

## 📞 Soporte

Para soporte técnico, contacta a: techfixuruguay@gmail.com
