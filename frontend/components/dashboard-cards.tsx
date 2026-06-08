'use client'

import { Activity, AlertTriangle, CheckCircle, Package, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useSystemStatus, useProducts } from '@/lib/hooks'

export function SystemStatusCard() {
  const { status, refetch } = useSystemStatus()

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Activity className="h-4 w-4 text-muted-foreground" />
          System Status
        </CardTitle>
        <CardDescription>Real-time backend connection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <>
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </>
          ) : status === 'online' ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-500">System Online</span>
            </>
          ) : (
            <>
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="text-sm font-medium text-red-500">System Offline - Backend Unreachable</span>
            </>
          )}
        </div>
        {status === 'offline' && (
          <button
            onClick={refetch}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Click to retry connection
          </button>
        )}
      </CardContent>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          status === 'online'
            ? 'bg-emerald-500/20'
            : status === 'offline'
              ? 'bg-red-500/20'
              : 'bg-muted'
        }`}
      />
    </Card>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  isLoading?: boolean
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ title, value, description, icon, isLoading, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend.isPositive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
            <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function QuickStats() {
  const { products, isLoading } = useProducts()
  const outOfStock = products.filter(p => p.price <= 50).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Products"
        value={products.length}
        description="In inventory"
        icon={<Package className="h-4 w-4" />}
        isLoading={isLoading}
      />
      <StatCard
        title="Out of Stock"
        value={outOfStock}
        description="Items below threshold"
        icon={<AlertTriangle className="h-4 w-4" />}
        isLoading={isLoading}
      />
      <StatCard
        title="In Stock"
        value={products.length - outOfStock}
        description="Available products"
        icon={<Package className="h-4 w-4" />}
        isLoading={isLoading}
      />
    </div>
  )
}

interface ActivityItem {
  id: string
  action: 'added' | 'updated' | 'deleted'
  productName: string
  timestamp: string
}

const mockActivities: ActivityItem[] = [
  { id: '1', action: 'added', productName: 'Wireless Keyboard', timestamp: '2 minutes ago' },
  { id: '2', action: 'updated', productName: 'USB-C Hub', timestamp: '15 minutes ago' },
  { id: '3', action: 'added', productName: 'Monitor Stand', timestamp: '1 hour ago' },
  { id: '4', action: 'deleted', productName: 'Old Mouse Pad', timestamp: '2 hours ago' },
  { id: '5', action: 'updated', productName: 'Desk Lamp', timestamp: '3 hours ago' },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Activity className="h-4 w-4 text-muted-foreground" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest product changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className={`h-2 w-2 rounded-full ${
                activity.action === 'added'
                  ? 'bg-emerald-500'
                  : activity.action === 'updated'
                    ? 'bg-blue-500'
                    : 'bg-red-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {activity.productName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {activity.action} • {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
