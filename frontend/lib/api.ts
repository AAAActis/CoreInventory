import { Product } from './types'

const API_BASE_URL = 'http://localhost:5021/api'

export async function fetchSystemStatus(): Promise<'online' | 'offline'> {
  try {
    const response = await fetch(`${API_BASE_URL}/status/ping`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      return 'offline'
    }
    
    const text = await response.text()
    return text.toLowerCase() === 'pong' ? 'online' : 'offline'
  } catch {
    return 'offline'
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }
  
  return response.json()
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`)
  }
  
  return response.json()
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`)
  }
  
  return response.json()
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`)
  }
}
