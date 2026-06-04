import { AppHeader } from '@/components/app-sidebar'
import { SystemStatusCard, QuickStats, RecentActivity } from '@/components/dashboard-cards'

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your inventory system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SystemStatusCard />
          <div className="md:col-span-1 lg:col-span-2">
            <QuickStats />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <div className="hidden md:block" />
        </div>
      </div>
    </>
  )
}
