export interface Product {
  id: number
  name: string
  description: string
  price: number
}

export interface SystemStatus {
  status: 'online' | 'offline'
  message: string
}

export interface RecentActivity {
  id: string
  action: 'added' | 'updated' | 'deleted'
  productName: string
  timestamp: Date
}
