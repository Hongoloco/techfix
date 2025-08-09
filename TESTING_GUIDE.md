# 🧪 Guía de Pruebas - TechFix Uruguay

## 🚀 Servidor Funcionando
- **URL**: http://localhost:3000
- **Estado**: ✅ ACTIVO

## 🔐 Credenciales de Prueba

### 👨‍💼 Administrador Principal:
- **Email**: `techfixuruguay@gmail.com`
- **Password**: `Agustin2025`
- **Acceso**: Panel completo de administración

### 👤 Usuarios de Prueba:
- **Agente**: `agent@techfix.com` / `agent123`
- **Usuario**: `user@techfix.com` / `user123`

## 🎯 Funcionalidades para Probar

### 1. 🏠 **Página Principal** 
**URL**: http://localhost:3000
- ✅ Diseño responsive y moderno
- ✅ Información de servicios
- ✅ Botón de WhatsApp flotante
- ✅ Navegación fluida

### 2. 🔑 **Sistema de Login**
**URL**: http://localhost:3000/login
- ✅ Probar login con credenciales del admin
- ✅ Verificar redirección al panel de admin
- ✅ Probar credenciales incorrectas
- ✅ Rate limiting (máximo 5 intentos)

### 3. 🛡️ **Panel de Administración**
**URL**: http://localhost:3000/admin
- ✅ Dashboard con estadísticas
- ✅ Gestión de usuarios
- ✅ Gestión de tickets
- ✅ Gestión de clientes
- ✅ Navegación entre secciones

### 4. 📞 **Formulario de Contacto**
**URL**: http://localhost:3000/contact
- ✅ Validación en tiempo real
- ✅ Crear ticket de soporte
- ✅ Campos obligatorios y opcionales
- ✅ Mensajes de error/éxito

### 5. 💰 **Solicitud de Cotización**
**URL**: http://localhost:3000/quote
- ✅ Formulario específico para cotizaciones
- ✅ Validación de campos
- ✅ Envío de solicitud

### 6. 🏪 **Página de Servicios**
**URL**: http://localhost:3000/services
- ✅ Lista de servicios técnicos
- ✅ Información detallada
- ✅ Call-to-action para contacto

## 🧪 Pruebas Específicas

### A. **Prueba de Autenticación**
```
1. Ir a: http://localhost:3000/login
2. Usar: techfixuruguay@gmail.com / Agustin2025
3. Verificar redirección a /admin
4. Verificar datos en dashboard
```

### B. **Prueba de Tickets**
```
1. Ir a: http://localhost:3000/contact
2. Llenar formulario completo
3. Enviar ticket
4. Verificar en admin que aparece el ticket
```

### C. **Prueba de Rate Limiting**
```
1. Ir a: http://localhost:3000/login
2. Intentar login con datos incorrectos 6 veces
3. Verificar mensaje de "demasiados intentos"
```

### D. **Prueba de Validación**
```
1. Ir a: http://localhost:3000/contact
2. Intentar enviar formulario vacío
3. Verificar mensajes de error
4. Llenar campos inválidos (email malo, etc.)
```

## 📱 Pruebas PWA

### E. **Progressive Web App**
```
1. Abrir en mobile/tablet
2. Buscar opción "Añadir a pantalla de inicio"
3. Verificar que funciona como app nativa
4. Probar funcionamiento offline básico
```

## 🗄️ Explorar Base de Datos

### F. **Prisma Studio**
```bash
# En terminal nuevo:
npx prisma studio

# Se abre en: http://localhost:5555
# Explorar tablas: User, Ticket, Client, FAQ
```

## ⚡ Pruebas de Performance

### G. **Velocidad de Carga**
- ✅ Página principal carga en < 3 segundos
- ✅ Navegación entre páginas es instantánea
- ✅ Formularios responden inmediatamente

### H. **Responsividad**
- ✅ Probar en mobile (DevTools)
- ✅ Probar en tablet
- ✅ Probar en desktop
- ✅ Verificar botones y formularios

## 🔧 Debugging

### URLs de Debug:
- **Debug API**: http://localhost:3000/api/debug
- **Admin Stats**: http://localhost:3000/api/admin/stats
- **Prisma Studio**: http://localhost:5555

### Logs en Terminal:
```bash
# Ver logs en tiempo real
tail -f .next/trace

# En el terminal donde corre npm run dev
# Verás logs de cada request
```

## ✅ Checklist de Pruebas

- [ ] ✅ Página principal carga correctamente
- [ ] ✅ Login funciona con credenciales correctas
- [ ] ✅ Panel admin accesible y funcional
- [ ] ✅ Formulario de contacto crea tickets
- [ ] ✅ Validaciones funcionan correctamente
- [ ] ✅ Rate limiting activo
- [ ] ✅ Responsive design en todos los dispositivos
- [ ] ✅ PWA instalable
- [ ] ✅ WhatsApp button funcional
- [ ] ✅ Base de datos poblada y accesible

## 🎉 ¡Listo para Probar!

**Comienza por**: http://localhost:3000

**Sugerencia**: Abre el panel de desarrollador (F12) para ver logs y network requests mientras pruebas.
