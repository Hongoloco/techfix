# TechFix - Sistema de Gestión de Tickets

Sistema de gestión de tickets y clientes para servicios técnicos.

## 🚀 Características

- ✅ Sistema de autenticación (admin único)
- ✅ Gestión de tickets
- ✅ Gestión de clientes
- ✅ Panel de administración
- ✅ Formulario de contacto
- ✅ Integración con WhatsApp

## 📋 Requisitos

- Node.js 18 o superior
- PostgreSQL (recomendado: Neon.tech gratuito)

## ⚙️ Configuración

### 1. Clonar el repositorio
```bash
git clone [tu-repo]
cd techfix
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar base de datos PostgreSQL

#### Opción A: Neon.tech (Recomendado - Gratuito)
1. Ve a [neon.tech](https://neon.tech) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia la URL de conexión

#### Opción B: PostgreSQL local
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
```

### 4. Configurar variables de entorno
```bash
# Copia el archivo de ejemplo
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
