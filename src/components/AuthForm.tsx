import { useState } from 'react'
import type { UserRole } from '../types/database'
import { DEMO_ACCOUNTS } from '../lib/mock-data'

interface AuthFormProps {
  onSignIn: (email: string, password: string) => Promise<{ error: unknown }>
  onSignUp: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ) => Promise<{ error: unknown }>
}

export function AuthForm({ onSignIn, onSignUp }: AuthFormProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === 'signin') {
      const { error } = await onSignIn(email, password)
      if (error) {
        setError(
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : 'Sign in failed'
        )
      }
    } else {
      if (!fullName.trim()) {
        setError('Full name is required')
        setLoading(false)
        return
      }
      const { error } = await onSignUp(email, password, fullName.trim(), role)
      if (error) {
        setError(
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : 'Sign up failed'
        )
      } else {
        setSignUpSuccess(true)
      }
    }

    setLoading(false)
  }

  if (signUpSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-6">CAET Advanced</p>
          <h1 className="text-lg font-semibold text-white mb-2">Check Your Email</h1>
          <p className="text-sm text-slate-400 mb-6">
            We sent a confirmation link to <span className="text-slate-300">{email}</span>.
          </p>
          <button
            onClick={() => { setSignUpSuccess(false); setMode('signin') }}
            className="text-sm text-emerald-500 hover:text-emerald-400 cursor-pointer"
          >
            Back to sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">CAET Advanced</p>
          <h1 className="text-xl font-semibold text-white">Qualification Tracker</h1>
          <p className="text-sm text-slate-500 mt-1">65 tasks · 8 categories</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-sm font-medium text-slate-300">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/5 border border-red-500/10 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Marcus Rivera"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white placeholder-slate-600 outline-none focus:border-slate-700 transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white placeholder-slate-600 outline-none focus:border-slate-700 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'At least 6 characters' : ''}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm text-white placeholder-slate-600 outline-none focus:border-slate-700 transition-colors"
              required
              minLength={mode === 'signup' ? 6 : undefined}
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Role</label>
              <div className="space-y-1.5">
                {([
                  { value: 'student' as const, label: 'Student', desc: 'Pursuing qualification' },
                  { value: 'shop_evaluator' as const, label: 'Evaluator', desc: 'Repair station evaluator' },
                  { value: 'admin' as const, label: 'Admin', desc: 'Program administrator' },
                ]).map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`w-full text-left px-3 py-2.5 rounded-md border text-sm transition-colors cursor-pointer ${
                      role === r.value
                        ? 'border-emerald-700/50 bg-emerald-950/20 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-medium">{r.label}</span>
                    <span className="text-slate-600 ml-2">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-center text-sm text-slate-600 mt-6">
          {mode === 'signin' ? (
            <>
              No account?{' '}
              <button onClick={() => { setMode('signup'); setError(null) }} className="text-emerald-500 hover:text-emerald-400 cursor-pointer">
                Create one
              </button>
            </>
          ) : (
            <>
              Have an account?{' '}
              <button onClick={() => { setMode('signin'); setError(null) }} className="text-emerald-500 hover:text-emerald-400 cursor-pointer">
                Sign in
              </button>
            </>
          )}
        </p>

        {/* Demo accounts */}
        {mode === 'signin' && (
          <div className="mt-8 pt-6 border-t border-slate-800/60">
            <p className="text-xs text-slate-600 uppercase tracking-wider mb-3">Demo Accounts</p>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map(acct => (
                <button
                  key={acct.email}
                  type="button"
                  onClick={() => { setEmail(acct.email); setPassword('demo'); setError(null) }}
                  className="w-full text-left px-3 py-2.5 rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="text-sm text-slate-300">{acct.label}</div>
                  <div className="text-xs text-slate-600">{acct.role} · {acct.company}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
