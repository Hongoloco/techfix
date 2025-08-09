# 🎨 Diseño Profesional vs Original - TechFix Uruguay

Este proyecto incluye dos variantes de diseño que puedes alternar fácilmente según tus necesidades de presentación.

## 📋 Diseños Disponibles

### 💼 Diseño Profesional (Actual)
- **Paleta de colores**: Azul corporativo, grises y blancos
- **Tipografía**: Inter, formal y legible
- **Estilo**: Minimalista, corporativo, serio
- **Ideal para**: Presentaciones empresariales, propuestas comerciales, sitio web oficial

### 🌈 Diseño Original
- **Paleta de colores**: Gradientes llamativos (naranja, rojo, púrpura)
- **Tipografía**: Llamativa con efectos visuales
- **Estilo**: Moderno, vibrante, creativo
- **Ideal para**: Marketing digital, redes sociales, captar atención

## 🔄 Cómo Alternar Entre Diseños

### Usar el Script Automático (Recomendado)
```bash
# Ver estado actual
./toggle-design.sh status

# Aplicar diseño profesional
./toggle-design.sh professional

# Aplicar diseño original
./toggle-design.sh original

# Ver ayuda
./toggle-design.sh help
```

### Cambio Manual
```bash
# Para aplicar diseño profesional:
cp src/app/globals.professional.css src/app/globals.css
cp src/app/page.professional.tsx src/app/page.tsx
cp src/app/contact/page.professional.tsx src/app/contact/page.tsx
cp src/app/quote/page.professional.tsx src/app/quote/page.tsx

# Para restaurar diseño original:
cp src/app/globals.backup.css src/app/globals.css
cp src/app/page.backup.tsx src/app/page.tsx
cp src/app/contact/page.backup.tsx src/app/contact/page.tsx
cp src/app/quote/page.backup.tsx src/app/quote/page.tsx
```

## 📁 Estructura de Archivos

```
src/app/
├── globals.css                     # Estilos activos
├── globals.professional.css        # Estilos profesionales
├── globals.backup.css              # Estilos originales
├── page.tsx                        # Página principal activa
├── page.professional.tsx           # Versión profesional
├── page.backup.tsx                 # Versión original
├── contact/
│   ├── page.tsx                    # Contacto activo
│   ├── page.professional.tsx       # Versión profesional
│   └── page.backup.tsx             # Versión original
└── quote/
    ├── page.tsx                    # Cotización activa
    ├── page.professional.tsx       # Versión profesional
    └── page.backup.tsx             # Versión original
```

## 🎯 Cuándo Usar Cada Diseño

### 💼 Usa el Diseño Profesional cuando:
- Presentes el sitio a clientes empresariales
- Busques transmitir seriedad y confianza
- El contexto requiera formalidad
- Quieras maximizar la credibilidad corporativa
- Presentaciones a inversores o socios

### 🌈 Usa el Diseño Original cuando:
- Hagas marketing en redes sociales
- Busques captar atención rápidamente
- El público objetivo sea más joven o informal
- Quieras destacar entre la competencia
- Campañas publicitarias creativas

## 🛠️ Características Técnicas

### Diseño Profesional
- **CSS Variables**: Paleta de colores corporativa definida
- **Componentes**: Clases `.professional-*` para elementos
- **Tipografía**: Inter como fuente principal
- **Espaciado**: Más amplio y estructurado
- **Animaciones**: Sutiles y no intrusivas
- **Contraste**: Optimizado para legibilidad

### Diseño Original
- **Gradientes**: Efectos visuales llamativos
- **Glassmorphism**: Efectos de vidrio y transparencias
- **Animaciones**: Más dinámicas y llamativas
- **Emojis**: Integrados en la interfaz
- **Colores**: Paleta vibrante y energética

## 🔧 Personalización

### Modificar Colores Profesionales
Edita las variables CSS en `src/app/globals.professional.css`:
```css
:root {
  --primary-color: #2563eb;    /* Azul principal */
  --secondary-color: #64748b;  /* Gris secundario */
  --accent-color: #0ea5e9;     /* Azul de acento */
  /* ... más variables */
}
```

### Agregar Nuevos Componentes Profesionales
```css
.mi-componente-professional {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}
```

## 📱 Responsive Design

Ambos diseños son completamente responsivos:
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: Tablet (768px) y Desktop (1024px)
- **Flexbox/Grid**: Layout moderno y flexible
- **Touch Friendly**: Botones y áreas táctiles optimizadas

## 🚀 Desarrollo

### Servidor de Desarrollo
```bash
npm run dev
```

### Después de Cambiar Diseño
1. El servidor se recargará automáticamente
2. Si no, reinicia manualmente con `Ctrl+C` y `npm run dev`
3. Verifica que todos los estilos se aplicaron correctamente

## 📊 Comparación Rápida

| Aspecto | Profesional | Original |
|---------|-------------|----------|
| **Credibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Impacto Visual** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Legibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Modernidad** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Seriedad** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Creatividad** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🤝 Contribuir

Para agregar nuevas variantes de diseño:
1. Crea archivos `.nuevovariante.tsx` y `.nuevovariante.css`
2. Actualiza el script `toggle-design.sh`
3. Documenta las características en este README

---

**TechFix Uruguay** - Soporte técnico profesional en Las Piedras y alrededores 🇺🇾
