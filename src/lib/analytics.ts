// Configuración para monitoreo y analytics

export const monitoringConfig = {
  // Google Analytics (reemplazar con tu ID)
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX', // Reemplazar con tu ID real
    enabled: process.env.NODE_ENV === 'production'
  },

  // Hotjar para heatmaps y grabaciones de sesión
  hotjar: {
    hjid: 0, // Reemplazar con tu ID de Hotjar
    hjsv: 6,
    enabled: process.env.NODE_ENV === 'production'
  },

  // Microsoft Clarity
  clarity: {
    projectId: '', // Reemplazar con tu ID de Clarity
    enabled: process.env.NODE_ENV === 'production'
  },

  // Sentry para tracking de errores
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    environment: process.env.NODE_ENV,
    enabled: !!process.env.SENTRY_DSN
  }
}

// Analytics events que podemos trackear
export const analyticsEvents = {
  // Eventos de usuario
  USER_REGISTER: 'user_register',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',

  // Eventos de tickets
  TICKET_CREATE: 'ticket_create',
  TICKET_VIEW: 'ticket_view',
  TICKET_UPDATE: 'ticket_update',

  // Eventos de navegación
  PAGE_VIEW: 'page_view',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  QUOTE_REQUEST: 'quote_request',

  // Eventos de WhatsApp
  WHATSAPP_CLICK: 'whatsapp_click',

  // Eventos de errores
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error'
}

// Función para trackear eventos (client-side)
export function trackEvent(eventName: string, properties?: any) {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (monitoringConfig.googleAnalytics.enabled && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...properties
    })
  }

  // Analytics personalizado (enviar a tu API)
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(() => {
      // Silently fail
    })
  }
}

// Hook para analytics en React
export function useAnalytics() {
  const track = (eventName: string, properties?: any) => {
    trackEvent(eventName, properties)
  }

  const trackPageView = (pageName: string) => {
    track(analyticsEvents.PAGE_VIEW, { page: pageName })
  }

  const trackError = (error: Error, context?: any) => {
    track(analyticsEvents.ERROR_OCCURRED, {
      error_message: error.message,
      error_stack: error.stack,
      ...context
    })
  }

  return {
    track,
    trackPageView,
    trackError
  }
}
