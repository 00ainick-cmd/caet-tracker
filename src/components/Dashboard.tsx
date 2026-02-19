import type { UserProfile } from '../hooks/useAuth'

interface DashboardProps {
  profile: UserProfile
  onSignOut: () => void
}

export function Dashboard({ profile, onSignOut }: DashboardProps) {
  const roleLabels = {
    admin: 'Admin Control Panel',
    shop_evaluator: 'Evaluator Dashboard',
    student: 'Student Portal',
  }

  const roleColors = {
    admin: '#f43f5e',
    shop_evaluator: '#6366f1',
    student: '#10b981',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'rgb(2, 6, 23)' }}>
      <div
        style={{
          backgroundColor: 'rgb(15, 23, 42)',
          borderBottom: '1px solid rgb(30, 41, 59)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              color: roleColors[profile.role],
              fontWeight: 600,
            }}
          >
            {roleLabels[profile.role]}
          </span>
          <span style={{ color: 'rgb(51, 65, 85)' }}>|</span>
          <span style={{ fontSize: '0.75rem', color: 'rgb(148, 163, 184)' }}>
            {profile.full_name}
          </span>
        </div>
        <button
          onClick={onSignOut}
          style={{
            background: 'none',
            border: '1px solid rgb(51, 65, 85)',
            color: 'rgb(148, 163, 184)',
            fontSize: '0.75rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>

      <div
        style={{
          maxWidth: '40rem',
          margin: '3rem auto',
          padding: '0 1rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgb(15, 23, 42)',
            border: '1px solid rgb(30, 41, 59)',
            borderRadius: '0.75rem',
            padding: '2rem',
          }}
        >
          <div
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '0.75rem',
              backgroundColor: roleColors[profile.role],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.25rem',
              margin: '0 auto 1rem auto',
            }}
          >
            {profile.full_name.charAt(0)}
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 700,
              margin: '0 0 0.25rem 0',
            }}
          >
            Welcome, {profile.full_name}
          </h2>
          <p
            style={{
              color: 'rgb(100, 116, 139)',
              fontSize: '0.875rem',
              margin: '0 0 1.5rem 0',
            }}
          >
            {profile.email} · {profile.role.replace('_', ' ')}
          </p>
          <div
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.875rem',
              color: 'rgb(165, 243, 252)',
            }}
          >
            Auth + RLS working. Phase 1 complete.
            <br />
            <span style={{ color: 'rgb(100, 116, 139)', fontSize: '0.75rem' }}>
              Your role-based access is enforced at the database level.
              {profile.role === 'student' &&
                ' You can only see your own data.'}
              {profile.role === 'shop_evaluator' &&
                ' You can see all students in your shop.'}
              {profile.role === 'admin' &&
                ' You have full access to all data.'}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
          }}
        >
          <InfoCard label="Role" value={profile.role.replace('_', ' ')} />
          <InfoCard label="Shop" value={profile.shop_id ?? 'None assigned'} />
          <InfoCard label="User ID" value={profile.id.slice(0, 8) + '...'} />
          <InfoCard label="Auth" value="Supabase" />
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        backgroundColor: 'rgb(15, 23, 42)',
        border: '1px solid rgb(30, 41, 59)',
        borderRadius: '0.5rem',
        padding: '0.75rem',
      }}
    >
      <div
        style={{
          fontSize: '0.625rem',
          color: 'rgb(100, 116, 139)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          color: 'rgb(203, 213, 225)',
          fontFamily: 'monospace',
        }}
      >
        {value}
      </div>
    </div>
  )
}
