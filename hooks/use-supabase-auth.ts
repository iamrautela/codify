'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { signIn, signUp, signOut, getProfile } from '@/lib/supabase/auth'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        try {
          const profileData = await getProfile(session.user.id)
          setProfile(profileData)
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            const profileData = await getProfile(session.user.id)
            setProfile(profileData)
          } catch (error) {
            console.error('Error fetching profile:', error)
          }
          setIsGuest(false)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    try {
      await signUp(email, password, fullName)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut()
      setIsGuest(false)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const continueAsGuest = () => {
    setIsGuest(true)
  }

  return {
    user,
    profile,
    loading,
    isGuest,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    continueAsGuest,
  }
}