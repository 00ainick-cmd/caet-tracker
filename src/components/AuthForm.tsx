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
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.badge}>CAET Advanced</div>
          <h1 style={styles.title}>Check Your Email</h1>
          <p style={styles.subtitle}>
            We sent a confirmation link to <strong>{email}</strong>. Click the
            link to activate your account, then return here to sign in.
          </p>
          <button
            onClick={() => {
              setSignUpSuccess(false)
              setMode('signin')
            }}
            style={styles.linkButton}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>CAET Advanced</div>
        <h1 style={styles.title}>Qualification Tracker</h1>
        <p style={styles.subtitle}>
          65 Tasks · 8 Categories · AI-Enhanced Coaching
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formTitle}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>

          {error && <div style={styles.error}>{error}</div>}

          {mode === 'signup' && (
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Marcus Rivera"
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={
                mode === 'signup' ? 'At least 6 characters' : 'Your password'
              }
              style={styles.input}
              required
              minLength={mode === 'signup' ? 6 : undefined}
            />
          </div>

          {mode === 'signup' && (
            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <div style={styles.roleGrid}>
                {(
                  [
                    {
                      value: 'student',
                      label: 'Student',
                      desc: 'Pursuing CAET Advanced qualification',
                      color: '#10b981',
                    },
                    {
                      value: 'shop_evaluator',
                      label: 'Evaluator',
                      desc: 'Sign off tasks at your repair station',
                      color: '#6366f1',
                    },
                    {
                      value: 'admin',
                      label: 'Admin',
                      desc: 'AEA program administrator',
                      color: '#f43f5e',
                    },
                  ] as const
                ).map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    style={{
                      ...styles.roleButton,
                      borderColor:
                        role === r.value ? r.color : 'rgb(51, 65, 85)',
                      backgroundColor:
                        role === r.value
                          ? `${r.color}15`
                          : 'rgb(15, 23, 42)',
                    }}
                  >
                    <span
                      style={{
                        ...styles.roleDot,
                        backgroundColor: r.color,
                        opacity: role === r.value ? 1 : 0.3,
                      }}
                    />
                    <div>
                      <div style={styles.roleLabel}>{r.label}</div>
                      <div style={styles.roleDesc}>{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading
              ? 'Please wait...'
              : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>

        <div style={styles.switchRow}>
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setMode('signup')
                  setError(null)
                }}
                style={styles.linkButton}
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setMode('signin')
                  setError(null)
                }}
                style={styles.linkButton}
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {mode === 'signin' && (
          <div style={styles.demoSection}>
            <div style={styles.demoLabel}>Demo Accounts</div>
            <div style={styles.demoGrid}>
              {DEMO_ACCOUNTS.map(acct => (
                <button
                  key={acct.email}
                  type="button"
                  onClick={() => {
                    setEmail(acct.email)
                    setPassword('demo')
                    setError(null)
                  }}
                  style={styles.demoButton}
                >
                  <div style={styles.demoName}>{acct.label}</div>
                  <div style={styles.demoMeta}>
                    {acct.role} · {acct.company}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'rgb(2, 6, 23)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    maxWidth: '28rem',
    width: '100%',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '0.375rem 1rem',
    borderRadius: '9999px',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    background:
      'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
    color: 'rgb(52, 211, 153)',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 700,
    color: 'white',
    fontFamily: 'Georgia, serif',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: 'rgb(148, 163, 184)',
    margin: '0 0 2rem 0',
  },
  form: {
    backgroundColor: 'rgb(15, 23, 42)',
    border: '1px solid rgb(30, 41, 59)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    textAlign: 'left',
  },
  formTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'white',
    margin: '0 0 1rem 0',
  },
  error: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: 'rgb(252, 165, 165)',
    fontSize: '0.875rem',
    marginBottom: '1rem',
  },
  field: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'rgb(148, 163, 184)',
    marginBottom: '0.375rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  input: {
    width: '100%',
    padding: '0.625rem 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid rgb(51, 65, 85)',
    backgroundColor: 'rgb(2, 6, 23)',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  roleGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  roleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid rgb(51, 65, 85)',
    backgroundColor: 'rgb(15, 23, 42)',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'all 0.15s',
  },
  roleDot: {
    width: '0.625rem',
    height: '0.625rem',
    borderRadius: '9999px',
    flexShrink: 0,
  },
  roleLabel: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'white',
  },
  roleDesc: {
    fontSize: '0.75rem',
    color: 'rgb(100, 116, 139)',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: 'rgb(16, 185, 129)',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  switchRow: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: 'rgb(100, 116, 139)',
    textAlign: 'center' as const,
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'rgb(52, 211, 153)',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: 0,
  },
  demoSection: {
    marginTop: '2rem',
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid rgb(30, 41, 59)',
    backgroundColor: 'rgb(15, 23, 42)',
  },
  demoLabel: {
    fontSize: '0.625rem',
    fontWeight: 600,
    color: 'rgb(100, 116, 139)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
  },
  demoGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  demoButton: {
    display: 'block',
    width: '100%',
    padding: '0.625rem 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid rgb(51, 65, 85)',
    backgroundColor: 'rgb(2, 6, 23)',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'border-color 0.15s',
  },
  demoName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'rgb(226, 232, 240)',
  },
  demoMeta: {
    fontSize: '0.75rem',
    color: 'rgb(100, 116, 139)',
  },
}
