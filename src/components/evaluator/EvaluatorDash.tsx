import { useState } from 'react'
import { Bar, AICard, Icons } from '../shared'
import {
  SCHEMA,
  TOTAL_TASKS,
  CAT_COLORS,
  findTask,
  getCategoryProgress,
  getPaceAnalysis,
} from '../../lib/schema'
import {
  getStudents,
  getCompletedTaskIds,
  getSignoffs,
  addSignoff,
  reverseSignoff,
  getEvaluatorTraining,
  completeEvaluatorTraining,
  getNYQAttempts,
  addNYQAttempt,
  getRecentActivity,
} from '../../lib/mock-db'
import { getCurrentUserId } from '../../lib/mock-auth'
import { PREP_CONTENT } from '../../lib/prep-content'
import type { UserProfile } from '../../hooks/useAuth'
import type { MockUser } from '../../lib/mock-data'
import { ENROLLMENTS } from '../../lib/mock-data'
import { TrainingModule } from './TrainingModule'

interface EvaluatorDashProps {
  profile: UserProfile
}

type EvalTab = 'activity' | 'students' | 'signoff' | 'training'

export function EvaluatorDash({ profile }: EvaluatorDashProps) {
  const [tab, setTab] = useState<EvalTab>('students')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<MockUser | null>(null)
  const [signoffModal, setSignoffModal] = useState<{
    student: MockUser
    taskId: string
  } | null>(null)
  const [signoffNotes, setSignoffNotes] = useState('')
  const [nyqModal, setNyqModal] = useState<{
    student: MockUser
    taskId: string
  } | null>(null)
  const [nyqNotes, setNyqNotes] = useState('')
  const [nyqAreas, setNyqAreas] = useState('')
  const [reversalModal, setReversalModal] = useState<{
    signoffId: string
    studentName: string
    taskId: string
  } | null>(null)
  const [reversalReason, setReversalReason] = useState('')
  const [activeTrainingModule, setActiveTrainingModule] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const students = getStudents()
  const filtered = students.filter(
    s =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.email && s.email.toLowerCase().includes(search.toLowerCase()))
  )

  // Compute stats
  const studentStats = students.map(s => {
    const completed = getCompletedTaskIds(s.id)
    const enrollment = ENROLLMENTS.find(e => e.student_id === s.id)
    const pace = enrollment
      ? getPaceAnalysis(completed.length, enrollment.start_date)
      : null
    const nyqCount = getNYQAttempts(s.id).length
    return { student: s, completed, pace, pct: Math.round((completed.length / TOTAL_TASKS) * 100), nyqCount }
  })

  const avgPct = studentStats.length
    ? Math.round(studentStats.reduce((s, st) => s + st.pct, 0) / studentStats.length)
    : 0
  const atRisk = studentStats.filter(s => s.pace && !s.pace.onTrack && !s.pace.complete)

  // Evaluator's own training status
  const myTraining = getEvaluatorTraining(profile.id)
  const myCompletedModules = myTraining.filter(t => t.completed_at).map(t => t.module_id)
  const trainingComplete = myCompletedModules.length >= SCHEMA.evaluator_training.modules.length

  // Force re-read on refreshKey
  void refreshKey

  function doSignoff(studentId: string, taskId: string) {
    const evaluatorId = getCurrentUserId()
    if (!evaluatorId) return
    const catId = parseInt(taskId.split('-')[0], 10)
    addSignoff({
      student_id: studentId,
      evaluator_id: evaluatorId,
      task_id: taskId,
      category_id: catId,
      signed_at: new Date().toISOString(),
      notes: signoffNotes || null,
      status: 'active',
      reversed_by: null,
      reversed_at: null,
      reversal_reason: null,
    })
    setSignoffModal(null)
    setSignoffNotes('')
    setRefreshKey(k => k + 1)
  }

  function doReversal(signoffId: string) {
    const evaluatorId = getCurrentUserId()
    if (!evaluatorId || !reversalReason.trim()) return
    reverseSignoff(signoffId, evaluatorId, reversalReason.trim())
    setReversalModal(null)
    setReversalReason('')
    setRefreshKey(k => k + 1)
  }

  function doNYQ(studentId: string, taskId: string) {
    const evaluatorId = getCurrentUserId()
    if (!evaluatorId) return
    const catId = parseInt(taskId.split('-')[0], 10)
    addNYQAttempt({
      student_id: studentId,
      evaluator_id: evaluatorId,
      task_id: taskId,
      category_id: catId,
      attempted_at: new Date().toISOString(),
      notes: nyqNotes,
      areas_to_improve: nyqAreas.split('\n').map(a => a.trim()).filter(Boolean),
    })
    setNyqModal(null)
    setNyqNotes('')
    setNyqAreas('')
    setRefreshKey(k => k + 1)
  }

  // Selected student detail data
  const selectedCompleted = selected ? getCompletedTaskIds(selected.id) : []
  const selectedEnrollment = selected
    ? ENROLLMENTS.find(e => e.student_id === selected.id)
    : null
  const selectedProgress = selected ? getCategoryProgress(selectedCompleted) : []
  const selectedSignoffs = selected ? getSignoffs(selected.id) : []
  const selectedNYQ = selected ? getNYQAttempts(selected.id) : []

  // Activity data
  const activity = getRecentActivity(30)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-white">Evaluator Dashboard</h1>
              <p className="text-xs text-slate-400">CAET Advanced · Sign-off Portal</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                trainingComplete
                  ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/30'
                  : 'bg-amber-900/40 text-amber-400 border border-amber-700/30'
              }`}>
                {trainingComplete ? 'Authorized Evaluator' : `Training: ${myCompletedModules.length}/${SCHEMA.evaluator_training.modules.length}`}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[
              { l: 'Students', v: students.length, c: 'text-white' },
              { l: 'Avg Completion', v: `${avgPct}%`, c: 'text-emerald-400' },
              {
                l: 'At Risk',
                v: atRisk.length,
                c: atRisk.length > 0 ? 'text-rose-400' : 'text-emerald-400',
              },
              {
                l: 'My Training',
                v: `${myCompletedModules.length}/${SCHEMA.evaluator_training.modules.length}`,
                c: trainingComplete ? 'text-emerald-400' : 'text-amber-400',
              },
            ].map((k, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30"
              >
                <div className={`text-xl font-bold ${k.c}`}>{k.v}</div>
                <div className="text-xs text-slate-500">{k.l}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {([
              ['activity', 'Activity'],
              ['students', 'Students'],
              ['signoff', 'Quick Sign-off'],
              ['training', 'My Training'],
            ] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => { setTab(v); setSelected(null) }}
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
        {/* ACTIVITY TAB */}
        {tab === 'activity' && (
          <div className="space-y-4">
            {atRisk.length > 0 && (
              <AICard title="Attention Needed" variant="warning">
                {atRisk.map(s => s.student.full_name).join(' and ')}{' '}
                {atRisk.length === 1 ? 'is' : 'are'} falling behind pace. Consider scheduling
                dedicated practice time.
              </AICard>
            )}

            <h3 className="text-sm font-semibold text-slate-300">Recent Activity</h3>
            {activity.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">No recent activity.</div>
            ) : (
              <div className="space-y-2">
                {activity.map((item, i) => {
                  const task = findTask(item.taskId)
                  return (
                    <div
                      key={i}
                      className={`bg-slate-900 border rounded-lg p-3 ${
                        item.type === 'signoff'
                          ? 'border-emerald-800/30'
                          : item.type === 'reversal'
                            ? 'border-rose-800/30'
                            : 'border-amber-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 ${
                            item.type === 'signoff'
                              ? 'text-emerald-400'
                              : item.type === 'reversal'
                                ? 'text-rose-400'
                                : 'text-amber-400'
                          }`}>
                            {item.type === 'signoff' ? Icons.check : item.type === 'reversal' ? '↩' : '✗'}
                          </span>
                          <div>
                            <div className="text-sm text-white">
                              {item.type === 'signoff' && (
                                <><span className="font-medium">{item.studentName}</span> signed off on <span className="font-mono text-emerald-400">{item.taskId}</span></>
                              )}
                              {item.type === 'reversal' && (
                                <><span className="font-medium">{item.studentName}</span> sign-off <span className="font-mono text-rose-400">{item.taskId}</span> reversed</>
                              )}
                              {item.type === 'nyq' && (
                                <><span className="font-medium">{item.studentName}</span> not yet qualified on <span className="font-mono text-amber-400">{item.taskId}</span></>
                              )}
                            </div>
                            {task && (
                              <div className="text-xs text-slate-500 mt-0.5">{task.description}</div>
                            )}
                            {item.notes && (
                              <div className="text-xs text-slate-400 mt-1 italic">"{item.notes}"</div>
                            )}
                            <div className="text-xs text-slate-600 mt-1">
                              by {item.evaluatorName} · {new Date(item.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* STUDENTS TAB */}
        {tab === 'students' && (
          <>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                {Icons.search}
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            {selected ? (
              <div className="space-y-4">
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  ← All Students
                </button>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-lg font-bold text-white">{selected.full_name}</h2>
                      <p className="text-xs text-slate-400">
                        Started {selectedEnrollment?.start_date ?? 'N/A'}
                        {selectedNYQ.length > 0 && (
                          <span className="text-amber-400 ml-2">
                            · {selectedNYQ.length} NYQ attempt{selectedNYQ.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        {Math.round((selectedCompleted.length / TOTAL_TASKS) * 100)}%
                      </div>
                      <div className="text-xs text-slate-500">
                        {selectedCompleted.length}/{TOTAL_TASKS} tasks
                      </div>
                    </div>
                  </div>
                  <Bar
                    pct={Math.round((selectedCompleted.length / TOTAL_TASKS) * 100)}
                    h="h-3"
                    label={`${selectedCompleted.length}/${TOTAL_TASKS} tasks`}
                  />
                </div>

                {/* Category progress with mini-bars */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedProgress.map((cat, i) => (
                    <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-slate-400">{cat.id}. {cat.title}</span>
                        <span className={`text-xs font-bold ${cat.pct === 100 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {cat.done}/{cat.total}
                        </span>
                      </div>
                      <Bar
                        pct={cat.pct}
                        showPct={false}
                        h="h-1.5"
                        color={cat.pct === 100 ? 'bg-emerald-500' : CAT_COLORS[i]}
                      />
                    </div>
                  ))}
                </div>

                {/* Task list with sign-off / NYQ / reversal buttons */}
                <div className="space-y-2">
                  {selectedProgress.map(cat => (
                    <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-300 font-medium">
                          {cat.id}. {cat.title}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            cat.pct === 100 ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                        >
                          {cat.done}/{cat.total}
                        </span>
                      </div>
                      <Bar
                        pct={cat.pct}
                        showPct={false}
                        color={cat.pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}
                      />
                      <div className="mt-2 space-y-1">
                        {cat.tasks.map(task => {
                          const done = selectedCompleted.includes(task.id)
                          const signoff = selectedSignoffs.find(
                            s => s.task_id === task.id && s.status === 'active'
                          )
                          const hasNYQ = selectedNYQ.some(n => n.task_id === task.id)
                          return (
                            <div
                              key={task.id}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm ${
                                done ? 'text-slate-500' : hasNYQ ? 'bg-amber-950/10' : 'text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {done ? (
                                  <span className="text-emerald-400 shrink-0">{Icons.check}</span>
                                ) : hasNYQ ? (
                                  <span className="text-amber-400 shrink-0">!</span>
                                ) : (
                                  <span className="text-slate-600 shrink-0">{Icons.lock}</span>
                                )}
                                <span className="font-mono text-xs text-slate-500 shrink-0">
                                  {task.id}
                                </span>
                                <span className={`truncate ${done ? 'line-through' : ''}`}>
                                  {task.description}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                {done && signoff && (
                                  <button
                                    onClick={() =>
                                      setReversalModal({
                                        signoffId: signoff.id,
                                        studentName: selected.full_name,
                                        taskId: task.id,
                                      })
                                    }
                                    className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-md border border-rose-800/30 hover:border-rose-700/50"
                                  >
                                    Reverse
                                  </button>
                                )}
                                {!done && (
                                  <>
                                    <button
                                      onClick={() =>
                                        setNyqModal({ student: selected, taskId: task.id })
                                      }
                                      className="text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded-md border border-amber-800/30 hover:border-amber-700/50"
                                    >
                                      NYQ
                                    </button>
                                    <button
                                      onClick={() =>
                                        setSignoffModal({ student: selected, taskId: task.id })
                                      }
                                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-medium"
                                    >
                                      Sign Off
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* NYQ History for this student */}
                {selectedNYQ.length > 0 && (
                  <div className="bg-slate-900 border border-amber-800/30 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-amber-400 mb-3">
                      Not Yet Qualified Attempts ({selectedNYQ.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedNYQ.map(nyq => {
                        const task = findTask(nyq.task_id)
                        return (
                          <div key={nyq.id} className="bg-slate-800/50 rounded-md p-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-white">
                                <span className="font-mono text-amber-400 mr-1">{nyq.task_id}</span>
                                {task?.description}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(nyq.attempted_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{nyq.notes}</p>
                            {nyq.areas_to_improve.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {nyq.areas_to_improve.map((area, i) => (
                                  <span key={i} className="text-xs bg-amber-900/30 text-amber-300 px-2 py-0.5 rounded-full">
                                    {area}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map(s => {
                  const stats = studentStats.find(st => st.student.id === s.id)
                  if (!stats) return null
                  const catProg = getCategoryProgress(stats.completed)
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="w-full text-left bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                            {s.full_name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{s.full_name}</div>
                            <div className="text-xs text-slate-500">{s.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-bold ${
                              stats.pct === 100 ? 'text-emerald-400' : 'text-white'
                            }`}
                          >
                            {stats.pct}%
                          </div>
                          <div
                            className={`text-xs ${
                              stats.pace?.complete
                                ? 'text-emerald-400'
                                : stats.pace?.onTrack
                                  ? 'text-emerald-500'
                                  : 'text-rose-400'
                            }`}
                          >
                            {stats.pace?.complete
                              ? 'Complete'
                              : stats.pace?.onTrack
                                ? 'On Track'
                                : 'Behind Pace'}
                          </div>
                          {stats.nyqCount > 0 && (
                            <div className="text-xs text-amber-400">{stats.nyqCount} NYQ</div>
                          )}
                        </div>
                      </div>
                      {/* Mini category bars */}
                      <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-slate-800">
                        {catProg.map((c, i) => (
                          <div
                            key={c.id}
                            className={`${c.pct === 100 ? 'bg-emerald-500' : c.pct > 0 ? CAT_COLORS[i] : 'bg-slate-700'} transition-all`}
                            style={{ width: `${100 / catProg.length}%`, opacity: Math.max(0.3, c.pct / 100) }}
                          />
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* QUICK SIGN-OFF TAB */}
        {tab === 'signoff' && (
          <div className="space-y-4">
            <AICard title="Quick Sign-off Mode" variant="tip">
              Select a student, then sign off tasks directly. Use NYQ (Not Yet Qualified) to record
              unsuccessful attempts with improvement notes. Both actions are logged in the activity feed.
            </AICard>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                {Icons.search}
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
              />
            </div>

            {selected ? (
              <div className="space-y-3">
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                >
                  ← All Students
                </button>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white">{selected.full_name}</h2>
                    <span className="text-xs text-slate-400">{selectedCompleted.length}/{TOTAL_TASKS} complete</span>
                  </div>
                </div>
                {/* Compact task list — only incomplete tasks */}
                {selectedProgress.map(cat => {
                  const incompleteTasks = cat.tasks.filter(t => !selectedCompleted.includes(t.id))
                  if (incompleteTasks.length === 0) return null
                  return (
                    <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-2 font-medium">
                        {cat.id}. {cat.title} — {cat.total - cat.done} remaining
                      </div>
                      <div className="space-y-1">
                        {incompleteTasks.map(task => {
                          const hasNYQ = selectedNYQ.some(n => n.task_id === task.id)
                          return (
                            <div
                              key={task.id}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm ${hasNYQ ? 'bg-amber-950/10' : ''}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {hasNYQ && <span className="text-amber-400 shrink-0 text-xs">!</span>}
                                <span className="font-mono text-xs text-slate-500 shrink-0">{task.id}</span>
                                <span className="text-slate-300 truncate">{task.description}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 ml-2">
                                <button
                                  onClick={() => setNyqModal({ student: selected, taskId: task.id })}
                                  className="text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded-md border border-amber-800/30"
                                >
                                  NYQ
                                </button>
                                <button
                                  onClick={() => setSignoffModal({ student: selected, taskId: task.id })}
                                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-medium"
                                >
                                  Sign Off
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filtered.map(s => {
                  const stats = studentStats.find(st => st.student.id === s.id)
                  if (!stats) return null
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="text-left bg-slate-900 border border-slate-800 rounded-lg p-3 hover:border-slate-600 transition-all"
                    >
                      <div className="text-sm font-medium text-white">{s.full_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stats.completed.length}/{TOTAL_TASKS} tasks · {TOTAL_TASKS - stats.completed.length} remaining
                      </div>
                      <Bar pct={stats.pct} showPct={false} h="h-1" color="bg-indigo-500" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TRAINING TAB */}
        {tab === 'training' && (
          activeTrainingModule ? (
            <TrainingModule
              moduleId={activeTrainingModule}
              moduleTitle={SCHEMA.evaluator_training.modules.find(m => m.id === activeTrainingModule)?.title ?? ''}
              onComplete={(score) => {
                completeEvaluatorTraining(profile.id, activeTrainingModule, score)
                setActiveTrainingModule(null)
                setRefreshKey(k => k + 1)
              }}
              onBack={() => setActiveTrainingModule(null)}
            />
          ) : (
            <div className="space-y-5">
              <div className={`rounded-lg p-4 border ${
                trainingComplete
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-amber-950/20 border-amber-800/40'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">My Training Status</h3>
                  <span className={`text-sm font-bold ${trainingComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {myCompletedModules.length}/{SCHEMA.evaluator_training.modules.length} modules
                  </span>
                </div>
                <Bar
                  pct={Math.round((myCompletedModules.length / SCHEMA.evaluator_training.modules.length) * 100)}
                  color={trainingComplete ? 'bg-emerald-500' : 'bg-amber-500'}
                  h="h-2"
                />
                <p className="text-xs text-slate-400 mt-2">
                  {trainingComplete
                    ? 'All training modules complete. You are authorized to perform sign-offs. Recalibration required every 24 months.'
                    : `Complete all ${SCHEMA.evaluator_training.modules.length} modules to become an authorized evaluator. ${SCHEMA.evaluator_training.modules.length - myCompletedModules.length} module${SCHEMA.evaluator_training.modules.length - myCompletedModules.length !== 1 ? 's' : ''} remaining.`}
                </p>
              </div>

              <div className="space-y-3">
                {SCHEMA.evaluator_training.modules.map(mod => {
                  const completed = myCompletedModules.includes(mod.id)
                  const trainingRecord = myTraining.find(t => t.module_id === mod.id)
                  return (
                    <div
                      key={mod.id}
                      className={`bg-slate-900 border rounded-lg overflow-hidden ${
                        completed ? 'border-emerald-800/30' : 'border-slate-800'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                completed ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                              }`}>
                                {completed ? '✓' : mod.id.replace('ET-0', '')}
                              </span>
                              <h4 className="text-sm font-semibold text-white">{mod.title}</h4>
                            </div>
                            <p className="text-xs text-slate-400 mb-2 ml-8">{mod.description}</p>
                            <div className="flex flex-wrap gap-1 ml-8">
                              {mod.topics.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            {completed ? (
                              <div>
                                <div className="text-xs text-emerald-400 font-medium">Completed</div>
                                {trainingRecord?.score != null && (
                                  <div className="text-xs text-slate-500">Score: {trainingRecord.score}%</div>
                                )}
                                {trainingRecord?.completed_at && (
                                  <div className="text-xs text-slate-600">
                                    {new Date(trainingRecord.completed_at).toLocaleDateString()}
                                  </div>
                                )}
                                <button
                                  onClick={() => setActiveTrainingModule(mod.id)}
                                  className="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
                                >
                                  Review
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="text-xs text-slate-500 mb-1">{mod.duration_minutes} min</div>
                                <button
                                  onClick={() => setActiveTrainingModule(mod.id)}
                                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md font-medium"
                                >
                                  Start Module
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        )}

        {/* ─── SIGN-OFF MODAL ──────────────────────────────────────── */}
        {signoffModal && (() => {
          const task = findTask(signoffModal.taskId)
          const prep = PREP_CONTENT[signoffModal.taskId]
          if (!task) return null
          return (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => { setSignoffModal(null); setSignoffNotes('') }}
            >
              <div
                className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-lg font-bold text-white">Digital Sign-off</h3>
                  <p className="text-xs text-slate-500">
                    Confirm {signoffModal.student.full_name} demonstrated competency
                  </p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Task {signoffModal.taskId}</div>
                  <div className="text-sm text-white">{task.description}</div>
                </div>

                {prep && (
                  <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-lg p-3">
                    <p className="text-xs font-semibold text-indigo-300 mb-1.5">
                      Evaluation Criteria — Did the candidate:
                    </p>
                    <ul className="space-y-1">
                      {prep.evaluator_watch.map((w, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-indigo-400">☐</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes field */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Notes (optional)</label>
                  <textarea
                    value={signoffNotes}
                    onChange={e => setSignoffNotes(e.target.value)}
                    placeholder="Any observations, conditions, or equipment used..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
                    rows={2}
                  />
                </div>

                <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-300">
                  By signing off, I confirm this candidate performed the task correctly,
                  independently, safely, and consistently. I would trust this technician to perform
                  this task unsupervised on a customer aircraft.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSignoffModal(null); setSignoffNotes('') }}
                    className="flex-1 py-2 text-sm text-slate-400 bg-slate-800 rounded-lg hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => doSignoff(signoffModal.student.id, signoffModal.taskId)}
                    className="flex-1 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 font-semibold"
                  >
                    Confirm Sign-off
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

        {/* ─── NYQ MODAL ──────────────────────────────────────────── */}
        {nyqModal && (() => {
          const task = findTask(nyqModal.taskId)
          if (!task) return null
          return (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => { setNyqModal(null); setNyqNotes(''); setNyqAreas('') }}
            >
              <div
                className="bg-slate-900 border border-amber-700/50 rounded-xl p-5 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-lg font-bold text-amber-400">Not Yet Qualified</h3>
                  <p className="text-xs text-slate-500">
                    Record that {nyqModal.student.full_name} attempted but did not demonstrate competency
                  </p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Task {nyqModal.taskId}</div>
                  <div className="text-sm text-white">{task.description}</div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">What happened? *</label>
                  <textarea
                    value={nyqNotes}
                    onChange={e => setNyqNotes(e.target.value)}
                    placeholder="Describe what the candidate struggled with or could not demonstrate..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Areas to improve (one per line)</label>
                  <textarea
                    value={nyqAreas}
                    onChange={e => setNyqAreas(e.target.value)}
                    placeholder={"Proper tool selection\nSafety wire technique\nDocumentation procedure"}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-300">
                  This records an unsuccessful attempt. The candidate should study the improvement areas
                  and schedule another evaluation when ready. NYQ records are visible to the candidate
                  as constructive feedback.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setNyqModal(null); setNyqNotes(''); setNyqAreas('') }}
                    className="flex-1 py-2 text-sm text-slate-400 bg-slate-800 rounded-lg hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => doNYQ(nyqModal.student.id, nyqModal.taskId)}
                    disabled={!nyqNotes.trim()}
                    className="flex-1 py-2 text-sm text-white bg-amber-600 rounded-lg hover:bg-amber-500 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Record NYQ
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

        {/* ─── REVERSAL MODAL ──────────────────────────────────────── */}
        {reversalModal && (() => {
          const task = findTask(reversalModal.taskId)
          return (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => { setReversalModal(null); setReversalReason('') }}
            >
              <div
                className="bg-slate-900 border border-rose-700/50 rounded-xl p-5 max-w-lg w-full space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-lg font-bold text-rose-400">Reverse Sign-off</h3>
                  <p className="text-xs text-slate-500">
                    Reverse the sign-off for {reversalModal.studentName} on task {reversalModal.taskId}
                  </p>
                </div>
                {task && (
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Task {reversalModal.taskId}</div>
                    <div className="text-sm text-white">{task.description}</div>
                  </div>
                )}

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Reason for reversal *</label>
                  <textarea
                    value={reversalReason}
                    onChange={e => setReversalReason(e.target.value)}
                    placeholder="Explain why this sign-off is being reversed..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="bg-rose-950/30 border border-rose-800/40 rounded-lg p-3 text-xs text-rose-300">
                  This action will remove the sign-off and require the candidate to re-demonstrate
                  competency. The reversal will be logged with your name, reason, and timestamp.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setReversalModal(null); setReversalReason('') }}
                    className="flex-1 py-2 text-sm text-slate-400 bg-slate-800 rounded-lg hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => doReversal(reversalModal.signoffId)}
                    disabled={!reversalReason.trim()}
                    className="flex-1 py-2 text-sm text-white bg-rose-600 rounded-lg hover:bg-rose-500 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirm Reversal
                  </button>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
