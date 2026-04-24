'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from './firebase'
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

// Demo admin user for when Firebase is not configured
const DEMO_ADMIN: AdminUser = {
  id: 'demo-admin',
  email: 'admin@curtimotors.com',
  name: 'Admin Demo',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const isDemoMode = !isFirebaseConfigured

  useEffect(() => {
    // If Firebase is not configured, use demo mode
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      
      if (firebaseUser && db) {
        // Check if user is admin
        try {
          const adminDocRef = doc(db, 'admins', firebaseUser.uid)
          const adminDoc = await getDoc(adminDocRef)
          
          if (adminDoc.exists()) {
            setAdminUser(adminDoc.data() as AdminUser)
          } else {
            setAdminUser(null)
          }
        } catch {
          setAdminUser(null)
        }
      } else {
        setAdminUser(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Demo mode login
    if (isDemoMode) {
      if (email === 'admin@curtimotors.com' && password === 'admin123') {
        setAdminUser(DEMO_ADMIN)
        return
      }
      throw new Error('Credenciais inválidas. Use admin@curtimotors.com / admin123')
    }
    
    if (!auth) throw new Error('Firebase não configurado')
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    if (isDemoMode) {
      setAdminUser(null)
      return
    }
    
    if (!auth) return
    await firebaseSignOut(auth)
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
