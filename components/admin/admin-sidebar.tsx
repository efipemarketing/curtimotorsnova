'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/veiculos', icon: Car, label: 'Veículos' },
  { href: '/admin/agendamentos', icon: CalendarCheck, label: 'Agendamentos' },
  { href: '/admin/mensagens', icon: MessageSquare, label: 'Mensagens' },
  { href: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut, adminUser } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/admin/login'
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-bold font-heading">
            <span className="text-primary">Curti</span>
            <span className="text-sidebar-foreground">Motors</span>
          </span>
        </Link>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Painel Administrativo</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        {adminUser && (
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {adminUser.displayName || adminUser.email}
            </p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">
              {adminUser.role}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
