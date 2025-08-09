// Esquemas de validación para la aplicación
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validators = {
  email: (email: string): ValidationResult => {
    const errors: string[] = []
    
    if (!email) {
      errors.push('El email es requerido')
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        errors.push('Formato de email inválido')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  },

  password: (password: string): ValidationResult => {
    const errors: string[] = []
    
    if (!password) {
      errors.push('La contraseña es requerida')
    } else {
      if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres')
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra minúscula')
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula')
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('La contraseña debe contener al menos un número')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  },

  name: (name: string): ValidationResult => {
    const errors: string[] = []
    
    if (!name) {
      errors.push('El nombre es requerido')
    } else {
      if (name.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres')
      }
      if (name.length > 100) {
        errors.push('El nombre no puede tener más de 100 caracteres')
      }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        errors.push('El nombre solo puede contener letras y espacios')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  },

  phone: (phone: string): ValidationResult => {
    const errors: string[] = []
    
    if (phone) {
      // Formato uruguayo: +598 XX XXX XXX o 09X XXX XXX
      const phoneRegex = /^(\+598|0)9[1-9]\d{6}$/
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        errors.push('Formato de teléfono inválido (ej: 099123456 o +59899123456)')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  },

  ticketTitle: (title: string): ValidationResult => {
    const errors: string[] = []
    
    if (!title) {
      errors.push('El título es requerido')
    } else {
      if (title.length < 5) {
        errors.push('El título debe tener al menos 5 caracteres')
      }
      if (title.length > 200) {
        errors.push('El título no puede tener más de 200 caracteres')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  },

  ticketDescription: (description: string): ValidationResult => {
    const errors: string[] = []
    
    if (!description) {
      errors.push('La descripción es requerida')
    } else {
      if (description.length < 10) {
        errors.push('La descripción debe tener al menos 10 caracteres')
      }
      if (description.length > 2000) {
        errors.push('La descripción no puede tener más de 2000 caracteres')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  }
}

// Función utilitaria para validar múltiples campos
export function validateFields(fields: { [key: string]: any }, rules: { [key: string]: (value: any) => ValidationResult }): ValidationResult {
  const allErrors: string[] = []
  
  for (const [fieldName, value] of Object.entries(fields)) {
    if (rules[fieldName]) {
      const result = rules[fieldName](value)
      if (!result.isValid) {
        allErrors.push(...result.errors)
      }
    }
  }
  
  return { isValid: allErrors.length === 0, errors: allErrors }
}

// Sanitización de inputs
export const sanitizers = {
  text: (text: string): string => {
    return text.trim().replace(/[<>]/g, '')
  },
  
  email: (email: string): string => {
    return email.toLowerCase().trim()
  },
  
  phone: (phone: string): string => {
    return phone.replace(/\D/g, '')
  },
  
  name: (name: string): string => {
    return name.trim().replace(/[<>]/g, '').replace(/\s+/g, ' ')
  },
  
  ticketTitle: (title: string): string => {
    return title.trim().replace(/[<>]/g, '').replace(/\s+/g, ' ')
  },
  
  ticketDescription: (description: string): string => {
    return description.trim().replace(/[<>]/g, '')
  }
}
