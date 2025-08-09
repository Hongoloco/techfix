# 🚀 Deploy TechFix a Vercel - Guía Rápida

## ⚡ Deploy Instantáneo

### Opción A: Un Solo Click
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Hongoloco/techfix)

### Opción B: Manual (Recomendado)

1. **Ve a**: https://vercel.com/new
2. **Importa**: `Hongoloco/techfix` desde GitHub
3. **Configura variables de entorno** (ver abajo)
4. **Deploy!**

## 🔧 Variables de Entorno Obligatorias

```bash
# Base de datos PostgreSQL (crear en neon.tech)
DATABASE_URL=postgresql://user:pass@host:5432/database

# Seguridad
JWT_SECRET=3048e68ed3ae896d98f4fa8ed8560a4c126ecb142c3d2781ba535b27a1190cd4

# Admin inicial
ADMIN_EMAIL=techfixuruguay@gmail.com
ADMIN_PASSWORD=TechFix2025!Admin

# Configuración
NODE_ENV=production
```

## 🗄️ Base de Datos (1 minuto)

1. Ve a https://neon.tech
2. Crea cuenta → Nuevo proyecto "techfix"  
3. Copia la URL de conexión
4. Pégala en `DATABASE_URL` en Vercel

## ✅ Post-Deploy

Después del deploy:
1. Ve a tu URL de Vercel
2. Las tablas se crearán automáticamente
3. Se creará el usuario admin automáticamente
4. ¡Listo para usar!

## 🔗 URLs Finales

- **App**: https://techfix-xxx.vercel.app
- **Admin**: https://techfix-xxx.vercel.app/admin
- **Login**: https://techfix-xxx.vercel.app/login

## 💡 Funcionalidades Activadas

✅ Sistema completo de tickets  
✅ Panel de administración  
✅ Autenticación segura  
✅ WhatsApp en emails  
✅ PWA instalable  
✅ Analytics y monitoring  
✅ SEO optimizado  

¡Tu negocio de soporte técnico listo en 5 minutos! 🎯
