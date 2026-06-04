'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, Settings, User, Moon, Sun, Box } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Products',
    href: '/products',
    icon: Package,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Box className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">CoreInventory</span>
        </Link>
      </SidebarHeader>
      
      <Separator className="mx-4" />
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <Separator className="mb-4" />
        
        <div className="flex items-center justify-between px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-2 justify-start gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      {title && <h1 className="text-lg font-semibold">{title}</h1>}
    </header>
  )
}
