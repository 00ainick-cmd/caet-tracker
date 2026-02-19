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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-sm">
        Loading...
      </div>
    )
  }

  if (!profile) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} />
  }

  const roleLabels = {
    admin: 'Admin',
    shop_evaluator: 'Evaluator',
    student: 'Student',
  } as const

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Global top bar — minimal */}
      <div className="bg-slate-950 border-b border-slate-800/60 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-400 tracking-wide">CAET</span>
          <span className="text-slate-800">·</span>
          <span className="text-xs text-slate-600">{roleLabels[profile.role]}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-600">{profile.full_name}</span>
          <button
            onClick={signOut}
            className="text-xs text-slate-600 hover:text-slate-300 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>

      {profile.role === 'student' && (() => {
        const enrollment = ENROLLMENTS.find(e => e.student_id === profile.id)
        if (!enrollment) {
          return (
            <div className="max-w-xl mx-auto mt-12 text-center text-slate-500 text-sm">
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
