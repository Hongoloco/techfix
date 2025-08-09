// Cache del lado del servidor para mejorar performance
class ServerCache {
  private cache = new Map<string, { data: any; expires: number }>()
  
  set(key: string, data: any, ttlSeconds: number = 300) {
    const expires = Date.now() + (ttlSeconds * 1000)
    this.cache.set(key, { data, expires })
  }
  
  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }
  
  delete(key: string) {
    this.cache.delete(key)
  }
  
  clear() {
    this.cache.clear()
  }
  
  // Limpiar cache expirado
  cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key)
      }
    }
  }
}

export const serverCache = new ServerCache()

// Función wrapper para cachear resultados de base de datos
export function withServerCache<T>(
  key: string, 
  fn: () => Promise<T>, 
  ttlSeconds: number = 300
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      // Intentar obtener del cache
      const cached = serverCache.get(key)
      if (cached) {
        resolve(cached)
        return
      }
      
      // Si no está en cache, ejecutar función
      const result = await fn()
      
      // Guardar en cache
      serverCache.set(key, result, ttlSeconds)
      
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

// Cache específico para consultas de base de datos
export const dbServerCache = {
  // Cache para estadísticas del admin (5 minutos)
  getStats: () => withServerCache('admin:stats', async () => {
    const { prisma } = await import('./prisma')
    
    const [totalUsers, totalTickets, openTickets] = await Promise.all([
      prisma.user.count(),
      prisma.ticket.count(),
      prisma.ticket.count({ where: { status: 'OPEN' } })
    ])
    
    return { totalUsers, totalTickets, openTickets }
  }, 300),

  // Invalidar cache relacionado
  invalidateUserCache: () => {
    serverCache.delete('admin:users')
    serverCache.delete('admin:stats')
  },

  invalidateTicketCache: () => {
    serverCache.delete('admin:tickets')
    serverCache.delete('admin:stats')
  }
}

// Limpiar cache automáticamente cada 10 minutos
if (typeof window === 'undefined') {
  setInterval(() => {
    serverCache.cleanup()
  }, 10 * 60 * 1000)
}
