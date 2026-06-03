import { AppHeader } from '@/components/app-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <>
      <AppHeader title="Settings" />
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your application preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure the connection to your backend server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="api-url">API Base URL</Label>
                <Input
                  id="api-url"
                  defaultValue="http://localhost:5021/api"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  The base URL for all API requests
                </p>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when products are running low
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Status Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when backend connectivity changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Use a more compact table layout
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
