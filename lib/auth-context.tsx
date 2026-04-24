'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { AdminUser } from './types'

interface AuthContextType {
  user: User | null
  adminUser: AdminUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  isDemoMode: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Demo admin user for when Supabase is not configured
const DEMO_ADMIN: AdminUser = {
  id: 'demo-admin',
  email: 'admin@curtimotors.com',
  name: 'Admin Demo',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Check if Supabase is configured
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const isDemoMode = !isSupabaseConfigured

  useEffect(() => {
    // If Supabase is not configured, use demo mode
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    // Get initial session
    const getSession = async () => {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()
      setUser(supabaseUser)
      
      if (supabaseUser) {
        // For now, treat any authenticated user as admin
        // You can add role checking from user metadata or a separate table later
        setAdminUser({
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email || 'Admin',
          role: 'admin',
          createdAt: new Date(supabaseUser.created_at),
          updatedAt: new Date(),
        })
      } else {
        setAdminUser(null)
      }
      
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const supabaseUser = session?.user ?? null
        setUser(supabaseUser)
        
        if (supabaseUser) {
          setAdminUser({
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email || 'Admin',
            role: 'admin',
            createdAt: new Date(supabaseUser.created_at),
            updatedAt: new Date(),
          })
        } else {
          setAdminUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // Demo mode login
    if (isDemoMode) {
      if (email === 'admin@curtimotors.com' && password === 'admin123') {
        setAdminUser(DEMO_ADMIN)
        return
      }
      throw new Error('Credenciais invalidas. Use admin@curtimotors.com / admin123')
    }
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw new Error(error.message)
    }
  }

  const signOut = async () => {
    if (isDemoMode) {
      setAdminUser(null)
      return
    }
    
    const supabase = createClient()
    await supabase.auth.signOut()
    setAdminUser(null)
  }

  const isAdmin = !!adminUser && (adminUser.role === 'admin' || adminUser.role === 'editor')

  return (
    <AuthContext.Provider value={{ user, adminUser, loading, signIn, signOut, isAdmin, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
