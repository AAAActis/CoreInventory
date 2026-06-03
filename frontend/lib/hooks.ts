'use client'

import { useState, useCallback, useEffect } from 'react'
import { fetchSystemStatus, fetchProducts } from './api'
import { Product } from './types'

export function useSystemStatus() {
  const [status, setStatus] = useState<'online' | 'offline' | 'loading'>('loading')
  const [error, setError] = useState<string | null>(null)

  const checkStatus = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const result = await fetchSystemStatus()
      setStatus(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('offline')
    }
  }, [])

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [checkStatus])

  return { status, error, refetch: checkStatus }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return { products, isLoading, error, refetch: loadProducts }
}
