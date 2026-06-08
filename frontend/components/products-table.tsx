'use client'

import { useState } from 'react'
import { AlertCircle, Package, Pencil, Plus, RefreshCcw, Trash2 } from 'lucide-react'
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
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProducts } from '@/lib/hooks'
import { Product } from '@/lib/types'

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
        Get started by adding your first product to the inventory.
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
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-2">{error}</p>
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

interface ProductFormState {
  name: string
  description: string
  price: string
}

const emptyForm: ProductFormState = { name: '', description: '', price: '' }

interface ProductModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Product, 'id'>) => Promise<void>
  initial?: Product | null
  isSaving: boolean
}

function ProductModal({ open, onClose, onSubmit, initial, isSaving }: ProductModalProps) {
  const [form, setForm] = useState<ProductFormState>(
    initial
      ? { name: initial.name, description: initial.description, price: String(initial.price) }
      : emptyForm
  )
  const [formError, setFormError] = useState('')

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setForm(emptyForm)
      setFormError('')
      onClose()
    }
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) { setFormError('El nombre es obligatorio.'); return }
    const price = parseFloat(form.price)
    if (isNaN(price) || price < 0) { setFormError('El precio debe ser un número positivo.'); return }
    setFormError('')
    await onSubmit({ name: form.name.trim(), description: form.description.trim(), price })
    setForm(emptyForm)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initial ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {initial ? 'Update the product details below.' : 'Enter the details for the new product.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Product name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Product description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            />
          </div>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProductsTable() {
  const { products, isLoading, error, refetch, addProduct, editProduct, removeProduct } = useProducts()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const getStockStatus = (price: number) =>
    price > 50 ? 'In Stock' : 'Out of Stock'

  const handleAdd = async (data: Omit<Product, 'id'>) => {
    setIsSaving(true)
    try { await addProduct(data) } finally { setIsSaving(false) }
  }

  const handleEdit = async (data: Omit<Product, 'id'>) => {
    if (!editTarget) return
    setIsSaving(true)
    try { await editProduct(editTarget.id, data) } finally { setIsSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await removeProduct(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Products</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingTable />
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} />
          ) : products.length === 0 ? (
            <EmptyState onAddClick={() => setModalOpen(true)} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[100px]" />
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
                            : ''}
                        >
                          {stockStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => { setEditTarget(product); setModalOpen(true) }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ProductModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTarget(null) }}
        onSubmit={editTarget ? handleEdit : handleAdd}
        initial={editTarget}
        isSaving={isSaving}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteTarget?.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
