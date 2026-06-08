'use client'

import { useState, useCallback, useEffect } from 'react'
import { fetchSystemStatus, fetchProducts, createProduct, updateProduct, deleteProduct } from './api'
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
    const interval = setInterval(checkStatus, 30000)
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

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const created = await createProduct(product)
    setProducts(prev => [...prev, created])
    return created
  }, [])

  const editProduct = useCallback(async (id: number, product: Omit<Product, 'id'>) => {
    await updateProduct(id, product)
    setProducts(prev => prev.map(p => p.id === id ? { id, ...product } : p))
  }, [])

  const removeProduct = useCallback(async (id: number) => {
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  return { products, isLoading, error, refetch: loadProducts, addProduct, editProduct, removeProduct }
}
