#!/bin/bash

# Script para alternar entre diseños
# Uso: ./toggle-design.sh [dark|professional|original]

PROJECT_DIR="/workspaces/techfix"

show_help() {
    echo "TechFix Uruguay - Alternador de Diseño"
    echo ""
    echo "Uso: $0 [dark|professional|original|status]"
    echo ""
    echo "Comandos:"
    echo "  dark          - Aplica el diseño oscuro moderno (actual)"
    echo "  professional  - Aplica el diseño profesional (corporativo)"
    echo "  original      - Restaura el diseño original (llamativo)"
    echo "  status        - Muestra qué diseño está activo actualmente"
    echo "  help          - Muestra esta ayuda"
    echo ""
    echo "Archivos afectados:"
    echo "  - src/app/globals.css (estilos principales)"
    echo "  - src/app/page.tsx (página principal)"
    echo "  - src/app/contact/page.tsx (página de contacto)"
    echo "  - src/app/quote/page.tsx (página de cotización)"
}

check_status() {
    if [ -f "$PROJECT_DIR/src/app/globals.dark.css" ]; then
        if cmp -s "$PROJECT_DIR/src/app/globals.css" "$PROJECT_DIR/src/app/globals.dark.css"; then
            echo "dark"
        elif cmp -s "$PROJECT_DIR/src/app/globals.css" "$PROJECT_DIR/src/app/globals.professional.css"; then
            echo "professional"
        else
            echo "original"
        fi
    else
        echo "original"
    fi
}

apply_dark() {
    echo "🌙 Aplicando diseño oscuro moderno..."
    
    # Verificar que existen los archivos oscuros
    if [ ! -f "$PROJECT_DIR/src/app/globals.dark.css" ]; then
        echo "❌ Error: No se encuentra el archivo de estilos oscuros"
        exit 1
    fi
    
    # Aplicar estilos oscuros
    cp "$PROJECT_DIR/src/app/globals.dark.css" "$PROJECT_DIR/src/app/globals.css"
    
    # Aplicar páginas oscuras
    if [ -f "$PROJECT_DIR/src/app/page.dark.tsx" ]; then
        cp "$PROJECT_DIR/src/app/page.dark.tsx" "$PROJECT_DIR/src/app/page.tsx"
    fi
    
    if [ -f "$PROJECT_DIR/src/app/contact/page.dark.tsx" ]; then
        cp "$PROJECT_DIR/src/app/contact/page.dark.tsx" "$PROJECT_DIR/src/app/contact/page.tsx"
    fi
    
    echo "✅ Diseño oscuro aplicado correctamente"
    echo "🌙 Características del diseño oscuro:"
    echo "   - Modo oscuro con gradientes sutiles"
    echo "   - Logo animado con efectos de flotación"
    echo "   - Partículas de fondo animadas"
    echo "   - Colores cian y dorados como acentos"
    echo "   - Enfoque en modernidad y tecnología"
    echo "   - Email corregido: techifixuruguay@gmail.com"
}

apply_professional() {
    echo "🔧 Aplicando diseño profesional..."
    
    # Verificar que existen los archivos profesionales
    if [ ! -f "$PROJECT_DIR/src/app/globals.professional.css" ]; then
        echo "❌ Error: No se encuentra el archivo de estilos profesionales"
        exit 1
    fi
    
    # Aplicar estilos profesionales
    cp "$PROJECT_DIR/src/app/globals.professional.css" "$PROJECT_DIR/src/app/globals.css"
    
    # Aplicar páginas profesionales
    if [ -f "$PROJECT_DIR/src/app/page.professional.tsx" ]; then
        cp "$PROJECT_DIR/src/app/page.professional.tsx" "$PROJECT_DIR/src/app/page.tsx"
    fi
    
    if [ -f "$PROJECT_DIR/src/app/contact/page.professional.tsx" ]; then
        cp "$PROJECT_DIR/src/app/contact/page.professional.tsx" "$PROJECT_DIR/src/app/contact/page.tsx"
    fi
    
    if [ -f "$PROJECT_DIR/src/app/quote/page.professional.tsx" ]; then
        cp "$PROJECT_DIR/src/app/quote/page.professional.tsx" "$PROJECT_DIR/src/app/quote/page.tsx"
    fi
    
    echo "✅ Diseño profesional aplicado correctamente"
    echo "💼 Características del diseño profesional:"
    echo "   - Colores corporativos (azul, gris, blanco)"
    echo "   - Tipografía profesional y legible"
    echo "   - Espaciado y estructura formal"
    echo "   - Animaciones sutiles"
    echo "   - Enfoque en credibilidad empresarial"
}

apply_original() {
    echo "🎨 Aplicando diseño original..."
    
    # Verificar que existen los archivos de respaldo
    if [ ! -f "$PROJECT_DIR/src/app/globals.backup.css" ]; then
        echo "❌ Error: No se encuentra el archivo de respaldo del diseño original"
        exit 1
    fi
    
    # Restaurar estilos originales
    cp "$PROJECT_DIR/src/app/globals.backup.css" "$PROJECT_DIR/src/app/globals.css"
    
    # Restaurar páginas originales
    if [ -f "$PROJECT_DIR/src/app/page.backup.tsx" ]; then
        cp "$PROJECT_DIR/src/app/page.backup.tsx" "$PROJECT_DIR/src/app/page.tsx"
    fi
    
    if [ -f "$PROJECT_DIR/src/app/contact/page.backup.tsx" ]; then
        cp "$PROJECT_DIR/src/app/contact/page.backup.tsx" "$PROJECT_DIR/src/app/contact/page.tsx"
    fi
    
    if [ -f "$PROJECT_DIR/src/app/quote/page.backup.tsx" ]; then
        cp "$PROJECT_DIR/src/app/quote/page.backup.tsx" "$PROJECT_DIR/src/app/quote/page.tsx"
    fi
    
    echo "✅ Diseño original restaurado correctamente"
    echo "🌈 Características del diseño original:"
    echo "   - Gradientes llamativos (naranja, rojo, púrpura)"
    echo "   - Efectos visuales y animaciones"
    echo "   - Estilo moderno y vibrante"
    echo "   - Emojis y elementos visuales"
    echo "   - Enfoque en impacto visual"
}

show_status() {
    current_design=$(check_status)
    echo "📊 Estado actual del diseño: $current_design"
    
    case "$current_design" in
        "dark")
            echo "🌙 Diseño oscuro moderno está activo"
            echo "   - Modo oscuro con efectos modernos"
            echo "   - Logo animado con partículas"
            echo "   - Ideal para desarrolladores y tech enthusiasts"
            echo "   - Apariencia futurista y tecnológica"
            ;;
        "professional")
            echo "💼 Diseño profesional está activo"
            echo "   - Ideal para presentaciones empresariales"
            echo "   - Mayor credibilidad corporativa"
            echo "   - Apariencia formal y seria"
            ;;
        *)
            echo "🌈 Diseño original está activo"
            echo "   - Más llamativo y vibrante"
            echo "   - Mayor impacto visual"
            echo "   - Apariencia moderna y creativa"
            ;;
    esac
}

# Verificar que estamos en el directorio correcto
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: No se encuentra el directorio del proyecto en $PROJECT_DIR"
    exit 1
fi

# Procesar argumentos
case "${1:-status}" in
    "dark")
        apply_dark
        ;;
    "professional")
        apply_professional
        ;;
    "original")
        apply_original
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Opción no válida: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

echo ""
echo "🔄 Recuerda reiniciar el servidor de desarrollo si está corriendo:"
echo "   npm run dev"
