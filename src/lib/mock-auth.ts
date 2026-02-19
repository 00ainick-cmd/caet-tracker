import { USERS, type MockUser } from './mock-data'
import type { UserRole } from '../types/database'

const STORAGE_KEY = 'caet-mock-user-id'

// In-memory user store (starts with seed data, can grow via signUp)
const users: MockUser[] = [...USERS]

export interface MockSession {
  user: { id: string; email: string }
}

export type AuthChangeCallback = (
  event: 'SIGNED_IN' | 'SIGNED_OUT',
  session: MockSession | null
) => void

let currentUserId: string | null = localStorage.getItem(STORAGE_KEY)
const listeners: AuthChangeCallback[] = []

function notify(event: 'SIGNED_IN' | 'SIGNED_OUT', session: MockSession | null) {
  listeners.forEach(cb => cb(event, session))
}

export const mockAuth = {
  getSession(): { data: { session: MockSession | null } } {
    if (!currentUserId) return { data: { session: null } }
    const user = users.find(u => u.id === currentUserId)
    if (!user) {
      localStorage.removeItem(STORAGE_KEY)
      currentUserId = null
      return { data: { session: null } }
    }
    return { data: { session: { user: { id: user.id, email: user.email } } } }
  },

  onAuthStateChange(cb: AuthChangeCallback): { data: { subscription: { unsubscribe: () => void } } } {
    listeners.push(cb)
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const idx = listeners.indexOf(cb)
            if (idx >= 0) listeners.splice(idx, 1)
          },
        },
      },
    }
  },

  async signInWithPassword({
    email,
  }: {
    email: string
    password: string
  }): Promise<{ data: { session: MockSession } | null; error: { message: string } | null }> {
    const user = users.find(u => u.email === email)
    if (!user) {
      return { data: null, error: { message: 'No account found with that email' } }
    }
    currentUserId = user.id
    localStorage.setItem(STORAGE_KEY, user.id)
    const session = { user: { id: user.id, email: user.email } }
    notify('SIGNED_IN', session)
    return { data: { session }, error: null }
  },

  async signUp({
    email,
    password: _password,
    options,
  }: {
    email: string
    password: string
    options?: { data?: { full_name?: string; role?: string } }
  }): Promise<{ data: { session: MockSession } | null; error: { message: string } | null }> {
    if (users.find(u => u.email === email)) {
      return { data: null, error: { message: 'An account with that email already exists' } }
    }
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      full_name: options?.data?.full_name ?? 'New User',
      role: (options?.data?.role as UserRole) ?? 'student',
      shop_id: null,
      created_at: new Date().toISOString(),
    }
    users.push(newUser)
    currentUserId = newUser.id
    localStorage.setItem(STORAGE_KEY, newUser.id)
    const session = { user: { id: newUser.id, email: newUser.email } }
    notify('SIGNED_IN', session)
    return { data: { session }, error: null }
  },

  async signOut(): Promise<{ error: null }> {
    currentUserId = null
    localStorage.removeItem(STORAGE_KEY)
    notify('SIGNED_OUT', null)
    return { error: null }
  },
}

// ── Profile lookup ────────────────────────────────────────────────────

export function getProfile(userId: string): MockUser | null {
  return users.find(u => u.id === userId) ?? null
}

export function getCurrentUserId(): string | null {
  return currentUserId
}
