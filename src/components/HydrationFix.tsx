'use client'

import { useEffect } from 'react'

export default function HydrationFix() {
  useEffect(() => {
    // Suprimir warnings de hidratación específicos
    const originalError = console.error
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Hydration')) {
        return
      }
      if (typeof args[0] === 'string' && args[0].includes('server rendered HTML')) {
        return
      }
      originalError.call(console, ...args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
