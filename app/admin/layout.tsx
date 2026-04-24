'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { useAuth } from '@/lib/auth-context'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!loading) {
      // If not logged in and not on login page, redirect to login
      if (!user && !isLoginPage) {
        router.push('/admin/login')
      }
      // If logged in but not admin and not on login page, redirect to home
      // For demo purposes, we'll skip this check to allow any logged-in user
      // if (user && !isAdmin && !isLoginPage) {
      //   router.push('/')
      // }
    }
  }, [user, loading, isAdmin, isLoginPage, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  // Login page doesn't need sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // For demo: show admin panel without strict auth check
  // In production, uncomment the isAdmin check above
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
