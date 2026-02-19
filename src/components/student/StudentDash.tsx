import { useState } from 'react'
import {
  SCHEMA,
  TOTAL_TASKS,
  findTask,
  getCategoryProgress,
  getNextRecommended,
  getPaceAnalysis,
} from '../../lib/schema'
import { getCompletedTaskIds } from '../../lib/mock-db'
import type { UserProfile } from '../../hooks/useAuth'
import type { MockEnrollment } from '../../lib/mock-data'
import { PREP_CONTENT } from '../../lib/prep-content'

interface StudentDashProps {
  profile: UserProfile
  enrollment: MockEnrollment
}

/* ── Minimal progress bar ────────────────────────────────────────── */
function ProgressBar({ pct, h = 'h-1.5' }: { pct: number; h?: string }) {
  return (
    <div className={`w-full bg-slate-800 rounded-full ${h} overflow-hidden`}>
      <div
        className={`${h} rounded-full transition-all duration-700 ${pct === 100 ? 'bg-emerald-500' : 'bg-emerald-500/70'}`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  )
}

/* ── Check icon ──────────────────────────────────────────────────── */
function Check({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ChevronRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ChevronDown({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

/* ── Main Component ──────────────────────────────────────────────── */

export function StudentDash({ profile, enrollment }: StudentDashProps) {
  const [view, setView] = useState<'overview' | 'categories' | 'prep'>('overview')
  const [expandCat, setExpandCat] = useState<number | null>(null)
  const [prepTaskId, setPrepTaskId] = useState<string | null>(null)
  const [prepChecklist, setPrepChecklist] = useState<Record<string, boolean>>({})

  const completedTaskIds = getCompletedTaskIds(profile.id)
  const progress = getCategoryProgress(completedTaskIds)
  const totalDone = completedTaskIds.length
  const pct = Math.round((totalDone / TOTAL_TASKS) * 100)
  const pace = getPaceAnalysis(totalDone, enrollment.start_date)
  const nextTasks = getNextRecommended(completedTaskIds, [], 3)

  const startDate = new Date(enrollment.start_date)
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + SCHEMA.program.time_limit_months)
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const nearComplete = progress
    .filter(c => c.pct > 0 && c.pct < 100)
    .sort((a, b) => b.pct - a.pct)

  const prepTask = prepTaskId ? findTask(prepTaskId) : null
  const prepContent = prepTaskId ? PREP_CONTENT[prepTaskId] : null

  function openPrep(taskId: string) {
    setPrepTaskId(taskId)
    setPrepChecklist({})
    setView('prep')
  }

  function toggleCheckItem(key: string) {
    setPrepChecklist(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">

      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-semibold text-white">{profile.full_name}</h1>
              <p className="text-xs text-slate-500 mt-0.5">CAET Advanced Practical Qualification</p>
            </div>
            <div className="flex items-baseline gap-6 text-right">
              <div>
                <span className="text-2xl font-semibold text-white tabular-nums">{totalDone}</span>
                <span className="text-sm text-slate-500">/{TOTAL_TASKS} tasks</span>
              </div>
              <div>
                <span className={`text-2xl font-semibold tabular-nums ${daysRemaining > 180 ? 'text-white' : daysRemaining > 90 ? 'text-amber-400' : 'text-red-400'}`}>{daysRemaining}</span>
                <span className="text-sm text-slate-500"> days left</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar pct={pct} h="h-1" />
            </div>
            <span className="text-xs text-slate-500 tabular-nums w-8 text-right">{pct}%</span>
          </div>

          {/* Nav */}
          <nav className="flex gap-1 mt-4 -mb-px">
            {([['overview', 'Overview'], ['categories', 'Categories'], ['prep', 'Prep Coach']] as const).map(
              ([v, l]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
                    view === v
                      ? 'text-white border-emerald-500'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
                >
                  {l}
                </button>
              )
            )}
          </nav>
        </div>
      </header>

      {/* ─── CONTENT ────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* ═══ OVERVIEW ═════════════════════════════════════════ */}
        {view === 'overview' && (
          <div className="space-y-10">

            {/* Status message */}
            <section>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                {pace.complete
                  ? enrollment.written_exam_date
                    ? 'All 65 practical tasks signed off. Written exam passed. Ready for oral board scheduling.'
                    : 'All 65 practical tasks signed off. Next step: schedule your written examination.'
                  : pace.onTrack
                    ? `You're completing about 1 task every ${pace.pace} days. At this pace you'll finish the remaining ${pace.left} tasks in roughly ${pace.projected} days, well within your ${pace.remaining}-day window.`
                    : `At your current pace of 1 task every ${pace.pace} days, you'll need about ${pace.projected} days to complete ${pace.left} remaining tasks — but you have ${pace.remaining} days left. Consider increasing your weekly rate.`}
              </p>
            </section>

            {/* Certification steps */}
            <section>
              <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Certification Path</h2>
              <div className="flex gap-3">
                {SCHEMA.program.certification_flow.map((gate) => {
                  const status =
                    gate.gate === 'practical_tasks' ? (pace.complete ? 'done' : 'active')
                    : gate.gate === 'written_exam' ? (enrollment.written_exam_date ? 'done' : pace.complete ? 'active' : 'locked')
                    : gate.gate === 'oral_board' ? (enrollment.written_exam_date ? 'active' : 'locked')
                    : gate.gate === 'certificate_issued' ? (enrollment.certificate_number ? 'done' : 'locked')
                    : 'locked'
                  const label = gate.gate === 'practical_tasks' ? '65 Tasks'
                    : gate.gate === 'written_exam' ? 'Written Exam'
                    : gate.gate === 'oral_board' ? 'Oral Board'
                    : 'Certified'

                  return (
                    <div key={gate.step} className={`flex-1 rounded-lg px-4 py-3 border transition-all ${
                      status === 'done' ? 'border-emerald-800/40 bg-emerald-950/20'
                      : status === 'active' ? 'border-slate-700 bg-slate-900'
                      : 'border-slate-800/40 bg-slate-900/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {status === 'done' ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                            status === 'active' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-600'
                          }`}>
                            {gate.step}
                          </div>
                        )}
                        <span className={`text-sm font-medium ${
                          status === 'done' ? 'text-emerald-400' : status === 'active' ? 'text-white' : 'text-slate-600'
                        }`}>
                          {label}
                        </span>
                      </div>
                      {status === 'active' && gate.gate === 'practical_tasks' && (
                        <p className="text-xs text-slate-500 ml-7">{pace.left} remaining</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Suggested next */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Suggested Next</h2>
                {nearComplete.length > 0 && nearComplete[0].pct >= 60 && (
                  <span className="text-xs text-slate-500">
                    Category {nearComplete[0].id} is {nearComplete[0].pct}% done — {nearComplete[0].total - nearComplete[0].done} left
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {nextTasks.map(task => {
                  const catProgress = progress.find(c => c.id === task.catId)
                  return (
                    <button
                      key={task.id}
                      onClick={() => openPrep(task.id)}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer group text-left"
                    >
                      <span className="font-mono text-xs text-slate-600 w-8 shrink-0">{task.id}</span>
                      <span className="text-sm text-slate-300 group-hover:text-white flex-1 transition-colors">
                        {task.description}
                      </span>
                      {catProgress && (
                        <span className="text-xs text-slate-600 shrink-0 tabular-nums">
                          {catProgress.done}/{catProgress.total}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-500 transition-colors shrink-0" />
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Category grid */}
            <section>
              <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Progress by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-800/50 rounded-lg overflow-hidden">
                {progress.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setExpandCat(c.id); setView('categories') }}
                    className="bg-slate-950 px-4 py-4 text-left hover:bg-slate-900/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300 font-medium">{c.title}</span>
                      <span className={`text-xs tabular-nums font-medium ${c.pct === 100 ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {c.done}/{c.total}
                      </span>
                    </div>
                    <ProgressBar pct={c.pct} h="h-1" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══ CATEGORIES ═══════════════════════════════════════ */}
        {view === 'categories' && (
          <div className="space-y-1">
            {progress.map((cat) => (
              <div key={cat.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandCat(expandCat === cat.id ? null : cat.id)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <span className={`text-xs font-medium tabular-nums w-10 shrink-0 ${cat.pct === 100 ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {cat.done}/{cat.total}
                  </span>
                  <span className="text-sm text-white font-medium flex-1 text-left">{cat.title}</span>
                  <div className="w-24 shrink-0">
                    <ProgressBar pct={cat.pct} h="h-1" />
                  </div>
                  {expandCat === cat.id
                    ? <ChevronDown className="w-4 h-4 text-slate-600 shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                  }
                </button>

                {expandCat === cat.id && (
                  <div className="pb-2">
                    {cat.tasks.map(task => {
                      const done = completedTaskIds.includes(task.id)
                      return (
                        <div
                          key={task.id}
                          className={`flex items-center gap-4 px-4 py-2.5 ml-4 ${
                            done ? '' : 'hover:bg-slate-900/50'
                          } transition-colors rounded-md`}
                        >
                          {done ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-700 shrink-0" />
                          )}
                          <span className={`font-mono text-xs w-9 shrink-0 ${done ? 'text-slate-700' : 'text-slate-600'}`}>
                            {task.id}
                          </span>
                          <span className={`text-sm flex-1 ${done ? 'text-slate-600' : 'text-slate-300'}`}>
                            {task.description}
                          </span>
                          {!done && (
                            <button
                              onClick={(e) => { e.stopPropagation(); openPrep(task.id) }}
                              className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                            >
                              Prepare →
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ PREP COACH ═══════════════════════════════════════ */}
        {view === 'prep' && (
          <div>
            <button
              onClick={() => setView('overview')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-6 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {prepTask && prepContent ? (() => {
              const studyItems = [
                ...prepContent.prep_topics.map((t, i) => ({ key: `prep-${i}`, label: t })),
                ...(prepContent.study_guide || []).map((s, i) => ({ key: `study-${i}`, label: s })),
              ]
              const demoItems = prepContent.evaluator_watch.map((w, i) => ({ key: `watch-${i}`, label: w }))
              const allItems = [...studyItems, ...demoItems]
              const checkedCount = allItems.filter(item => prepChecklist[item.key]).length
              const allChecked = checkedCount === allItems.length
              const readinessPct = Math.round((checkedCount / allItems.length) * 100)

              return (
                <div className="space-y-8">
                  {/* Title */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Category {prepTask.catId} · {prepTask.catTitle}
                    </p>
                    <h2 className="text-xl font-semibold text-white leading-snug">
                      {prepTask.description}
                    </h2>
                    <p className="font-mono text-xs text-slate-600 mt-1">{prepTask.id}</p>
                  </div>

                  {/* Readiness */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Readiness</span>
                      <span className={`text-xs tabular-nums ${allChecked ? 'text-emerald-500 font-medium' : 'text-slate-600'}`}>
                        {checkedCount} of {allItems.length}
                      </span>
                    </div>
                    <ProgressBar pct={readinessPct} h="h-1" />
                    {allChecked && (
                      <p className="text-sm text-emerald-500 mt-3">
                        You've reviewed everything. Request a sign-off from your evaluator when ready.
                      </p>
                    )}
                  </div>

                  {/* Overview */}
                  {prepContent.overview && (
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Overview</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {prepContent.overview}
                      </p>
                    </div>
                  )}

                  {/* Study Guide */}
                  <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Study Guide</h3>
                    <p className="text-xs text-slate-600 mb-3">Check off items as you study.</p>
                    <div className="space-y-px">
                      {studyItems.map(item => (
                        <button
                          key={item.key}
                          onClick={() => toggleCheckItem(item.key)}
                          className="w-full flex items-start gap-3 py-2.5 px-3 rounded-md hover:bg-slate-900 text-left transition-colors cursor-pointer"
                        >
                          <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                            prepChecklist[item.key]
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-700'
                          }`}>
                            {prepChecklist[item.key] && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-600' : 'text-slate-300'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evaluator Criteria */}
                  <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">What the Evaluator Checks</h3>
                    <p className="text-xs text-slate-600 mb-3">You must demonstrate each of these.</p>
                    <div className="space-y-px">
                      {demoItems.map(item => (
                        <button
                          key={item.key}
                          onClick={() => toggleCheckItem(item.key)}
                          className="w-full flex items-start gap-3 py-2.5 px-3 rounded-md hover:bg-slate-900 text-left transition-colors cursor-pointer"
                        >
                          <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                            prepChecklist[item.key]
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-700'
                          }`}>
                            {prepChecklist[item.key] && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-600' : 'text-slate-300'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tips */}
                  {prepContent.pro_tips && prepContent.pro_tips.length > 0 && (
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Pro Tips</h3>
                      <div className="space-y-3">
                        {prepContent.pro_tips.map((tip, i) => (
                          <p key={i} className="text-sm text-slate-400 leading-relaxed pl-4 border-l-2 border-slate-800">
                            {tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Common Mistakes</h3>
                    <div className="space-y-2">
                      {prepContent.common_errors.map((e, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm">
                          <span className="text-amber-500 mt-0.5 shrink-0">×</span>
                          <span className="text-slate-400 leading-relaxed">{e}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* References */}
                  {((prepContent.references && prepContent.references.length > 0) || prepTask.mapped_questions.length > 0) && (
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">References</h3>
                      <div className="space-y-1.5">
                        {prepContent.references?.map((ref, i) => (
                          <p key={i} className="text-xs text-slate-500 leading-relaxed">
                            {ref}
                          </p>
                        ))}
                        {prepTask.mapped_questions.length > 0 && (
                          <p className="text-xs text-slate-500">
                            {prepTask.mapped_questions.length} practice questions (Q#{prepTask.mapped_questions.join(', #')})
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Standard */}
                  <p className="text-xs text-slate-700 pt-4 border-t border-slate-900">
                    Competency standard: {SCHEMA.program.competency_standard}
                  </p>
                </div>
              )
            })() : (
              <div className="py-20 text-center">
                <p className="text-sm text-slate-500 mb-1">No task selected</p>
                <p className="text-xs text-slate-600">
                  Pick a task from{' '}
                  <button onClick={() => setView('categories')} className="text-emerald-500 hover:text-emerald-400 cursor-pointer">Categories</button>
                  {' '}or{' '}
                  <button onClick={() => setView('overview')} className="text-emerald-500 hover:text-emerald-400 cursor-pointer">Overview</button>.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
