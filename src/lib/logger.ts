interface LogLevel {
  ERROR: 'error'
  WARN: 'warn'
  INFO: 'info'
  DEBUG: 'debug'
}

const LOG_LEVEL: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
}

interface LogData {
  level: string
  message: string
  timestamp: string
  context?: any
  error?: Error
  userId?: string
  ip?: string
  userAgent?: string
}

class Logger {
  private formatLog(data: LogData): string {
    return JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV
    })
  }

  private log(level: string, message: string, context?: any, error?: Error) {
    const logData: LogData = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(error && { error: { message: error.message, stack: error.stack } })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatLog(logData))
    } else {
      // En producción, enviar a servicio de logging (ej: Datadog, LogRocket, etc.)
      console.log(this.formatLog(logData))
    }
  }

  error(message: string, error?: Error, context?: any) {
    this.log(LOG_LEVEL.ERROR, message, context, error)
  }

  warn(message: string, context?: any) {
    this.log(LOG_LEVEL.WARN, message, context)
  }

  info(message: string, context?: any) {
    this.log(LOG_LEVEL.INFO, message, context)
  }

  debug(message: string, context?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log(LOG_LEVEL.DEBUG, message, context)
    }
  }

  // Logging específico para API
  apiRequest(method: string, url: string, userId?: string, ip?: string) {
    this.info('API Request', {
      method,
      url,
      userId,
      ip,
      timestamp: new Date().toISOString()
    })
  }

  apiError(method: string, url: string, error: Error, userId?: string, ip?: string) {
    this.error('API Error', error, {
      method,
      url,
      userId,
      ip,
      timestamp: new Date().toISOString()
    })
  }

  // Logging para autenticación
  authSuccess(userId: string, email: string, ip?: string) {
    this.info('Authentication Success', {
      userId,
      email,
      ip,
      timestamp: new Date().toISOString()
    })
  }

  authFailure(email: string, reason: string, ip?: string) {
    this.warn('Authentication Failure', {
      email,
      reason,
      ip,
      timestamp: new Date().toISOString()
    })
  }

  // Logging para tickets
  ticketCreated(ticketId: string, userId?: string, clientEmail?: string) {
    this.info('Ticket Created', {
      ticketId,
      userId,
      clientEmail,
      timestamp: new Date().toISOString()
    })
  }

  ticketUpdated(ticketId: string, changes: any, userId?: string) {
    this.info('Ticket Updated', {
      ticketId,
      changes,
      userId,
      timestamp: new Date().toISOString()
    })
  }
}

export const logger = new Logger()

// Helper para extraer datos de request
export function getRequestContext(request: Request) {
  return {
    ip: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    method: request.method,
    url: request.url
  }
}
