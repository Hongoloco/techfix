'use client'

import { useState, useEffect, useCallback } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutos

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now()
    const expiresAt = now + (ttl || this.defaultTTL)
    
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear()
      return
    }

    const regex = new RegExp(pattern)
    for (const [key] of this.cache) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  size(): number {
    return this.cache.size
  }
}

// Instancia singleton del cache
export const apiCache = new ApiCache()

// Hook para usar cache con API
export function useCachedApi<T>(
  url: string,
  options: {
    ttl?: number
    autoFetch?: boolean
    dependencies?: any[]
  } = {}
) {
  const { ttl, autoFetch = true, dependencies = [] } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    // Intentar obtener de cache primero
    const cachedData = apiCache.get<T>(url)
    if (cachedData) {
      setData(cachedData)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      }
      
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(url, { headers })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      // Guardar en cache
      apiCache.set(url, result, ttl)
      
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [url, ttl, ...dependencies])

  const invalidateCache = useCallback(() => {
    apiCache.invalidate(url)
  }, [url])

  const refetch = useCallback(async () => {
    invalidateCache()
    await fetchData()
  }, [fetchData, invalidateCache])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [fetchData, autoFetch])

  return {
    data,
    loading,
    error,
    refetch,
    invalidateCache
  }
}
