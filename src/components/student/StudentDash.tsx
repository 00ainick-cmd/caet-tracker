import { useState } from 'react'
import { Bar, Icons } from '../shared'
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

/* ── tiny helpers ─────────────────────────────────────────────────── */

const CAT_TEXT_COLORS = [
  'text-sky-400',
  'text-violet-400',
  'text-rose-400',
  'text-amber-400',
  'text-emerald-400',
  'text-orange-400',
  'text-cyan-400',
  'text-pink-400',
]

const CAT_BG_SUBTLE = [
  'bg-sky-500/10',
  'bg-violet-500/10',
  'bg-rose-500/10',
  'bg-amber-500/10',
  'bg-emerald-500/10',
  'bg-orange-500/10',
  'bg-cyan-500/10',
  'bg-pink-500/10',
]

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

  // Days remaining in program
  const startDate = new Date(enrollment.start_date)
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + SCHEMA.program.time_limit_months)
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  // Categories near completion for guidance
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
      {/* ─── COMPACT HEADER ─────────────────────────────────────── */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white leading-tight">{profile.full_name}</h1>
                <p className="text-xs text-slate-500">CAET Advanced Candidate</p>
              </div>
            </div>

            {/* Tabs — centered */}
            <div className="flex bg-slate-800/60 rounded-lg p-0.5">
              {([['overview', 'Overview'], ['categories', 'Categories'], ['prep', 'Prep Coach']] as const).map(
                ([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      view === v
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                )
              )}
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-5 text-right">
              <div>
                <div className="text-lg font-bold text-white leading-tight">{totalDone}<span className="text-slate-500 text-sm font-normal">/{TOTAL_TASKS}</span></div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Tasks</div>
              </div>
              <div>
                <div className={`text-lg font-bold leading-tight ${daysRemaining > 180 ? 'text-emerald-400' : daysRemaining > 90 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {daysRemaining}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Days Left</div>
              </div>
            </div>
          </div>

          {/* Slim progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden flex">
              {progress.map((c, i) => (
                <div
                  key={c.id}
                  className={`${CAT_COLORS[i]} h-2 transition-all duration-700`}
                  style={{ width: `${(c.done / TOTAL_TASKS) * 100}%` }}
                  title={`${c.title}: ${c.done}/${c.total}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-400 w-10 text-right">{pct}%</span>
          </div>
        </div>
      </div>

      {/* ─── CONTENT ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ═══ OVERVIEW TAB ═══════════════════════════════════════ */}
        {view === 'overview' && (
          <div className="space-y-6">

            {/* ── Row 1: Status + Certification ─────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Pace status — left 3 cols */}
              <div className={`lg:col-span-3 rounded-xl p-5 border ${
                pace.complete
                  ? 'border-emerald-700/40 bg-emerald-950/20'
                  : pace.onTrack
                    ? 'border-emerald-700/30 bg-gradient-to-br from-slate-900 to-emerald-950/30'
                    : 'border-amber-700/30 bg-gradient-to-br from-slate-900 to-amber-950/30'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                      pace.complete ? 'text-emerald-400' : pace.onTrack ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {pace.complete ? 'Tasks Complete' : pace.onTrack ? 'On Track' : 'Attention Needed'}
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed max-w-md">
                      {pace.complete
                        ? enrollment.written_exam_date
                          ? 'All 65 tasks signed off. Written exam passed — ready for oral board.'
                          : 'All 65 tasks signed off. Next step: written examination.'
                        : pace.onTrack
                          ? `At your current pace (1 task every ${pace.pace} days), you'll finish in ~${pace.projected} days. You have ${pace.remaining} days remaining.`
                          : `You need ~${pace.projected} days for ${pace.left} remaining tasks but only have ${pace.remaining} days left. Consider increasing your weekly rate.`}
                    </div>
                  </div>
                  {/* Large percent */}
                  <div className={`text-4xl font-bold leading-none ${
                    pace.complete ? 'text-emerald-400' : pace.onTrack ? 'text-emerald-400/80' : 'text-amber-400/80'
                  }`}>
                    {pct}%
                  </div>
                </div>

                {/* Mini category chips */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {progress.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => { setExpandCat(c.id); setView('categories') }}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs cursor-pointer transition-all hover:brightness-125 ${
                        c.pct === 100 ? 'bg-emerald-500/15 text-emerald-400' : `${CAT_BG_SUBTLE[i]} ${CAT_TEXT_COLORS[i]}`
                      }`}
                    >
                      {c.pct === 100 && <span className="text-emerald-400">{Icons.check}</span>}
                      <span className="font-medium">{c.done}/{c.total}</span>
                      <span className="opacity-60 hidden sm:inline">{c.title.split('&')[0].split('—')[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Certification path — right 2 cols */}
              <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Certification Path
                </div>
                <div className="space-y-2">
                  {SCHEMA.program.certification_flow.map((gate) => {
                    const gateStatus =
                      gate.gate === 'practical_tasks'
                        ? pace.complete ? 'done' : 'active'
                        : gate.gate === 'written_exam'
                          ? enrollment.written_exam_date ? 'done' : pace.complete ? 'active' : 'locked'
                          : gate.gate === 'oral_board'
                            ? enrollment.written_exam_date ? 'active' : 'locked'
                            : gate.gate === 'certificate_issued'
                              ? enrollment.certificate_number ? 'done' : 'locked'
                              : 'locked'
                    const label = gate.gate === 'practical_tasks' ? '65 Practical Tasks'
                      : gate.gate === 'written_exam' ? 'Written Examination'
                      : gate.gate === 'oral_board' ? 'Oral Board Review'
                      : 'Certification Issued'

                    return (
                      <div
                        key={gate.step}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                          gateStatus === 'done'
                            ? 'bg-emerald-500/10'
                            : gateStatus === 'active'
                              ? 'bg-cyan-500/10 border border-cyan-800/30'
                              : 'bg-slate-800/30'
                        }`}
                      >
                        {/* Step indicator */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          gateStatus === 'done'
                            ? 'bg-emerald-500 text-white'
                            : gateStatus === 'active'
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                              : 'bg-slate-700/50 text-slate-600'
                        }`}>
                          {gateStatus === 'done' ? Icons.check : gate.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${
                            gateStatus === 'done' ? 'text-emerald-400' : gateStatus === 'active' ? 'text-cyan-300' : 'text-slate-600'
                          }`}>
                            {label}
                          </div>
                          {gateStatus === 'active' && gate.gate === 'practical_tasks' && (
                            <div className="text-xs text-slate-500">{pace.left} tasks remaining</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── Row 2: Recommended Actions ────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-300">Up Next</h2>
                <button
                  onClick={() => setView('categories')}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  View all categories →
                </button>
              </div>

              {/* Near-complete nudge */}
              {nearComplete.length > 0 && nearComplete[0].pct >= 60 && (
                <div className="mb-3 flex items-center gap-3 bg-violet-500/8 border border-violet-800/25 rounded-lg px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-sm text-slate-300">
                    <span className="text-violet-300 font-medium">Close to finishing Category {nearComplete[0].id}</span>
                    <span className="text-slate-500"> — {nearComplete[0].title}: </span>
                    {nearComplete[0].total - nearComplete[0].done} task{nearComplete[0].total - nearComplete[0].done !== 1 ? 's' : ''} left
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nextTasks.map(task => {
                  const catIdx = progress.findIndex(c => c.id === task.catId)
                  const catProgress = progress[catIdx]
                  return (
                    <button
                      key={task.id}
                      onClick={() => openPrep(task.id)}
                      className={`text-left rounded-xl p-4 border border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900 transition-all cursor-pointer group`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-md ${CAT_COLORS[catIdx]} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {task.catId}
                        </div>
                        <span className="text-xs text-slate-500">{task.catTitle.split('&')[0].trim()}</span>
                        {catProgress && (
                          <span className="ml-auto text-[10px] text-slate-600">{catProgress.done}/{catProgress.total}</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-200 group-hover:text-white leading-snug mb-3">
                        {task.description}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-cyan-400 group-hover:text-cyan-300">
                        <span>Start prep</span>
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Row 3: All Categories ─────────────────────── */}
            <div>
              <h2 className="text-sm font-semibold text-slate-300 mb-3">All Categories</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {progress.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => { setExpandCat(c.id); setView('categories') }}
                    className="text-left rounded-lg p-3 border border-slate-800/60 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`text-xs font-bold ${c.pct === 100 ? 'text-emerald-400' : CAT_TEXT_COLORS[i]}`}>
                        {c.done}/{c.total}
                      </div>
                      {c.pct === 100 && <span className="text-emerald-400">{Icons.check}</span>}
                    </div>
                    <div className="text-xs text-slate-400 font-medium leading-tight mb-2 group-hover:text-slate-300 transition-colors">
                      {c.title}
                    </div>
                    <Bar
                      pct={c.pct}
                      color={c.pct === 100 ? 'bg-emerald-500' : CAT_COLORS[i]}
                      showPct={false}
                      h="h-1.5"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CATEGORIES TAB ════════════════════════════════════ */}
        {view === 'categories' && (
          <div className="space-y-2">
            {progress.map((cat, i) => (
              <div key={cat.id} className="rounded-xl border border-slate-800/60 bg-slate-900/40 overflow-hidden">
                <button
                  onClick={() => setExpandCat(expandCat === cat.id ? null : cat.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-800/30 transition-all cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-lg ${CAT_COLORS[i]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {cat.id}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm text-white font-medium">{cat.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden max-w-48">
                        <div
                          className={`${cat.pct === 100 ? 'bg-emerald-500' : CAT_COLORS[i]} h-1.5 rounded-full transition-all duration-700`}
                          style={{ width: `${cat.pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${cat.pct === 100 ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {cat.done}/{cat.total}
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-600 transition-transform">
                    {expandCat === cat.id ? Icons.down : Icons.right}
                  </span>
                </button>

                {expandCat === cat.id && (
                  <div className="border-t border-slate-800/50 px-3 pb-3 pt-1">
                    {cat.tasks.map(task => {
                      const done = completedTaskIds.includes(task.id)
                      return (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between py-2.5 px-3 rounded-lg mt-1 ${
                            done ? 'bg-emerald-500/5' : 'hover:bg-slate-800/40'
                          } transition-all`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {done ? (
                              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <span className="text-emerald-400 scale-75">{Icons.check}</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                              </div>
                            )}
                            <span className={`font-mono text-xs w-9 shrink-0 ${done ? 'text-slate-600' : 'text-slate-500'}`}>
                              {task.id}
                            </span>
                            <span className={`text-sm truncate ${done ? 'text-slate-600' : 'text-slate-300'}`}>
                              {task.description}
                            </span>
                          </div>
                          {!done && (
                            <button
                              onClick={(e) => { e.stopPropagation(); openPrep(task.id) }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/15 transition-all shrink-0 ml-2 cursor-pointer"
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

        {/* ═══ PREP COACH TAB ════════════════════════════════════ */}
        {view === 'prep' && (
          <div>
            <button
              onClick={() => setView('overview')}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-4 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Overview
            </button>

            {prepTask && prepContent ? (() => {
              // Build checklist items
              const studyItems = [
                ...prepContent.prep_topics.map((t, i) => ({ key: `prep-${i}`, label: t })),
                ...(prepContent.study_guide || []).map((s, i) => ({ key: `study-${i}`, label: s })),
              ]
              const demoItems = prepContent.evaluator_watch.map((w, i) => ({ key: `watch-${i}`, label: w }))
              const allItems = [...studyItems, ...demoItems]
              const checkedCount = allItems.filter(item => prepChecklist[item.key]).length
              const allChecked = checkedCount === allItems.length
              const readinessPct = Math.round((checkedCount / allItems.length) * 100)
              const catIdx = progress.findIndex(c => c.id === prepTask.catId)

              return (
                <div className="space-y-4">
                  {/* Task Header */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${CAT_COLORS[catIdx]} text-white`}>
                        Cat {prepTask.catId}
                      </div>
                      <span className="text-xs text-slate-500">{prepTask.catTitle}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white leading-snug">
                      <span className="text-emerald-400 font-mono mr-2 text-lg">{prepTask.id}</span>
                      {prepTask.description}
                    </h2>
                    {prepTask.mapped_questions.length > 0 && (
                      <div className="mt-2 text-xs text-slate-500">
                        {prepTask.mapped_questions.length} practice questions mapped to this task
                      </div>
                    )}

                    {/* Readiness bar */}
                    <div className="mt-4 pt-4 border-t border-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-400">Readiness</span>
                        <span className={`text-xs font-bold ${allChecked ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {checkedCount}/{allItems.length}
                        </span>
                      </div>
                      <Bar
                        pct={readinessPct}
                        color={allChecked ? 'bg-emerald-500' : readinessPct > 50 ? 'bg-cyan-500' : 'bg-slate-600'}
                        h="h-1.5"
                        showPct={false}
                      />
                      {allChecked && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
                          <span className="text-emerald-400">{Icons.check}</span>
                          <span className="font-medium">Ready for evaluation — request a sign-off from your evaluator.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overview */}
                  {prepContent.overview && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {prepContent.overview}
                      </p>
                    </div>
                  )}

                  {/* Two-column layout for Study + Evaluator */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Study Guide */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Study Guide
                      </h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Check off topics as you study them.
                      </p>
                      <div className="space-y-0.5">
                        {studyItems.map(item => (
                          <button
                            key={item.key}
                            onClick={() => toggleCheckItem(item.key)}
                            className="w-full flex items-start gap-2.5 py-2 px-2 rounded-lg hover:bg-slate-800/40 text-left transition-all cursor-pointer"
                          >
                            <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                              prepChecklist[item.key]
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'border-slate-600 bg-slate-800'
                            }`}>
                              {prepChecklist[item.key] && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-500' : 'text-slate-300'}`}>
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Evaluator Criteria */}
                    <div className="rounded-xl border border-cyan-800/25 bg-cyan-950/10 p-5">
                      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                        Evaluator Criteria
                      </h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Your evaluator will verify each of these.
                      </p>
                      <div className="space-y-0.5">
                        {demoItems.map(item => (
                          <button
                            key={item.key}
                            onClick={() => toggleCheckItem(item.key)}
                            className="w-full flex items-start gap-2.5 py-2 px-2 rounded-lg hover:bg-slate-800/40 text-left transition-all cursor-pointer"
                          >
                            <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                              prepChecklist[item.key]
                                ? 'bg-cyan-500 border-cyan-500'
                                : 'border-slate-600 bg-slate-800'
                            }`}>
                              {prepChecklist[item.key] && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm leading-relaxed ${prepChecklist[item.key] ? 'text-slate-500' : 'text-slate-300'}`}>
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pro Tips + Common Mistakes side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Pro Tips */}
                    {prepContent.pro_tips && prepContent.pro_tips.length > 0 && (
                      <div className="rounded-xl border border-violet-800/25 bg-violet-950/10 p-5">
                        <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">
                          Pro Tips
                        </h3>
                        <ul className="space-y-3">
                          {prepContent.pro_tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <svg className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <span className="text-sm text-slate-300 leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    <div className="rounded-xl border border-amber-800/25 bg-amber-950/10 p-5">
                      <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                        Common Mistakes
                      </h3>
                      <ul className="space-y-3">
                        {prepContent.common_errors.map((e, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm text-slate-300 leading-relaxed">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* References */}
                  {((prepContent.references && prepContent.references.length > 0) || prepTask.mapped_questions.length > 0) && (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        References & Resources
                      </h3>
                      <div className="space-y-1.5">
                        {prepContent.references?.map((ref, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm text-slate-400 py-1.5">
                            <svg className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="leading-relaxed">{ref}</span>
                          </div>
                        ))}
                        {prepTask.mapped_questions.length > 0 && (
                          <div className="flex items-start gap-2.5 text-sm text-slate-400 py-1.5">
                            <svg className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="leading-relaxed">
                              {prepTask.mapped_questions.length} practice questions (Q#{prepTask.mapped_questions.join(', #')})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Competency Standard */}
                  <div className="text-xs text-slate-600 text-center py-2">
                    Standard: "{SCHEMA.program.competency_standard}"
                  </div>
                </div>
              )
            })() : (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-slate-800 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-sm text-slate-400 mb-1">Select a task to start preparing</div>
                <div className="text-xs text-slate-600">
                  Choose from <button onClick={() => setView('categories')} className="text-cyan-500 hover:text-cyan-400 cursor-pointer">Categories</button> or your recommended tasks in <button onClick={() => setView('overview')} className="text-cyan-500 hover:text-cyan-400 cursor-pointer">Overview</button>.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
