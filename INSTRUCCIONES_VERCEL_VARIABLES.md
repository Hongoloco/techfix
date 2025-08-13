# 🔧 INSTRUCCIONES: Configurar Variables en Vercel (Paso a Paso)

## 🎯 Problema actual:
La `DATABASE_URL` está mal configurada. Necesitas acceder a Vercel.com para corregirla.

## 📋 Pasos exactos para solucionarlo:

### 1. Ve a Vercel Dashboard
1. Abre **https://vercel.com/dashboard**
2. Busca tu proyecto **"techfix"**
3. Haz clic en el proyecto

### 2. Accede a Environment Variables
1. Haz clic en **"Settings"** (arriba)
2. En el menú izquierdo, haz clic en **"Environment Variables"**

### 3. Encuentra y edita DATABASE_URL
1. Busca la variable **"DATABASE_URL"**
2. Haz clic en los **3 puntos** (...) al lado
3. Selecciona **"Edit"**

### 4. Copia esta URL exacta:
```
postgresql://neondb_owner:npg_XaMjlHY8LD4Q@ep-still-violet-acm0pnu3.sa-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
```

### 5. Configurar todos los entornos:
- ✅ **Production** (obligatorio)
- ✅ **Preview** (recomendado)
- ✅ **Development** (opcional)

### 6. Verificar otras variables importantes:
Asegúrate de que también tengas:

```
JWT_SECRET = Agustin28
ADMIN_EMAIL = techfixuruguay@gmail.com
ADMIN_PASSWORD = TechFix2025!Admin
NODE_ENV = production
```

### 7. Guardar y hacer nuevo deploy:
1. Haz clic **"Save"**
2. Regresa a la terminal
3. Ejecuta: `vercel --prod`

## 🧪 Para verificar que funciona:
Después del deploy, prueba: https://tu-nueva-url.vercel.app/quote

## 🔍 Si sigues teniendo problemas:
1. Verifica que la URL empiece con `postgresql://`
2. Asegúrate de que no haya espacios al principio o final
3. Confirma que esté configurada para **Production**

## ✅ Resultado esperado:
- Formularios funcionando (sin error 500)
- Base de datos persistente
- Aplicación completamente funcional

---
**📞 ¿Sigues teniendo problemas?** Comparte un screenshot de tus Environment Variables en Vercel.
