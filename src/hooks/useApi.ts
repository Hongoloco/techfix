'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseApiOptions {
  initialData?: any
  autoFetch?: boolean
  dependencies?: any[]
}

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T = any>(
  url: string, 
  options: UseApiOptions = {}
): ApiState<T> & { refetch: () => Promise<void> } {
  const { initialData = null, autoFetch = true, dependencies = [] } = options
  
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: autoFetch,
    error: null
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
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
      
      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Error desconocido'
      }))
    }
  }, [url, ...dependencies])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [fetchData, autoFetch])

  return {
    ...state,
    refetch: fetchData
  }
}

// Hook para mutaciones (POST, PUT, DELETE)
export function useMutation<T = any>() {
  const [state, setState] = useState<ApiState<T> & { success: boolean }>({
    data: null,
    loading: false,
    error: null,
    success: false
  })

  const mutate = useCallback(async (
    url: string, 
    options: {
      method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: any
      headers?: HeadersInit
    } = {}
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null, success: false }))
    
    try {
      const token = localStorage.getItem('token')
      const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json'
      }
      
      if (token) {
        defaultHeaders.Authorization = `Bearer ${token}`
      }

      const response = await fetch(url, {
        method: options.method || 'POST',
        headers: { ...defaultHeaders, ...options.headers },
        body: options.body ? JSON.stringify(options.body) : undefined
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setState({ data, loading: false, error: null, success: true })
      return data
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Error desconocido',
        success: false
      }))
      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null, success: false })
  }, [])

  return {
    ...state,
    mutate,
    reset
  }
}

// Hook para autenticación optimizado
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData)
          setUser(user)
        } catch {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback((token: string, userData: any) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout
  }
}
