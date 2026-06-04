'use client'

import { AlertCircle, Package, Plus, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProducts } from '@/lib/hooks'

function LoadingTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No products yet</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        Get started by adding your first product to the inventory. Products will appear here once added.
      </p>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Product
      </Button>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Failed to load products</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-2">
        {error}
      </p>
      <p className="text-xs text-muted-foreground text-center max-w-sm mb-6">
        Make sure the backend server is running at http://localhost:5021
      </p>
      <Button variant="outline" onClick={onRetry}>
        <RefreshCcw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  )
}

function AddProductModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details for the new product. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Product name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Product description" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="0.00" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Product</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProductsTable() {
  const { products, isLoading, error, refetch } = useProducts()

  const getStockStatus = (price: number) => {
    // Mock logic: consider items under $50 as "Out of Stock" for demo
    return price > 50 ? 'In Stock' : 'Out of Stock'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Products</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </div>
        <AddProductModal>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </AddProductModal>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingTable />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : products.length === 0 ? (
          <EmptyState onAddClick={() => {}} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.price)
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-muted-foreground">
                      #{product.id}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-[300px] truncate">
                      {product.description || '-'}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={stockStatus === 'In Stock' ? 'default' : 'destructive'}
                        className={stockStatus === 'In Stock' 
                          ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
                          : ''
                        }
                      >
                        {stockStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
