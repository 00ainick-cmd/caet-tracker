import { useState } from 'react'
import { Bar, AICard, Icons } from '../shared'
import {
  SCHEMA,
  TOTAL_TASKS,
  CAT_COLORS,
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

  // Days remaining in program
  const startDate = new Date(enrollment.start_date)
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + SCHEMA.program.time_limit_months)
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  // Find categories closest to completion for guidance
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
    <div className="min-h-screen bg-slate-950">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold text-white">{profile.full_name}</h1>
              <p className="text-xs text-slate-400">CAET Advanced Candidate</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-white">{totalDone}/{TOTAL_TASKS}</div>
                <div className="text-xs text-slate-500">Tasks</div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="text-center">
                <div className={`text-sm font-bold ${daysRemaining > 180 ? 'text-emerald-400' : daysRemaining > 90 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {daysRemaining}
                </div>
                <div className="text-xs text-slate-500">Days Left</div>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div className="text-center">
                <div className="text-sm font-bold text-emerald-400">{pct}%</div>
                <div className="text-xs text-slate-500">Complete</div>
              </div>
            </div>
          </div>

          {/* Multi-color progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">
                {totalDone} of {TOTAL_TASKS} tasks
              </span>
              <span className="text-emerald-400 font-bold">{pct}%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-3 overflow-hidden flex">
              {progress.map((c, i) => (
                <div
                  key={c.id}
                  className={`${CAT_COLORS[i]} h-3 transition-all duration-700`}
                  style={{ width: `${(c.done / TOTAL_TASKS) * 100}%` }}
                  title={`${c.title}: ${c.done}/${c.total}`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
              {progress.map((c, i) => (
                <div key={c.id} className="flex items-center gap-1 text-xs text-slate-500">
                  <div className={`w-2 h-2 rounded-sm ${CAT_COLORS[i]}`} />
                  {c.title.split('&')[0].trim()}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {([['overview', 'Overview'], ['categories', 'Categories'], ['prep', 'Prep Coach']] as const).map(
              ([v, l]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    view === v ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {l}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-5">
        {/* OVERVIEW TAB */}
        {view === 'overview' && (
          <>
            <AICard
              title="Pace Analysis"
              variant={pace.complete ? 'success' : pace.onTrack ? 'success' : 'warning'}
            >
              {pace.complete
                ? `All 65 tasks complete! ${
                    enrollment.written_exam_date
                      ? 'Written exam passed — ready for oral board scheduling.'
                      : 'Next step: written examination.'
                  }`
                : pace.onTrack
                  ? `At 1 task every ${pace.pace} days, you'll finish ${pace.left} remaining tasks in ~${pace.projected} days. You have ${pace.remaining} days in your ${SCHEMA.program.time_limit_months}-month window. Ahead of schedule.`
                  : `At 1 task every ${pace.pace} days, you need ~${pace.projected} days for ${pace.left} remaining tasks but only ${pace.remaining} days remain in your ${SCHEMA.program.time_limit_months}-month window. Increase your weekly rate to stay on track.`}
            </AICard>

            {/* Certification Flow */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Certification Path
              </h3>
              <div className="flex items-center gap-1">
                {SCHEMA.program.certification_flow.map((gate, i) => {
                  const gateStatus =
                    gate.gate === 'practical_tasks'
                      ? pace.complete
                        ? 'done'
                        : 'active'
                      : gate.gate === 'written_exam'
                        ? enrollment.written_exam_date
                          ? 'done'
                          : pace.complete
                            ? 'active'
                            : 'locked'
                        : gate.gate === 'oral_board'
                          ? enrollment.written_exam_date
                            ? 'active'
                            : 'locked'
                          : gate.gate === 'certificate_issued'
                            ? enrollment.certificate_number
                              ? 'done'
                              : 'locked'
                            : 'locked'
                  return (
                    <div key={gate.step} className="flex items-center gap-1 flex-1">
                      <div
                        className={`flex-1 rounded-md px-2 py-2 text-center text-xs font-medium border transition-all ${
                          gateStatus === 'done'
                            ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400'
                            : gateStatus === 'active'
                              ? 'bg-cyan-950/40 border-cyan-700/50 text-cyan-300 animate-pulse'
                              : 'bg-slate-800/50 border-slate-700/30 text-slate-600'
                        }`}
                      >
                        {gateStatus === 'done' ? '✓ ' : gateStatus === 'active' ? '→ ' : ''}
                        {gate.gate === 'practical_tasks'
                          ? '65 Tasks'
                          : gate.gate === 'written_exam'
                            ? 'Written Exam'
                            : gate.gate === 'oral_board'
                              ? 'Oral Board'
                              : 'Certified'}
                      </div>
                      {i < SCHEMA.program.certification_flow.length - 1 && (
                        <span className="text-slate-700 text-xs">›</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Next-Step Guidance */}
            {nearComplete.length > 0 && (
              <AICard title="Next Steps" variant="tip">
                {nearComplete.slice(0, 2).map(cat => {
                  const remaining = cat.total - cat.done
                  return (
                    <p key={cat.id} className="mb-1">
                      <span className="text-violet-300 font-medium">Category {cat.id} — {cat.title}:</span>{' '}
                      {remaining} task{remaining !== 1 ? 's' : ''} remaining ({cat.pct}% complete).{' '}
                      {remaining <= 3
                        ? 'Almost there — finishing this category will strengthen your qualification record.'
                        : 'Keep building momentum in this area.'}
                    </p>
                  )
                })}
              </AICard>
            )}

            {/* Recommended Next Tasks */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Recommended Next Tasks</h3>
              <div className="space-y-2">
                {nextTasks.map(task => {
                  const catProgress = progress.find(c => c.id === task.catId)
                  return (
                    <button
                      key={task.id}
                      onClick={() => openPrep(task.id)}
                      className="w-full text-left bg-slate-900 border border-slate-800 rounded-lg p-3 hover:border-slate-600 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-slate-500 mb-0.5">
                            Cat {task.catId} · {task.catTitle}
                          </div>
                          <div className="text-sm text-slate-200 group-hover:text-white">
                            <span className="font-mono text-emerald-500 mr-1.5">{task.id}</span>
                            {task.description}
                          </div>
                        </div>
                        {catProgress && (
                          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full mt-0.5 shrink-0">
                            {catProgress.done}/{catProgress.total} in cat
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category Progress Grid */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Category Progress</h3>
              <div className="grid grid-cols-2 gap-2">
                {progress.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setExpandCat(c.id)
                      setView('categories')
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-left hover:border-slate-600 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-500">Cat {c.id}</span>
                      <span
                        className={`text-xs font-bold ${
                          c.pct === 100 ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {c.done}/{c.total}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium mb-2 leading-tight">
                      {c.title}
                    </div>
                    <Bar
                      pct={c.pct}
                      color={c.pct === 100 ? 'bg-emerald-500' : CAT_COLORS[i]}
                      showPct={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CATEGORIES TAB */}
        {view === 'categories' && (
          <div className="space-y-3">
            {progress.map((cat, i) => (
              <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandCat(expandCat === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-800/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${CAT_COLORS[i]} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {cat.id}
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-white font-medium">{cat.title}</div>
                      <div className="text-xs text-slate-500">
                        {cat.done}/{cat.total} tasks
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {cat.pct === 100 && (
                      <span className="text-emerald-400">{Icons.check}</span>
                    )}
                    <span className="text-slate-500">
                      {expandCat === cat.id ? Icons.down : Icons.right}
                    </span>
                  </div>
                </button>
                {expandCat === cat.id && (
                  <div className="border-t border-slate-800 p-3 space-y-1">
                    {cat.tasks.map(task => {
                      const done = completedTaskIds.includes(task.id)
                      return (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between py-2 px-2 rounded-md ${
                            done ? 'bg-emerald-950/20' : 'hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {done ? (
                              <span className="text-emerald-400 shrink-0">{Icons.check}</span>
                            ) : (
                              <span className="text-slate-600 shrink-0">{Icons.lock}</span>
                            )}
                            <span className="font-mono text-xs text-slate-500 w-8 shrink-0">
                              {task.id}
                            </span>
                            <span
                              className={`text-sm truncate ${
                                done ? 'text-slate-500 line-through' : 'text-slate-300'
                              }`}
                            >
                              {task.description}
                            </span>
                          </div>
                          {!done && (
                            <button
                              onClick={() => openPrep(task.id)}
                              className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/30 hover:border-cyan-700/50 shrink-0 ml-2"
                            >
                              Prep
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

        {/* PREP COACH TAB */}
        {view === 'prep' && (
          <div className="space-y-4">
            <button
              onClick={() => setView('overview')}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              ← Back to Overview
            </button>
            {prepTask && prepContent ? (() => {
              // Build checklist items for readiness assessment
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
                <>
                  {/* Task Header */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-1">
                      Category {prepTask.catId} · {prepTask.catTitle}
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      <span className="text-emerald-400 font-mono mr-2">{prepTask.id}</span>
                      {prepTask.description}
                    </h2>
                    {prepTask.mapped_questions.length > 0 && (
                      <div className="text-xs text-slate-500 mt-1">
                        {prepTask.mapped_questions.length} practice questions mapped to this task
                      </div>
                    )}
                  </div>

                  {/* Overview */}
                  {prepContent.overview && (
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-slate-300 mb-2">Overview</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {prepContent.overview}
                      </p>
                    </div>
                  )}

                  {/* Readiness Assessment Bar */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-slate-300">Readiness Self-Assessment</h3>
                      <span className={`text-sm font-bold ${allChecked ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {checkedCount}/{allItems.length} items reviewed
                      </span>
                    </div>
                    <Bar
                      pct={readinessPct}
                      color={allChecked ? 'bg-emerald-500' : readinessPct > 50 ? 'bg-cyan-500' : 'bg-slate-500'}
                      h="h-2"
                    />
                    {allChecked ? (
                      <div className="mt-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-3 text-sm text-emerald-300">
                        <span className="font-semibold">Ready for evaluation.</span> You've reviewed all preparation
                        topics and demonstration criteria. Request a sign-off from your evaluator when you're confident.
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">
                        Check off each item below as you study. When all items are reviewed, you'll see a readiness indicator.
                      </p>
                    )}
                  </div>

                  {/* Study Guide — detailed instructional content */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">
                      Study Guide
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Work through each topic. Check off items as you gain confidence in your understanding.
                    </p>
                    <div className="space-y-1">
                      {studyItems.map(item => (
                        <button
                          key={item.key}
                          onClick={() => toggleCheckItem(item.key)}
                          className="w-full flex items-start gap-3 py-2 px-2 rounded-md hover:bg-slate-800/50 text-left transition-all"
                        >
                          <span className={`mt-0.5 shrink-0 ${prepChecklist[item.key] ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {prepChecklist[item.key] ? Icons.check : '\u2610'}
                          </span>
                          <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evaluator Criteria — what the evaluator is watching for */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-300 mb-1">
                      Evaluator Criteria — What You Must Demonstrate
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Your evaluator will specifically verify each of these. Can you demonstrate them correctly, independently, and consistently?
                    </p>
                    <div className="space-y-1">
                      {demoItems.map(item => (
                        <button
                          key={item.key}
                          onClick={() => toggleCheckItem(item.key)}
                          className="w-full flex items-start gap-3 py-2 px-2 rounded-md hover:bg-slate-800/50 text-left transition-all"
                        >
                          <span className={`mt-0.5 shrink-0 ${prepChecklist[item.key] ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {prepChecklist[item.key] ? Icons.check : '\u2610'}
                          </span>
                          <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tips */}
                  {prepContent.pro_tips && prepContent.pro_tips.length > 0 && (
                    <AICard title="Pro Tips from Experienced Technicians" variant="tip">
                      <ul className="space-y-2">
                        {prepContent.pro_tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-violet-400 mt-0.5 shrink-0">&raquo;</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </AICard>
                  )}

                  {/* Common Mistakes */}
                  <AICard title="Common Mistakes to Avoid" variant="warning">
                    <ul className="space-y-2">
                      {prepContent.common_errors.map((e, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5 shrink-0">&times;</span>
                          <span className="leading-relaxed">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </AICard>

                  {/* References & Resources */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">References & Resources</h3>
                    <div className="space-y-2 text-sm text-slate-400">
                      {/* Regulatory references */}
                      {prepContent.references && prepContent.references.length > 0 && (
                        <div className="space-y-1.5 mb-3">
                          {prepContent.references.map((ref, i) => (
                            <div key={i} className="flex items-start gap-2 bg-slate-800/50 rounded-md px-3 py-2">
                              <span className="text-cyan-500 mt-0.5 shrink-0">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </span>
                              <span className="leading-relaxed">{ref}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {prepTask.mapped_questions.length > 0 && (
                        <div className="bg-slate-800/50 rounded-md px-3 py-2">
                          {prepTask.mapped_questions.length} practice questions (Q#
                          {prepTask.mapped_questions.join(', #')})
                        </div>
                      )}
                      <div className="bg-slate-800/50 rounded-md px-3 py-2">
                        CAET Advanced Training — Module{' '}
                        {SCHEMA.categories
                          .find(c => c.id === prepTask.catId)
                          ?.test_bank_modules?.join(', ') || prepTask.catId}
                      </div>
                    </div>
                  </div>

                  {/* Competency Standard */}
                  <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                    <p className="text-xs text-slate-500 italic">
                      Standard: "{SCHEMA.program.competency_standard}"
                    </p>
                  </div>
                </>
              )
            })() : (
              <div className="text-center py-12">
                <div className="text-slate-500 mb-4">
                  Select a task from Categories or Overview to see preparation materials.
                </div>
                <div className="text-xs text-slate-600">
                  The Prep Coach helps you study for each task with checklists, evaluator criteria, and common mistakes.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
