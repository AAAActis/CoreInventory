import { AppHeader } from '@/components/app-sidebar'
import { ProductsTable } from '@/components/products-table'

export default function ProductsPage() {
  return (
    <>
      <AppHeader title="Products" />
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>

        <ProductsTable />
      </div>
    </>
  )
}
