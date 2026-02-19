import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { StudentDash } from './components/student/StudentDash'
import { EvaluatorDash } from './components/evaluator/EvaluatorDash'
import { AdminDash } from './components/admin/AdminDash'
import { ENROLLMENTS } from './lib/mock-data'

function App() {
  const { profile, loading, signIn, signUp, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading...
      </div>
    )
  }

  if (!profile) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} />
  }

  const roleLabels = {
    admin: 'Admin Control Panel',
    shop_evaluator: 'Evaluator Dashboard',
    student: 'Student Portal',
  } as const

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">
            {roleLabels[profile.role]}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{profile.full_name}</span>
          <button
            onClick={signOut}
            className="text-xs text-slate-500 hover:text-white border border-slate-700 px-2 py-0.5 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>

      {profile.role === 'student' && (() => {
        const enrollment = ENROLLMENTS.find(e => e.student_id === profile.id)
        if (!enrollment) {
          return (
            <div className="max-w-xl mx-auto mt-12 text-center text-slate-400">
              <p>No enrollment found. Contact your administrator.</p>
            </div>
          )
        }
        return <StudentDash profile={profile} enrollment={enrollment} />
      })()}

      {profile.role === 'shop_evaluator' && <EvaluatorDash profile={profile} />}
      {profile.role === 'admin' && <AdminDash profile={profile} />}
    </div>
  )
}

export default App
