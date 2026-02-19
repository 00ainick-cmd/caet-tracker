import { useEffect, useState } from 'react'
import { mockAuth, getProfile, type MockSession } from '../lib/mock-auth'
import type { UserRole } from '../types/database'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  shop_id: string | null
}

interface AuthState {
  session: MockSession | null
  profile: UserProfile | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    profile: null,
    loading: true,
  })

  useEffect(() => {
    // Get initial session from localStorage
    const { data: { session } } = mockAuth.getSession()
    if (session) {
      const profile = getProfile(session.user.id)
      setState({
        session,
        profile: profile
          ? {
              id: profile.id,
              email: profile.email,
              full_name: profile.full_name,
              role: profile.role,
              shop_id: profile.shop_id,
            }
          : null,
        loading: false,
      })
    } else {
      setState(prev => ({ ...prev, loading: false }))
    }

    // Listen for auth changes
    const { data: { subscription } } = mockAuth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const profile = getProfile(session.user.id)
          setState({
            session,
            profile: profile
              ? {
                  id: profile.id,
                  email: profile.email,
                  full_name: profile.full_name,
                  role: profile.role,
                  shop_id: profile.shop_id,
                }
              : null,
            loading: false,
          })
        } else {
          setState({ session: null, profile: null, loading: false })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ) {
    const { data, error } = await mockAuth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    })
    return { data, error }
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await mockAuth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  async function signOut() {
    const { error } = await mockAuth.signOut()
    return { error }
  }

  return {
    session: state.session,
    profile: state.profile,
    loading: state.loading,
    signUp,
    signIn,
    signOut,
  }
}
