import { useState } from 'react'
import { Bar, AICard } from '../shared'
import {
  SCHEMA,
  TOTAL_TASKS,
  getCategoryProgress,
  getPaceAnalysis,
} from '../../lib/schema'
import { getStudents, getEvaluators, getCompletedTaskIds, getEvaluatorTraining } from '../../lib/mock-db'
import { SHOPS, ENROLLMENTS } from '../../lib/mock-data'
import type { UserProfile } from '../../hooks/useAuth'

interface AdminDashProps {
  profile: UserProfile
}

export function AdminDash({ profile: _profile }: AdminDashProps) {
  const [tab, setTab] = useState<'overview' | 'users' | 'analytics' | 'training'>('overview')

  const students = getStudents()
  const evaluators = getEvaluators()
  const companies = [...new Set(SHOPS.map(s => s.name))]

  const studentStats = students.map(s => {
    const completed = getCompletedTaskIds(s.id)
    const enrollment = ENROLLMENTS.find(e => e.student_id === s.id)
    const pace = enrollment
      ? getPaceAnalysis(completed.length, enrollment.start_date)
      : null
    return { student: s, completed, pace, pct: Math.round((completed.length / TOTAL_TASKS) * 100) }
  })

  const completed = studentStats.filter(s => s.completed.length === TOTAL_TASKS)
  const avgPct = studentStats.length
    ? Math.round(studentStats.reduce((s, st) => s + st.pct, 0) / studentStats.length)
    : 0
  const atRisk = studentStats.filter(s => s.pace && !s.pace.onTrack && !s.pace.complete)

  const catStats = SCHEMA.categories.map(cat => {
    const avg = studentStats.length
      ? Math.round(
          studentStats.reduce((s, st) => {
            const catDone = cat.tasks.filter(t => st.completed.includes(t.id)).length
            return s + (catDone / cat.tasks.length) * 100
          }, 0) / studentStats.length
        )
      : 0
    return { ...cat, avgCompletion: avg }
  })
  const bottleneck = catStats.reduce((min, c) =>
    c.avgCompletion < min.avgCompletion ? c : min
  )

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-white">Admin Control Panel</h1>
              <p className="text-xs text-slate-400">CAET Advanced · System-Wide</p>
            </div>
            <span className="text-xs text-slate-400">Administrator</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {[
              { l: 'Students', v: students.length },
              { l: 'Locations', v: companies.length },
              { l: 'Avg Completion', v: `${avgPct}%` },
              { l: 'Certified', v: completed.length },
              { l: 'Evaluators', v: evaluators.length },
            ].map((k, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-lg p-2.5 text-center border border-slate-700/30"
              >
                <div className="text-lg font-bold text-white">{k.v}</div>
                <div className="text-xs text-slate-500">{k.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-1 mt-4">
            {(
              [
                ['overview', 'Overview'],
                ['users', 'Users'],
                ['analytics', 'Analytics'],
                ['training', 'Evaluator Training'],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  tab === v ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-5">
        {/* OVERVIEW */}
        {tab === 'overview' && (
          <>
            <AICard title="System Intelligence" variant="info">
              <strong>Bottleneck:</strong> Category {bottleneck.id} ({bottleneck.title}) has lowest
              avg completion at {bottleneck.avgCompletion}% across all students.
              {atRisk.length > 0 && (
                <>
                  <br />
                  <strong>At risk:</strong> {atRisk.map(s => s.student.full_name).join(', ')} —
                  consider intervention.
                </>
              )}
            </AICard>

            {/* Location breakdown */}
            {companies.map(company => {
              const shop = SHOPS.find(s => s.name === company)
              const cs = studentStats.filter(s => s.student.shop_id === shop?.id)
              const ca = cs.length
                ? Math.round(cs.reduce((s, st) => s + st.pct, 0) / cs.length)
                : 0
              return (
                <div key={company} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{company}</h4>
                      <p className="text-xs text-slate-500">{cs.length} students</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">{ca}%</span>
                  </div>
                  <Bar pct={ca} showPct={false} color="bg-indigo-500" />
                  <div className="mt-2 flex flex-wrap gap-1">
                    {cs.map(s => (
                      <span
                        key={s.student.id}
                        className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full"
                      >
                        {s.student.full_name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Heatmap */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Completion Heatmap</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-9 text-xs text-slate-500 p-2 border-b border-slate-800 gap-1">
                  <div>Student</div>
                  {SCHEMA.categories.map(c => (
                    <div key={c.id} className="text-center">
                      C{c.id}
                    </div>
                  ))}
                </div>
                {studentStats.map(st => {
                  const prog = getCategoryProgress(st.completed)
                  return (
                    <div
                      key={st.student.id}
                      className="grid grid-cols-9 p-2 border-b border-slate-800/50 gap-1 items-center"
                    >
                      <div className="text-xs text-slate-300 truncate">
                        {st.student.full_name.split(' ')[0]}
                      </div>
                      {prog.map(c => {
                        const bg =
                          c.pct === 100
                            ? 'bg-emerald-500'
                            : c.pct >= 50
                              ? 'bg-amber-500'
                              : c.pct > 0
                                ? 'bg-rose-500'
                                : 'bg-slate-700'
                        return (
                          <div key={c.id} className="flex justify-center">
                            <div
                              className={`w-6 h-6 rounded-md ${bg} flex items-center justify-center text-xs text-white font-bold`}
                              style={{ opacity: Math.max(0.3, c.pct / 100) }}
                            >
                              {c.pct > 0 ? c.pct : ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-300">All Users</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 text-xs text-slate-500 p-3 border-b border-slate-800 font-medium">
                <div className="col-span-2">Name</div>
                <div>Role</div>
                <div>Status</div>
              </div>
              {students.map(s => (
                <div
                  key={s.id}
                  className="grid grid-cols-4 p-3 border-b border-slate-800/50 items-center text-sm"
                >
                  <div className="col-span-2 text-white">{s.full_name}</div>
                  <div className="text-slate-400">Student</div>
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400">
                      Active
                    </span>
                  </div>
                </div>
              ))}
              {evaluators.map(e => {
                const training = getEvaluatorTraining(e.id)
                const allDone = training.length >= 5
                return (
                  <div
                    key={e.id}
                    className="grid grid-cols-4 p-3 border-b border-slate-800/50 items-center text-sm"
                  >
                    <div className="col-span-2 text-white">{e.full_name}</div>
                    <div className="text-indigo-400">Evaluator</div>
                    <div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          allDone
                            ? 'bg-emerald-900/50 text-emerald-400'
                            : 'bg-amber-900/40 text-amber-400'
                        }`}
                      >
                        {allDone ? 'Authorized' : 'Training'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {tab === 'analytics' && (
          <div className="space-y-5">
            <AICard title="Predictive Analytics" variant="info">
              {completed.length} of {students.length} students have completed all tasks.{' '}
              {atRisk.length > 0
                ? `${atRisk.map(s => s.student.full_name).join(' and ')} at risk of non-completion. `
                : 'All active students are on pace. '}
              Category {bottleneck.id} ({bottleneck.title}) at {bottleneck.avgCompletion}% avg is the
              program-wide bottleneck — consider additional resources.
            </AICard>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                Category Difficulty (Avg %)
              </h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                {[...catStats]
                  .sort((a, b) => a.avgCompletion - b.avgCompletion)
                  .map(c => (
                    <div key={c.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">
                          {c.id}. {c.title}
                        </span>
                        <span
                          className={`font-bold ${
                            c.avgCompletion < 50
                              ? 'text-rose-400'
                              : c.avgCompletion < 75
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                          }`}
                        >
                          {c.avgCompletion}%
                        </span>
                      </div>
                      <Bar
                        pct={c.avgCompletion}
                        showPct={false}
                        color={
                          c.avgCompletion < 50
                            ? 'bg-rose-500'
                            : c.avgCompletion < 75
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Pace Analysis</h3>
              <div className="space-y-2">
                {studentStats.map(s => {
                  const pa = s.pace
                  if (!pa) return null
                  const enrollment = ENROLLMENTS.find(e => e.student_id === s.student.id)
                  return (
                    <div
                      key={s.student.id}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-white font-medium">
                          {s.student.full_name}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            pa.complete
                              ? 'text-emerald-400'
                              : pa.onTrack
                                ? 'text-emerald-400'
                                : 'text-rose-400'
                          }`}
                        >
                          {pa.complete
                            ? '✓ Complete'
                            : pa.onTrack
                              ? `On track (~${pa.projected}d)`
                              : `At risk (~${pa.projected}d needed)`}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 text-xs text-slate-500 gap-2">
                        <div>
                          Pace: <span className="text-slate-300">{pa.pace} d/task</span>
                        </div>
                        <div>
                          Started:{' '}
                          <span className="text-slate-300">
                            {enrollment?.start_date ?? 'N/A'}
                          </span>
                        </div>
                        <div>
                          Left: <span className="text-slate-300">{pa.left} tasks</span>
                        </div>
                        <div>
                          Window: <span className="text-slate-300">{pa.remaining}d</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* EVALUATOR TRAINING */}
        {tab === 'training' && (
          <div className="space-y-5">
            <AICard title="Evaluator Qualification" variant="tip">
              Evaluators must complete all {SCHEMA.evaluator_training.modules.length} modules before
              being authorized to sign off tasks. Recalibration required every 24 months.
            </AICard>

            <div className="space-y-3">
              {SCHEMA.evaluator_training.modules.map(mod => (
                <div
                  key={mod.id}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-500">{mod.id}</span>
                        <h4 className="text-sm font-semibold text-white">{mod.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{mod.description}</p>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {mod.topics.map((t, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">{mod.duration_minutes} minutes</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Evaluator Status</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-8 text-xs text-slate-500 p-3 border-b border-slate-800 font-medium">
                  <div className="col-span-2">Evaluator</div>
                  {SCHEMA.evaluator_training.modules.map(m => (
                    <div key={m.id} className="text-center">
                      {m.id.replace('ET-', '')}
                    </div>
                  ))}
                  <div className="text-center">Status</div>
                </div>
                {evaluators.map(ev => {
                  const training = getEvaluatorTraining(ev.id)
                  const completedModules = training
                    .filter(t => t.completed_at)
                    .map(t => t.module_id)
                  const allDone = completedModules.length >= 5
                  return (
                    <div
                      key={ev.id}
                      className="grid grid-cols-8 p-3 border-b border-slate-800/50 items-center text-sm"
                    >
                      <div className="col-span-2">
                        <div className="text-white">{ev.full_name}</div>
                        <div className="text-xs text-slate-500">{ev.email}</div>
                      </div>
                      {SCHEMA.evaluator_training.modules.map(m => (
                        <div
                          key={m.id}
                          className={`text-center text-xs ${
                            completedModules.includes(m.id)
                              ? 'text-emerald-400'
                              : 'text-slate-600'
                          }`}
                        >
                          {completedModules.includes(m.id) ? '✓' : '○'}
                        </div>
                      ))}
                      <div className="text-center">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            allDone
                              ? 'bg-emerald-900/50 text-emerald-400'
                              : 'bg-amber-900/40 text-amber-400'
                          }`}
                        >
                          {allDone ? 'Authorized' : 'Incomplete'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
