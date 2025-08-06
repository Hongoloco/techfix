# Configuración de Email para TechFix Uruguay

## 📧 Configuración de Gmail

Para recibir notificaciones por email en tu cuenta `techfixuruguay@gmail.com`, necesitas configurar una contraseña de aplicación de Gmail:

### Pasos para configurar Gmail SMTP:

1. **Habilita la verificación en 2 pasos** en tu cuenta de Gmail:
   - Ve a https://myaccount.google.com/security
   - En "Acceder a Google", selecciona "Verificación en 2 pasos"
   - Sigue las instrucciones para habilitarla

2. **Genera una contraseña de aplicación**:
   - Ve a https://myaccount.google.com/apppasswords
   - Selecciona la aplicación y el dispositivo para el que quieres generar la contraseña
   - Usa la contraseña generada (16 caracteres) en el archivo `.env`

3. **Actualiza el archivo `.env`**:
   ```env
   SMTP_PASS="tu-contraseña-de-aplicación-de-16-caracteres"
   ```

## 📧 Emails que vas a recibir

### 1. Nuevo Ticket de Soporte
- **Asunto**: "Nuevo Ticket de Soporte - [Título del ticket]"
- **Contenido**: Detalles del ticket, información del cliente, prioridad
- **Acción**: Revisar y asignar a un técnico

### 2. Nueva Solicitud de Cotización
- **Asunto**: "Nueva Solicitud de Cotización - [Tipo de servicio]"
- **Contenido**: Datos del cliente, descripción del proyecto, presupuesto estimado
- **Acción**: Responder en 2-4 horas, llamar si es un proyecto grande

## 📱 WhatsApp Integration

### Números configurados:
- **Número de negocio**: +59899252808
- **País**: Uruguay
- **Zona horaria**: UTC-3

### Funcionalidades de WhatsApp:

1. **Botón flotante** en todas las páginas
2. **Integración en formularios** de contacto y cotización
3. **Mensajes personalizados** según el contexto:
   - Tickets urgentes
   - Solicitudes de cotización
   - Consultas generales

### Mensajes automáticos que se generan:

```
🔧 TechFix Uruguay - Nuevo Ticket
📋 Título: [título]
⚡ Prioridad: [prioridad]
🕐 Fecha: [fecha]
¡Hola! Acabo de crear un ticket de soporte. ¿Podrían ayudarme?
```

```
💼 TechFix Uruguay - Solicitud de Cotización
🏢 Empresa: [empresa]
🛠️ Servicio: [servicio]
📅 Fecha: [fecha]
¡Hola! Estoy interesado en sus servicios. ¿Podrían enviarme más información?
```

## 🛠️ Configuración Adicional

### Variables de entorno configuradas:
```env
# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="techfixuruguay@gmail.com"
SMTP_FROM="TechFix Uruguay <techfixuruguay@gmail.com>"

# Negocio
BUSINESS_EMAIL="techfixuruguay@gmail.com"
BUSINESS_PHONE="+59899252808"
BUSINESS_WHATSAPP="+59899252808"
BUSINESS_NAME="TechFix Uruguay"
BUSINESS_COUNTRY="Uruguay"
```

## 📋 Lista de verificación

- [ ] Contraseña de aplicación de Gmail configurada
- [ ] Emails de prueba funcionando
- [ ] WhatsApp Business configurado en +59899252808
- [ ] Mensajes automáticos probados
- [ ] Horarios de atención actualizados
- [ ] Información de Uruguay en todas las páginas

## 🚀 Próximos pasos

1. **Configurar WhatsApp Business API** (opcional) para automatizar respuestas
2. **Integrar sistema de facturación** para Uruguay (AFIP, DGI)
3. **Agregar métodos de pago locales** (Mercado Pago, RedPagos)
4. **Crear contenido específico** para el mercado uruguayo

---

**Nota**: Recuerda mantener segura la contraseña de aplicación y no compartirla. Si necesitas regenerarla, puedes hacerlo desde la configuración de tu cuenta de Google.
